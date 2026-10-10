import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

// In production `/api/*` routes are Vercel serverless functions (api/*.js).
// This plugin runs the same handlers inside the Vite dev server so they work locally.
const DEV_ROUTES = {
  '/api/playbook': ['./api/playbook.js', './lib/playbook-data.js'],
  '/api/chat': ['./api/chat.js'],
  '/api/availability': ['./api/availability.js'],
}

function serverlessDevApi() {
  return {
    name: 'serverless-dev-api',
    configureServer(server) {
      for (const [route, modules] of Object.entries(DEV_ROUTES)) server.middlewares.use(route, (req, res) => {
        let raw = ''
        req.on('data', (chunk) => { raw += chunk })
        req.on('end', async () => {
          let body = {}
          try { body = raw ? JSON.parse(raw) : {} } catch (err) { body = {} }
          // Re-require on every call so edits to the handler/data are picked up without a restart
          for (const mod of modules) delete require.cache[require.resolve(mod)]
          const handler = require(modules[0])
          const shim = {
            status(code) { res.statusCode = code; return shim },
            setHeader(name, value) { res.setHeader(name, value); return shim },
            json(payload) { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(payload)) },
            end(data) { res.end(data) },
          }
          try {
            await handler({ method: req.method, headers: req.headers, body }, shim)
          } catch (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: err.message }))
          }
        })
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  // The dev handlers read process.env the same way they do on Vercel.
  // Values copied from .env on a previous load are cleared first, so editing .env
  // takes effect on Vite's automatic restart (real shell variables are left alone).
  for (const key of globalThis.__portfolioDevEnv || []) delete process.env[key]
  const env = loadEnv(mode, process.cwd(), '')
  const copied = []
  for (const key of ['GROQ_API_KEY', 'GROQ_MODEL', 'PLAYBOOK_PASSWORD', 'CALENDLY_TOKEN', 'CALENDLY_EVENT_URL']) {
    if (env[key] && !process.env[key]) {
      process.env[key] = env[key]
      copied.push(key)
    }
  }
  globalThis.__portfolioDevEnv = copied

  return {
    plugins: [react(), serverlessDevApi()],
    server: {
      port: 3000,
      open: true,
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            gsap: ['gsap'],
            motion: ['framer-motion'],
            markdown: ['react-markdown', 'remark-gfm'],
            icons: ['lucide-react'],
          },
        },
      },
    }
  }
})

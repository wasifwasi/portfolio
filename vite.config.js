import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

// In production `/api/playbook` is a Vercel serverless function (api/playbook.js).
// This plugin runs the same handler inside the Vite dev server so the page works locally.
function playbookDevApi() {
  return {
    name: 'playbook-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/playbook', (req, res) => {
        let raw = ''
        req.on('data', (chunk) => { raw += chunk })
        req.on('end', async () => {
          let body = {}
          try { body = raw ? JSON.parse(raw) : {} } catch (err) { body = {} }
          // Re-require on every call so edits to the handler/data are picked up without a restart
          delete require.cache[require.resolve('./api/playbook.js')]
          delete require.cache[require.resolve('./lib/playbook-data.js')]
          const handler = require('./api/playbook.js')
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
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), playbookDevApi()],
    server: {
      port: 3000,
      open: true,
      proxy: {
        '/api/chat': {
          target: 'https://api.groq.com/openai/v1',
          changeOrigin: true,
          rewrite: () => '/chat/completions',
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('Authorization', `Bearer ${env.VITE_GROQ_API_KEY}`);
            });
          },
        },
      },
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

// Build step (Vite plugin): write one static HTML file per route, each with its own title,
// description, canonical link, social preview tags and readable text. Link previews (LinkedIn,
// WhatsApp) and crawlers that don't run JavaScript see real content; the React app replaces the
// text as soon as it loads, so visitors see no difference.
import fs from 'fs'
import path from 'path'
import { projectsData } from '../src/data/projects.js'
import { blogs } from '../src/data/blogs.js'
import { HERO, FEATURED_WORK, SERVICES, PROCESS, CONTACT, CALENDLY_URL } from '../src/data/site.js'

export const SITE_URL = 'https://portfolio-wod3.vercel.app'
const DEFAULT_IMAGE = `${SITE_URL}/og.jpg`

const esc = (value = '') =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Replace the value of an existing tag attribute, e.g. <meta property="og:title" content="...">
function setAttr(html, selector, attr, value) {
  const re = new RegExp(`(<${selector}[^>]*?\\s${attr}=")[^"]*(")`)
  if (!re.test(html)) throw new Error(`static-pages: tag not found in index.html: ${selector}`)
  return html.replace(re, `$1${esc(value)}$2`)
}

function renderPage(template, page) {
  const url = `${SITE_URL}${page.path}`
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${esc(page.title)}</title>`)
  html = setAttr(html, 'meta name="description"', 'content', page.description)
  html = setAttr(html, 'link rel="canonical"', 'href', url)
  html = setAttr(html, 'meta property="og:type"', 'content', page.type || 'website')
  html = setAttr(html, 'meta property="og:url"', 'content', url)
  html = setAttr(html, 'meta property="og:title"', 'content', page.title)
  html = setAttr(html, 'meta property="og:description"', 'content', page.description)
  html = setAttr(html, 'meta property="og:image"', 'content', page.image || DEFAULT_IMAGE)
  html = setAttr(html, 'meta property="og:image:alt"', 'content', page.imageAlt || page.title)
  html = setAttr(html, 'meta name="twitter:url"', 'content', url)
  html = setAttr(html, 'meta name="twitter:title"', 'content', page.title)
  html = setAttr(html, 'meta name="twitter:description"', 'content', page.description)
  html = setAttr(html, 'meta name="twitter:image"', 'content', page.image || DEFAULT_IMAGE)
  // Readable text for crawlers; visually hidden so there is no flash before React renders
  return html.replace('<div id="root"></div>', `<div id="root"><div class="prerender">${page.body}</div></div>`)
}

const link = (href, text) => `<a href="${esc(href)}">${esc(text)}</a>`
const contactLinks = () =>
  `<p>${link(CALENDLY_URL || `https://wa.me/${CONTACT.whatsappNumber}`, 'Book a 15-minute call')} · ${link(`mailto:${CONTACT.email}`, CONTACT.email)} · ${link(CONTACT.linkedin, 'LinkedIn')} · ${link(CONTACT.github, 'GitHub')}</p>`

function buildPages(homeDescription) {
  const byNewest = [...projectsData].sort((a, b) => b.id - a.id)
  const pages = []

  pages.push({
    path: '/',
    title: 'Wasif Rehman | Full-Stack & AI Engineer',
    description: homeDescription,
    body: `<h1>${esc(HERO.title)}</h1><p>${esc(HERO.lead)}</p>${contactLinks()}
<h2>What I've built</h2><ul>${FEATURED_WORK.map((w) => `<li>${link(`/projects/${w.slug}`, w.title)}: ${esc(w.problem)} ${esc(w.solution)}</li>`).join('')}</ul>
<p>${link('/projects', `All ${projectsData.length} projects`)}</p>
<h2>What I can build for you</h2><ul>${SERVICES.map((s) => `<li><strong>${esc(s.title)}</strong>: ${esc(s.pitch)}</li>`).join('')}</ul>
<h2>How a project works</h2><ol>${PROCESS.map((p) => `<li><strong>${esc(p.title)}</strong>: ${esc(p.text)}</li>`).join('')}</ol>
<h2>Contact</h2>${contactLinks()}`,
  })

  pages.push({
    path: '/projects',
    title: 'Projects | Wasif Rehman - Full-Stack & AI Engineer',
    description: 'Case studies of AI agents, automation pipelines, SaaS platforms and mobile apps: the problem, what I built, and the stack.',
    body: `<h1>All projects</h1><ul>${byNewest.map((p) => `<li>${link(`/projects/${p.slug}`, p.title)} (${esc(p.subtitle)}): ${esc(p.description)}</li>`).join('')}</ul>`,
  })

  for (const p of projectsData) {
    const demo = p.demo && p.demo !== '#' ? `<p>${link(p.demo, 'Open the live app')}</p>` : ''
    pages.push({
      path: `/projects/${p.slug}`,
      title: `${p.title} case study | Wasif Rehman`,
      description: p.description,
      body: `<h1>${esc(p.title)}</h1><p>${esc(p.subtitle)}</p><p>${esc(p.description)}</p>
<p>Role: ${esc(p.role)} (${esc(p.company)}). Stack: ${esc(p.tags.join(', '))}.</p>${demo}<p>${link('/projects', 'All projects')}</p>`,
    })
  }

  pages.push({
    path: '/blog',
    title: 'Blog | Wasif Rehman - Full-Stack & AI Engineer',
    description: 'Architecture write-ups and lessons from building AI agents, automation pipelines, SaaS platforms and mobile apps.',
    body: `<h1>Blog</h1><ul>${blogs.map((b) => `<li>${link(`/blog/${b.id}`, b.title)} (${esc(b.date)}): ${esc(b.excerpt)}</li>`).join('')}</ul>`,
  })

  for (const b of blogs) {
    pages.push({
      path: `/blog/${b.id}`,
      type: 'article',
      title: `${b.title} | Wasif Rehman`,
      description: b.excerpt,
      body: `<h1>${esc(b.title)}</h1><p>${esc(b.date)}</p><p>${esc(b.excerpt)}</p><p>${link('/blog', 'All posts')}</p>`,
    })
  }
  return pages
}

export function staticPages() {
  let outDir
  return {
    name: 'static-pages',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const indexFile = path.join(outDir, 'index.html')
      let template = fs.readFileSync(indexFile, 'utf8')
      template = template.replace(
        '</head>',
        '  <style>.prerender{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}</style>\n  </head>'
      )
      const homeDescription = template.match(/<meta name="description" content="([^"]*)"/)?.[1] || ''
      const pages = buildPages(homeDescription)
      for (const page of pages) {
        // /projects/umrahflow -> projects/umrahflow.html, served at the clean URL by "cleanUrls" in vercel.json
        const file = page.path === '/' ? indexFile : path.join(outDir, `${page.path.slice(1)}.html`)
        fs.mkdirSync(path.dirname(file), { recursive: true })
        fs.writeFileSync(file, renderPage(template, page))
      }
      console.log(`static-pages: wrote ${pages.length} pages`)
    },
  }
}

// Build step (Vite plugin): write one static HTML file per route, each with its own title,
// description, canonical link, social preview tags and readable text. Link previews (LinkedIn,
// WhatsApp) and crawlers that don't run JavaScript see real content; the React app replaces the
// text as soon as it loads, so visitors see no difference. Blog posts get their full text and
// structured data (Article, FAQ, breadcrumbs). The sitemap is written from the same list of pages.
import fs from 'fs'
import path from 'path'
import { projectsData } from '../src/data/projects.js'
import { POSTS } from '../src/content/blog/index.js'
import { tokenizeInline, plainInline } from '../src/content/blog/inline.js'
import { HERO, HERO_STRIP, FEATURED_WORK, SERVICES, PROCESS, CONTACT, CALENDLY_URL } from '../src/data/site.js'
import { imageSrcSet, imageBase, imageFiles, blogOgImage, SIZES } from '../src/lib/images.js'

export const SITE_URL = 'https://portfolio-wod3.vercel.app'
const DEFAULT_IMAGE = `${SITE_URL}/og.jpg`

const esc = (value = '') =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// JSON-LD inside a <script>: escape "<" so text can never close the tag
const jsonLd = (data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`

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
  html = setAttr(html, 'meta name="robots"', 'content', page.noindex ? 'noindex, nofollow' : 'index, follow')
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
  // Start the page's main image with the HTML instead of after the JavaScript has run.
  // Same AVIF files and sizes as the <Picture> that shows it, so it is downloaded once.
  if (page.preload) {
    const { base, sizes } = page.preload
    html = html.replace(
      '</head>',
      `  <link rel="preload" as="image" type="image/avif" imagesrcset="${esc(imageSrcSet(base, 'avif'))}" imagesizes="${esc(sizes)}" fetchpriority="high" />\n  </head>`
    )
  }
  // Readable text for crawlers; visually hidden so there is no flash before React renders.
  // React replaces everything inside #root, structured data included (Helmet adds its own).
  return html.replace('<div id="root"></div>', `<div id="root"><div class="prerender">${page.body}</div></div>`)
}

const link = (href, text) => `<a href="${esc(href)}">${esc(text)}</a>`
const contactLinks = () =>
  `<p>${link(CALENDLY_URL || `https://wa.me/${CONTACT.whatsappNumber}`, 'Book a 15-minute call')} · ${link(`mailto:${CONTACT.email}`, CONTACT.email)} · ${link(CONTACT.linkedin, 'LinkedIn')} · ${link(CONTACT.github, 'GitHub')}</p>`

// ---------- Blog posts ----------

const inlineHtml = (text) =>
  tokenizeInline(text)
    .map((t) => {
      if (t.type === 'bold') return `<strong>${esc(t.text)}</strong>`
      if (t.type === 'em') return `<em>${esc(t.text)}</em>`
      if (t.type === 'code') return `<code>${esc(t.text)}</code>`
      if (t.type === 'link') return link(t.href, t.text)
      return esc(t.text)
    })
    .join('')

function blockHtml(block) {
  switch (block.type) {
    case 'p':
      return `<p>${inlineHtml(block.text)}</p>`
    case 'list': {
      const tag = block.ordered ? 'ol' : 'ul'
      return `<${tag}>${block.items.map((item) => `<li>${inlineHtml(item)}</li>`).join('')}</${tag}>`
    }
    case 'steps':
      return `<ol>${block.items.map((s) => `<li><strong>${inlineHtml(s.title)}</strong>${s.text ? ` ${inlineHtml(s.text)}` : ''}</li>`).join('')}</ol>`
    case 'table':
      return `<table>${block.caption ? `<caption>${esc(block.caption)}</caption>` : ''}<thead><tr>${block.head.map((h) => `<th>${inlineHtml(h)}</th>`).join('')}</tr></thead><tbody>${block.rows.map((row) => `<tr>${row.map((cell) => `<td>${inlineHtml(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`
    case 'callout':
      return `<aside><p>${block.title ? `<strong>${esc(block.title)}</strong> ` : ''}${inlineHtml(block.text)}</p></aside>`
    case 'quote':
      return `<blockquote><p>${inlineHtml(block.text)}</p>${block.cite ? `<cite>${esc(block.cite)}</cite>` : ''}</blockquote>`
    case 'code':
      return `<pre><code>${esc(block.code)}</code></pre>`
    case 'flow':
      return `<figure><ol>${block.steps.map((s) => `<li>${inlineHtml(s)}</li>`).join('')}</ol>${block.caption ? `<figcaption>${esc(block.caption)}</figcaption>` : ''}</figure>`
    default:
      throw new Error(`unknown block type "${block.type}"`)
  }
}

const CATEGORIES = ['AI agents', 'AI document processing', 'Automation', 'SaaS architecture', 'Product design', '3D & web graphics', 'Mobile', 'Web development', 'Security', 'Opinion']

// Stop the build on a post that would render badly or link nowhere
function checkPosts(posts, blogDir) {
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.js') && f !== 'index.js' && f !== 'inline.js').map((f) => f.slice(0, -3))
  const listed = posts.map((p) => p.id)
  const missing = files.filter((id) => !listed.includes(id))
  const extra = listed.filter((id) => !files.includes(id))
  if (missing.length || extra.length) {
    throw new Error(`static-pages: src/content/blog/index.js is out of date. Not listed: ${missing.join(', ') || 'none'}. No file (or meta.id differs from the file name): ${extra.join(', ') || 'none'}`)
  }
  const slugs = new Set(projectsData.map((p) => p.slug))
  const ids = new Set(listed)
  const problems = []
  for (const post of posts) {
    const where = `blog/${post.id}`
    for (const key of ['title', 'excerpt', 'date', 'dateISO', 'category']) if (!post[key]) problems.push(`${where}: meta.${key} is missing`)
    if (!CATEGORIES.includes(post.category)) problems.push(`${where}: unknown category "${post.category}"`)
    if (post.project && !slugs.has(post.project)) problems.push(`${where}: meta.project "${post.project}" is not a project`)
    if (!post.body?.sections?.length) problems.push(`${where}: no sections`)
    const text = JSON.stringify(post)
    for (const [, href] of text.matchAll(/\]\((\/[^)\s]*)\)/g)) {
      const [, kind, slug] = href.match(/^\/(projects|blog)\/([^/#?]+)/) || []
      if (kind === 'projects' && !slugs.has(slug)) problems.push(`${where}: link to missing project ${href}`)
      if (kind === 'blog' && !ids.has(slug)) problems.push(`${where}: link to missing post ${href}`)
    }
    try {
      for (const section of post.body?.sections || []) section.blocks.forEach(blockHtml)
    } catch (err) {
      problems.push(`${where}: ${err.message}`)
    }
  }
  if (problems.length) throw new Error(`static-pages: blog problems:\n  ${problems.join('\n  ')}`)
}

// Every photo the site shows must exist in each AVIF and WebP size, or browsers get a broken image
function checkImages(posts, publicDir) {
  const bases = new Set([
    'img/me/hero',
    'img/me/avatar',
    ...projectsData.map((p) => imageBase(p.image)),
    ...[...HERO_STRIP, ...FEATURED_WORK].map((item) => item.image),
    ...posts.filter((p) => p.cover).map((p) => imageBase(p.cover.src)),
  ])
  const missing = [...bases].flatMap((base) => imageFiles(base)).filter((file) => !fs.existsSync(path.join(publicDir, file)))
  missing.push(...posts.filter((p) => p.cover && !fs.existsSync(path.join(publicDir, blogOgImage(p.id)))).map((p) => blogOgImage(p.id).slice(1)))
  if (missing.length) {
    throw new Error(`static-pages: missing image files (run "npm run images" to make them):\n  ${missing.join('\n  ')}`)
  }
}

function postPage(post) {
  const url = `${SITE_URL}/blog/${post.id}`
  const image = post.cover ? `${SITE_URL}${blogOgImage(post.id)}` : DEFAULT_IMAGE
  const { body } = post
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    image,
    articleSection: post.category,
    keywords: post.keywords?.join(', '),
    author: { '@type': 'Person', name: 'Wasif Rehman', url: SITE_URL },
    publisher: { '@type': 'Person', name: 'Wasif Rehman' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }
  const faq = body.faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: body.faq.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: plainInline(item.a) } })),
      }
    : null
  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  }
  const project = post.project ? projectsData.find((p) => p.slug === post.project) : null

  const html = `<article><h1>${esc(post.title)}</h1><p>${inlineHtml(body.dek)}</p>
<p>By Wasif Rehman · <time datetime="${post.dateISO}">${esc(post.date)}</time> · ${esc(post.category)}</p>
<h2>In short</h2><ul>${body.takeaways.map((t) => `<li>${inlineHtml(t)}</li>`).join('')}</ul>
${body.sections.map((s) => `<section id="${esc(s.id)}"><h2>${esc(s.heading)}</h2>${s.blocks.map(blockHtml).join('')}</section>`).join('\n')}
${body.faq?.length ? `<h2>Frequently asked questions</h2>${body.faq.map((f) => `<h3>${esc(f.q)}</h3><p>${inlineHtml(f.a)}</p>`).join('')}` : ''}
${project ? `<p>Case study: ${link(`/projects/${project.slug}`, project.title)}</p>` : ''}
<p>${link('/blog', 'All posts')}</p></article>
${jsonLd(article)}${faq ? jsonLd(faq) : ''}${jsonLd(crumbs)}`

  return {
    path: `/blog/${post.id}`,
    type: 'article',
    title: `${post.title} | Wasif Rehman`,
    description: post.excerpt,
    image,
    imageAlt: post.cover?.alt,
    preload: post.cover ? { base: imageBase(post.cover.src), sizes: SIZES.postCover } : null,
    lastmod: post.dateISO,
    body: html,
  }
}

// ---------- All pages ----------

function buildPages(homeDescription, posts) {
  const byNewest = [...projectsData].sort((a, b) => b.id - a.id)
  const pages = []

  pages.push({
    path: '/',
    title: 'Wasif Rehman | Full-Stack & AI Engineer',
    description: homeDescription,
    preload: { base: 'img/me/hero', sizes: SIZES.heroPortrait },
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
    preload: { base: imageBase(byNewest[0].image), sizes: SIZES.projectCard },
    body: `<h1>All projects</h1><ul>${byNewest.map((p) => `<li>${link(`/projects/${p.slug}`, p.title)} (${esc(p.subtitle)}): ${esc(p.description)}</li>`).join('')}</ul>`,
  })

  for (const p of projectsData) {
    const demo = p.demo && p.demo !== '#' ? `<p>${link(p.demo, 'Open the live app')}</p>` : ''
    const about = posts.filter((post) => post.project === p.slug)
    pages.push({
      path: `/projects/${p.slug}`,
      title: `${p.title} case study | Wasif Rehman`,
      description: p.description,
      preload: { base: imageBase(p.image), sizes: SIZES.caseStudy },
      body: `<h1>${esc(p.title)}</h1><p>${esc(p.subtitle)}</p><p>${esc(p.description)}</p>
<p>Role: ${esc(p.role)} (${esc(p.company)}). Stack: ${esc(p.tags.join(', '))}.</p>${demo}
${about.length ? `<h2>Posts about ${esc(p.title)}</h2><ul>${about.map((post) => `<li>${link(`/blog/${post.id}`, post.title)}</li>`).join('')}</ul>` : ''}
<p>${link('/projects', 'All projects')}</p>`,
    })
  }

  pages.push({
    path: '/blog',
    title: 'Blog: AI Agents, Automation and SaaS Engineering | Wasif Rehman',
    description: "Write-ups from building AI agents, document automation, multi-tenant SaaS and React Native apps: the architecture, the trade-offs and what I'd do again.",
    lastmod: posts[0]?.dateISO,
    preload: posts[0]?.cover ? { base: imageBase(posts[0].cover.src), sizes: SIZES.blogFeatured } : null,
    body: `<h1>Notes from building AI agents, SaaS and mobile apps</h1><ul>${posts.map((b) => `<li>${link(`/blog/${b.id}`, b.title)} (${esc(b.date)}, ${esc(b.category)}): ${esc(b.excerpt)}</li>`).join('')}</ul>`,
  })

  for (const post of posts) pages.push(postPage(post))

  // Private page: the app shows the password box; the questions come from api/playbook.js
  pages.push({
    path: '/playbook',
    title: 'Interview Playbook | Wasif Rehman',
    description: 'Private interview preparation notes.',
    noindex: true,
    body: '<h1>Interview playbook</h1><p>This page is private.</p>',
  })

  // Vercel serves 404.html, with a 404 status, for any address without its own file;
  // the app then shows its "Page not found" page (or the missing project or post message)
  pages.push({
    path: '/404',
    title: 'Page Not Found | Wasif Rehman',
    description: "The page you're looking for doesn't exist.",
    noindex: true,
    body: `<h1>Page not found</h1><p>${link('/', 'Home')} · ${link('/projects', 'Projects')} · ${link('/blog', 'Blog')}</p>`,
  })
  return pages
}

function sitemap(pages, today) {
  const priority = (p) => (p === '/' ? '1.0' : p === '/projects' || p === '/blog' ? '0.9' : p.startsWith('/projects/') ? '0.8' : '0.7')
  const urls = pages.filter((page) => !page.noindex).map(
    (page) => `  <url>\n    <loc>${SITE_URL}${page.path}</loc>\n    <lastmod>${page.lastmod || today}</lastmod>\n    <priority>${priority(page.path)}</priority>\n  </url>`
  )
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
}

export function staticPages() {
  let outDir, root
  return {
    name: 'static-pages',
    apply: 'build',
    configResolved(config) {
      root = config.root
      outDir = path.resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const posts = POSTS.map((mod) => ({ ...mod.meta, body: mod.default })).sort(
        (a, b) => b.dateISO.localeCompare(a.dateISO) || a.title.localeCompare(b.title)
      )
      checkPosts(posts, path.join(root, 'src/content/blog'))
      checkImages(posts, path.join(root, 'public'))

      const indexFile = path.join(outDir, 'index.html')
      let template = fs.readFileSync(indexFile, 'utf8')
      template = template.replace(
        '</head>',
        '  <style>.prerender{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}</style>\n  </head>'
      )
      const homeDescription = template.match(/<meta name="description" content="([^"]*)"/)?.[1] || ''
      const pages = buildPages(homeDescription, posts)
      for (const page of pages) {
        // /projects/umrahflow -> projects/umrahflow.html, served at the clean URL by "cleanUrls" in vercel.json
        const file = page.path === '/' ? indexFile : path.join(outDir, `${page.path.slice(1)}.html`)
        fs.mkdirSync(path.dirname(file), { recursive: true })
        fs.writeFileSync(file, renderPage(template, page))
      }
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap(pages, new Date().toISOString().slice(0, 10)))
      console.log(`static-pages: wrote ${pages.length} pages and sitemap.xml`)
    },
  }
}

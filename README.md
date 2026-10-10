# Wasif's Portfolio

**v2.0** | Personal portfolio for Wasif Rehman, full-stack & AI engineer. Built to turn visitors into client calls: a direct hero, real case studies, fixed-scope services and a low-friction booking path.

Live at [portfolio-wod3.vercel.app](https://portfolio-wod3.vercel.app).

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 19, React Router DOM 7, Vite 7 |
| **Animations** | Framer Motion (respects reduced motion) |
| **Icons** | Lucide React |
| **Booking** | Calendly (live free times via the Calendly API, booking popup) |
| **Email** | EmailJS |
| **Chatbot** | Groq, Gemini or OpenRouter (via the `api/chat.js` serverless function) |

## Pages

**Home**, in the order a visitor scrolls:

1. **Hero** – headline, book-a-call and see-the-work buttons, headline numbers, portrait, three project photos
2. **What I've built** – five case studies with images, plus a call-to-action tile
3. **What I can build for you** – three fixed-scope offers, each linked to the projects that prove it
4. **How a project works** – four steps
5. **About** – bio, stack and photo
6. **Contact** – book a call, WhatsApp, email, or the EmailJS form

**Projects** (`/projects`) lists every project with filters (AI, web, mobile). Each has a **case study** at `/projects/<slug>`.

**Blog** (`/blog`) shows the newest post as a large card, then every post with topic filters. Each post (`/blog/<id>`) has a cover, a short summary, a contents box, numbered sections with tables, callouts, steps, diagrams and code, a pull quote, FAQs, a call to action, the related case study and related posts.

Dark theme is the default; light theme is available from the header toggle.

## Editing Content

| What | Where |
|------|-------|
| Hero copy, headline numbers, hero photo strip, featured work, services, process steps, contact details, Calendly link | `src/data/site.js` |
| Project cards (Projects page, contact prefill, chatbot, pre-rendered pages) | `src/data/projects.js` |
| Blog posts: one file per post, plus the list in `index.js` (format in the README there) | `src/content/blog/` |
| Full case study text | `src/components/ProjectDetail.jsx` |
| Blog covers (16:9) | `public/img/blog/` |
| Project images (3:2) | `public/img/work/` |
| Profile photos (hero, about, avatar) | `public/img/me/` |
| Social preview image (1200×630) | `public/og.jpg` |
| Favicon (SVG source, PNG and ICO sizes) | `public/favicon.svg`, `favicon.ico`, `favicon.png`, `apple-touch-icon.png`, `logo192.png`, `logo512.png` |
| Accent colour | `--accent-h` / `--accent-s` at the top of `src/index.css` |

Project photos are licensed Unsplash images with a light colour grade, or real screenshots of the live apps. Blog covers are generated images (Gemini), captioned as such on each post.

**Images load as AVIF** (about a third the size of WebP) with a WebP fallback, each in a few widths so phones get a smaller file. To add or replace a photo, put its largest version in the folder (`public/img/work/<name>.png`, `.jpg` or `.webp`, 1200px wide; blog covers 16:9 as `public/img/blog/<post id>.png`) and run `npm run images`, which writes the missing AVIF and WebP sizes (and the link-preview JPEG for blog covers). The build stops if a size is missing. Each page's main image is preloaded from the HTML, so it starts downloading before the JavaScript runs.

## Booking

Every "Book a call" button opens the on-site booking box (`BookingModal.jsx`). It reads free times from `api/availability.js`, which calls the Calendly API with `CALENDLY_TOKEN`; the visitor picks a day and time, enters their details, and Calendly's own form opens pre-filled for the final "Schedule Event" click. Without the token, the buttons open Calendly's full calendar instead, and without a `CALENDLY_URL` they open WhatsApp.

## Search and Link Previews

The app is client-rendered, so the build also writes a static HTML file for every route (`scripts/static-pages.js`, a Vite plugin): home, projects, every case study, blog and every post. Each file has its own title, description, canonical URL and social tags, plus the page's text for crawlers. Blog posts get their full text plus Article, FAQ and breadcrumb structured data, and the build writes `sitemap.xml` from the same list of pages. `"cleanUrls": true` in `vercel.json` serves `/projects/umrahflow` from `projects/umrahflow.html`; the React app takes over once it loads.

## Getting Started

```bash
git clone <repository-url>
cd portfolio
npm install
npm run dev   # http://localhost:3000
```

The dev server also runs the `api/` functions (chat, availability, playbook), reading keys from `.env`.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` / `npm run dev` | Start the Vite development server |
| `npm run build` | Build for production into `dist/`, including the static pages |
| `npm run images` | Make the AVIF and WebP sizes for new or replaced photos in `public/img` |
| `npm run preview` | Preview the production build locally (note: Vite's preview always serves the home HTML; `npx serve dist` matches Vercel's clean URLs) |

## Project Structure

```
portfolio/
├── api/                      # Vercel serverless functions
│   ├── chat.js               # Chatbot proxy (provider, model and limits fixed server-side)
│   ├── availability.js       # Free Calendly times for the booking box
│   └── playbook.js           # Password-protected interview playbook
├── lib/                      # Server-only data (playbook questions)
├── public/                   # Images, favicons, og.jpg, llms.txt, robots.txt
├── scripts/
│   ├── static-pages.js       # Build step: one static HTML file per route, plus sitemap.xml
│   ├── blog-meta.js          # Lets the blog page load post summaries without the full text
│   └── images.mjs            # npm run images: AVIF and WebP sizes for every photo
├── src/
│   ├── data/                 # site.js, projects.js — edit content here
│   ├── content/blog/         # One file per blog post, plus index.js and the format README
│   ├── lib/booking.js        # Calendly loader, free-time feed, "open booking" event
│   ├── lib/blog.js           # Post list, categories and related posts for the app
│   ├── lib/images.js         # Image widths, file names and display sizes
│   ├── components/
│   │   ├── Header.jsx        # Nav, "Book a call" button, theme toggle
│   │   ├── Home.jsx          # Hero
│   │   ├── FeaturedWork.jsx  # Case study grid on the home page
│   │   ├── Services.jsx      # Fixed-scope offers
│   │   ├── Process.jsx       # How a project works
│   │   ├── About.jsx         # Bio and photo
│   │   ├── Contact.jsx       # Call / WhatsApp / email + EmailJS form
│   │   ├── BookCallLink.jsx  # Any "Book a call" link
│   │   ├── BookingModal.jsx  # On-site booking box
│   │   ├── Projects.jsx      # All projects page
│   │   ├── ProjectDetail.jsx # Case study pages (content + layout)
│   │   ├── Picture.jsx / ProjectImage.jsx  # Photos: AVIF with WebP fallback, several widths
│   │   ├── Blog.jsx          # Blog page: featured post, topic filters, cards
│   │   ├── BlogPost.jsx      # A blog post
│   │   ├── BlogBlocks.jsx    # Post building blocks: tables, callouts, steps, diagrams, code
│   │   └── Chatbot.jsx       # Portfolio assistant
│   ├── App.jsx               # Routing and the booking box
│   └── index.css             # Global styles and theme tokens
├── vercel.json
└── vite.config.js
```

## Environment Variables

| Variable | Where | Used for |
|----------|-------|----------|
| `CHAT_PROVIDER` | Optional, Vercel and `.env` | `groq` (default), `gemini` or `openrouter` |
| `GROQ_API_KEY` | Vercel and `.env` | Chatbot key when the provider is Groq |
| `GEMINI_API_KEY` | Vercel and `.env` | Chatbot key when the provider is Gemini (a Google AI Studio key) |
| `OPENROUTER_API_KEY` | Vercel and `.env` | Chatbot key when the provider is OpenRouter |
| `CHAT_MODEL` | Optional, same places | Overrides the model (defaults: `openai/gpt-oss-20b`, `gemini-2.5-flash`, `openai/gpt-oss-20b:free`) |
| `CALENDLY_TOKEN` | Vercel and `.env` | Calendly personal access token with `users:read`, `event_types:read` and `availability:read` |
| `CALENDLY_EVENT_URL` | Optional, same places | The Calendly event to read times for (default `https://calendly.com/wasifrehman58/new-meeting`) |
| `PLAYBOOK_PASSWORD` | Optional, Vercel | Overrides the default `/playbook` password |

EmailJS service/template IDs and the public key are set in `src/components/Contact.jsx`.

## Interview Playbook (`/playbook`)

A private, password-protected interview question bank (basic → advanced) lives at `/playbook`.

- The questions are **not** shipped in the public JS bundle. `api/playbook.js` (a Vercel serverless function) checks the password and only then returns `lib/playbook-data.js`.
- Default password is set as a SHA-256 hash inside `api/playbook.js`. To change it without touching code, add an environment variable `PLAYBOOK_PASSWORD` in the Vercel project settings and redeploy.
- The route is `noindex` and listed under `Disallow` in `robots.txt`.

## Deployment

Vercel builds the site from source (`npm run build` → `dist/`, see `vercel.json`), so `dist/` is not committed. Add the environment variables above in the Vercel project settings.

## Contact

- **LinkedIn**: [Wasif Rehman](https://www.linkedin.com/in/wasif-rehman-32210a18b/)
- **GitHub**: [wasifwasi](https://github.com/wasifwasi)

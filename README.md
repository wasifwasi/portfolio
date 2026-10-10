# Wasif's Portfolio

**v2.0** | Personal portfolio for Wasif Rehman, full-stack & AI engineer. Built to turn visitors into client calls: a direct hero, real case studies, fixed-scope services and a low-friction contact path.

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 19, React Router DOM 7, Vite 7 |
| **Animations** | Framer Motion (scroll reveals, respects reduced motion), GSAP on the projects/blog pages |
| **Icons** | Lucide React |
| **Email** | EmailJS |
| **Chatbot** | Groq (via the `api/chat.js` serverless function) |

## Home Page

1. **Hero** – one-line hook, two CTAs (book a call, view work) and headline numbers
2. **Selected work** – bento grid of four case studies in problem → solution → stack format
3. **Services** – three fixed-scope offers, each linked to the projects that prove it
4. **About** – short bio and skills grid
5. **Contact** – book a call, WhatsApp, email, or the EmailJS form

Dark "obsidian" theme is the default; light theme is still available from the header toggle.

## Editing Content

| What | Where |
|------|-------|
| Calendly link, contact details, headline numbers, featured work, services | `src/data/site.js` |
| Project cards (Projects page, contact prefill, chatbot) | `src/data/projects.js` |
| Blog listing (blog page, chatbot) | `src/data/blogs.js` |
| Full case study pages / blog post bodies | `src/components/ProjectDetail.jsx`, `src/components/BlogPost.jsx` |
| Accent colour | `--accent-h` / `--accent-s` at the top of `src/index.css` |

Until `CALENDLY_URL` is set, every "Book a call" button opens WhatsApp with a pre-filled message.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd portfolio

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` / `npm run dev` | Start Vite development server |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview production build locally |

## Project Structure

```
portfolio/
├── api/                    # Vercel serverless functions (chat, playbook)
├── lib/                    # Server-only data (playbook questions)
├── public/                 # Images, llms.txt, sitemap, robots.txt
├── src/
│   ├── data/               # site.js, projects.js, blogs.js — edit content here
│   ├── components/
│   │   ├── Header.jsx      # Nav, "Book a call" button, theme toggle
│   │   ├── Home.jsx        # Hero: hook, CTAs, headline numbers
│   │   ├── FeaturedWork.jsx# Bento grid of featured case studies
│   │   ├── Services.jsx    # Fixed-scope service offers
│   │   ├── About.jsx       # Bio + skills grid
│   │   ├── Contact.jsx     # Call / WhatsApp / email + EmailJS form
│   │   ├── Projects.jsx    # All projects page
│   │   ├── ProjectDetail.jsx # Case study pages
│   │   ├── Blog.jsx / BlogPost.jsx
│   │   └── Chatbot.jsx     # Groq-powered portfolio assistant
│   ├── App.jsx             # Routing
│   └── index.css           # Global styles and theme tokens
└── vite.config.js
```

## Environment Variables

| Variable | Where | Used for |
|----------|-------|----------|
| `GROQ_API_KEY` | Vercel project settings, and local `.env` | Chatbot (`api/chat.js`, also run by the dev server) |
| `GROQ_MODEL` | Optional, same places | Overrides the chatbot model (default `openai/gpt-oss-20b`) |
| `PLAYBOOK_PASSWORD` | Vercel project settings (optional) | Overrides the default `/playbook` password |
| `CALENDLY_TOKEN` | Vercel project settings, and local `.env` | Calendly personal access token; lets the booking box show live free times (`api/availability.js`). Without it, "Book a call" opens Calendly's full calendar |
| `CALENDLY_EVENT_URL` | Optional, same places | The Calendly event link to read times for (default `https://calendly.com/wasifrehman58/new-meeting`) |

EmailJS service/template IDs and the public key are set in `src/components/Contact.jsx`.

## Interview Playbook (`/playbook`)

A private, password-protected interview question bank (basic → advanced) lives at `/playbook`.

- The questions are **not** shipped in the public JS bundle. `api/playbook.js` (a Vercel serverless function) checks the password and only then returns `lib/playbook-data.js`.
- Default password is set as a SHA-256 hash inside `api/playbook.js`. To change it without touching code, add an environment variable `PLAYBOOK_PASSWORD` in the Vercel project settings and redeploy.
- Locally, the same handler runs inside the Vite dev server (see the `playbookDevApi` plugin in `vite.config.js`), so `npm run dev` is enough.
- The route is `noindex` and listed under `Disallow` in `robots.txt`.

## Deployment

Vercel builds the site from source (`npm run build` → `dist/`, see `vercel.json`), so `dist/` is not committed.

## Contact

- **LinkedIn**: [Wasif Rehman](https://www.linkedin.com/in/wasif-rehman-32210a18b/)
- **GitHub**: [wasifwasi](https://github.com/wasifwasi)

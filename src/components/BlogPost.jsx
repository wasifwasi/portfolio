import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import SEO from './SEO';

const blogContent = {
  'building-a-9-agent-ai-backend-for-bpoai': {
    title: 'How the BPOAI Agent Flow Works',
    date: 'June 18, 2026',
    dateISO: '2026-06-18',
    description: 'How I built the agent server behind BPOAI — nine specialized Claude-powered agents that scrape leads, score AI readiness, verify claims, run email outreach drips, and publish weekly news, all wired together through webhooks and cron.',
    tags: ['AI Agents', 'Claude', 'Apify', 'Supabase', 'Express'],
    content: (
      <>
        <p>BPOAI is a directory and intelligence hub for the BPO industry that I led at AIDEVGEN. The public Next.js site is only half the story — behind it runs a completely separate <b>agent server</b>: a small Express app whose entire job is to make the directory feel alive. It scrapes new companies, scores them, verifies ownership claims, runs cold-email campaigns, and writes weekly news, with almost no human in the loop. This post is a walkthrough of how those nine agents are wired together.</p>

        <h3>Two Apps, One Webhook Contract</h3>
        <p>The main site and the agents are deliberately kept apart. The Next.js app never runs an agent inline; it just fires a webhook. A tiny helper POSTs to <code>{'${AGENT_SERVER}/webhook/{event}'}</code> with an <code>x-agent-secret</code> header and — crucially — swallows every error so an agent outage can <i>never</i> break the main site. The agent server is an Express app exposing routes like <code>/webhook/search</code>, <code>/webhook/claim-submit</code>, <code>/webhook/profile-update</code>, and a few <code>/webhook/cron/*</code> endpoints. That clean contract is what lets the agents evolve, crash, and redeploy independently of the customer-facing site.</p>

        <h3>The Search → Scrape → Outreach Chain</h3>
        <p>The most interesting flow starts with a failed search. <b>Agent 1 (Search)</b> logs every directory query to Supabase and Slack. If a search returns zero results, it sets a flag that fires <b>Agent 2 (Scraper)</b> in the background — the response to the site returns immediately, the scrape runs after.</p>
        <p>Agent 2 is the workhorse. It uses Apify's <code>compass/crawler-google-places</code> actor to find matching BPO companies on Google Maps, then <code>apify/website-content-crawler</code> to pull text from each company's site, and a regex-based extractor to harvest contact emails (preferring role inboxes like <code>info@</code> and <code>sales@</code> on the matching domain). New leads are de-duplicated and written to Supabase. Then it <i>chains two more agents</i>: <b>Agent 8</b> to notify anyone who requested that scan, and <b>Agent 9</b> to kick off an outreach campaign for every lead that has an email.</p>

        <h3>Outreach as a Drip, Stopped by Replies</h3>
        <p><b>Agent 9 (Outreach)</b> is a three-email drip. The first email goes out the moment a lead is created; an hourly cron (<code>/webhook/cron/outreach</code>) sends follow-up #2 at +24h and #3 at +48h. A unique DB index prevents the same lead being enrolled twice, and an admin master switch can pause all outreach at once. The clever part is the feedback loop: when a recipient replies, Resend's <code>email.received</code> webhook hits the server, <b>Agent 8</b> stores the reply, and it calls back into Agent 9 to mark the campaign <i>replied</i> and stop the drip. No one wants a "just following up" email after they've already answered.</p>

        <h3>Scoring and Claims: AI Where It Earns Its Keep</h3>
        <p>Two agents lean directly on Claude. <b>Agent 3 (Scoring)</b> fires on every profile update and asks Claude to compute an <b>AI Readiness Score</b> (0–100) from the company's listed tools, services, and profile completeness — auto-awarding an "AI-Ready" badge at 70+. <b>Agent 5 (Claims)</b> handles ownership claims by comparing the claimant's email domain to the company's website domain: a match auto-approves and emails the user; a mismatch is queued to an admin Slack channel for manual review. Claude is used where judgment helps; a plain domain check is used where it's all you need.</p>

        <h3>The Weekly Cron: News and Analytics</h3>
        <p>Every Monday morning, two agents wake up. <b>Agent 6 (News)</b> scrapes BPO/AI headlines across a set of topics (Apify's Google-search scraper + content crawler), runs each article through Claude to produce an SEO title, summary, and clean HTML body, and saves them as <i>pending drafts</i> for an admin to approve. It also writes one original "trending" article naming the week's top-scoring and newly-added companies. <b>Agent 7 (Analytics)</b> compiles weekly stats — new companies, claims, top searches, highest scores — and posts a digest to Slack. No content auto-publishes; humans stay in the approval loop where reputation is on the line.</p>

        <h3>The Shared Toolbelt</h3>
        <p>Four small libraries keep the agents thin. <code>claude.ts</code> wraps the Claude integration and exposes typed helpers (<code>calculateAIScore</code>, <code>generateArticleSummary</code>, <code>extractBPOData</code>). <code>apify.ts</code> wraps the Google Maps and content-crawler actors. <code>slack.ts</code> gives every agent a consistent way to post execution logs, lead cards, and error alerts to dedicated channels. <code>emailExtract.ts</code> does the unglamorous but vital work of finding a real, reachable email on a company website. Each agent reads almost like a recipe because the messy parts live here.</p>

        <h3>What Made It Reliable</h3>
        <p>Three decisions did the heavy lifting. First, <b>fire-and-forget by default</b>: webhooks respond instantly and the real work runs in background tasks with <code>.catch()</code> guards, so a slow scrape never times out a user request. Second, <b>one driver per job</b> — outreach follow-ups are driven only by the external cron, never a second in-process timer, to avoid double-sending. Third, <b>humans gate anything public</b>: scraped leads, AI-written articles, and ambiguous claims all wait for approval. The result is a backend that does a remarkable amount on its own while staying safe to leave running.</p>

        <p>Nine agents, one webhook contract, and a handful of shared tools turn a static directory into something that grows, scores, and follows up by itself. That's the part of BPOAI users never see — and the part I had the most fun building.</p>
      </>
    ),
  },
  'designing-houses-in-the-browser-react-three-konva': {
    title: 'Designing a Real House in the Browser: 2D Plans to Live 3D',
    date: 'June 14, 2026',
    dateISO: '2026-06-14',
    description: 'How I built homeStructure — a climate-smart house design studio for a real irregular plot in Attock, with an editable 2D floor planner (react-konva), live 3D (react-three-fiber), and a passive-design score.',
    tags: ['Three.js', 'react-konva', 'Next.js', 'Zustand', '3D Web'],
    content: (
      <>
        <p>Most house-design tools assume a clean rectangular lot. Real plots aren't like that. homeStructure is a personal project I built to design a climate-smart house on a <b>real, irregular trapezoid plot</b> in Attock, Pakistan — about 2,455 sq ft (≈ 9 Marla), traced from satellite imagery, with three of four sides as shared party walls. You draw the floor plan on the exact boundary, watch it build in live 3D, and get passive-design advice tuned to a hot, semi-arid climate.</p>

        <h3>One Document as the Source of Truth</h3>
        <p>The whole app is driven by a single <code>FloorPlan</code> document, validated with a Zod schema and measured entirely in feet. That one document feeds the 2D editor, the 3D viewer, the model thumbnails, and the climate score. Keeping a single source of truth is what makes "edit in 2D, see it in 3D instantly" actually work without the two views drifting apart.</p>

        <h3>The 2D Floor Planner (react-konva)</h3>
        <p>The editor is built on react-konva. You add, drag, resize, and label rooms directly on the irregular boundary, with grid snapping and a live readout of area, Marla, and plot coverage. The hard part is constraint: rooms must stay inside a non-rectangular polygon and respect locked party walls. I used <code>@flatten-js/core</code> for polygon containment and <code>earcut</code> to triangulate the footprint for area calculations.</p>

        <h3>Live 3D (react-three-fiber)</h3>
        <p>The same plan extrudes into 3D the moment you change it, using react-three-fiber over Three.js with helpers from <code>@react-three/drei</code>. There are three render modes — Massing, Realistic, and Blocks — and camera presets for Front, Back, Left, Right, Top, and Iso. Because the geometry is derived from the FloorPlan document, the 3D view is never out of sync with the 2D editor.</p>

        <h3>Undo/Redo and Persistence</h3>
        <p>State lives in a Zustand store, with <code>zundo</code> layered on top for time-travel undo/redo — essential for a design tool where you experiment constantly. Everything autosaves to localStorage, and you can Import/Export the plan as JSON, so a design is portable and shareable as a plain data file.</p>

        <h3>Climate-Smart by Design</h3>
        <p>Because three sides are blind party walls, every viable layout relies on a central courtyard (sehan) for light and cross-ventilation. homeStructure makes that trade-off visible: a live passive-design score plus a checklist and sun diagram covering courtyard placement, shading, roof strategy, zoning, and monsoon handling. The goal is to turn vague "good design" intuition into a concrete number you can push up as you edit.</p>

        <h3>What I Learned</h3>
        <p>Two lessons stood out. First, deriving 3D from a single validated document is far more robust than syncing two separate models — let one representation be the truth and compute the rest. Second, constraining an editor to an irregular boundary is mostly a geometry problem; investing early in a solid containment-and-snapping layer paid off across every feature built on top of it.</p>

        <p>homeStructure is live and runs entirely in the browser — no installs, no plugins. It's a small proof that climate-smart planning for a real, awkward plot can be approachable, visual, and immediate.</p>
      </>
    ),
  },
  'building-a-bpo-directory-ai-hub-supabase-three': {
    title: 'Building a BPO Directory & AI Hub with Supabase and Three.js',
    date: 'June 02, 2026',
    dateISO: '2026-06-02',
    description: 'A look at BPOAI — a directory and intelligence hub for the top BPO companies in the Philippines, combining a Supabase data layer with an immersive 3D landing experience.',
    tags: ['Next.js', 'Supabase', 'Three.js', 'Framer Motion', 'Directory'],
    content: (
      <>
        <p>The Business Process Outsourcing market in the Philippines is huge, but discovering the right provider is still a mess of outdated lists and SEO spam. BPOAI, which I led at AIDEVGEN, is a directory and intelligence hub that pairs real company data with a landing experience that doesn't feel like a phone book. Here's how it's put together.</p>

        <h3>Supabase as the Data Layer</h3>
        <p>The directory runs on Supabase — Postgres for the company data plus the SSR auth helpers (<code>@supabase/ssr</code>) so server components can read data securely. Modeling the schema for flexible search was the core work: companies have services, locations, sizes, and specialties, and the UI needs to filter across all of them quickly. Postgres indexes and a clean query layer keep discovery fast even as the dataset grows.</p>

        <h3>An Immersive 3D Landing</h3>
        <p>First impressions matter for a directory that wants to be the default. The landing page uses react-three-fiber over Three.js for an animated 3D hero that sets BPOAI apart from a generic listing site. The challenge is always the same: a heavy 3D scene must not wreck load time or Core Web Vitals, so the experience is scoped, lazy-loaded, and tuned to stay smooth on mid-range hardware.</p>

        <h3>Motion as a Product Feature</h3>
        <p>Framer Motion handles transitions throughout — page changes, card reveals, and micro-interactions. On a B2B product, polish reads as credibility. Buyers comparing outsourcing partners are making a high-trust decision, and a site that feels considered earns more of that trust than one that feels like a spreadsheet with a logo.</p>

        <h3>Lead Capture with Resend</h3>
        <p>Discovery is only half the job; the product has to convert interest into contact. Demo-request and contact flows are delivered by email via Resend, so an interested visitor becomes a real lead in the team's inbox without any third-party form middleware.</p>

        <h3>Deploying on Cloudflare via OpenNext</h3>
        <p>BPOAI deploys to Cloudflare using <code>@opennextjs/cloudflare</code>, which adapts a Next.js 16 app to Cloudflare's runtime. It's a great fit for a globally accessed directory — edge distribution keeps the site fast worldwide — but it does mean being deliberate about which Node APIs you reach for, since the runtime isn't a standard Node server.</p>

        <h3>Takeaways</h3>
        <p>The lesson from BPOAI is that "directory" doesn't have to mean "boring." A solid Supabase schema makes the data trustworthy and searchable; a restrained 3D landing and Framer Motion make it memorable; and Resend turns browsing into pipeline. Combine those and a listing site becomes a product.</p>
      </>
    ),
  },
  'ai-assisted-recruitment-platform-nextjs-mongodb': {
    title: 'An AI-Assisted Recruitment Platform with Next.js and MongoDB',
    date: 'May 24, 2026',
    dateISO: '2026-05-24',
    description: 'How VoltOutreach streamlines hiring — job listings, candidate applications, an admin dashboard, and AI-assisted outreach with the Anthropic SDK, Cloudinary, and Calendly.',
    tags: ['Next.js', 'MongoDB', 'Anthropic AI', 'Recruitment', 'Cloudinary'],
    content: (
      <>
        <p>Recruitment is a pipeline problem: jobs go up, candidates apply, someone reviews them, interviews get scheduled, and outreach never stops. VoltOutreach, which I led at AIDEVGEN, is an end-to-end portal that runs that whole pipeline — with AI assistance where the manual effort hurts most. Here's the architecture.</p>

        <h3>Public Portal vs Admin, Cleanly Separated</h3>
        <p>The app is built on Next.js 16 with React 19 and TypeScript, and the first design decision was a hard separation between the candidate-facing portal and the admin area using route groups. Candidates browse jobs and apply; admins manage listings, review applications, and handle leads behind middleware-protected routes. Keeping these concerns apart keeps both the code and the security model clean.</p>

        <h3>The Data Model (MongoDB + Mongoose)</h3>
        <p>MongoDB with Mongoose backs the platform, with models for jobs, supplemental job data, applications, and leads. Recruitment data is naturally document-shaped — an application bundles a candidate, a role, answers, and attachments — so a document store fits well. The schema is built for flexibility because every client wants slightly different fields on a job posting.</p>

        <h3>AI-Assisted Outreach</h3>
        <p>The standout feature is AI-assisted outreach via the Anthropic SDK. Drafting personalized messages to candidates and clients is the most repetitive, time-consuming part of recruiting, so the platform drafts it for you. The key is keeping the AI controllable — it accelerates the human rather than replacing the judgment, and admins always review before anything goes out.</p>

        <h3>Scheduling and Media</h3>
        <p>Interview scheduling is handled with an embedded Calendly flow (<code>react-calendly</code>), so booking happens without leaving the app. CV and document uploads go to Cloudinary, which offloads file storage and delivery from the application server and keeps media fast and reliable.</p>

        <h3>Secure Sessions with jose</h3>
        <p>Authentication uses JWT sessions implemented with <code>jose</code>, paired with bcryptjs for password hashing. Sessions are validated in middleware, which is exactly where the public/admin route split is enforced — a request for an admin route without a valid session never reaches the page.</p>

        <h3>Lessons</h3>
        <p>VoltOutreach reinforced two things. First, separating portal and admin behind route groups from day one avoids a tangle later. Second, AI is most valuable when aimed at a specific, painful, repeatable task — here, outreach drafting — rather than sprinkled everywhere. Consolidating jobs, applications, scheduling, and media into one dashboard is what turns a pile of tools into a platform.</p>
      </>
    ),
  },
  'barcode-scanning-water-quality-mobile-gemini': {
    title: 'Barcode Scanning Meets Water Quality: PureX on Expo + Gemini',
    date: 'May 12, 2026',
    dateISO: '2026-05-12',
    description: 'Building PureX — a React Native app that scans product barcodes for nutrition and safety insights and surfaces location-based water-quality reports, powered by Google Gemini and Supabase.',
    tags: ['React Native', 'Expo', 'Google Gemini', 'Supabase', 'Mobile Dev'],
    content: (
      <>
        <p>PureX turns a phone into a personal health-and-safety scanner. Point the camera at a product barcode to get AI-analyzed nutrition and safety insights, or use your location to pull water-quality reports for your area. I built it at AIDEVGEN with React Native and Expo, Google Gemini for analysis, and Supabase on the back end. Here's how the pieces fit.</p>

        <h3>Camera and Location, the Native Way</h3>
        <p>Barcode scanning runs on <code>expo-camera</code> and water-quality lookups on <code>expo-location</code>. Getting scanning to feel instant across a wide range of products and lighting conditions is the real work — the camera pipeline has to be responsive, give clear feedback, and degrade gracefully when a code is damaged or unusual. Expo's modules made this far less painful than wiring native code by hand.</p>

        <h3>Turning Raw Data into Trustworthy Insights</h3>
        <p>A barcode or a location reading is meaningless on its own. Google Gemini (<code>@google/genai</code>) interprets the scanned product or regional data into clear, actionable insights — what's in a product, what to watch for, what a water report actually means for you. The bar here is trust: the output has to be readable and reliable, because people are making health decisions on it.</p>

        <h3>Supabase Backend</h3>
        <p>Supabase handles data and authentication. Pairing it with Apple authentication (<code>expo-apple-authentication</code>) gives a fast, privacy-respecting sign-in that iOS users expect, while Supabase stores user data and history behind it.</p>

        <h3>Subscriptions with RevenueCat</h3>
        <p>The premium tier is powered by RevenueCat (<code>react-native-purchases</code>), which abstracts the cross-platform pain of in-app purchases. Integrating subscriptions and Apple auth cleanly inside an Expo dev-client build takes care — build properties and entitlements have to line up — but RevenueCat removes most of the receipt-validation drudgery.</p>

        <h3>Native Polish</h3>
        <p>The details are what make a utility app feel premium: haptics, blur, gradients, push notifications, and the ability to generate and share reports with <code>expo-print</code> and <code>expo-sharing</code>. Each is a small Expo module, but together they push the app from "functional" to "feels native."</p>

        <h3>Takeaways</h3>
        <p>PureX is a reminder that a focused mobile app can combine camera, location, and AI into something genuinely useful without becoming bloated. Expo carried the heavy native lifting; the product work was making the AI insights trustworthy and the scanning fast. Get those two right and the rest is polish.</p>
      </>
    ),
  },
  'production-ready-auth-nextauth-v5-mongodb': {
    title: 'Production-Ready Auth with NextAuth v5 and MongoDB',
    date: 'May 02, 2026',
    dateISO: '2026-05-02',
    description: 'A practical guide to the full account lifecycle — sign-up, login, protected routes, and email-based password reset — built with Next.js 16, NextAuth v5, MongoDB, and Nodemailer.',
    tags: ['Next.js', 'NextAuth', 'MongoDB', 'Authentication', 'Security'],
    content: (
      <>
        <p>Authentication is the feature everyone needs and nobody enjoys rebuilding. I built Auth System at AIDEVGEN as a production-ready foundation that handles the whole account lifecycle — registration, login, protected routes, and email-based password reset — on Next.js 16 and NextAuth v5. Here's what goes into doing it properly.</p>

        <h3>NextAuth v5 with a Credentials Provider</h3>
        <p>The app uses NextAuth v5 (beta) with a credentials provider, which gives you full control over the login flow while still leaning on a battle-tested session layer. Passwords are hashed with bcryptjs before they ever touch the database — storing anything reversible is a non-starter — and the provider verifies the hash on sign-in.</p>

        <h3>Middleware-Protected Routes</h3>
        <p>Protected pages are guarded in middleware: a request without a valid session is redirected before the page renders. Doing this at the middleware layer (rather than per-page checks) keeps protection consistent and centralizes the rule in one place, which is exactly where you want your security logic.</p>

        <h3>The Password-Reset Flow</h3>
        <p>The trickiest part of any auth system is password reset. Auth System implements it over email with Nodemailer and Gmail SMTP: the user requests a reset, receives a time-limited token by email, and sets a new password. The token has to be single-use and expiring, the email has to be reliable, and the whole flow has to fail safely — never revealing whether an address is registered.</p>

        <h3>Validation with Zod, End to End</h3>
        <p>Every form and API route is validated with Zod, and the same schemas run on both client and server. Sharing schemas means the rules can't drift between where the user is told something is invalid and where it's actually enforced — the server is the source of truth, and the client just mirrors it for a better UX.</p>

        <h3>MongoDB for Users and Tokens</h3>
        <p>MongoDB stores users and reset tokens. It's a simple data model, but the details matter: tokens carry an expiry, are removed once used, and are never logged. Keeping the token lifecycle tight is what keeps the reset flow from becoming an attack vector.</p>

        <h3>Why Build a Reusable Foundation</h3>
        <p>The point of Auth System is reuse. Auth is the same across most products — only the branding changes — so getting a secure, modern implementation right once and dropping it into the next project saves real time and avoids re-introducing the same subtle bugs. Registration, login, protected access, and recovery, done correctly, become a starting point rather than a recurring tax.</p>
      </>
    ),
  },
  'ai-lead-capture-trades-businesses': {
    title: 'Building an AI Lead-Capture Platform for Trades Businesses',
    date: 'April 18, 2026',
    dateISO: '2026-04-18',
    description: 'How I built Plumber\'s Mate AI — an automation platform that captures leads, books jobs, sends quotes, collects payments, and re-engages old customers with Next.js 16 and React 19.',
    tags: ['Next.js', 'AI Automation', 'SaaS', 'Lead Generation', 'Framer Motion'],
    content: (
      <>
        <p>Trades businesses — plumbers, electricians, HVAC techs — lose jobs every day because they can't answer the phone. They're under a sink, on a roof, or driving to the next call. Plumber's Mate AI is a platform I built with the AIDEVGEN team to close that gap: an AI that captures every lead, books the job, sends the quote, collects payment, and asks for the Google review — all without the owner touching a keyboard.</p>

        <h3>The Problem: Missed Calls = Missed Revenue</h3>
        <p>For a one-van plumbing business, a missed call is often a lost customer. The average plumber misses 30–40% of inbound calls, and most callers don't leave a voicemail — they just dial the next result on Google. That's not a lead management problem; it's a survival problem. The goal of Plumber's Mate AI is to make sure every inbound signal — call, form, text — becomes a booked job.</p>

        <h3>Stack: Next.js 16, React 19, and Framer Motion</h3>
        <p>The dashboard is built on Next.js 16 with React 19 and TypeScript. The Webpack build mode (<code>next build --webpack</code>) keeps CI stable while we evaluate Turbopack for production. Tailwind CSS 4 handles styling, and Framer Motion powers the onboarding flow, quote animations, and the marketing landing page. The minimalist dependency list is intentional — every runtime dep adds surface area for security and bundle bloat, and trades-SaaS users don't care about 50 UI libraries.</p>

        <h3>The Lead Capture Pipeline</h3>
        <p>When a lead comes in — via the website form, a missed-call webhook, or a text — it lands in a unified lead queue. The AI qualifies the lead by asking for job type, postcode, urgency, and preferred time window. Valid leads are auto-scheduled into the owner's calendar using availability rules, and the customer gets an instant booking confirmation with a quote link. No human touches it unless the AI flags ambiguity (emergency keywords, unusual job types, out-of-area postcodes).</p>

        <h3>Quotes, Payments, and the Review Loop</h3>
        <p>Once a job is marked complete, the platform auto-generates a line-item invoice from the quote, sends it via email and SMS, and opens a Stripe-backed payment link. 24 hours after payment clears, it fires a Google review request with a one-tap link. This "complete → invoice → paid → review" loop is what moves a plumber from "I do jobs" to "I have a business" — Google reviews compound into more leads, and the cycle self-reinforces.</p>

        <h3>Re-Engaging Old Leads</h3>
        <p>The most underrated feature is re-engagement. Every plumber has a CRM graveyard — old quotes never accepted, customers who ghosted. Plumber's Mate AI runs a weekly re-engagement job: it scores cold leads based on job type, time since last contact, and seasonality (boiler services before winter, drainage after storms), then sends a personalised nudge. We've seen 8–12% of dead leads reactivate this way.</p>

        <h3>Dashboard Architecture</h3>
        <p>The owner dashboard is route-grouped into <code>(dashboard)</code>, <code>(admin)</code>, and <code>(auth)</code> segments. Leads, quotes, payments, and reviews each get a dedicated view, but the home screen is a single feed: "what needs your attention today." We deliberately resisted building a kitchen-sink CRM — trades owners don't have time to learn software. If a feature needs a tutorial, it doesn't ship.</p>

        <h3>Lessons Learned</h3>
        <p>Three things surprised me. First, SMS matters more than email — plumbers live in their messages app. Second, the onboarding offer page (/offer) converts 3x better than a generic pricing page because it frames the product around a specific pain. Third, Framer Motion on the landing page measurably increased trial signups — polish signals trust, and trades owners are understandably skeptical of software salespeople.</p>

        <p>Plumber's Mate AI is proof that vertical AI SaaS doesn't need to be flashy — it just needs to eliminate one painful, repetitive task and do it reliably. For plumbers, that task is never missing a job again.</p>
      </>
    ),
  },
  'canvas-ai-image-studio-fabricjs': {
    title: 'Canvas-Based AI Image Studios with Fabric.js and Next.js',
    date: 'April 10, 2026',
    dateISO: '2026-04-10',
    description: 'A technical walkthrough of building Clay Imaginary — a drag-and-drop AI image studio with Fabric.js compositing, html2canvas export, and AI-powered generation for creators.',
    tags: ['Fabric.js', 'Next.js', 'AI Image Gen', 'Canvas API', 'html2canvas'],
    content: (
      <>
        <p>Creators today don't want another text-to-image tool. They want a studio — a workspace where they can generate, composite, edit, and export polished visuals without bouncing between Photoshop, Figma, and five AI tabs. Clay Imaginary is that studio, built with AIDEVGEN using Next.js 15, React 19, and Fabric.js. Here's how the canvas engine, drag-and-drop layers, and AI generation pipeline come together.</p>

        <h3>Why Fabric.js Over Raw Canvas</h3>
        <p>Raw <code>&lt;canvas&gt;</code> is great for drawing, terrible for editing. You'd have to rebuild selection, transformation, grouping, serialization, and undo from scratch. Fabric.js gives you all of that out of the box — objects are first-class, each with position, rotation, scale, and event handlers. For Clay Imaginary, that meant we could focus on the creative features (AI generation, templates, exports) instead of reinventing a scene graph.</p>

        <h3>The Layer System</h3>
        <p>Every element on the canvas — an AI-generated image, a text headline, a shape, an uploaded asset — is a Fabric object with a <code>layerId</code>. A side panel renders the layer stack, and react-draggable lets users reorder layers with a drag. Reordering updates Fabric's internal z-index, the canvas re-renders, and the layer panel stays in sync via a shared state store. It feels like Figma; it's a few hundred lines of code.</p>

        <h3>Wiring Up AI Image Generation</h3>
        <p>Generation is a server-side API route that proxies to the image model — keeping API keys off the client and letting us rate-limit, log, and swap providers without a client update. The user types a prompt, picks a style preset, and hits generate. The returned image URL is loaded into a Fabric image object and dropped onto the canvas at the last click position, ready to be moved, scaled, or composited with other layers.</p>

        <h3>Showcase Templates</h3>
        <p>Cold-start is the enemy of creative tools — a blank canvas intimidates users. Clay Imaginary ships with a showcase gallery of templates: product mockups, recipe cards, finance infographics, meme formats, quote cards, AI tech news layouts, gym posts. Each template is a pre-populated Fabric scene the user can remix. This is also how the product sells itself — the showcase page doubles as a landing page and a starting point.</p>

        <h3>Export with html2canvas</h3>
        <p>Fabric has its own <code>toDataURL</code> method, but we use html2canvas for the final export because the studio overlays HTML UI (annotations, watermarks for free users, branding frames) on top of the canvas. html2canvas captures the composed DOM + canvas region as a single PNG, which is what users actually want to post to Instagram or LinkedIn. Fabric handles editing; html2canvas handles shipping.</p>

        <h3>Performance: Keep the Canvas Small</h3>
        <p>The naive approach is to render at full 4K resolution while editing. Don't. We render at a lower working resolution (usually 1024×1024 or 1080×1350 for social ratios) and upscale on export. This keeps drag, rotate, and scale interactions at 60fps even on mid-range laptops. For really large compositions, we use Fabric's <code>renderOnAddRemove: false</code> and batch updates manually.</p>

        <h3>Auth and Persistence</h3>
        <p>Google OAuth via <code>@react-oauth/google</code> handles sign-in. Projects serialize as Fabric JSON (via <code>canvas.toJSON()</code>) and live in a backend store keyed by user ID. Deserializing a project restores every layer with its exact state — positions, rotations, opacities, filters. This makes project sharing trivial: a URL + a JSON blob = a fully editable remix.</p>

        <h3>What I'd Do Differently</h3>
        <p>If I were starting Clay Imaginary over, I'd invest earlier in a proper undo/redo history stack. Fabric's event model makes it possible but not free — you need to snapshot state on every mutation. Bolting it on later is painful. I'd also build the template system as a first-class primitive from day one rather than as a gallery layered on top.</p>

        <p>Canvas-based AI tools are a growing category, and Fabric.js + Next.js is a surprisingly capable stack. If you're building something like Clay Imaginary, skip the pure-canvas detour and stand on the shoulders of a mature scene graph — your users want features, not reinvented wheels.</p>
      </>
    ),
  },
  'nextjs-20-whats-new': {
    title: 'Next.js 20: Everything New You Need to Know',
    date: 'March 28, 2026',
    dateISO: '2026-03-28',
    description: 'From React Server Functions to the revamped Turbopack pipeline and native Edge-first routing—here\'s what makes Next.js 20 the biggest release yet.',
    tags: ['Next.js', 'React', 'Turbopack', 'Edge Computing', 'Full-Stack'],
    content: (
      <>
        <p>Next.js 20 just dropped, and it's not an incremental update—it's a rethinking of how modern full-stack React applications should be built. From a completely rewritten build pipeline to first-class edge primitives, here's everything that matters in this release.</p>

        <h3>Turbopack: Now the Default</h3>
        <p>Turbopack is no longer opt-in. Next.js 20 ships with Turbopack as the default bundler for both development and production builds. Cold starts are up to 10x faster than webpack, and incremental builds in large monorepos now complete in under 200ms. The migration is seamless—existing next.config.js options are fully compatible, and the webpack escape hatch is still available for edge cases.</p>

        <h3>React Server Functions</h3>
        <p>Server Actions have been replaced by React Server Functions—a more flexible primitive that works beyond form submissions. You can now call server-side logic from any client event handler, useEffect, or even other server components. Type safety is baked in with automatic TypeScript inference between client and server boundaries, eliminating the boilerplate of manual API routes for most use cases.</p>

        <h3>Edge-First Routing</h3>
        <p>Next.js 20 introduces a new routing layer designed for edge deployment. Routes can declare their runtime preference—Node.js, Edge, or Static—at the file level with a single export. The framework automatically optimizes data fetching and rendering strategy based on the declared runtime, giving you Cloudflare Workers-level latency with zero configuration.</p>

        <h3>Partial Prerendering (Stable)</h3>
        <p>PPR is now stable and enabled by default. It combines static shell rendering with streaming dynamic content, delivering instant page loads while still serving personalized data. The HTML shell is served from the CDN edge in under 50ms, and dynamic holes are filled via streaming as the server resolves them—no client-side loading spinners required.</p>

        <h3>Built-in Database Layer</h3>
        <p>The most surprising addition is next/db—a built-in database abstraction layer. It provides a lightweight ORM-like API that works with Postgres, SQLite, and Turso out of the box. Migrations are file-based and run automatically in development. For prototyping and small-to-medium apps, you no longer need Prisma or Drizzle as a dependency.</p>

        <h3>Dev Overlay 2.0</h3>
        <p>The development experience gets a major upgrade with the new Dev Overlay. It shows real-time rendering waterfall diagrams, component-level performance metrics, and a visual route inspector. You can see exactly which components are server-rendered vs. client-rendered, track hydration mismatches, and profile slow data fetches—all without leaving the browser.</p>

        <h3>Image and Font Optimization</h3>
        <p>next/image now supports automatic AVIF generation with smart format negotiation. The new next/font engine pre-computes font subsets at build time based on actual character usage in your app, reducing font payloads by up to 60%. Both features work seamlessly at the edge with no additional configuration.</p>

        <h3>Breaking Changes to Watch</h3>
        <p>The pages/ directory is officially deprecated—existing projects will still work, but new features target app/ exclusively. The minimum Node.js version is now 20 LTS. getServerSideProps and getStaticProps are removed in favor of Server Functions and the fetch cache API. If you're migrating from Next.js 19, the codemods handle most of the transition automatically.</p>

        <p>Next.js 20 is the most ambitious release since the App Router was introduced. Whether you're building a SaaS dashboard, an e-commerce platform, or a content-heavy site, this version gives you the tools to ship faster with less code. The future of full-stack React is here.</p>
      </>
    ),
  },
  'openclaw-deep-dive-setup': {
    title: 'OpenClaw Deep Dive: Building Your Own AI Agent Pipeline',
    date: 'March 22, 2026',
    dateISO: '2026-03-22',
    description: 'A hands-on technical walkthrough of setting up OpenClaw from scratch—configuring channels, creating custom skills, wiring up tool chains, and deploying your personal AI agent stack.',
    tags: ['OpenClaw', 'AI Agents', 'Tutorial', 'Self-Hosted', 'DevOps'],
    content: (
      <>
        <p>In a previous post, I covered what OpenClaw is and why it matters. This time, we're going hands-on. I'll walk you through setting up OpenClaw from zero, connecting it to your messaging apps, building custom skills, and deploying a production-grade AI agent pipeline on your own hardware.</p>

        <h3>Prerequisites and Installation</h3>
        <p>You'll need Docker, Node.js 20+, and API keys for your preferred LLM provider (Claude, GPT, or a local model via Ollama). Start by cloning the OpenClaw repo and running the bootstrap script. The CLI wizard walks you through setting your gateway port, encryption passphrase, and default model. Within 3 minutes, you'll have a running Gateway process accessible at localhost.</p>

        <h3>Connecting Your First Channel: WhatsApp</h3>
        <p>OpenClaw uses the WhatsApp Business API through a lightweight bridge container. Run the channel setup command, scan the QR code with your phone, and the bridge establishes a persistent WebSocket connection. From this point, every message you send to your WhatsApp number is intercepted by the Gateway, processed through your configured AI model, and the response is delivered back—all in under 2 seconds.</p>

        <h3>Adding Telegram and Discord</h3>
        <p>Telegram integration requires a Bot Token from BotFather. Discord uses a bot application with message content intent enabled. Both channels are configured via a single YAML file—specify the token, target channels or groups, and permission rules. The Gateway multiplexes all channels through a unified message bus, so your AI maintains context whether you message from WhatsApp, Telegram, or Discord.</p>

        <h3>Building a Custom Skill: GitHub PR Reviewer</h3>
        <p>Skills are the heart of OpenClaw's extensibility. Let's build one that reviews GitHub pull requests on command. Create a new skill directory, define the skill manifest with trigger phrases and required parameters, then write the handler function. The handler receives the parsed user message, calls the GitHub API to fetch the PR diff, sends it to your LLM with a review prompt, and returns the formatted review. Register the skill, restart the Gateway, and now you can message "review PR #42 on my-repo" from any channel.</p>

        <h3>Tool Chains and Multi-Step Workflows</h3>
        <p>Single skills are powerful, but tool chains unlock real automation. OpenClaw's pipeline system lets you compose skills sequentially—for example, a "deploy" command that first runs tests via your CI API, waits for results, creates a release tag, triggers a deployment webhook, and reports status back to your chat. Each step has access to the previous step's output, and the pipeline supports conditional branching and error handling.</p>

        <h3>Memory and Context Management</h3>
        <p>OpenClaw stores conversation history in a local SQLite database with vector embeddings for semantic search. This means your AI remembers past conversations and can reference them naturally. You can configure memory retention periods, per-channel isolation (so work and personal contexts don't bleed), and manual memory injection for bootstrapping the AI with project-specific knowledge.</p>

        <h3>Running Multiple Agents</h3>
        <p>For complex setups, OpenClaw supports multi-agent routing. Define specialized agents—one for code tasks using Claude, another for creative writing using GPT, a third for local-only queries using Ollama. The router agent analyzes incoming messages and delegates to the appropriate specialist. Each agent maintains its own system prompt, tool access, and memory namespace while sharing the unified channel layer.</p>

        <h3>Production Deployment</h3>
        <p>For always-on operation, deploy OpenClaw with Docker Compose. The stack includes the Gateway, channel bridges, a Redis instance for rate limiting and queuing, and an optional Grafana dashboard for monitoring message throughput and latency. Use a reverse proxy like Caddy for TLS termination if you want to expose the Web Control UI externally. Set up systemd or Docker restart policies so the Gateway survives reboots.</p>

        <h3>Security Hardening</h3>
        <p>Before going live, lock down your deployment. Enable allowlist-only messaging so only approved contacts can interact with your AI. Set rate limits per channel to prevent abuse. Encrypt the SQLite database at rest. Store API keys in a secrets manager or encrypted .env file rather than plain text config. Audit the skill permissions—limit file system and network access to only what each skill needs.</p>

        <p>OpenClaw gives you the building blocks to create an AI assistant that's truly yours—tailored to your workflows, running on your terms, and extensible enough to grow with your needs. The 5-minute setup gets you started, but this deep dive shows that the ceiling is as high as your imagination.</p>
      </>
    ),
  },
  'react-native-expo-2026': {
    title: 'React Native with Expo in 2026: The Ultimate Mobile Stack',
    date: 'March 15, 2026',
    dateISO: '2026-03-15',
    description: 'How Expo 54 and React Native 0.81 are making cross-platform mobile development faster than ever—from EAS builds to native modules.',
    tags: ['React Native', 'Expo', 'Mobile Dev', 'TypeScript', 'Cross-Platform'],
    content: (
      <>
        <p>React Native has come a long way, and with Expo 54 paired with React Native 0.81, 2026 is shaping up to be the best time ever to build cross-platform mobile apps. The developer experience is smoother, the ecosystem is mature, and the gap between native and cross-platform performance has virtually disappeared.</p>

        <h3>Why Expo in 2026?</h3>
        <p>Expo has evolved from a "quick prototyping tool" to a full production-grade platform. With EAS (Expo Application Services), you get cloud builds, OTA updates, and submission to app stores—all without touching Xcode or Android Studio. The new Expo Router brings file-based routing to mobile, mirroring the Next.js experience developers already love.</p>

        <h3>React Native 0.81: What's New</h3>
        <p>The latest React Native release brings significant improvements to the New Architecture with Fabric renderer and TurboModules now stable by default. JSI (JavaScript Interface) enables direct communication between JavaScript and native code without the bridge, resulting in dramatically faster performance for heavy operations.</p>

        <h3>TypeScript-First Development</h3>
        <p>TypeScript is no longer optional in the React Native ecosystem—it's the standard. Expo 54 ships with full TypeScript support out of the box, and the type definitions for React Native APIs are comprehensive. Combined with Zustand for state management and typed navigation, you get end-to-end type safety across your entire mobile app.</p>

        <h3>Native Modules Made Easy</h3>
        <p>The days of ejecting from Expo to use native modules are over. Expo Modules API lets you write native Swift/Kotlin code that integrates seamlessly with your JavaScript layer. Config plugins handle native configuration automatically, so you can use libraries like react-native-google-signin, expo-camera, and expo-av without manual linking.</p>

        <h3>Real-World Performance</h3>
        <p>In our FreeNote app built with this stack, we achieved sub-100ms screen transitions, smooth 60fps animations with Reanimated, and audio recording with real-time duration tracking—all sharing 95% of code between iOS and Android. The performance is indistinguishable from fully native apps.</p>

        <h3>The Startup Stack</h3>
        <p>For startups, the React Native + Expo combination is unbeatable. One team, one codebase, two platforms, plus web support via Expo Web. Pair it with Firebase or Supabase for backend, RevenueCat for subscriptions, and you have a complete production stack that can go from idea to App Store in weeks, not months.</p>

        <p>If you're starting a mobile project in 2026, React Native with Expo isn't just a good choice—it's the obvious one.</p>
      </>
    ),
  },
  'openclaw-personal-ai-gateway': {
    title: 'OpenClaw: Your Personal AI Gateway to Messaging Apps',
    date: 'March 10, 2026',
    dateISO: '2026-03-10',
    description: 'How OpenClaw bridges WhatsApp, Telegram, Discord, and iMessage with AI agents—giving you a self-hosted, privacy-first AI assistant.',
    tags: ['OpenClaw', 'AI Agents', 'Self-Hosted', 'WhatsApp', 'Automation'],
    content: (
      <>
        <p>Imagine having a personal AI assistant that lives inside your WhatsApp, Telegram, Discord, and iMessage—one that runs on your own hardware, keeps your data private, and can actually do things like clear your inbox, manage your calendar, and browse the web. That's OpenClaw, and it's changing how developers interact with AI.</p>

        <h3>What Is OpenClaw?</h3>
        <p>OpenClaw is an open-source, self-hosted AI gateway that bridges your messaging apps with powerful AI agents. Unlike cloud-hosted AI assistants, OpenClaw runs entirely on your machine as a single Gateway process. Your conversations, data, and API keys never leave your hardware. It's MIT licensed and takes about 5 minutes to set up.</p>

        <h3>Multi-Channel Architecture</h3>
        <p>The killer feature is multi-channel connectivity. One Gateway process simultaneously manages WhatsApp, Telegram, Discord, Slack, Signal, and iMessage. You configure each channel once, and your AI assistant becomes available across all your messaging platforms with persistent memory and context across conversations.</p>

        <h3>Agent-Native Design</h3>
        <p>OpenClaw isn't just a chatbot wrapper—it's built for agentic AI. It supports tool use, sessions, memory, and multi-agent routing with isolated workspaces. Your AI can browse the web, write and execute code, interact with APIs, manage files, and control your system. It works with Claude, GPT, and local models, giving you flexibility in choosing your AI backbone.</p>

        <h3>Real-World Use Cases</h3>
        <p>The possibilities are practical and powerful. Send a WhatsApp message like "check me in for my flight tomorrow" and OpenClaw handles it. Ask it to "summarize my unread emails" via Telegram and get a concise digest. Tell it to "create a PR for the bug fix on branch hotfix-auth" through Discord and it executes the git commands. With 50+ integrations including Spotify, Gmail, GitHub, and Obsidian, it's a true digital assistant.</p>

        <h3>Setting It Up</h3>
        <p>Installation is a one-liner: run the install script, then use the onboard wizard to configure authentication, gateway settings, and channels. The Web Control UI at localhost gives you a browser dashboard for chat management and session monitoring. For mobile access, iOS and Android companion apps are available with voice capabilities.</p>

        <h3>Privacy-First Philosophy</h3>
        <p>In an era where every AI service wants your data, OpenClaw takes the opposite approach. Everything runs locally—your conversations aren't training someone else's model. You bring your own API keys, choose your own models, and maintain full control. For developers handling sensitive code or business data, this is a game-changer.</p>

        <h3>The Extensibility Factor</h3>
        <p>OpenClaw's plugin system means the community can add new channels, tools, and capabilities. It can self-generate new skills based on your requests, and the growing ecosystem of community skills means functionality keeps expanding without core updates.</p>

        <p>OpenClaw represents the future of personal AI—not a cloud service you subscribe to, but an open-source tool you own and control. For developers who want AI that actually does things while respecting privacy, it's worth the 5-minute setup.</p>
      </>
    ),
  },
  'ai-automation-future': {
    title: 'AI Automation: Transforming the Future of Work',
    date: 'February 27, 2026',
    dateISO: '2026-02-27',
    description: 'Explore how AI-driven automation is reshaping industries—from intelligent workflows and autonomous coding agents to no-code platforms.',
    tags: ['AI', 'Automation', 'LLMs', 'Workflows', 'Future Tech'],
    content: (
      <>
        <p>Artificial intelligence is no longer just a buzzword—it's actively reshaping how we build software, run businesses, and think about productivity. From automated code reviews to entire workflows orchestrated by AI agents, automation powered by large language models is accelerating at an unprecedented pace.</p>

        <h3>1. What Is AI Automation?</h3>
        <p>AI automation refers to using intelligent systems to perform tasks that traditionally required human intervention. Unlike rule-based automation (if-this-then-that), AI automation can understand context, adapt to new inputs, and make decisions in ambiguous situations. This includes everything from auto-generating code and summarizing documents to managing CI/CD pipelines and triaging customer support tickets.</p>

        <h3>2. Intelligent Workflows with LLMs</h3>
        <p>Large language models like GPT-4 and Claude have unlocked a new class of automation. Developers are now building agentic workflows where an AI reads a task description, breaks it into subtasks, executes each one using tools (APIs, databases, file systems), and delivers a finished result. Frameworks like LangChain, CrewAI, and the Claude Agent SDK make it possible to chain LLM calls with real-world actions.</p>

        <h3>3. AI in Software Development</h3>
        <p>In the dev world, AI automation is already mainstream. Tools like GitHub Copilot, Cursor, and Claude Code assist with code generation, debugging, and refactoring. But the frontier is moving toward fully autonomous coding agents that can take a feature request, write the implementation, add tests, and open a pull request—all without human intervention.</p>

        <h3>4. No-Code and Low-Code AI Platforms</h3>
        <p>AI is also democratizing automation for non-developers. Platforms like Zapier AI, Make, and n8n now integrate LLM-powered steps into visual workflow builders. Business teams can automate report generation, data extraction, email drafting, and content scheduling without writing a single line of code.</p>

        <h3>5. Real-World Use Cases</h3>
        <p>Companies are deploying AI automation across every department. Marketing teams use AI to generate and A/B test ad copy at scale. Finance teams automate invoice processing and anomaly detection. DevOps teams leverage AI to predict infrastructure failures and auto-scale resources. Customer support teams deploy AI agents that resolve 60-70% of tickets without human escalation.</p>

        <h3>6. Challenges and Risks</h3>
        <p>AI automation is powerful but not without risks. Hallucinations can lead to incorrect outputs if not properly validated. Over-reliance on automation without human oversight can introduce subtle bugs or security vulnerabilities. There are also ethical concerns around job displacement and the need for responsible deployment. The key is treating AI as an augmentation tool—keeping humans in the loop for critical decisions.</p>

        <h3>7. The Developer's Evolving Role</h3>
        <p>As AI handles more routine tasks, developers are shifting from writing every line of code to becoming orchestrators—designing systems, reviewing AI-generated output, and focusing on architecture and user experience. The developers who thrive will be those who learn to leverage AI effectively, not compete against it.</p>

        <p>AI automation is not a distant future—it's happening now. Whether you're building AI-powered products or using AI tools to boost your own productivity, understanding and embracing this shift is essential for staying ahead in the rapidly evolving tech landscape.</p>
      </>
    ),
  },
  'web-performance-optimization': {
    title: 'Web Performance Optimization: A Complete Guide',
    date: 'January 20, 2026',
    dateISO: '2026-01-20',
    description: 'Master code splitting, lazy loading, image optimization, caching strategies, and Core Web Vitals to build blazing-fast web applications.',
    tags: ['Performance', 'Core Web Vitals', 'Caching', 'Lazy Loading', 'SEO'],
    content: (
      <>
        <p>Website speed directly impacts user experience, SEO rankings, and conversion rates. Studies show that a 1-second delay in page load time can result in a 7% reduction in conversions. Here's a comprehensive guide to making your web applications lightning-fast.</p>

        <h3>1. Code Splitting & Lazy Loading</h3>
        <p>Instead of loading your entire application upfront, split your code into smaller chunks that load on demand. In React, use dynamic imports with React.lazy() and Suspense to defer loading of components until they're needed. This dramatically reduces initial bundle size and Time to Interactive (TTI).</p>

        <h3>2. Image Optimization</h3>
        <p>Images often account for 50%+ of page weight. Use modern formats like WebP or AVIF for 30-50% smaller file sizes. Implement responsive images with srcset to serve appropriately sized images based on device. Always specify width and height attributes to prevent layout shifts, and use lazy loading for below-the-fold images.</p>

        <h3>3. Caching Strategies</h3>
        <p>Implement a multi-layer caching approach: browser caching with proper Cache-Control headers, CDN caching for static assets, and service workers for offline-first experiences. Use cache busting with content hashes in filenames to ensure users get updated content while maximizing cache hits.</p>

        <h3>4. Critical Rendering Path Optimization</h3>
        <p>Inline critical CSS to eliminate render-blocking requests. Defer non-critical JavaScript with async or defer attributes. Preload essential resources like fonts and hero images using link rel="preload". Consider server-side rendering (SSR) or static site generation (SSG) for faster First Contentful Paint.</p>

        <h3>5. Database & API Optimization</h3>
        <p>On the backend, optimize database queries with proper indexing and avoid N+1 query problems. Implement pagination for large datasets. Use GraphQL or sparse fieldsets to fetch only required data. Add Redis or Memcached for frequently accessed data to reduce database load.</p>

        <h3>6. Core Web Vitals</h3>
        <p>Focus on Google's Core Web Vitals: Largest Contentful Paint (LCP) should be under 2.5s, First Input Delay (FID) under 100ms, and Cumulative Layout Shift (CLS) under 0.1. Use tools like Lighthouse, WebPageTest, and Chrome DevTools to measure and monitor these metrics continuously.</p>

        <h3>7. Bundle Analysis & Tree Shaking</h3>
        <p>Regularly analyze your bundle with tools like webpack-bundle-analyzer. Remove unused dependencies and leverage tree shaking to eliminate dead code. Consider lighter alternatives for heavy libraries—for example, date-fns instead of moment.js can save 90% bundle size.</p>

        <h3>8. Network Optimization</h3>
        <p>Enable HTTP/2 or HTTP/3 for multiplexed connections. Use Brotli compression for 15-20% better compression than gzip. Minimize DNS lookups by reducing third-party scripts. Implement resource hints like dns-prefetch and preconnect for external domains.</p>

        <p>Performance optimization is an ongoing process, not a one-time task. Establish performance budgets, set up monitoring with tools like SpeedCurve or Calibre, and make performance a core part of your development workflow. Your users—and your business metrics—will thank you.</p>
      </>
    ),
  },
  'ai-powered-car-maintenance': {
    title: 'Building an AI-Powered Car Maintenance App',
    date: 'January 05, 2026',
    dateISO: '2026-01-05',
    description: 'How I integrated Google Gemini AI with React Native to create intelligent dashboard light scanning, tire inspection, and maintenance quote analysis.',
    tags: ['React Native', 'Google Gemini', 'AI/ML', 'Mobile Dev', 'Node.js'],
    content: (
      <>
        <p>Car maintenance can be confusing, especially when mysterious dashboard lights appear. I built an AI-powered mobile app using React Native and Google Gemini AI to help users understand and address their vehicle maintenance needs.</p>
        <h3>The Problem</h3>
        <p>Most car owners don't know what their dashboard warning lights mean, often ignoring critical issues or overpaying for simple fixes. Traditional solutions require manual lookups or expensive diagnostic tools.</p>
        <h3>Integrating Google Gemini AI</h3>
        <p>I chose Google Gemini for its powerful multimodal capabilities. The app uses the Gemini Vision API to analyze photos of dashboard lights and provide instant, accurate explanations of what each light means and recommended actions.</p>
        <h3>Dashboard Light Scanner</h3>
        <p>Users simply snap a photo of their dashboard. The AI identifies all visible warning lights, explains their meaning, urgency level, and provides step-by-step guidance on what to do next—whether it's a simple fix or requires professional attention.</p>
        <h3>Tire Inspection Feature</h3>
        <p>Beyond dashboard lights, the app can analyze tire conditions from photos. It detects wear patterns, tread depth issues, and potential alignment problems, helping users know when it's time for rotation or replacement.</p>
        <h3>Maintenance Quote Analysis</h3>
        <p>One of the most valuable features is the quote analyzer. Users can upload repair quotes from mechanics, and the AI evaluates whether the pricing is fair, identifies unnecessary services, and suggests questions to ask the mechanic.</p>
        <h3>Technical Implementation</h3>
        <p>The React Native app uses Expo for cross-platform deployment, with a Node.js backend handling Gemini API calls. I implemented image compression to optimize API costs and response times while maintaining accuracy.</p>
        <p>This project demonstrates how AI can democratize expertise, giving everyday car owners the knowledge they need to make informed maintenance decisions.</p>
      </>
    ),
  },
  'building-marketplace-with-escrow': {
    title: 'Building a Secure Marketplace with Escrow Payments',
    dateISO: '2026-01-03',
    description: 'A deep dive into implementing Stripe escrow payments, trade systems, and secure transactions for the Bible Trader marketplace.',
    tags: ['Stripe', 'Payments', 'Security', 'E-commerce', 'React'],
    date: 'January 03, 2026',
    content: (
      <>
        <p>Building a peer-to-peer marketplace requires solving one fundamental problem: trust. For Bible Trader, a platform where users buy, sell, and trade religious books and collectibles, I implemented a robust escrow payment system using Stripe.</p>
        <h3>Why Escrow Matters</h3>
        <p>In traditional marketplace transactions, either the buyer or seller takes on risk. Escrow eliminates this by holding funds until both parties confirm the transaction is complete, protecting everyone involved.</p>
        <h3>Stripe Connect Implementation</h3>
        <p>I used Stripe Connect with the "destination charges" model. When a buyer purchases an item, funds are captured but held in a pending state. The seller only receives payment once the buyer confirms delivery and satisfaction.</p>
        <h3>The Trade System</h3>
        <p>Bible Trader allows direct trades between users—swapping items without money changing hands. I built a matching system where users can propose trades, and both parties must accept before items are marked for exchange.</p>
        <h3>Dispute Resolution Flow</h3>
        <p>Despite best efforts, disputes happen. I implemented a structured dispute process: either party can open a dispute within 48 hours of delivery, providing evidence through the app. Admins review cases and can release funds, issue refunds, or split the difference.</p>
        <h3>Security Considerations</h3>
        <p>Security was paramount. All sensitive operations use webhook verification to prevent spoofing. Payment intents are idempotent to prevent double-charges. User verification requires email confirmation and optional phone verification for high-value transactions.</p>
        <h3>Handling Edge Cases</h3>
        <p>Real-world scenarios required careful handling: what if a seller never ships? What if a buyer claims non-delivery falsely? I implemented automatic release timers, shipping integration for tracking verification, and a reputation system that influences dispute outcomes.</p>
        <p>Building this marketplace taught me that the technical payment integration is just the beginning—the real challenge is designing systems that handle human behavior at scale.</p>
      </>
    ),
  },
  'next-19-new-features': {
    dateISO: '2025-12-12',
    description: 'Explore the groundbreaking features introduced in Next.js 19, from enhanced performance to new routing capabilities.',
    tags: ['Next.js', 'React', 'TurboPack', 'Server Actions', 'Full-Stack'],
    title: 'Next 19 New Features',
    date: 'December 12, 2025',
    content: (
      <>
        <p>Next.js 19 has arrived, bringing a suite of powerful new features designed to streamline development and boost application performance.</p>
        <h3>1. Enhanced TurboPack</h3>
        <p>The build system has been completely overhauled with the latest version of TurboPack, offering up to 50% faster build times.</p>
        <h3>2. Server Actions 2.0</h3>
        <p>Server Actions have been refined for better type safety and easier error handling, making full-stack React even more seamless.</p>
        <h3>3. Built-in AI SDK Integration</h3>
        <p>Next.js 19 introduces native support for AI SDKs, simplifying the integration of LLMs into your applications.</p>
        <p>These features mark a significant step forward for the React framework, solidifying its position as a top choice for modern web development.</p>
      </>
    ),
  },
  'security-flaw-react2shell': {
    dateISO: '2025-12-10',
    description: 'A critical look at the recently discovered security vulnerability in the react2shell library and how to mitigate it.',
    tags: ['Security', 'Vulnerability', 'React', 'Code Audit', 'Best Practices'],
    title: 'Security Flaw: react2shell',
    date: 'December 10, 2025',
    content: (
      <>
        <p>A critical security vulnerability has been identified in the popular `react2shell` library.</p>
        <h3>The Vulnerability</h3>
        <p>The flaw allows for potential arbitrary code execution if user input is not properly sanitized before being passed to the shell execution context.</p>
        <h3>Impact</h3>
        <p>Applications using `react2shell` versions prior to 1.4.5 are at risk. Attackers could exploit this to gain unauthorized access to the server environment.</p>
        <h3>Mitigation</h3>
        <p>Developers are urged to upgrade to version 1.4.5 or later immediately. If an upgrade is not possible, ensure strict input validation is in place for any data passed to the library.</p>
      </>
    ),
  },
  'ai-agents-revolution': {
    title: 'The Rise of AI Agents',
    date: 'December 08, 2025',
    dateISO: '2025-12-08',
    description: 'How autonomous AI agents are transforming software development, automation, and the future of work.',
    tags: ['AI Agents', 'Automation', 'LLMs', 'Future Tech', 'DevTools'],
    content: (
      <>
        <p>We are witnessing a paradigm shift from passive AI tools to active AI agents capable of autonomous decision-making and task execution.</p>
        <h3>What are AI Agents?</h3>
        <p>Unlike traditional chatbots that wait for prompts, AI agents can perceive their environment, reason about goals, and take actions to achieve them. They can browse the web, write code, and interact with APIs independently.</p>
        <h3>Impact on Development</h3>
        <p>In software engineering, agents are evolving from simple code completion tools to "pair programmers" that can refactor entire codebases, write tests, and even deploy applications.</p>
        <h3>The Future</h3>
        <p>As these agents become more reliable, we will see a shift towards "agentic workflows" where humans orchestrate teams of specialized AI agents to solve complex problems faster than ever before.</p>
      </>
    ),
  },
  'code-speed-optimization': {
    dateISO: '2025-12-05',
    description: 'Essential techniques to slash latency, optimize algorithms, and boost your application\'s response speed.',
    tags: ['Algorithms', 'React', 'Performance', 'Optimization', 'Best Practices'],
    title: 'Mastering Code & Speed Optimization',
    date: 'December 05, 2025',
    content: (
      <>
        <p>In today's fast-paced digital world, milliseconds matter. Optimizing your code for speed and efficiency is no longer optional—it's a necessity.</p>
        <h3>1. Algorithmic Efficiency</h3>
        <p>The foundation of optimization lies in choosing the right algorithms. Moving from O(n²) to O(n log n) can drastically reduce processing time for large datasets.</p>
        <h3>2. Minimizing Re-renders in React</h3>
        <p>For frontend performance, preventing unnecessary re-renders is key. Utilize `React.memo`, `useMemo`, and `useCallback` to ensure components only update when absolutely necessary.</p>
        <h3>3. Network Optimization</h3>
        <p>Reduce payload sizes by compressing assets, using code splitting, and implementing lazy loading. Efficient caching strategies can also significantly improve perceived response speeds.</p>
        <p>By focusing on these core areas, you can ensure your applications remain snappy and responsive, providing the best possible user experience.</p>
      </>
    ),
  },
};

const BlogPost = () => {
  const { id } = useParams();
  const post = blogContent[id];
  const blogPostRef = useRef(null);

  useEffect(() => {
    if (!post) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animate back link
      tl.fromTo(
        '.blog--back-link',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6 }
      )
        // Animate title
        .fromTo(
          '.blog-post .section--title',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.3'
        )
        // Animate subtitle
        .fromTo(
          '.blog-post .section--subtitle',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.4'
        )
        // Animate content
        .fromTo(
          '.blog--content',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.3'
        );

      // Animate paragraphs and headings with stagger
      gsap.fromTo(
        '.blog--content p, .blog--content h3',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.5,
        }
      );
    }, blogPostRef);

    return () => ctx.revert();
  }, [post]);

  if (!post) {
    return (
      <div className="blog-post section container" data-aos="fade-up">
        <h2>Post not found</h2>
        <Link to="/blog" className="button button--flex">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <section className="blog-post section" id="blog-post" ref={blogPostRef}>
      <SEO
        title={`${post.title} | Wasif Rehman`}
        description={post.description || post.title}
        path={`/blog/${id}`}
        type="article"
        article={{
          title: post.title,
          excerpt: post.description,
          datePublished: post.dateISO,
          tags: post.tags,
        }}
      />
      <div className="container">
        <Link to="/blog" className="blog--back-link">
          <i className="ri-arrow-left-line"></i> Back to Blogs
        </Link>
        <h1 className="section--title">{post.title}</h1>
        <span className="section--subtitle">{post.date}</span>
        <div className="blog--content">{post.content}</div>
      </div>
    </section>
  );
};

export default BlogPost;

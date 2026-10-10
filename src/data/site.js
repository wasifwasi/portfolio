// Single place for contact details, headline numbers and home-page copy.
import { projectsData } from "./projects";

// Calendly event for "Book a call". Buttons open it as a popup on the page (see BookCallLink).
// If this is ever emptied, "Book a call" opens WhatsApp with a pre-filled message instead.
export const CALENDLY_URL = "https://calendly.com/wasifrehman58/new-meeting";

export const CONTACT = {
  email: "wasifrehman58@gmail.com",
  whatsappNumber: "923088934229",
  whatsappDisplay: "+92 308 8934229",
  linkedin: "https://www.linkedin.com/in/wasif-rehman-32210a18b/",
  github: "https://github.com/wasifwasi",
};

export const whatsappLink = (text) =>
  `https://wa.me/${CONTACT.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const BOOK_CALL_HREF =
  CALENDLY_URL ||
  whatsappLink("Hi Wasif, I'd like to book a quick 15-min call about a project.");

export const BOOK_CALL_IS_CALENDLY = Boolean(CALENDLY_URL);

const AI_PATTERN = /\bAI\b|Claude|Gemini|Groq|Anthropic|OpenAI|Whisper/;
const aiProjectCount = projectsData.filter(
  (p) => AI_PATTERN.test(p.subtitle) || p.tags.some((t) => AI_PATTERN.test(t))
).length;

// Headline numbers under the hero. Only use figures that are Wasif's own and can be
// verified (e.g. personal Upwork earnings or job success score) — swap them in here.
export const METRICS = [
  { value: `${projectsData.length}`, label: "Detailed case studies" },
  { value: `${aiProjectCount}`, label: "AI-powered products" },
  { value: "2022", label: "Shipping full-stack since" },
];

// Hero copy (also used for the pre-rendered home page in scripts/static-pages.js)
export const HERO = {
  title: "I'm Wasif. I build the software real businesses run on.",
  lead: "Web apps, mobile apps and AI tools, from the database to the screen your customers use. Here are three of them.",
};

// Hero photo strip: each tile links to its case study. Images live in public/img/work
// (1200px and -640 versions); photos are licensed Unsplash shots with a light colour grade.
export const HERO_STRIP = [
  {
    slug: "umrahflow",
    image: "img/work/umrahflow",
    alt: "Open passport with visa stamps on a desk",
    title: "UmrahFlow",
    caption: "A visa office reads passports straight from WhatsApp photos.",
  },
  {
    slug: "multi-department-pos",
    image: "img/work/pos",
    alt: "Aisle of a cloth shop with fabric on every shelf",
    title: "Cloth-house POS",
    caption: "Many departments, one checkout, one owner dashboard.",
  },
  {
    slug: "home-structure",
    image: "img/work/homestructure-site",
    alt: "Concrete house under construction with bamboo scaffolding",
    title: "homeStructure",
    caption: "Plan a house on your real plot, then walk through it in 3D.",
  },
];

// Home-page work grid, in display order. Copy is condensed from each case study page.
export const FEATURED_WORK = [
  {
    slug: "umrahflow",
    title: "UmrahFlow",
    kind: "AI automation",
    context: "Freelance client",
    image: "img/work/umrahflow",
    alt: "Open passport with visa stamps on a desk",
    problem: "Visa staff typed passport details by hand from photos pilgrims sent on WhatsApp.",
    solution:
      "A WhatsApp agent reads each passport (MRZ checked against Claude vision), staff approve it on a dashboard, and approved passports are staged for the Saudi Nusuk portal.",
    flow: ["WhatsApp", "AI agent", "Passport OCR", "Human review", "Nusuk bridge"],
    stack: ["Next.js", "Python / FastAPI", "PostgreSQL", "Claude Vision", "Docker"],
    size: "wide",
  },
  {
    slug: "multi-department-pos",
    title: "Multi-Department POS",
    kind: "Retail SaaS",
    context: "Freelance client",
    image: "img/work/pos",
    alt: "Aisle of a cloth shop with fabric on every shelf",
    problem: "A cloth house records sales in each department but takes payment at one counter.",
    solution: "Department tills issue tickets, one checkout settles them as a single bill, and the owner sees stock, shifts and returns.",
    stack: ["Next.js 16", "Prisma 7", "PostgreSQL"],
    blog: "multi-tenant-from-day-one-pos-saas",
  },
  {
    slug: "bpoai",
    title: "BPOAI",
    kind: "AI agents",
    context: "Lead developer at AIDEVGEN",
    image: "img/work/bpoai",
    alt: "Wide view of an outsourcing office floor with rows of desks",
    problem: "A BPO directory had to stay current without a team updating it by hand.",
    solution: "Nine Claude-powered agents scrape new companies, score them, verify claims and run the email outreach.",
    stack: ["Next.js 16", "Supabase", "Claude", "Apify"],
    blog: "building-a-9-agent-ai-backend-for-bpoai",
  },
  {
    slug: "home-structure",
    title: "homeStructure",
    kind: "3D design tool",
    context: "Personal project",
    image: "img/work/homestructure-3d",
    focus: "48% 62%",
    alt: "homeStructure editor showing a two-floor house in 3D on an irregular plot",
    real: true,
    problem: "Homeowners want to see a house on their actual plot before they pay an architect.",
    solution:
      "Enter the plot and the rooms you want, get a floor plan in seconds, walk around it in 3D and see a cost estimate. Everything runs in the browser.",
    flow: ["Plot size", "Floor plan", "Live 3D", "Cost estimate"],
    stack: ["Next.js 16", "Three.js", "react-konva", "Zustand"],
    demo: "https://home-structure-nxnh.vercel.app/",
    size: "wide",
  },
  {
    slug: "freenote-app",
    title: "FreeNote",
    kind: "Mobile + AI",
    context: "Full-stack developer at AIDEVGEN",
    image: "img/work/freenote",
    alt: "Packed lecture hall seen from behind the lectern",
    problem: "An hour-long lecture or meeting is hard to use if it only exists as audio.",
    solution: "A React Native app that transcribes with Whisper, then summarises and answers questions about each recording with Groq.",
    stack: ["React Native", "Expo", "Firebase", "Whisper"],
  },
];

// How a project runs, shown as four steps on the home page.
export const PROCESS = [
  { title: "15-minute call", text: "We talk through what you're building, who will use it and when you need it." },
  { title: "Written scope and quote", text: "A short document: what's included, what isn't, the price and the timeline." },
  { title: "A working link every week", text: "You see real progress on a live link, so nothing waits until the end." },
  { title: "Handover", text: "Code in your repository, deployed, with notes so anyone can maintain it." },
];

// Fixed-scope offers. Each one links to the projects that prove it.
export const SERVICES = [
  {
    slug: "ai-automation",
    title: "AI Agent & Automation Build",
    pitch: "Turn a manual, repetitive workflow into an AI pipeline with a human in the loop.",
    includes: [
      "Intake from WhatsApp, email or forms",
      "LLM classification, extraction and OCR",
      "Review dashboard so people approve what matters",
      "Logs, alerts and a deployed, documented system",
    ],
    proof: ["umrahflow", "bpoai"],
  },
  {
    slug: "ai-feature",
    title: "AI Feature for Your Product",
    pitch: "Add a reliable AI feature to an app you already run, without breaking what works.",
    includes: [
      "Chat, summarisation, transcription or vision",
      "OpenAI, Claude, Gemini, Groq or Whisper",
      "Usage limits and cost controls",
      "Clean UI wired into your existing stack",
    ],
    proof: ["freenote-app", "prove-it-auto", "purex"],
  },
  {
    slug: "mvp",
    title: "Web or Mobile MVP",
    pitch: "Go from idea to a real product people can sign up for, pay for and use.",
    includes: [
      "Next.js web app or React Native (Expo) mobile app",
      "Auth, payments (Stripe / RevenueCat) and admin",
      "Postgres, Supabase or MongoDB data model",
      "Deployed to production, handed over with docs",
    ],
    proof: ["multi-department-pos", "bible-trader", "voltoutreach"],
  },
];

export const projectTitle = (slug) =>
  projectsData.find((p) => p.slug === slug)?.title || slug;

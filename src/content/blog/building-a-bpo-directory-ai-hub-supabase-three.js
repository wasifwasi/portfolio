export const meta = {
  id: 'building-a-bpo-directory-ai-hub-supabase-three',
  title: 'BPO Directory Website with Next.js, Supabase and Three.js',
  excerpt:
    'How I built BPOAI, a BPO directory website for the Philippines: searchable Supabase data, a lazy-loaded 3D landing, Resend lead capture and Cloudflare.',
  date: 'June 02, 2026',
  dateISO: '2026-06-02',
  category: 'Web development',
  keywords: [
    'BPO directory website',
    'Supabase directory app',
    'Next.js Supabase SSR',
    'react-three-fiber landing page',
    'Next.js on Cloudflare with OpenNext',
    'Resend lead capture',
    'BPO companies in the Philippines',
  ],
  tags: ['Next.js', 'Supabase', 'Three.js', 'Framer Motion', 'Cloudflare'],
  project: 'bpoai',
  cover: {
    src: '/img/blog/building-a-bpo-directory-ai-hub-supabase-three.webp',
    alt: 'Laptop on a dark desk showing a glowing 3D globe of connected points',
  },
};

export default {
  dek:
    'BPOAI is a directory and intelligence hub for BPO companies in the Philippines. It pairs a searchable Supabase data layer with a 3D landing page, so finding an outsourcing partner does not feel like reading a phone book.',
  sections: [
    {
      id: 'why-a-better-directory',
      eyebrow: 'The problem',
      heading: 'Why BPO buyers need a better directory website',
      blocks: [
        {
          type: 'p',
          text: 'The Business Process Outsourcing market in the Philippines is big, but discovering the right provider still means wading through outdated lists and SEO spam.',
        },
        {
          type: 'p',
          text: "[BPOAI](/projects/bpoai), which I led at AIDEVGEN, is a directory and intelligence hub that pairs real company data with a landing experience that doesn't feel like a phone book. Here is how it is put together.",
        },
        {
          type: 'table',
          caption: 'How BPOAI is put together',
          head: ['Layer', 'Tool', 'Job'],
          rows: [
            ['Data and auth', 'Supabase: Postgres plus `@supabase/ssr`', 'Company data, read securely from server components'],
            ['Landing', 'react-three-fiber over Three.js', 'An animated 3D hero'],
            ['Motion', 'Framer Motion', 'Page changes, card reveals and micro-interactions'],
            ['Lead capture', 'Resend', 'Demo-request and contact emails'],
            ['Hosting', 'Cloudflare via `@opennextjs/cloudflare`', "Runs the Next.js 16 app on Cloudflare's runtime"],
          ],
        },
        {
          type: 'p',
          text: 'This post covers the directory site. The AI agent server that runs behind it has [its own write-up](/blog/building-a-9-agent-ai-backend-for-bpoai).',
        },
      ],
    },
    {
      id: 'supabase-data-layer',
      eyebrow: 'Data',
      heading: 'Supabase as the data layer for a searchable directory',
      blocks: [
        {
          type: 'p',
          text: 'The directory runs on Supabase: Postgres for the company data, plus the SSR auth helpers in `@supabase/ssr` so server components can read data securely.',
        },
        {
          type: 'p',
          text: 'Modeling the schema for flexible search was the core work. Each company has:',
        },
        {
          type: 'list',
          items: ['Services', 'Locations', 'Sizes', 'Specialties'],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'What the schema has to support',
          text: 'The UI needs to filter across all of those dimensions quickly. Postgres indexes and a clean query layer are what keep discovery fast as the dataset grows.',
        },
      ],
    },
    {
      id: '3d-landing-page',
      eyebrow: '3D landing',
      heading: 'Adding a Three.js 3D hero without wrecking load time',
      blocks: [
        {
          type: 'p',
          text: 'First impressions matter for a directory that wants to be the default. The landing page uses react-three-fiber over Three.js for an animated 3D hero that sets BPOAI apart from a generic listing site.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'The challenge is always the same',
          text: 'A heavy 3D scene must not wreck load time or Core Web Vitals.',
        },
        {
          type: 'p',
          text: 'So the 3D experience is:',
        },
        {
          type: 'list',
          items: ['Scoped', 'Lazy-loaded', 'Tuned to stay smooth on mid-range hardware'],
        },
      ],
    },
    {
      id: 'framer-motion',
      eyebrow: 'Motion',
      heading: 'Framer Motion as a credibility feature on a B2B site',
      blocks: [
        {
          type: 'p',
          text: 'Framer Motion handles transitions throughout the site: page changes, card reveals and micro-interactions.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'On a B2B product, polish reads as credibility',
          text: 'Buyers comparing outsourcing partners are making a high-trust decision. A site that feels considered earns more of that trust than one that feels like a spreadsheet with a logo.',
        },
      ],
    },
    {
      id: 'resend-lead-capture',
      eyebrow: 'Leads',
      heading: 'Lead capture with Resend in a Next.js directory',
      blocks: [
        {
          type: 'p',
          text: 'Discovery is only half the job. The product has to convert interest into contact.',
        },
        {
          type: 'flow',
          caption: 'From visit to lead',
          steps: ['Interested visitor', 'Demo request or contact form', 'Email via Resend', "Lead in the team's inbox"],
        },
        {
          type: 'p',
          text: "Demo-request and contact flows are delivered by email via Resend, so an interested visitor becomes a real lead in the team's inbox without any third-party form middleware.",
        },
      ],
    },
    {
      id: 'cloudflare-opennext',
      eyebrow: 'Deployment',
      heading: 'Deploying Next.js 16 to Cloudflare with OpenNext',
      blocks: [
        {
          type: 'p',
          text: "BPOAI deploys to Cloudflare using `@opennextjs/cloudflare`, which adapts a Next.js 16 app to Cloudflare's runtime. That suits a directory accessed from around the world, because edge distribution keeps the site fast for visitors wherever they are.",
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'It is not a standard Node server',
          text: "The runtime isn't a standard Node server, so you have to be deliberate about which Node APIs you reach for.",
        },
        {
          type: 'p',
          text: 'Put together, a solid Supabase schema makes the data trustworthy and searchable, a restrained 3D landing and Framer Motion make it memorable, and Resend turns browsing into pipeline. Combine those and a listing site becomes a product.',
        },
      ],
    },
  ],
  pullQuote: { text: '"Directory" doesn\'t have to mean "boring."', after: 2 },
  takeaways: [
    'A solid Supabase schema, built for filtering by services, locations, sizes and specialties, makes directory data trustworthy and searchable.',
    'A heavy 3D landing has to be scoped and lazy-loaded so it does not wreck load time or Core Web Vitals.',
    'For B2B buyers making a high-trust decision, polish reads as credibility.',
    "Discovery is only half the job: Resend turns interest into a lead in the team's inbox.",
    'OpenNext runs Next.js on Cloudflare, but you have to be deliberate about which Node APIs you use.',
  ],
  faq: [
    {
      q: 'How do you build a directory website with Supabase?',
      a: 'In BPOAI, Postgres on Supabase holds the company data and @supabase/ssr lets server components read it securely. Most of the work is modeling the schema so services, locations, sizes and specialties can be filtered quickly, backed by Postgres indexes.',
    },
    {
      q: 'Can you deploy a Next.js app to Cloudflare?',
      a: "Yes. BPOAI runs a Next.js 16 app on Cloudflare using @opennextjs/cloudflare. The runtime is not a standard Node server, so you need to be careful about which Node APIs you use.",
    },
    {
      q: 'Does a 3D landing page hurt Core Web Vitals?',
      a: 'It can. A heavy 3D scene can wreck load time, so on BPOAI the react-three-fiber hero is scoped, lazy-loaded and tuned to stay smooth on mid-range hardware.',
    },
    {
      q: 'How does BPOAI capture leads?',
      a: "Demo-request and contact forms send email through Resend, so an interested visitor becomes a lead in the team's inbox without third-party form middleware.",
    },
  ],
};

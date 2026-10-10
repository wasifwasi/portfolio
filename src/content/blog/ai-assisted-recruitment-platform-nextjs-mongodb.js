export const meta = {
  id: 'ai-assisted-recruitment-platform-nextjs-mongodb',
  title: 'AI Recruitment Platform Built with Next.js and MongoDB',
  excerpt:
    'How I built VoltOutreach, an AI recruitment platform on Next.js and MongoDB: job listings, applications, an admin dashboard and AI-drafted candidate outreach.',
  date: 'May 24, 2026',
  dateISO: '2026-05-24',
  category: 'Web development',
  keywords: [
    'AI recruitment platform',
    'recruitment portal Next.js',
    'AI candidate outreach',
    'Anthropic SDK outreach drafting',
    'MongoDB Mongoose data model',
    'Next.js route groups admin dashboard',
    'Next.js JWT auth with jose',
  ],
  tags: ['Next.js', 'MongoDB', 'Anthropic SDK', 'Cloudinary', 'Recruitment'],
  project: 'voltoutreach',
  cover: {
    src: '/img/blog/ai-assisted-recruitment-platform-nextjs-mongodb.webp',
    alt: 'Printed CVs spread on a meeting table beside a laptop and a coffee cup',
  },
};

export default {
  dek:
    'VoltOutreach is an end-to-end recruitment portal. Jobs, applications, interview scheduling and media live in one admin dashboard, and AI drafts the outreach that takes recruiters the most time.',
  stats: [
    { value: '2', label: 'Areas kept apart: the candidate portal and the admin dashboard' },
    { value: '4', label: 'Mongoose models: jobs, supplemental job data, applications and leads' },
    { value: '3', label: 'Integrations: the Anthropic SDK, Calendly and Cloudinary' },
  ],
  sections: [
    {
      id: 'recruitment-pipeline',
      eyebrow: 'The problem',
      heading: 'Why recruitment is a pipeline problem',
      blocks: [
        {
          type: 'p',
          text: 'Recruitment is a pipeline. Jobs go up, candidates apply, someone reviews them, interviews get scheduled, and outreach never stops.',
        },
        {
          type: 'flow',
          caption: 'The recruitment pipeline VoltOutreach runs',
          steps: ['Job posted', 'Candidate applies', 'Admin reviews', 'Interview booked', 'Outreach'],
        },
        {
          type: 'p',
          text: '[VoltOutreach](/projects/voltoutreach), which I led at AIDEVGEN, is an end-to-end portal that runs that whole pipeline. It adds AI assistance where the manual effort hurts most. This is the architecture.',
        },
        {
          type: 'table',
          caption: 'The stack at a glance',
          head: ['Layer', 'Tool'],
          rows: [
            ['Framework', 'Next.js 16, React 19 and TypeScript'],
            ['Database', 'MongoDB with Mongoose'],
            ['AI outreach', 'The Anthropic SDK'],
            ['Scheduling', 'An embedded Calendly flow (`react-calendly`)'],
            ['CV and document uploads', 'Cloudinary'],
            ['Auth', 'JWT sessions with `jose`, passwords hashed with bcryptjs'],
          ],
        },
      ],
    },
    {
      id: 'portal-and-admin',
      eyebrow: 'Structure',
      heading: 'Separating the candidate portal from the admin dashboard in Next.js',
      blocks: [
        {
          type: 'p',
          text: 'The first design decision was a hard separation between the candidate-facing portal and the admin area, using Next.js route groups.',
        },
        {
          type: 'table',
          caption: 'Two areas, two audiences',
          head: ['Area', 'Who uses it', 'What they do', 'Access'],
          rows: [
            ['Public portal', 'Candidates', 'Browse jobs and apply', 'Open to everyone'],
            ['Admin area', 'Admins', 'Manage listings, review applications and handle leads', 'Behind middleware-protected routes'],
          ],
        },
        {
          type: 'p',
          text: 'Keeping these concerns apart keeps both the code and the security model clean.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Split early',
          text: 'Separating the portal and the admin area behind route groups from day one avoids a tangle later.',
        },
      ],
    },
    {
      id: 'mongodb-data-model',
      eyebrow: 'Data model',
      heading: 'A MongoDB and Mongoose data model for recruitment',
      blocks: [
        {
          type: 'p',
          text: 'MongoDB with Mongoose backs the platform. There are models for:',
        },
        {
          type: 'list',
          items: ['Jobs', 'Supplemental job data', 'Applications', 'Leads'],
          ordered: false,
        },
        {
          type: 'p',
          text: 'Recruitment data is naturally document-shaped. An application bundles a candidate, a role, answers and attachments, so a document store fits well.',
        },
        {
          type: 'p',
          text: 'I built the schema for flexibility, because every client wants slightly different fields on a job posting.',
        },
      ],
    },
    {
      id: 'ai-outreach',
      eyebrow: 'AI outreach',
      heading: 'AI-assisted candidate outreach with the Anthropic SDK',
      blocks: [
        {
          type: 'p',
          text: 'The standout feature is AI-assisted outreach through the Anthropic SDK. Drafting personalised messages to candidates and clients is the most repetitive, time-consuming part of recruiting, so the platform drafts them for you.',
        },
        {
          type: 'steps',
          items: [
            { title: 'The AI drafts', text: 'The Anthropic SDK writes a personalised message for a candidate or a client.' },
            { title: 'An admin reviews', text: 'Admins always review the draft before anything goes out.' },
            { title: 'Then it is sent', text: 'Nothing reaches a candidate or a client without that review.' },
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Keep the AI controllable',
          text: 'The AI speeds up the person. It does not replace their judgment.',
        },
        {
          type: 'p',
          text: 'I wrote more about where that human checkpoint belongs in [When NOT to Let the AI Finish the Job](/blog/when-not-to-let-ai-finish-the-job).',
        },
      ],
    },
    {
      id: 'calendly-cloudinary',
      eyebrow: 'Integrations',
      heading: 'Calendly interview scheduling and Cloudinary CV uploads',
      blocks: [
        {
          type: 'p',
          text: 'Two integrations take work off the app itself:',
        },
        {
          type: 'table',
          caption: 'What each integration handles',
          head: ['Need', 'Tool', 'Why'],
          rows: [
            ['Interview scheduling', 'An embedded Calendly flow (`react-calendly`)', 'Booking happens without leaving the app'],
            ['CV and document uploads', 'Cloudinary', 'It offloads file storage and delivery from the application server and keeps media fast and reliable'],
          ],
        },
      ],
    },
    {
      id: 'jwt-auth-jose',
      eyebrow: 'Security',
      heading: 'JWT sessions with jose and middleware-protected admin routes',
      blocks: [
        {
          type: 'p',
          text: 'Authentication uses JWT sessions implemented with `jose`, paired with bcryptjs for password hashing.',
        },
        {
          type: 'p',
          text: 'Sessions are validated in middleware. That is exactly where the split between the public portal and the admin area is enforced.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'What this guarantees',
          text: 'A request for an admin route without a valid session never reaches the page.',
        },
        {
          type: 'p',
          text: 'For a full account lifecycle with password reset, built on NextAuth v5 instead, see [Production-Ready Auth with NextAuth v5 and MongoDB](/blog/production-ready-auth-nextauth-v5-mongodb).',
        },
      ],
    },
    {
      id: 'lessons',
      eyebrow: 'Lessons',
      heading: 'What building an AI recruitment platform taught me',
      blocks: [
        {
          type: 'p',
          text: 'VoltOutreach reinforced three things:',
        },
        {
          type: 'list',
          items: [
            'Separate the portal and the admin area behind route groups from day one. It avoids a tangle later.',
            'Aim AI at one specific, painful, repeatable task, here outreach drafting, rather than sprinkling it everywhere.',
            'Bring jobs, applications, scheduling and media into one dashboard. That is what turns a pile of tools into a platform.',
          ],
          ordered: true,
        },
        {
          type: 'p',
          text: 'The [VoltOutreach case study](/projects/voltoutreach) covers my role and the full feature list.',
        },
      ],
    },
  ],
  pullQuote: {
    text: 'AI is most valuable when it is aimed at a specific, painful, repeatable task, rather than sprinkled everywhere.',
    after: 3,
  },
  takeaways: [
    'Split the candidate portal and the admin area with route groups from the start, and enforce the split in middleware.',
    'Recruitment data is document-shaped, so MongoDB with Mongoose fits jobs, applications and leads well.',
    'Point AI at the most repetitive task, outreach drafting, and keep an admin review before anything is sent.',
    'Hand scheduling to Calendly and file storage to Cloudinary so the app server does less.',
  ],
  faq: [
    {
      q: 'What does VoltOutreach do?',
      a: 'It is an end-to-end recruitment portal. Candidates browse jobs and apply. Admins manage listings, review applications, handle leads, book interviews through Calendly and run AI-assisted outreach from one dashboard.',
    },
    {
      q: 'How is AI used in a recruitment platform?',
      a: 'In VoltOutreach, for outreach drafting. The Anthropic SDK drafts personalised messages to candidates and clients, which is the most repetitive part of recruiting, and admins always review a draft before anything goes out.',
    },
    {
      q: 'Why use MongoDB for a recruitment platform?',
      a: 'Recruitment data is naturally document-shaped. An application bundles a candidate, a role, answers and attachments, and job postings need flexible fields, so a document store with Mongoose models fits well.',
    },
    {
      q: 'How are admin routes protected in Next.js?',
      a: 'With JWT sessions built on `jose` and validated in middleware. The public portal and the admin area live in separate route groups, and a request for an admin route without a valid session never reaches the page.',
    },
  ],
};

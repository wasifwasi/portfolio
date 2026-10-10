export const meta = {
  id: 'building-a-9-agent-ai-backend-for-bpoai',
  title: "Multi-Agent AI Backend: How I Built BPOAI's Nine-Agent Server",
  excerpt:
    "How I built BPOAI's multi-agent AI backend: nine agents on an Express server that scrape leads with Apify, score companies with Claude and run email drips.",
  date: 'June 18, 2026',
  dateISO: '2026-06-18',
  category: 'AI agents',
  keywords: [
    'multi-agent AI backend',
    'AI agents with Claude',
    'Apify Google Maps scraper',
    'webhooks for AI agents',
    'automated email drip',
    'AI lead generation',
    'Express agent server',
  ],
  tags: ['AI agents', 'Claude', 'Apify', 'Supabase', 'Express'],
  project: 'bpoai',
  cover: {
    src: '/img/blog/building-a-9-agent-ai-backend-for-bpoai.webp',
    alt: 'Empty support office at dusk with rows of desks, monitors and headsets',
  },
};

export default {
  dek:
    'Behind the BPOAI directory runs a separate Express server with nine agents. They find new companies, score them, verify ownership claims, follow up by email and draft weekly news, all triggered by webhooks and cron.',
  stats: [
    { value: '9', label: 'Agents on one Express server' },
    { value: '3', label: 'Emails in the outreach drip, stopped by a reply' },
    { value: '70+', label: 'AI Readiness Score that earns the AI-Ready badge' },
    { value: '4', label: 'Shared libraries that keep the agents thin' },
  ],
  sections: [
    {
      id: 'agent-server',
      eyebrow: 'Architecture',
      heading: 'An AI agent server kept apart from the main site',
      blocks: [
        {
          type: 'p',
          text: '[BPOAI](/projects/bpoai) is a directory and intelligence hub for the BPO industry that I led at AIDEVGEN. The [public Next.js site](/blog/building-a-bpo-directory-ai-hub-supabase-three) is only half the story. Behind it runs a separate **agent server**: a small Express app whose whole job is to make the directory feel alive.',
        },
        {
          type: 'p',
          text: 'The main site never runs an agent inline. It just fires a webhook. A small helper POSTs to the agent server with a shared-secret header and swallows every error, so an agent outage can *never* break the main site.',
        },
        {
          type: 'code',
          lang: 'http',
          code: 'POST ${AGENT_SERVER}/webhook/{event}\nx-agent-secret: <secret>',
        },
        {
          type: 'p',
          text: 'The Express app exposes routes such as `/webhook/search`, `/webhook/claim-submit`, `/webhook/profile-update` and a few `/webhook/cron/*` endpoints. That clean contract lets the agents evolve, crash and redeploy independently of the customer-facing site.',
        },
        {
          type: 'table',
          caption: 'The agents in this walkthrough',
          head: ['Agent', 'Job', 'Triggered by'],
          rows: [
            ['1: Search', 'Logs every directory query to Supabase and Slack', 'A directory search'],
            ['2: Scraper', 'Finds BPO companies on Google Maps, crawls their sites and extracts contact emails', 'A search that returns zero results'],
            ['3: Scoring', 'Asks Claude for an AI Readiness Score', 'Every profile update'],
            ['5: Claims', 'Checks ownership claims by email domain', 'An ownership claim'],
            ['6: News', 'Turns BPO and AI headlines into draft articles with Claude', 'Weekly cron, Monday morning'],
            ['7: Analytics', 'Posts a weekly stats digest to Slack', 'Weekly cron, Monday morning'],
            ['8', 'Notifies people who requested a scan, and stores email replies', 'The scraper, or an incoming reply'],
            ['9: Outreach', 'Runs a three-email drip', 'A new lead with an email, then an hourly cron'],
          ],
        },
      ],
    },
    {
      id: 'lead-scraping',
      eyebrow: 'Lead generation',
      heading: 'Scraping leads with Apify when a search finds nothing',
      blocks: [
        {
          type: 'p',
          text: 'The most interesting flow starts with a failed search. **Agent 1 (Search)** logs every directory query to Supabase and Slack. If a search returns zero results, it sets a flag that fires **Agent 2 (Scraper)** in the background. The site gets its response immediately, and the scrape runs after.',
        },
        {
          type: 'p',
          text: 'Agent 2 is the workhorse:',
        },
        {
          type: 'steps',
          items: [
            { title: 'Find companies', text: "Apify's `compass/crawler-google-places` actor finds matching BPO companies on Google Maps." },
            { title: 'Read their websites', text: 'The `apify/website-content-crawler` actor pulls the text from each company site.' },
            { title: 'Extract emails', text: 'A regex-based extractor harvests contact emails, preferring role inboxes like `info@` and `sales@` on the matching domain.' },
            { title: 'Save the leads', text: 'New leads are de-duplicated and written to Supabase.' },
            { title: 'Chain two more agents', text: 'Agent 8 notifies anyone who requested that scan, and Agent 9 starts an outreach campaign for every lead that has an email.' },
          ],
        },
        {
          type: 'flow',
          caption: 'The search, scrape and outreach chain',
          steps: ['Zero-result search', 'Scraper (Apify)', 'Email extraction', 'Leads in Supabase', 'Notify and outreach'],
        },
      ],
    },
    {
      id: 'email-drip',
      eyebrow: 'Outreach',
      heading: 'An automated email drip that stops when someone replies',
      blocks: [
        {
          type: 'p',
          text: '**Agent 9 (Outreach)** runs a three-email drip.',
        },
        {
          type: 'table',
          caption: 'The outreach schedule',
          head: ['Email', 'When it goes out', 'What sends it'],
          rows: [
            ['First email', 'The moment the lead is created', 'Agent 9, chained from the scraper'],
            ['Follow-up 2', '+24 hours', 'Hourly cron at `/webhook/cron/outreach`'],
            ['Follow-up 3', '+48 hours', 'Hourly cron at `/webhook/cron/outreach`'],
          ],
        },
        {
          type: 'list',
          items: [
            'A unique database index prevents the same lead being enrolled twice.',
            'An admin master switch can pause all outreach at once.',
          ],
          ordered: false,
        },
        {
          type: 'p',
          text: "The clever part is the feedback loop. When a recipient replies, Resend's `email.received` webhook hits the server. **Agent 8** stores the reply and calls back into Agent 9, which marks the campaign *replied* and stops the drip.",
        },
        {
          type: 'flow',
          caption: 'How a reply stops the drip',
          steps: ['Recipient replies', 'Resend email.received webhook', 'Agent 8 stores the reply', 'Agent 9 marks it replied', 'Drip stops'],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Why close the loop',
          text: "No one wants a \"just following up\" email after they've already answered.",
        },
      ],
    },
    {
      id: 'claude-scoring',
      eyebrow: 'Where AI fits',
      heading: 'AI readiness scoring with Claude, and when a domain check is enough',
      blocks: [
        {
          type: 'p',
          text: "**Agent 3 (Scoring)** fires on every profile update. It asks Claude to compute an **AI Readiness Score** from 0 to 100, based on the company's listed tools, services and profile completeness.",
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'The AI-Ready badge',
          text: 'A score of 70 or more automatically awards the company an "AI-Ready" badge.',
        },
        {
          type: 'p',
          text: "**Agent 5 (Claims)** handles ownership claims with a plain check: it compares the claimant's email domain to the company's website domain.",
        },
        {
          type: 'table',
          caption: 'How ownership claims are decided',
          head: ['Domain check', 'What happens'],
          rows: [
            ['Domains match', 'The claim is approved automatically and the user gets an email'],
            ['Domains do not match', 'The claim goes to an admin Slack channel for manual review'],
          ],
        },
      ],
    },
    {
      id: 'weekly-cron',
      eyebrow: 'Scheduled jobs',
      heading: 'Weekly cron agents for AI news and analytics',
      blocks: [
        {
          type: 'p',
          text: 'Every Monday morning, two agents wake up.',
        },
        {
          type: 'list',
          items: [
            "**Agent 6 (News)** scrapes BPO and AI headlines across a set of topics with Apify's Google search scraper and content crawler. Claude turns each article into an SEO title, a summary and a clean HTML body, saved as a *pending draft* for an admin to approve. It also writes one original \"trending\" article naming the week's top-scoring and newly added companies.",
            '**Agent 7 (Analytics)** compiles weekly stats, such as new companies, claims, top searches and highest scores, and posts a digest to Slack.',
          ],
          ordered: false,
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Nothing auto-publishes',
          text: 'No content is published automatically. Humans stay in the approval loop where reputation is on the line.',
        },
        {
          type: 'p',
          text: 'I wrote more about where to keep people in the loop in [When not to let the AI finish the job](/blog/when-not-to-let-ai-finish-the-job).',
        },
      ],
    },
    {
      id: 'shared-tools',
      eyebrow: 'Shared code',
      heading: 'Shared libraries that keep each AI agent small',
      blocks: [
        {
          type: 'p',
          text: 'Four small libraries keep the agents thin.',
        },
        {
          type: 'table',
          caption: 'The shared toolbelt',
          head: ['Library', 'What it does'],
          rows: [
            ['`claude.ts`', 'Wraps the Claude integration and exposes typed helpers: `calculateAIScore`, `generateArticleSummary` and `extractBPOData`'],
            ['`apify.ts`', 'Wraps the Google Maps and content-crawler actors'],
            ['`slack.ts`', 'Gives every agent one consistent way to post execution logs, lead cards and error alerts to dedicated channels'],
            ['`emailExtract.ts`', 'Does the unglamorous but vital work of finding a real, reachable email on a company website'],
          ],
        },
        {
          type: 'p',
          text: 'Each agent reads almost like a recipe, because the messy parts live here.',
        },
      ],
    },
    {
      id: 'reliability',
      eyebrow: 'Reliability',
      heading: 'Making a multi-agent backend safe to leave running',
      blocks: [
        {
          type: 'p',
          text: 'Three decisions did the heavy lifting:',
        },
        {
          type: 'steps',
          items: [
            { title: 'Fire and forget by default', text: 'Webhooks respond instantly, and the real work runs in background tasks with `.catch()` guards. A slow scrape never times out a user request.' },
            { title: 'One driver per job', text: 'Outreach follow-ups are driven only by the external cron, never by a second in-process timer, to avoid double-sending.' },
            { title: 'Humans gate anything public', text: 'AI-written articles and ambiguous claims wait for approval.' },
          ],
        },
        {
          type: 'p',
          text: 'Nine agents, one webhook contract and a handful of shared tools turn a static directory into something that grows, scores and follows up by itself. It is the part of BPOAI users never see, and the part I had the most fun building.',
        },
      ],
    },
  ],
  pullQuote: {
    text: "Claude is used where judgment helps; a plain domain check is used where it's all you need.",
    after: 3,
  },
  takeaways: [
    'Run agents on their own server behind a webhook contract, and have the main site swallow agent errors so an outage cannot break it.',
    'Respond to webhooks instantly and do the real work in background tasks with error guards.',
    'Give every recurring job exactly one driver, so nothing is sent twice.',
    'Use Claude where judgment helps and plain code where a simple check is enough.',
    'Close the loop on outreach: a reply should stop the drip automatically.',
  ],
  faq: [
    {
      q: 'How do you connect AI agents to a Next.js site without slowing it down?',
      a: 'Keep them on a separate server. The BPOAI site only fires a webhook with a shared-secret header, the helper swallows every error, and the agent server responds instantly and does the work in background tasks.',
    },
    {
      q: 'How does BPOAI find new BPO companies?',
      a: 'When a directory search returns zero results, the scraper agent uses Apify to find matching companies on Google Maps, crawls their websites, extracts contact emails and saves de-duplicated leads to Supabase.',
    },
    {
      q: 'How do you stop an email drip when someone replies?',
      a: "Listen for replies. Resend's `email.received` webhook reaches the agent server, Agent 8 stores the reply, and it calls the outreach agent to mark the campaign replied, which stops the follow-ups.",
    },
    {
      q: 'How is the AI Readiness Score calculated?',
      a: 'Claude computes a score from 0 to 100 from the company\'s listed tools, services and profile completeness. It runs on every profile update, and a score of 70 or more earns an "AI-Ready" badge.',
    },
    {
      q: 'Does BPOAI publish AI-written news automatically?',
      a: 'No. The news agent saves Claude-written articles as pending drafts, and an admin approves them. No content auto-publishes.',
    },
  ],
};

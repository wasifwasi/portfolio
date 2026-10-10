export const meta = {
  id: 'ai-lead-capture-trades-businesses',
  title: 'AI Lead Capture for Plumbers and Trades Businesses',
  excerpt:
    "How I built Plumber's Mate AI, an AI lead capture platform for trades businesses that qualifies leads, books jobs, takes payment and asks for reviews.",
  date: 'April 18, 2026',
  dateISO: '2026-04-18',
  category: 'Automation',
  keywords: [
    'AI lead capture',
    'lead capture for plumbers',
    'missed call automation for trades',
    'AI job booking for trades businesses',
    'automated Google review requests',
    'lead re-engagement automation',
    'vertical AI SaaS',
  ],
  tags: ['Next.js', 'AI automation', 'Lead capture', 'SaaS', 'Framer Motion'],
  project: null,
  cover: {
    src: '/img/blog/ai-lead-capture-trades-businesses.webp',
    alt: 'Open toolbox of wrenches and fittings with a smartphone resting on the lid',
  },
};

export default {
  dek:
    "Trades businesses lose jobs when they cannot answer the phone. Plumber's Mate AI is built to turn every form, missed call and text into a booked job, then handle the invoice, the payment and the review request.",
  stats: [
    { value: '3', label: 'Lead sources: the website form, a missed-call webhook and text' },
    { value: '4', label: 'Details the AI asks for: job type, postcode, urgency and time window' },
    { value: '24h', label: 'After payment clears, the Google review request goes out' },
  ],
  sections: [
    {
      id: 'missed-calls',
      eyebrow: 'The problem',
      heading: 'Why missed calls cost trades businesses jobs',
      blocks: [
        {
          type: 'p',
          text: 'Plumbers, electricians and HVAC technicians lose jobs because they cannot answer the phone. They are under a sink, on a roof, or driving to the next call.',
        },
        {
          type: 'p',
          text: 'For a one-van plumbing business, a missed call is often a lost customer. A caller who gets no answer can simply ring the next result on Google. That is not a lead management problem. It is a survival problem.',
        },
        {
          type: 'p',
          text: "Plumber's Mate AI is a platform I built with the AIDEVGEN team to close that gap. The goal is that every inbound signal, whether a call, a form or a text, becomes a booked job.",
        },
      ],
    },
    {
      id: 'lead-capture-pipeline',
      eyebrow: 'Lead capture',
      heading: 'How the AI lead capture pipeline works',
      blocks: [
        {
          type: 'p',
          text: 'A lead can come in through the website form, a missed-call webhook or a text. All three land in one unified lead queue.',
        },
        {
          type: 'flow',
          caption: 'From inbound lead to booked job',
          steps: ['Form, missed call or text', 'Unified lead queue', 'AI qualification', 'Booked into the calendar', 'Confirmation with quote link'],
        },
        {
          type: 'p',
          text: 'The AI qualifies each lead by asking for four things:',
        },
        {
          type: 'list',
          items: ['Job type', 'Postcode', 'Urgency', 'Preferred time window'],
          ordered: false,
        },
        {
          type: 'p',
          text: "Valid leads are auto-scheduled into the owner's calendar using availability rules. The customer gets an instant booking confirmation with a quote link.",
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'When a person steps in',
          text: 'No human touches a lead unless the AI flags ambiguity: emergency keywords, unusual job types or out-of-area postcodes.',
        },
      ],
    },
    {
      id: 'invoices-payments-reviews',
      eyebrow: 'Getting paid',
      heading: 'Automating invoices, payments and Google review requests',
      blocks: [
        {
          type: 'p',
          text: 'Once a job is marked complete, the platform runs the rest of the loop:',
        },
        {
          type: 'steps',
          items: [
            { title: 'Invoice', text: 'It auto-generates a line-item invoice from the quote.' },
            { title: 'Send', text: 'The invoice goes out by email and SMS with a Stripe-backed payment link.' },
            { title: 'Payment', text: 'The customer pays through the link.' },
            { title: 'Review request', text: '24 hours after payment clears, the customer gets a Google review request with a one-tap link.' },
          ],
        },
        {
          type: 'p',
          text: 'This "complete, invoice, paid, review" loop is what moves a plumber from "I do jobs" to "I have a business". Google reviews compound into more leads, so the cycle reinforces itself.',
        },
      ],
    },
    {
      id: 'lead-re-engagement',
      eyebrow: 'Re-engagement',
      heading: 'Re-engaging cold leads automatically',
      blocks: [
        {
          type: 'p',
          text: 'The most underrated feature is re-engagement. Every plumber has a CRM graveyard: old quotes never accepted, and customers who went quiet.',
        },
        {
          type: 'p',
          text: 'A weekly re-engagement job scores those cold leads, then sends each one a personalised nudge.',
        },
        {
          type: 'table',
          caption: 'What the weekly job scores cold leads on',
          head: ['Signal', 'What it captures'],
          rows: [
            ['Job type', 'The kind of work the lead asked about'],
            ['Time since last contact', 'How long the lead has been quiet'],
            ['Seasonality', 'Timing, such as boiler services before winter and drainage after storms'],
          ],
        },
      ],
    },
    {
      id: 'nextjs-stack',
      eyebrow: 'The stack',
      heading: 'A minimal Next.js 16 and React 19 stack for trades SaaS',
      blocks: [
        {
          type: 'table',
          caption: "The Plumber's Mate AI stack",
          head: ['Layer', 'Choice'],
          rows: [
            ['Framework', 'Next.js 16, React 19 and TypeScript'],
            ['Build', '`next build --webpack`, to keep CI stable while Turbopack is evaluated for production'],
            ['Styling', 'Tailwind CSS 4'],
            ['Motion', 'Framer Motion for the onboarding flow, quote animations and the marketing landing page'],
            ['Payments', 'Stripe-backed payment links'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'A short dependency list, on purpose',
          text: 'Every runtime dependency adds surface area for security issues and bundle bloat, so the list stays small.',
        },
      ],
    },
    {
      id: 'dashboard-architecture',
      eyebrow: 'Dashboard',
      heading: 'Designing a dashboard trades owners will actually use',
      blocks: [
        {
          type: 'p',
          text: 'The owner dashboard is split into three route groups:',
        },
        {
          type: 'code',
          lang: 'text',
          code: 'app/\n  (dashboard)/\n  (admin)/\n  (auth)/',
        },
        {
          type: 'p',
          text: 'Leads, quotes, payments and reviews each get a dedicated view. The home screen, though, is a single feed: "what needs your attention today".',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'The rule we kept',
          text: 'We deliberately resisted building a kitchen-sink CRM. Trades owners do not have time to learn software. If a feature needs a tutorial, it does not ship.',
        },
      ],
    },
    {
      id: 'lessons',
      eyebrow: 'Lessons',
      heading: 'Lessons from building vertical AI SaaS for trades',
      blocks: [
        {
          type: 'list',
          items: [
            '**SMS matters more than email.** Plumbers live in their messages app.',
            '**Frame the offer around one pain.** The onboarding offer page (`/offer`) presents the product around a specific problem instead of leading with a generic pricing page.',
            '**Polish signals trust.** Trades owners are understandably sceptical of software salespeople, so the landing page uses Framer Motion to feel considered.',
          ],
          ordered: true,
        },
        {
          type: 'p',
          text: "Plumber's Mate AI shows that vertical AI SaaS does not need to be flashy. It needs to remove one painful, repetitive task and do it reliably. For plumbers, that task is never missing a job again.",
        },
        {
          type: 'p',
          text: 'For more on where automation should stop and hand over to a person, see [When NOT to Let the AI Finish the Job](/blog/when-not-to-let-ai-finish-the-job). For another Next.js dashboard built around route groups, see [the VoltOutreach build](/blog/ai-assisted-recruitment-platform-nextjs-mongodb).',
        },
      ],
    },
  ],
  pullQuote: {
    text: 'Vertical AI SaaS does not need to be flashy. It needs to eliminate one painful, repetitive task and do it reliably.',
    after: 2,
  },
  takeaways: [
    'For a small trades business a missed call is often a lost customer, so lead capture has to work while the owner is on a job.',
    'Funnel forms, missed calls and texts into one queue, let the AI qualify them, and flag only the ambiguous ones for a person.',
    'Closing the loop from completed job to invoice, payment and review request turns finished work into future leads.',
    'Keep the product small: if a feature needs a tutorial, it does not ship.',
    'Reach trades owners by SMS before email.',
  ],
  faq: [
    {
      q: 'What does an AI lead capture platform for trades businesses do?',
      a: "Plumber's Mate AI takes leads from a website form, a missed-call webhook or a text, qualifies them by job type, postcode, urgency and time window, books valid ones into the owner's calendar, and sends a confirmation with a quote link.",
    },
    {
      q: 'When does a person need to step in?',
      a: 'Only when the AI flags ambiguity, such as emergency keywords, unusual job types or postcodes outside the service area.',
    },
    {
      q: 'How can Google review requests be automated?',
      a: 'When a job is marked complete, the platform sends a line-item invoice by email and SMS with a Stripe-backed payment link. 24 hours after payment clears, it sends a Google review request with a one-tap link.',
    },
    {
      q: 'How do you re-engage old leads automatically?',
      a: 'A weekly job scores cold leads on job type, time since last contact and seasonality, such as boiler services before winter or drainage after storms, then sends each one a personalised nudge.',
    },
  ],
};

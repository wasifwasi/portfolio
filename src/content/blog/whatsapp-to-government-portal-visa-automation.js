export const meta = {
  id: 'whatsapp-to-government-portal-visa-automation',
  title: 'Umrah Visa Automation: From WhatsApp Photo to Government Portal',
  excerpt:
    'How I built Umrah visa automation that turns a WhatsApp passport photo into a staged Nusuk submission, with an AI agent, passport OCR and two human checkpoints.',
  date: 'June 14, 2026',
  dateISO: '2026-06-14',
  category: 'Automation',
  keywords: [
    'Umrah visa automation',
    'visa processing automation',
    'WhatsApp automation for business',
    'AI agent pipeline',
    'passport OCR',
    'Nusuk portal',
    'human in the loop automation',
  ],
  tags: ['AI agents', 'WhatsApp', 'OCR', 'Claude', 'Automation'],
  project: 'umrahflow',
  cover: {
    src: '/img/blog/whatsapp-to-government-portal-visa-automation.webp',
    alt: 'Stack of passports held with a rubber band next to a laptop',
  },
};

export default {
  dek:
    "UmrahFlow turns a pilgrim's WhatsApp passport photo into a staged, ready-to-submit Umrah visa job. AI does the hard reading, and people make the two decisions that matter.",
  stats: [
    { value: '5', label: 'Services in the pipeline, from WhatsApp relay to bridge' },
    { value: '11', label: 'End-to-end checks in one smoke script' },
    { value: '2', label: 'Human decisions: one in the middle, one at the end' },
  ],
  sections: [
    {
      id: 'the-problem',
      eyebrow: 'The problem',
      heading: 'Why Umrah visa processing needs automation',
      blocks: [
        {
          type: 'p',
          text: 'Umrah visa processing is a paperwork business run over WhatsApp. Agents receive passport photos in chat, retype the details into spreadsheets, and then retype them *again* into the Saudi Nusuk portal.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'The cost of retyping',
          text: 'Every retype is a chance for a typo, and a typo can cost a pilgrim their trip.',
        },
        {
          type: 'p',
          text: '[UmrahFlow](/projects/umrahflow) is a freelance project I built to automate that pipeline end to end: from the first WhatsApp photo to a staged, ready-to-submit visa job. It deliberately keeps one human decision in the middle and one at the end.',
        },
      ],
    },
    {
      id: 'pipeline',
      eyebrow: 'Architecture',
      heading: 'How the visa automation pipeline is built',
      blocks: [
        {
          type: 'p',
          text: 'The system is a chain of five services. Each one does one job and hands off to the next.',
        },
        {
          type: 'table',
          caption: 'The five services in UmrahFlow',
          head: ['Service', 'What it does'],
          rows: [
            ['WhatsApp relay', "Receives messages from pilgrims on the agency's own number and forwards them to the dashboard in Twilio webhook format"],
            ['Next.js dashboard', 'Stores messages in Postgres, and is where staff review extracted passports'],
            ['Agent service', 'Drains unprocessed messages, classifies each one, runs images through OCR, creates passport records and replies to the pilgrim on WhatsApp'],
            ['OCR service', 'Reads passport images with an MRZ parse and a Claude vision pass'],
            ['Bridge service', "Picks up approved passports, builds a submission plan and stages it as a job in the operator's visa console"],
          ],
        },
        {
          type: 'flow',
          caption: 'From WhatsApp message to staged visa job',
          steps: ['WhatsApp relay', 'Next.js dashboard', 'Agent and OCR', 'Staff review', 'Bridge', 'Operator submits'],
        },
        {
          type: 'p',
          text: 'The bridge only stages the job. A person runs the actual submission to the government portal.',
        },
      ],
    },
    {
      id: 'agent-loop',
      eyebrow: 'The agent',
      heading: 'Why an agent drain loop beats an inline webhook handler',
      blocks: [
        {
          type: 'p',
          text: 'The tempting design is to process each incoming webhook inline: the message arrives, OCR runs, the reply goes out. I built a drain loop instead. The dashboard just stores messages with `processedAt = NULL`, and the agent polls for unprocessed rows every few seconds.',
        },
        {
          type: 'p',
          text: 'That buys three things:',
        },
        {
          type: 'list',
          items: [
            '**Slow OCR never blocks the webhook.** The webhook only stores the message.',
            '**A crashed agent loses nothing.** Unprocessed messages simply stay unprocessed.',
            '**The agent can debounce.** Pilgrims send passports as photo albums, so the loop waits for the album to finish arriving and treats it as one submission instead of six.',
          ],
          ordered: false,
        },
        {
          type: 'p',
          text: 'I cover the album problem and the rest of the intake in [WhatsApp webhooks: debouncing albums and draining queues](/blog/taming-whatsapp-as-an-app-input).',
        },
      ],
    },
    {
      id: 'passport-ocr',
      eyebrow: 'Passport OCR',
      heading: 'Passport OCR you can trust with visa data',
      blocks: [
        {
          type: 'p',
          text: 'Passport data is exactly the kind of data you cannot afford to hallucinate. The OCR service merges two independent reads: a deterministic MRZ (machine-readable zone) parse and a Claude vision pass, with OpenAI as a fallback.',
        },
        {
          type: 'table',
          caption: 'What the two reads tell the reviewer',
          head: ['When the two reads', 'What it means'],
          rows: [
            ['Agree', 'Confidence is high'],
            ['Disagree', 'That is a signal for the human reviewer'],
          ],
        },
        {
          type: 'p',
          text: "The service returns fields in the exact shape the dashboard's upload code expects, so extracted passports flow straight into the review screen. The full design is in [Passport OCR with AI: combining MRZ parsing and Claude vision](/blog/passport-ocr-mrz-claude-vision).",
        },
      ],
    },
    {
      id: 'human-review',
      eyebrow: 'Human gate',
      heading: 'A human review step built as a state machine',
      blocks: [
        {
          type: 'p',
          text: 'Nothing goes from OCR to the government pipeline automatically. Staff see each passport in the dashboard with its extracted fields and the original photos side by side.',
        },
        {
          type: 'p',
          text: "Only an explicit approval flips the passport's status to `QUEUED`. That status change is the entire interface between the review side and the submission side.",
        },
        {
          type: 'flow',
          caption: 'How a passport moves from review to staging',
          steps: ['OCR extracts fields', 'Staff compare with photos', 'Approval sets QUEUED', 'Bridge leases queued rows', 'Job staged in console'],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'A state machine, not an API call',
          text: 'The dashboard never talks to the bridge directly. It changes a database field, and the bridge leases whatever is queued. Modelling the pipeline as states makes every step resumable and inspectable.',
        },
      ],
    },
    {
      id: 'nusuk-bridge',
      eyebrow: 'The bridge',
      heading: 'Staging Nusuk portal submissions, one step short',
      blocks: [
        {
          type: 'p',
          text: "The bridge service turns queued passports into staged submission jobs. It builds each submission plan with the visa console's *own* plan builder, importing the client's existing code instead of reimplementing its logic. The staged job is exactly what the console would have produced by hand.",
        },
        {
          type: 'p',
          text: 'The final step, actually submitting to Nusuk, needs the operator to log in and run the submission command deliberately.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Not a missing feature',
          text: "Submitting to a government portal on someone's behalf is the one action in the pipeline that is irreversible, high-stakes and reputationally fatal to get wrong. So it stays behind a human keystroke.",
        },
        {
          type: 'p',
          text: "No pilgrim's visa rides on an unreviewed AI guess. I wrote more about this choice in [When not to let the AI finish the job](/blog/when-not-to-let-ai-finish-the-job).",
        },
      ],
    },
    {
      id: 'smoke-tests',
      eyebrow: 'Testing',
      heading: 'End-to-end smoke tests for an automation pipeline',
      blocks: [
        {
          type: 'p',
          text: 'A pipeline like this fails at the seams, not in the middle of a service. So the repo ships a smoke script that runs eleven end-to-end checks:',
        },
        {
          type: 'steps',
          items: [
            { title: 'Health checks', text: "Every service's health endpoint." },
            { title: 'A full agent turn', text: 'A message goes in, a passport comes out, and a reply is sent.' },
            { title: 'Bridge staging', text: 'An approved passport is staged as a submission job.' },
          ],
        },
        {
          type: 'quote',
          text: 'Does a WhatsApp photo still become a staged visa job?',
          cite: 'The one question the smoke script answers after any change',
        },
        {
          type: 'p',
          text: "How the services and the smoke script are set up is in [Building microservices to someone else's API contract](/blog/building-microservices-to-someone-elses-contract).",
        },
      ],
    },
  ],
  pullQuote: { text: 'Put AI where reading is hard and humans where mistakes are expensive.', after: 3 },
  takeaways: [
    'Model the pipeline as states in a database, not calls between services, so every step is resumable and inspectable.',
    'Put AI where reading is hard and humans where mistakes are expensive.',
    'A drain loop keeps webhooks fast, survives crashes and lets the agent treat a photo album as one submission.',
    'When automation touches an external system of record, stop one step short and hand a person a loaded, verified, one-keystroke action.',
    'Test the seams: one smoke script should tell you whether a WhatsApp photo still becomes a staged visa job.',
  ],
  faq: [
    {
      q: 'Can Umrah visa processing be automated?',
      a: 'Most of it can. In UmrahFlow, WhatsApp intake, passport reading and building the submission plan are automated. Staff still approve each passport, and an operator runs the final submission to the Nusuk portal by hand.',
    },
    {
      q: 'Does UmrahFlow submit visas to the Nusuk portal automatically?',
      a: 'No. The bridge stages a ready-to-submit job in the visa console, and the operator logs in and runs the submission command. Submitting to a government portal is irreversible, so it stays behind a human keystroke.',
    },
    {
      q: 'Why use a drain loop instead of processing WhatsApp webhooks directly?',
      a: 'Storing messages first and polling for unprocessed rows means slow OCR never blocks the webhook, a crashed agent loses nothing, and the agent can wait for a photo album to finish arriving before processing it as one submission.',
    },
    {
      q: 'How do you test a multi-service automation pipeline?',
      a: 'Test the seams. UmrahFlow has a smoke script with eleven end-to-end checks: every health endpoint, a full agent turn from message to passport to reply, and bridge staging.',
    },
  ],
};

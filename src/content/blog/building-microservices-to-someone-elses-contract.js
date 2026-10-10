export const meta = {
  id: 'building-microservices-to-someone-elses-contract',
  title: "Building Microservices to Someone Else's API Contract",
  excerpt:
    'How I rebuilt missing microservices to the exact API contract an existing dashboard expected, without editing its code, and ran five services with one command.',
  date: 'June 28, 2026',
  dateISO: '2026-06-28',
  category: 'Web development',
  keywords: [
    'building microservices',
    'consumer-driven contracts',
    'API contract design',
    'microservices integration testing',
    'smoke tests vs unit tests',
    'Makefile Docker Compose dev environment',
    'Python microservices',
  ],
  tags: ['Microservices', 'FastAPI', 'Docker', 'API design', 'DevOps'],
  project: 'umrahflow',
  cover: {
    src: '/img/blog/building-microservices-to-someone-elses-contract.webp',
    alt: 'Network switches and neatly bundled cables in a server rack',
  },
};

export default {
  dek:
    "The client's dashboard called services that no longer existed. I rebuilt them to match exactly what the dashboard expected, and it worked without a single edit.",
  stats: [
    { value: '3', label: 'Client repos my services had to fit' },
    { value: '5', label: 'Services started with one command' },
    { value: '11', label: 'Checks in the end-to-end smoke script' },
  ],
  sections: [
    {
      id: 'the-brief',
      eyebrow: 'The brief',
      heading: 'Rebuilding missing microservices for an existing app',
      blocks: [
        {
          type: 'p',
          text: 'Most microservices posts start from a blank slate: design the services, then the contracts, then build. [UmrahFlow](/projects/umrahflow), a freelance visa-automation project, handed me the opposite problem.',
        },
        {
          type: 'table',
          caption: 'What the client already had',
          head: ['Client repo', 'Its role'],
          rows: [
            ['Next.js review dashboard', 'Where staff review extracted passports'],
            ['Visa-submission console', 'Builds submission plans and runs visa submissions'],
            ['WhatsApp relay', 'Brings pilgrim messages in from WhatsApp'],
          ],
        },
        {
          type: 'p',
          text: "All three were working, and they referenced an ML services repo that **didn't exist anymore**. The dashboard was full of calls to an OCR service and assumptions about a background agent, with no implementation behind them.",
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'The assignment',
          text: "Rebuild the missing services so everything works, without touching the client's code.",
        },
      ],
    },
    {
      id: 'consumer-driven-contracts',
      eyebrow: 'The contract',
      heading: 'Consumer-driven contracts when the consumer is the only spec',
      blocks: [
        {
          type: 'p',
          text: 'With no spec and no old code, the API contract had to be dug out of the caller. Consumer-driven contracts are usually described as a testing discipline. Here they were literally the only spec.',
        },
        {
          type: 'table',
          caption: 'Where the contract was hiding in the dashboard',
          head: ['Dashboard source', 'What it told me'],
          rows: [
            ['Upload logic', 'The OCR response shape: snake_case fields nested under `primary`'],
            ['Prisma schema', 'What the agent had to produce: `Passport` rows, `AgentTrace` rows, and messages flipped from `processedAt = NULL`'],
            ['Environment variables', 'The ports each service was expected on'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'The rule I set myself',
          text: '**If the dashboard needs a change, my service is wrong.**',
        },
        {
          type: 'p',
          text: "That constraint sounds limiting, but it is clarifying. Every design question has an objective answer, and the answer is in someone else's code.",
        },
      ],
    },
    {
      id: 'two-services',
      eyebrow: 'Two shapes',
      heading: 'A request/response API and a background worker',
      blocks: [
        {
          type: 'p',
          text: 'The two rebuilt services ended up with very different shapes.',
        },
        {
          type: 'table',
          caption: 'The two rebuilt services',
          head: ['Aspect', 'OCR service', 'Agent service'],
          rows: [
            ['Shape', 'Classic request/response API in Python', 'One `/healthz` route and a background drain loop'],
            ['Input', 'A multipart image', 'Unprocessed messages in Postgres'],
            ['Output', 'Structured passport fields', 'OCR runs, database records and WhatsApp replies'],
            ['Consumers', 'HTTP callers', 'Database rows'],
          ],
        },
        {
          type: 'p',
          text: 'The OCR service uses the MRZ and Claude vision merge described in [Passport OCR with AI](/blog/passport-ocr-mrz-claude-vision).',
        },
        {
          type: 'p',
          text: 'I resisted the urge to give the agent a REST surface. Its consumers are database rows, not HTTP callers. A poll loop against Postgres is simpler, crash-safe, and needs no retry logic on the sending side.',
        },
      ],
    },
    {
      id: 'the-bridge',
      eyebrow: 'The bridge',
      heading: "Reusing the client's code instead of reimplementing it",
      blocks: [
        {
          type: 'p',
          text: 'The third piece, the bridge, moves approved passports into the visa console as staged submission jobs. The console has intricate logic for building a valid submission plan. The worst thing I could do was reimplement it and let two versions drift.',
        },
        {
          type: 'p',
          text: "So the bridge runs inside the console's own Python environment and imports its plan builder directly. The bridge stays a thin state-machine pump:",
        },
        {
          type: 'steps',
          items: [
            { title: 'Lease', text: 'Pick up passports with the status `QUEUED`.' },
            { title: 'Build', text: 'Call *their* plan builder, not a copy of it.' },
            { title: 'Stage', text: 'Stage the submission job in the console.' },
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Changes for free',
          text: 'When the client updates their console, the bridge inherits the changes for free.',
        },
      ],
    },
    {
      id: 'one-command',
      eyebrow: 'Dev setup',
      heading: 'Running five microservices with one command',
      blocks: [
        {
          type: 'p',
          text: "Five services across two languages, two of them the client's, plus Postgres and a WhatsApp container. That is a fragile dev environment unless you make orchestration a feature.",
        },
        {
          type: 'p',
          text: 'A Makefile became the single control surface:',
        },
        {
          type: 'code',
          lang: 'bash',
          code: 'make up      # start everything: Docker Compose for infra, native processes for the apps\nmake health  # hit every health endpoint\nmake down    # stop it all',
        },
        {
          type: 'p',
          text: 'One shared env file feeds every service, so a credential exists in exactly one place.',
        },
      ],
    },
    {
      id: 'smoke-tests',
      eyebrow: 'Testing',
      heading: 'Smoke tests over unit tests for microservice seams',
      blocks: [
        {
          type: 'p',
          text: "With this architecture the risk isn't inside any one service. It is in the seams. So the primary verification is an 11-check smoke script:",
        },
        {
          type: 'steps',
          items: [
            { title: 'Health', text: 'Hit every health endpoint.' },
            { title: 'A real agent turn', text: 'Inject a message, watch a passport appear, and see the reply go out.' },
            { title: 'Bridge staging', text: 'Check that the bridge stages the job.' },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Why smoke tests here',
          text: 'The script runs after every meaningful change. It answers the integration question directly, instead of by inference from mocks.',
        },
        {
          type: 'p',
          text: "The reward was a drop-in replacement: the client's dashboard worked without a single edit, which was the whole assignment. The full pipeline is described in [From WhatsApp photo to government portal](/blog/whatsapp-to-government-portal-visa-automation).",
        },
      ],
    },
  ],
  pullQuote: {
    text: "None of this is glamorous, but it's the difference between a system a client can run and a diagram they can admire.",
    after: 4,
  },
  takeaways: [
    "Read the consumer before designing the producer: its code, schema and config are the spec.",
    "Match the consumer's conventions, even where you would choose differently.",
    "Import the client's logic instead of reimplementing it, so two versions can never drift.",
    'Make orchestration a feature: one command to start, check and stop every service.',
    'Spend your testing budget on the seams between services.',
  ],
  faq: [
    {
      q: 'What is a consumer-driven contract?',
      a: "It is an API contract defined by what the consumer expects, not by what the producer would prefer. It is usually described as a testing discipline. On UmrahFlow the consumer's code was the only spec I had.",
    },
    {
      q: 'How do you rebuild a service when its spec and code are gone?',
      a: "Read the caller. The dashboard's upload logic gave me the OCR response shape, its Prisma schema showed what the agent had to write, and its environment variables gave the expected ports.",
    },
    {
      q: 'Does a background agent need a REST API?',
      a: 'Not if its consumers are database rows. The UmrahFlow agent service has only a `/healthz` route and a poll loop against Postgres, which is simpler, crash-safe, and needs no retry logic on the sending side.',
    },
    {
      q: 'Are smoke tests better than unit tests for microservices?',
      a: 'For a system like this one, the risk is in the seams between services. An end-to-end smoke script answers the integration question directly, where mocks can only answer it by inference.',
    },
    {
      q: 'How do you start several microservices with one command?',
      a: 'I used a Makefile: `make up` starts Docker Compose for the infrastructure and native processes for the apps, `make health` hits every health endpoint, and `make down` stops it all. One shared env file feeds every service.',
    },
  ],
};

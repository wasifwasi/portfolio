export const meta = {
  id: 'passport-ocr-mrz-claude-vision',
  title: 'Passport OCR with AI: Combining MRZ Parsing and Claude Vision',
  excerpt:
    'How UmrahFlow reads passports from WhatsApp photos: MRZ check digits verify what they can, Claude vision reads the rest, and any disagreement goes to a person.',
  date: 'June 21, 2026',
  dateISO: '2026-06-21',
  category: 'AI document processing',
  keywords: [
    'passport OCR with AI',
    'MRZ parsing',
    'Claude vision OCR',
    'AI document extraction',
    'OCR hallucination',
    'human in the loop OCR',
    'WhatsApp document processing',
  ],
  tags: ['Claude', 'Computer vision', 'OCR', 'Python'],
  project: 'umrahflow',
  cover: {
    src: '/img/blog/passport-ocr-mrz-claude-vision.webp',
    alt: 'Passport and smartphone on a desk beside a printed application form',
  },
};

export default {
  dek:
    'Neither classic OCR nor an AI vision model alone could read WhatsApp passport photos reliably enough for a visa application. Running both and merging them field by field could.',
  stats: [
    { value: '3', label: 'MRZ check digits: passport number, birth date and expiry date' },
    { value: '2', label: 'Vision providers behind one internal interface' },
    { value: '4', label: 'Endpoints in the OCR service' },
  ],
  sections: [
    {
      id: 'the-problem',
      eyebrow: 'The problem',
      heading: 'Why passport OCR from WhatsApp photos is hard',
      blocks: [
        {
          type: 'p',
          text: 'For [UmrahFlow](/projects/umrahflow), my Umrah visa-automation platform, I needed to turn WhatsApp photos of passports into structured data: names, passport numbers, dates and nationality. It had to be reliable enough to feed a government visa submission.',
        },
        {
          type: 'p',
          text: 'The photos are taken in queues and living rooms, and they arrive with every problem a camera can add:',
        },
        {
          type: 'list',
          items: [
            'Glare across the laminate',
            'Fingers over the corners',
            'Perspective skew from holding the phone at an angle',
            'Compression from WhatsApp itself',
          ],
        },
        {
          type: 'p',
          text: 'Neither reader on its own was good enough. Running both and merging them turned out to be the most interesting engineering problem in the whole project.',
        },
      ],
    },
    {
      id: 'mrz-parsing',
      eyebrow: 'Reader one',
      heading: 'MRZ parsing: trustworthy, but brittle on phone photos',
      blocks: [
        {
          type: 'p',
          text: 'Every passport has an MRZ, the machine-readable zone: two lines of `<<<`-padded text at the bottom of the photo page. It is designed for machines, with fixed positions, a restricted character set, and **check digits** over the passport number, the birth date and the expiry date.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Why check digits matter',
          text: 'When an MRZ read validates against its check digits, you can trust it almost completely. The data proves itself.',
        },
        {
          type: 'p',
          text: 'The problem is the input. On real-world phone photos, a local MRZ pass fails or garbles far too often to run a business on.',
        },
      ],
    },
    {
      id: 'claude-vision',
      eyebrow: 'Reader two',
      heading: 'Claude vision OCR: reads anything, including what is not there',
      blocks: [
        {
          type: 'p',
          text: "Claude's vision reads passports impressively: skewed, glared, even partly covered. It also reads the *visual zone*, the printed fields, which holds data the MRZ doesn't carry, such as place of birth.",
        },
        {
          type: 'p',
          text: 'But a vision model fails in the dangerous way. It does not say "unreadable". It produces a *plausible* passport number.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'The real risk with AI OCR',
          text: 'A wrong but confident digit in a visa application is worse than a hard failure, because nothing downstream looks broken.',
        },
      ],
    },
    {
      id: 'merging-readers',
      eyebrow: 'The merge',
      heading: 'How the two readers are merged, field by field',
      blocks: [
        {
          type: 'p',
          text: 'The OCR service runs both passes and merges them field by field. The rules are simple and boring on purpose:',
        },
        {
          type: 'table',
          caption: 'Which reader wins each field',
          head: ['Situation', 'Result', 'Why'],
          rows: [
            ['MRZ parses and its check digits validate', 'MRZ wins for the fields it covers', 'It verifies itself and cannot hallucinate'],
            ['The field is not in the MRZ (for example, place of birth)', 'Claude vision fills it', 'Only the visual zone has it'],
            ['The MRZ fails entirely on this photo', 'Claude vision covers the photo', 'A reading is better than none, and a person reviews it'],
            ['Both read the field and disagree', 'Neither wins; the field is flagged low confidence', 'The reviewer should look exactly where the readers diverge'],
          ],
        },
        {
          type: 'p',
          text: 'Downstream, a person sees the extracted fields next to the original photo. Disagreements are kept as flags instead of being resolved silently, so their attention goes where it is needed.',
        },
      ],
    },
    {
      id: 'fallback-chain',
      eyebrow: 'Reliability',
      heading: 'A fallback chain for the vision pass',
      blocks: [
        {
          type: 'p',
          text: 'The vision pass has its own fallback: Claude first, OpenAI if Claude errors or times out.',
        },
        {
          type: 'flow',
          caption: 'How one passport photo is read',
          steps: ['WhatsApp photo', 'Local MRZ pass', 'Claude vision (OpenAI fallback)', 'Field-by-field merge', 'Human review'],
        },
        {
          type: 'p',
          text: "Provider redundancy matters more here than in most systems. Input arrives in bursts, such as a group's ten passports right before a deadline, and the whole agency's intake stalls if extraction is down. Both providers sit behind one internal interface, so the merge logic neither knows nor cares which model did the reading.",
        },
      ],
    },
    {
      id: 'ocr-api-contract',
      eyebrow: 'The API',
      heading: "Building the OCR API to its consumer's contract",
      blocks: [
        {
          type: 'p',
          text: "One unglamorous detail did a lot of work. The service returns fields in the *exact* shape the existing dashboard's upload code expects: snake_case fields nested under a `primary` key. The dashboard predates my services and I had committed to not changing its code, so the OCR API was built to its consumer's expectations rather than my own preferences.",
        },
        {
          type: 'table',
          caption: 'OCR service endpoints',
          head: ['Endpoint', 'Purpose'],
          rows: [
            ['`POST /ocr`', 'Multipart photo uploads'],
            ['`POST /ocr/url`', 'Images that are already stored'],
            ['`POST /pdf`', 'Scanned documents'],
            ['`GET /healthz`', 'Health check used by the end-to-end smoke test'],
          ],
        },
        {
          type: 'p',
          text: 'More on building services to an existing contract in [Building Microservices to Someone Else\'s Contract](/blog/building-microservices-to-someone-elses-contract).',
        },
      ],
    },
    {
      id: 'reusable-pattern',
      eyebrow: 'The pattern',
      heading: 'A pattern you can reuse for any AI document reader',
      blocks: [
        {
          type: 'p',
          text: 'The approach applies to any "AI reads a document" problem:',
        },
        {
          type: 'steps',
          items: [
            { title: 'Pair a deterministic validator', text: 'Check digits, checksums, or a regex with a known structure.' },
            { title: 'With a flexible reader', text: 'A vision model that copes with messy real-world input.' },
            { title: 'Let the validator win where it can', text: 'Trust verified fields over plausible ones.' },
            { title: 'Surface disagreement to a person', text: 'Never resolve it silently.' },
          ],
        },
        {
          type: 'p',
          text: "You get the vision model's coverage without inheriting its confidence problem.",
        },
      ],
    },
  ],
  pullQuote: { text: 'AI does the reading; arithmetic does the trusting.', after: 3 },
  takeaways: [
    'MRZ parsing is trustworthy when its check digits validate, but it fails too often on phone photos to stand alone.',
    'A vision model covers messy photos and extra fields, but it can return a plausible wrong value instead of failing.',
    'Merge field by field: verified MRZ data wins, vision fills the gaps, and disagreements are flagged for a person.',
    'Put two vision providers behind one interface so bursts of work never stall on one outage.',
  ],
  faq: [
    {
      q: 'What is MRZ parsing?',
      a: 'The MRZ is the two lines of machine-readable text at the bottom of a passport photo page. Parsing it gives fixed-position fields plus check digits for the passport number, birth date and expiry date, so a valid read can be trusted almost completely.',
    },
    {
      q: 'Can an AI vision model read passports accurately?',
      a: "Claude's vision reads skewed, glared and partly covered passports well, including the printed visual zone. The catch is that when it is unsure it can still return a plausible value, so it needs a validator or a human check beside it.",
    },
    {
      q: 'How do you stop AI OCR from hallucinating values?',
      a: 'Let a deterministic validator such as MRZ check digits win wherever it can, use the vision model only to fill gaps, and flag any field where the two readers disagree for a person to review.',
    },
    {
      q: 'Why keep a person in the loop for visa data?',
      a: 'A wrong passport number in a visa application does real harm and looks correct. In UmrahFlow, staff review extracted fields next to the original photo before anything is queued for submission.',
    },
  ],
};

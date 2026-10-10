export const meta = {
  id: 'taming-whatsapp-as-an-app-input',
  title: 'WhatsApp Webhooks: Debouncing Photo Albums and Draining Queues',
  excerpt:
    'How I handle WhatsApp webhooks for a real business: a Twilio-compatible relay over WAHA, store-first processing, debounced photo albums and agent traces.',
  date: 'July 05, 2026',
  dateISO: '2026-07-05',
  category: 'Automation',
  keywords: [
    'WhatsApp webhook handling',
    'WAHA WhatsApp HTTP API',
    'WhatsApp bot photo album',
    'debounce incoming messages',
    'Twilio WhatsApp webhook format',
    'WhatsApp chatbot architecture',
    'chatbot logging and tracing',
  ],
  tags: ['WhatsApp', 'WAHA', 'Message queues', 'Integrations', 'Python'],
  project: 'umrahflow',
  cover: {
    src: '/img/blog/taming-whatsapp-as-an-app-input.webp',
    alt: 'Smartphone showing a chat thread on a cafe table beside a cup of tea',
  },
};

export default {
  dek:
    "Pilgrims will not install an app, so UmrahFlow's intake runs on WhatsApp. Five patterns turn photo albums, duplicate messages and mixed chatter into clean database records.",
  sections: [
    {
      id: 'why-whatsapp',
      eyebrow: 'Why WhatsApp',
      heading: 'Why build an app intake on WhatsApp',
      blocks: [
        {
          type: 'p',
          text: 'If your users are Umrah pilgrims, the interface question answers itself: they are already on WhatsApp, and they will not install your app. So the entire intake for [UmrahFlow](/projects/umrahflow) runs through WhatsApp.',
        },
        {
          type: 'p',
          text: 'That means turning the messiest input stream imaginable into clean database records:',
        },
        {
          type: 'list',
          items: [
            'Photos arrive as albums.',
            'Messages arrive twice.',
            'Questions arrive mixed in with documents.',
          ],
          ordered: false,
        },
        {
          type: 'p',
          text: 'Here is the machinery that copes with it.',
        },
      ],
    },
    {
      id: 'waha-relay',
      eyebrow: 'Infrastructure',
      heading: 'WAHA and a Twilio-compatible WhatsApp webhook',
      blocks: [
        {
          type: 'p',
          text: 'The first choice was infrastructure.',
        },
        {
          type: 'table',
          caption: 'Two ways to connect a WhatsApp number',
          head: ['Option', 'What it means for the agency'],
          rows: [
            ['Official WhatsApp Business API', "Meta's approval flows and usage-based pricing"],
            ['WAHA (WhatsApp HTTP API)', 'Self-hosted, runs in a container, speaks plain HTTP, and works with the existing number'],
          ],
        },
        {
          type: 'p',
          text: 'For an agency that lives on its *existing* WhatsApp number, WAHA is the pragmatic self-hosted route.',
        },
        {
          type: 'p',
          text: "In front of it sits a small relay that exposes a **Twilio-compatible** webhook format. That deliberate translation layer means the dashboard just implements a standard Twilio webhook. If the business ever moves to the official API through Twilio, the dashboard doesn't change at all.",
        },
        {
          type: 'flow',
          caption: 'How a WhatsApp message reaches the database',
          steps: ['Pilgrim on WhatsApp', 'WAHA container', 'Relay (Twilio format)', 'Dashboard webhook', 'Postgres'],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Adapters that imitate a standard',
          text: 'The relay is an adapter, and adapters are cheapest when they imitate a format the ecosystem already understands.',
        },
      ],
    },
    {
      id: 'store-first',
      eyebrow: 'Store first',
      heading: 'Store first, process later: queueing webhook messages',
      blocks: [
        {
          type: 'p',
          text: 'The webhook handler does almost nothing. It writes the message to Postgres and returns 200. All the real work happens in a separate agent service that polls for messages with `processedAt = NULL` on bot-enabled conversations.',
        },
        {
          type: 'p',
          text: "This store-first pattern is what makes WhatsApp's chaos manageable:",
        },
        {
          type: 'list',
          items: [
            '**Webhooks never time out**, no matter how slow OCR is.',
            '**A crashed agent resumes exactly where it left off**, because unprocessed rows are still unprocessed.',
            '**Retried webhook deliveries can be deduplicated at write time**, instead of causing double replies.',
          ],
          ordered: false,
        },
      ],
    },
    {
      id: 'photo-albums',
      eyebrow: 'Albums',
      heading: 'How to debounce WhatsApp photo albums',
      blocks: [
        {
          type: 'p',
          text: 'Here is the subtle bug in any naive implementation. A pilgrim selects six passport photos and hits send. WhatsApp delivers six separate messages over several seconds.',
        },
        {
          type: 'table',
          caption: 'Six photos sent as one album',
          head: ['Result', 'Process each message on arrival', 'Debounced drain'],
          rows: [
            ['OCR', 'Runs six times', 'Photos processed together'],
            ['Passport batches', 'Six', 'One'],
            ['Replies to the pilgrim', 'Six', 'One'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Why it matters',
          text: "Six replies make the bot look broken to exactly the person you're trying to impress.",
        },
        {
          type: 'p',
          text: 'The fix is a **debounce window**. The drain loop only picks up a conversation once no new message has arrived for a quiet period, so photos that arrive together are processed together. It is a few lines of SQL filtering by timestamp, and it is the difference between "wow" and "what is this thing doing".',
        },
      ],
    },
    {
      id: 'message-classification',
      eyebrow: 'Routing',
      heading: 'Classifying WhatsApp messages before OCR',
      blocks: [
        {
          type: 'p',
          text: 'Real conversations mix documents with chatter: greetings, questions, voucher photos, the occasional selfie. Before anything touches OCR, a classification step routes each drained batch.',
        },
        {
          type: 'table',
          caption: 'Where each kind of message goes',
          head: ['Input', 'Route'],
          rows: [
            ['Passport images', 'Passport extraction (OCR)'],
            ['Voucher images', 'Voucher handling'],
            ['Text', 'A conversational reply'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cheap mistakes by design',
          text: 'Classification errors are cheap *because* of the human review stage downstream. A selfie classified as a passport produces a garbage extraction that a reviewer deletes in two seconds, not a corrupted visa application.',
        },
        {
          type: 'p',
          text: 'How passport images are read is covered in [Passport OCR with AI](/blog/passport-ocr-mrz-claude-vision), and why the review stage exists in [When not to let the AI finish the job](/blog/when-not-to-let-ai-finish-the-job).',
        },
      ],
    },
    {
      id: 'agent-traces',
      eyebrow: 'Traces',
      heading: 'Debugging a WhatsApp chatbot with agent traces',
      blocks: [
        {
          type: 'p',
          text: "A web app shows you what the user saw. A chat pipeline doesn't. So every agent turn writes an `AgentTrace` that records:",
        },
        {
          type: 'list',
          items: [
            'What was drained',
            'How it was classified',
            'What OCR returned',
            'What reply was sent',
          ],
          ordered: false,
        },
        {
          type: 'p',
          text: 'When an agency staffer asks "why did the bot say this?", the answer is a database query, not archaeology.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Build it on day one',
          text: "If you build any conversational automation, build the trace table on day one. You cannot debug what you didn't record.",
        },
        {
          type: 'p',
          text: 'The rest of the pipeline, from these records to a staged visa job, is in [From WhatsApp photo to government portal](/blog/whatsapp-to-government-portal-visa-automation).',
        },
      ],
    },
  ],
  pullQuote: { text: 'WhatsApp is a terrible API and a perfect UX.', after: 0 },
  takeaways: [
    'Adapt to a standard wire format at the edge: with a Twilio-compatible relay, the dashboard would not change if the transport did.',
    'Store every message before processing it, so webhooks stay fast and a crash loses nothing.',
    'Debounce bursts into batches: one album should mean one batch and one reply.',
    'Classify before acting, and let human review make classification mistakes cheap.',
    "Trace every agent turn, because you cannot debug what you didn't record.",
  ],
  faq: [
    {
      q: 'What is WAHA?',
      a: 'WAHA (WhatsApp HTTP API) is a self-hosted way to connect a WhatsApp number to your software. It runs in a container and speaks plain HTTP, which suited an agency that wanted to keep using its existing number.',
    },
    {
      q: 'How do you handle WhatsApp photo albums in a bot?',
      a: 'Debounce them. WhatsApp delivers an album as separate messages over several seconds, so the drain loop only picks up a conversation once no new message has arrived for a quiet period. The album becomes one batch and gets one reply.',
    },
    {
      q: 'Why store WhatsApp webhook messages before processing them?',
      a: 'The webhook stays fast no matter how slow OCR is, a crashed agent resumes where it left off because unprocessed rows are still unprocessed, and retried deliveries can be deduplicated at write time.',
    },
    {
      q: 'Why make a WhatsApp relay Twilio-compatible?',
      a: "The dashboard then implements a standard Twilio webhook. If the business ever moves to the official WhatsApp API through Twilio, the dashboard doesn't change at all.",
    },
    {
      q: 'How do you debug a WhatsApp chatbot?',
      a: 'Record every turn. In UmrahFlow each agent turn writes an `AgentTrace` with what was drained, how it was classified, what OCR returned and what reply was sent, so "why did the bot say this?" becomes a database query.',
    },
  ],
};

export const meta = {
  id: 'ai-powered-car-maintenance',
  title: 'AI Car Maintenance App: Reading Dashboard Lights with Gemini',
  excerpt:
    'How I built an AI car maintenance app with React Native and Google Gemini that explains dashboard warning lights, checks tire photos and reviews repair quotes.',
  date: 'January 05, 2026',
  dateISO: '2026-01-05',
  category: 'Mobile',
  keywords: [
    'AI car maintenance app',
    'dashboard warning light scanner',
    'Google Gemini image analysis',
    'React Native Gemini integration',
    'AI tire inspection',
    'car repair quote analyzer',
    'Expo Node.js Gemini backend',
  ],
  tags: ['React Native', 'Google Gemini', 'Expo', 'Node.js', 'Mobile'],
  project: 'prove-it-auto',
  cover: {
    src: '/img/blog/ai-powered-car-maintenance.webp',
    alt: 'Car with its bonnet open in a repair workshop, a tablet resting on the fender',
  },
};

export default {
  dek:
    'Most drivers do not know what their dashboard warning lights mean. I built a React Native app that sends a photo to Google Gemini and explains what each light means, how urgent it is and what to do next.',
  sections: [
    {
      id: 'the-problem',
      eyebrow: 'The problem',
      heading: 'Why dashboard warning lights confuse car owners',
      blocks: [
        {
          type: 'p',
          text: 'Car maintenance can be confusing, especially when a mysterious light appears on the dashboard. For [Prove It Auto](/projects/prove-it-auto), I built an AI-powered mobile app with React Native and Google Gemini to help car owners understand and deal with their maintenance needs.',
        },
        {
          type: 'p',
          text: 'Most car owners do not know what their warning lights mean. That usually ends one of two ways:',
        },
        {
          type: 'list',
          items: ['They ignore a critical issue', 'They overpay for a simple fix'],
        },
        {
          type: 'p',
          text: 'The traditional alternatives are manual lookups or expensive diagnostic tools. I wanted the answer to start with a photo from the owner\'s phone.',
        },
      ],
    },
    {
      id: 'features',
      eyebrow: 'The app',
      heading: 'What the AI car maintenance app does',
      blocks: [
        {
          type: 'p',
          text: 'The app has three AI features. Each one takes something the owner already has, a photo or a mechanic\'s quote, and turns it into an explanation they can act on.',
        },
        {
          type: 'table',
          caption: 'The three features at a glance',
          head: ['Feature', 'The user sends', 'The AI returns'],
          rows: [
            ['Dashboard light scanner', 'A photo of the dashboard', 'What each visible light means, how urgent it is, and step-by-step next steps'],
            ['Tire inspection', 'A photo of a tire', 'Wear patterns, tread depth issues and possible alignment problems'],
            ['Quote analyzer', 'A repair quote from a mechanic', 'Whether the pricing is fair, services that may be unnecessary, and questions to ask'],
          ],
        },
      ],
    },
    {
      id: 'dashboard-light-scanner',
      eyebrow: 'Feature one',
      heading: 'How the AI dashboard warning light scanner works',
      blocks: [
        {
          type: 'p',
          text: 'Users snap a photo of their dashboard. The AI identifies all the visible warning lights and, for each one, explains:',
        },
        {
          type: 'list',
          items: ['**What it means**', '**How urgent it is**', '**What to do next**, step by step'],
        },
        {
          type: 'p',
          text: 'The guidance covers both outcomes: a simple fix the owner can handle, or a problem that needs professional attention.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'The question that matters',
          text: 'For most drivers, the name of the light is not the point. What they need to know is whether this is a simple fix or a job for a professional.',
        },
      ],
    },
    {
      id: 'tires-and-quotes',
      eyebrow: 'More features',
      heading: 'AI tire inspection and repair quote analysis',
      blocks: [
        {
          type: 'p',
          text: 'Beyond dashboard lights, the app analyzes tire condition from photos. It looks for wear patterns, tread depth issues and potential alignment problems, so users know when it is time for a rotation or a replacement.',
        },
        {
          type: 'p',
          text: 'The quote analyzer is one of the most valuable features. Users upload a repair quote from their mechanic, and the AI:',
        },
        {
          type: 'list',
          items: [
            'Evaluates whether the pricing is fair',
            'Identifies services that may be unnecessary',
            'Suggests questions to ask the mechanic',
          ],
        },
      ],
    },
    {
      id: 'gemini-react-native',
      eyebrow: 'Under the hood',
      heading: 'How I integrated Google Gemini with React Native and Expo',
      blocks: [
        {
          type: 'p',
          text: 'I chose Google Gemini for its multimodal capabilities. It can analyze images, which is what the photo features in the app depend on.',
        },
        {
          type: 'p',
          text: 'The React Native app uses Expo for cross-platform deployment. The app does not call Gemini directly: a Node.js backend handles the Gemini API calls.',
        },
        {
          type: 'flow',
          caption: 'How one photo becomes an answer',
          steps: ['Photo taken in the app', 'Image compressed', 'Node.js backend calls Gemini', 'Explanation and next steps shown'],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Compress before you call the API',
          text: 'I compress images before they go to Gemini. Smaller images cut API costs and response times. The goal is to shrink them without losing the detail the analysis needs.',
        },
        {
          type: 'p',
          text: 'For another Expo app built on Gemini, see [PureX: barcode scanning and water quality](/blog/barcode-scanning-water-quality-mobile-gemini).',
        },
      ],
    },
  ],
  pullQuote: {
    text: 'AI can democratize expertise, giving everyday car owners the knowledge they need to make informed maintenance decisions.',
    after: 1,
  },
  takeaways: [
    'Most car owners do not know what their warning lights mean, so they either ignore real problems or overpay for simple fixes.',
    "Gemini's multimodal capabilities let a phone photo of a dashboard or a tire become the input for an explanation.",
    'A useful answer goes beyond naming the light: what it means, how urgent it is and what to do next.',
    'The quote analyzer helps owners judge a repair quote and gives them questions to ask the mechanic.',
    'Keep Gemini calls on a Node.js backend and compress images first to control API costs and response times.',
  ],
  faq: [
    {
      q: 'Can AI identify car dashboard warning lights from a photo?',
      a: 'In my app, users photograph their dashboard and Google Gemini identifies the visible warning lights. For each one it explains what it means, how urgent it is and what to do next.',
    },
    {
      q: 'Why use Google Gemini for a car maintenance app?',
      a: 'I chose Gemini for its multimodal capabilities. It can analyze photos of dashboards and tires, which is what the main features need.',
    },
    {
      q: 'Can an app check tire condition from a photo?',
      a: 'The app analyzes tire photos for wear patterns, tread depth issues and potential alignment problems, and tells users when it is time for a rotation or a replacement.',
    },
    {
      q: 'How does the repair quote analyzer work?',
      a: 'Users upload a quote from their mechanic. The AI evaluates whether the pricing is fair, identifies services that may be unnecessary and suggests questions to ask the mechanic.',
    },
    {
      q: 'How do you keep Gemini API costs down in a mobile app?',
      a: 'Images are compressed before they are sent for analysis, which cuts API costs and response times. The Gemini calls go through a Node.js backend rather than straight from the app.',
    },
  ],
};

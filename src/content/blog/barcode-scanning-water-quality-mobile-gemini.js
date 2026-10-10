export const meta = {
  id: 'barcode-scanning-water-quality-mobile-gemini',
  title: 'Barcode Scanning App with Expo and Gemini: How I Built PureX',
  excerpt:
    'How I built PureX, a barcode scanning app on React Native and Expo that uses Gemini to explain products and local water quality, with Supabase and RevenueCat.',
  date: 'May 12, 2026',
  dateISO: '2026-05-12',
  category: 'Mobile',
  keywords: [
    'barcode scanning app',
    'React Native barcode scanner',
    'Expo camera barcode scanning',
    'Google Gemini React Native',
    'water quality app',
    'Supabase Expo authentication',
    'RevenueCat Expo subscriptions',
    'Sign in with Apple Expo',
  ],
  tags: ['React Native', 'Expo', 'Google Gemini', 'Supabase', 'RevenueCat'],
  project: 'purex',
  cover: {
    src: '/img/blog/barcode-scanning-water-quality-mobile-gemini.webp',
    alt: 'Smartphone scanning the barcode on a bottle of drinking water',
  },
};

export default {
  dek:
    'PureX turns a phone into a personal health and safety scanner. Scan a product barcode for nutrition and safety insights, or use your location for local water-quality reports, with Google Gemini explaining both.',
  sections: [
    {
      id: 'what-purex-does',
      eyebrow: 'The app',
      heading: 'A barcode scanning app for product and water safety',
      blocks: [
        {
          type: 'p',
          text: 'I built [PureX](/projects/purex) at AIDEVGEN with React Native and Expo, Google Gemini for analysis and Supabase on the back end. It does two things:',
        },
        {
          type: 'table',
          caption: 'Two ways to use PureX',
          head: ['Feature', 'Input', 'What the user gets'],
          rows: [
            ['Product scan', 'The camera reads a product barcode', 'AI-analysed nutrition and safety insights'],
            ['Water quality', 'The device location', 'Water-quality reports for their area'],
          ],
        },
        {
          type: 'p',
          text: 'This is how the pieces fit together.',
        },
        {
          type: 'table',
          caption: 'The PureX stack',
          head: ['Job', 'Tool'],
          rows: [
            ['Mobile framework', 'React Native and Expo'],
            ['Barcode scanning', '`expo-camera`'],
            ['Location', '`expo-location`'],
            ['AI analysis', 'Google Gemini through `@google/genai`'],
            ['Data and auth', 'Supabase'],
            ['Sign-in on iOS', 'Apple authentication through `expo-apple-authentication`'],
            ['Subscriptions', 'RevenueCat through `react-native-purchases`'],
            ['Reports', '`expo-print` and `expo-sharing`'],
          ],
        },
      ],
    },
    {
      id: 'expo-camera-barcode-scanning',
      eyebrow: 'Scanning',
      heading: 'Barcode scanning with expo-camera and location with expo-location',
      blocks: [
        {
          type: 'p',
          text: 'Barcode scanning runs on `expo-camera`, and water-quality lookups use `expo-location`.',
        },
        {
          type: 'p',
          text: 'The real work is making scanning feel instant across a wide range of products and lighting conditions. The camera pipeline has to:',
        },
        {
          type: 'list',
          items: [
            'Respond quickly',
            'Give the user clear feedback',
            'Degrade gracefully when a code is damaged or unusual',
          ],
          ordered: false,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Lean on Expo modules',
          text: "Expo's modules made this far less painful than wiring native code by hand.",
        },
      ],
    },
    {
      id: 'gemini-insights',
      eyebrow: 'AI analysis',
      heading: 'Using Google Gemini to turn scan data into health insights',
      blocks: [
        {
          type: 'p',
          text: 'A barcode or a location reading means nothing on its own. Google Gemini, through `@google/genai`, interprets the scanned product or the regional data into clear, actionable insights:',
        },
        {
          type: 'list',
          items: [
            'What is in a product',
            'What to watch for',
            'What a water report actually means for you',
          ],
          ordered: false,
        },
        {
          type: 'flow',
          caption: 'From scan to insight',
          steps: ['Barcode or location', 'Product or regional data', 'Gemini analysis', 'Plain-language insight'],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'The bar is trust',
          text: 'People make health decisions on this output, so it has to be readable and reliable.',
        },
      ],
    },
    {
      id: 'supabase-revenuecat',
      eyebrow: 'Accounts & payments',
      heading: 'Supabase auth, Sign in with Apple and RevenueCat subscriptions in Expo',
      blocks: [
        {
          type: 'p',
          text: 'Supabase handles data and authentication. Pairing it with Apple authentication (`expo-apple-authentication`) gives iOS users the fast, privacy-respecting sign-in they expect, while Supabase stores user data and history behind it.',
        },
        {
          type: 'p',
          text: 'The premium tier runs on RevenueCat (`react-native-purchases`), which abstracts the cross-platform pain of in-app purchases.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dev-client builds need care',
          text: 'Integrating subscriptions and Apple auth cleanly inside an Expo dev-client build takes care. Build properties and entitlements have to line up.',
        },
        {
          type: 'p',
          text: 'Once they do, RevenueCat removes most of the receipt-validation drudgery.',
        },
      ],
    },
    {
      id: 'native-polish',
      eyebrow: 'Polish',
      heading: 'Expo modules that make a utility app feel native',
      blocks: [
        {
          type: 'p',
          text: 'The details are what make a utility app feel premium. PureX uses:',
        },
        {
          type: 'list',
          items: [
            'Haptics',
            'Blur',
            'Gradients',
            'Push notifications',
            'Report generation and sharing with `expo-print` and `expo-sharing`',
          ],
          ordered: false,
        },
        {
          type: 'p',
          text: 'Each is a small Expo module. Together they push the app from "functional" to "feels native".',
        },
      ],
    },
    {
      id: 'lessons',
      eyebrow: 'Takeaways',
      heading: 'What I learned building a React Native AI app',
      blocks: [
        {
          type: 'p',
          text: 'A focused mobile app can combine camera, location and AI into something useful without becoming bloated.',
        },
        {
          type: 'p',
          text: 'Expo carried the heavy native lifting. The product work was making the AI insights trustworthy and the scanning fast. Get those two right and the rest is polish.',
        },
        {
          type: 'p',
          text: 'I also paired Gemini with React Native for car maintenance in [Building an AI-Powered Car Maintenance App](/blog/ai-powered-car-maintenance).',
        },
      ],
    },
  ],
  pullQuote: {
    text: 'The output has to be readable and reliable, because people are making health decisions on it.',
    after: 2,
  },
  takeaways: [
    'Expo modules such as `expo-camera` and `expo-location` handle the native work, so the effort can go into making scanning feel instant.',
    'A barcode or a location reading means little until AI turns it into a plain-language insight.',
    'When people make health decisions on AI output, readability and reliability are the bar.',
    'RevenueCat removes most of the receipt-validation work, but an Expo dev-client build still needs build properties and entitlements to line up.',
  ],
  faq: [
    {
      q: 'How does PureX scan barcodes?',
      a: 'With `expo-camera` in a React Native and Expo app. The camera pipeline is built to respond quickly, give clear feedback and degrade gracefully when a code is damaged or unusual.',
    },
    {
      q: 'What does Google Gemini do in the app?',
      a: 'Gemini, through `@google/genai`, interprets scanned product data or regional water data into clear insights: what is in a product, what to watch for and what a water report means for you.',
    },
    {
      q: 'How do you add subscriptions to an Expo app?',
      a: 'PureX uses RevenueCat through `react-native-purchases`, which handles the cross-platform in-app purchase work and most of the receipt validation. In an Expo dev-client build, the build properties and entitlements have to line up.',
    },
    {
      q: 'Which backend does PureX use?',
      a: 'Supabase, for data and authentication. It is paired with Apple authentication through `expo-apple-authentication`, and Supabase stores user data and history.',
    },
  ],
};

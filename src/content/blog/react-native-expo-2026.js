export const meta = {
  id: 'react-native-expo-2026',
  title: 'React Native with Expo in 2026: My Cross-Platform Mobile Stack',
  excerpt:
    'Why React Native with Expo is my default for cross-platform apps: EAS builds, Expo Router, the New Architecture, native modules and lessons from FreeNote.',
  date: 'March 15, 2026',
  dateISO: '2026-03-15',
  category: 'Mobile',
  keywords: [
    'React Native with Expo',
    'Expo EAS build',
    'Expo Router file-based routing',
    'React Native New Architecture',
    'Expo Modules API',
    'cross-platform mobile app development',
    'React Native startup stack',
  ],
  tags: ['React Native', 'Expo', 'TypeScript', 'Mobile'],
  project: null,
  cover: {
    src: '/img/blog/react-native-expo-2026.webp',
    alt: 'Three smartphones of different sizes showing the same app layout',
  },
};

export default {
  dek:
    'Expo SDK 54 with React Native 0.81 covers builds, updates, routing and native code in one toolchain. This is why it is my first choice for cross-platform mobile apps, and how it held up in a real app.',
  stats: [
    { value: '54', label: 'Expo SDK version covered in this post' },
    { value: '0.81', label: 'React Native version paired with it' },
    { value: '2', label: 'Platforms from one codebase, plus web' },
  ],
  sections: [
    {
      id: 'why-expo',
      eyebrow: 'The platform',
      heading: 'Why use Expo for React Native development in 2026',
      blocks: [
        {
          type: 'p',
          text: 'React Native has come a long way. The developer experience is smoother, the ecosystem is mature, and the performance gap with fully native apps is much smaller than it used to be.',
        },
        {
          type: 'p',
          text: 'Expo is a big part of that. It started as a quick prototyping tool and is now a full production platform. The main reason is **EAS (Expo Application Services)**, which covers the parts of mobile development that used to take the most time:',
        },
        {
          type: 'table',
          caption: 'What EAS handles for you',
          head: ['EAS feature', 'What it gives you'],
          rows: [
            ['Cloud builds', 'iOS and Android builds without opening Xcode or Android Studio'],
            ['Over-the-air (OTA) updates', 'Updates delivered to apps that are already installed'],
            ['App store submission', 'Builds sent to the app stores from the same toolchain'],
          ],
        },
        {
          type: 'p',
          text: 'Then there is **Expo Router**, which brings file-based routing to mobile. If you have used Next.js it will feel familiar: your folder structure becomes your navigation.',
        },
      ],
    },
    {
      id: 'new-architecture',
      eyebrow: 'Under the hood',
      heading: 'React Native 0.81 and the New Architecture',
      blocks: [
        {
          type: 'p',
          text: 'Expo SDK 54 pairs with React Native 0.81, which runs on the **New Architecture** by default. Three pieces make it up:',
        },
        {
          type: 'table',
          caption: 'The New Architecture in brief',
          head: ['Piece', 'What it does'],
          rows: [
            ['Fabric', 'The new renderer'],
            ['TurboModules', 'The new system for native modules'],
            ['JSI (JavaScript Interface)', 'Lets JavaScript talk to native code directly, without the old bridge'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Why JSI matters',
          text: 'With no bridge in the middle, calls between JavaScript and native code are faster. You feel the difference most in heavy operations.',
        },
      ],
    },
    {
      id: 'typescript',
      eyebrow: 'Type safety',
      heading: 'Using TypeScript with React Native and Expo',
      blocks: [
        {
          type: 'p',
          text: 'TypeScript is now the standard in the React Native ecosystem, not an optional extra. Expo SDK 54 supports it out of the box, and the type definitions for React Native APIs are thorough.',
        },
        {
          type: 'p',
          text: 'I pair it with **Zustand** for state management and with typed navigation. Together they give you type safety from the data layer all the way to the screens.',
        },
      ],
    },
    {
      id: 'native-modules',
      eyebrow: 'Native code',
      heading: 'Using native modules in Expo without ejecting',
      blocks: [
        {
          type: 'p',
          text: 'You no longer have to eject from Expo to use a native module. Two tools took its place:',
        },
        {
          type: 'table',
          caption: 'How Expo handles native code',
          head: ['Tool', 'What it does'],
          rows: [
            ['Expo Modules API', 'Write native Swift or Kotlin code that plugs straight into your JavaScript layer'],
            ['Config plugins', 'Apply native configuration automatically, so libraries work without manual linking'],
          ],
        },
        {
          type: 'p',
          text: 'That is how libraries like Google Sign-In and `expo-camera` drop into a project. [PureX](/projects/purex), another of my Expo apps, scans product barcodes with `expo-camera`. More on that build in [Barcode Scanning Meets Water Quality](/blog/barcode-scanning-water-quality-mobile-gemini).',
        },
      ],
    },
    {
      id: 'real-world-performance',
      eyebrow: 'In practice',
      heading: 'React Native performance in a real app',
      blocks: [
        {
          type: 'p',
          text: '[FreeNote](/projects/freenote-app), an AI voice note app I built at AIDEVGEN, runs on this exact stack. In practice it delivered:',
        },
        {
          type: 'list',
          items: [
            'Fast screen transitions',
            'Smooth animations with Reanimated',
            'Audio recording with real-time duration tracking',
            'Almost all of the code shared between iOS and Android',
          ],
        },
        {
          type: 'p',
          text: 'In everyday use, it feels like a native app.',
        },
      ],
    },
    {
      id: 'startup-stack',
      eyebrow: 'The stack',
      heading: 'A complete React Native stack for startups',
      blocks: [
        {
          type: 'p',
          text: 'For startups, React Native with Expo is a strong default: one team, one codebase, two platforms, plus web support through Expo. Add a backend and a subscription service and you have a complete production stack.',
        },
        {
          type: 'table',
          caption: 'A production mobile stack',
          head: ['Layer', 'Choice'],
          rows: [
            ['App framework', 'React Native with Expo (iOS, Android and web)'],
            ['Language and state', 'TypeScript with Zustand'],
            ['Builds and releases', 'EAS: cloud builds, OTA updates and store submission'],
            ['Backend', 'Firebase or Supabase'],
            ['Subscriptions', 'RevenueCat'],
          ],
        },
        {
          type: 'p',
          text: 'I use both backend options. FreeNote runs on Firebase and PureX on Supabase, and both use RevenueCat for subscriptions. With this setup, a small team can get from idea to the app stores quickly.',
        },
        {
          type: 'p',
          text: 'If you are starting a mobile project in 2026, React Native with Expo is the stack I would pick first.',
        },
      ],
    },
  ],
  pullQuote: { text: 'The days of ejecting from Expo to use native modules are over.', after: 3 },
  takeaways: [
    'Expo is now a production platform: EAS handles cloud builds, over-the-air updates and app store submission.',
    'Expo SDK 54 pairs with React Native 0.81, which runs on the New Architecture (Fabric, TurboModules and JSI) by default.',
    'TypeScript is the standard, and Zustand plus typed navigation keeps the whole app type-safe.',
    'The Expo Modules API and config plugins let you use native code and native libraries without ejecting.',
    'Add Firebase or Supabase and RevenueCat, and one team can ship iOS, Android and web from one codebase.',
  ],
  faq: [
    {
      q: 'Is Expo good for production apps?',
      a: 'Yes. Expo has grown from a prototyping tool into a production platform. EAS gives you cloud builds, over-the-air updates and app store submission. I built FreeNote with React Native and Expo.',
    },
    {
      q: 'Which React Native version does Expo SDK 54 use?',
      a: 'Expo SDK 54 pairs with React Native 0.81, which runs on the New Architecture, with the Fabric renderer and TurboModules, by default.',
    },
    {
      q: 'Do you need to eject from Expo to use native modules?',
      a: 'No. The Expo Modules API lets you write native Swift or Kotlin code, and config plugins apply native configuration automatically, so libraries such as Google Sign-In and expo-camera work without manual linking.',
    },
    {
      q: 'What backend works well with React Native and Expo?',
      a: 'Firebase and Supabase both pair well with it. I use Firebase in FreeNote and Supabase in PureX, with RevenueCat handling subscriptions in both.',
    },
  ],
};

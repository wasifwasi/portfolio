export const meta = {
  id: 'openclaw-personal-ai-gateway',
  title: 'OpenClaw: A Self-Hosted AI Assistant for Your Messaging Apps',
  excerpt:
    'What OpenClaw is: an open-source, self-hosted AI gateway that brings AI agents into WhatsApp, Telegram, Discord and iMessage, running on your own hardware.',
  date: 'March 10, 2026',
  dateISO: '2026-03-10',
  category: 'AI agents',
  keywords: [
    'OpenClaw',
    'what is OpenClaw',
    'self-hosted AI assistant',
    'OpenClaw WhatsApp',
    'personal AI gateway',
    'AI assistant for Telegram and Discord',
    'open-source AI agent',
    'privacy-first AI assistant',
  ],
  tags: ['OpenClaw', 'AI Agents', 'Self-Hosted', 'WhatsApp'],
  project: null,
  cover: {
    src: '/img/blog/openclaw-personal-ai-gateway.webp',
    alt: 'Mini PC home server and router on a bookshelf, a smartphone on the shelf below',
  },
};

export default {
  dek:
    'OpenClaw is an open-source, self-hosted gateway that connects the messaging apps you already use to AI agents. It runs on your own hardware, uses the models you choose, and can actually do things, not just chat.',
  sections: [
    {
      id: 'what-is-openclaw',
      eyebrow: 'The basics',
      heading: 'What is OpenClaw?',
      blocks: [
        {
          type: 'p',
          text: 'Imagine a personal AI assistant that lives inside WhatsApp, Telegram, Discord and iMessage. It runs on your own hardware, keeps your data under your control, and can actually do things: clear your inbox, manage your calendar and browse the web. That is OpenClaw.',
        },
        {
          type: 'p',
          text: 'OpenClaw is an open-source, self-hosted AI gateway that bridges your messaging apps with AI agents. Unlike cloud-hosted assistants, it runs on your machine as a single Gateway process.',
        },
        {
          type: 'table',
          caption: 'OpenClaw at a glance',
          head: ['Question', 'Answer'],
          rows: [
            ['What is it?', 'An open-source, self-hosted gateway between your messaging apps and AI agents'],
            ['Where does it run?', 'On your own machine, as a single Gateway process'],
            ['Which models?', 'Claude, GPT or local models, with your own API keys'],
            ['License', 'MIT'],
            ['How is it set up?', 'An install script, then an onboarding wizard'],
          ],
        },
      ],
    },
    {
      id: 'multi-channel',
      eyebrow: 'Channels',
      heading: 'One AI gateway for WhatsApp, Telegram, Discord and iMessage',
      blocks: [
        {
          type: 'p',
          text: 'The standout feature is multi-channel connectivity. One Gateway process manages WhatsApp, Telegram, Discord, Slack, Signal and iMessage at the same time. You configure each channel once, and your assistant is available on all of them, with persistent memory and context across conversations.',
        },
        {
          type: 'flow',
          caption: 'How a message reaches your assistant',
          steps: ['Your message in any chat app', 'OpenClaw Gateway', 'AI agent and its tools', 'Reply in the same chat'],
        },
      ],
    },
    {
      id: 'agent-native',
      eyebrow: 'Agents',
      heading: 'Built for AI agents, not just a chatbot',
      blocks: [
        {
          type: 'p',
          text: 'OpenClaw is not a chatbot wrapper. It is built for agentic AI, with support for:',
        },
        {
          type: 'list',
          items: ['Tool use', 'Sessions', 'Memory', 'Multi-agent routing with isolated workspaces'],
        },
        {
          type: 'p',
          text: 'That lets your assistant browse the web, write and run code, work with APIs, manage files and control your system. It works with Claude, GPT and local models, so you choose the model behind it.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Real access needs real limits',
          text: 'An assistant that can run code and control your system needs clear limits on who can message it and what it can touch. I cover that in the [OpenClaw setup guide](/blog/openclaw-deep-dive-setup).',
        },
      ],
    },
    {
      id: 'use-cases',
      eyebrow: 'Use cases',
      heading: 'What you can ask a personal AI assistant in your chat apps',
      blocks: [
        {
          type: 'p',
          text: 'The use cases are practical. A few example requests:',
        },
        {
          type: 'table',
          caption: 'Example requests',
          head: ['Channel', 'You send', 'OpenClaw'],
          rows: [
            ['WhatsApp', '"check me in for my flight tomorrow"', 'Handles the check-in'],
            ['Telegram', '"summarize my unread emails"', 'Replies with a short digest'],
            ['Discord', '"create a PR for the bug fix on branch hotfix-auth"', 'Runs the git commands'],
          ],
        },
        {
          type: 'p',
          text: 'It integrates with services such as Spotify, Gmail, GitHub and Obsidian, which is what makes it a real digital assistant rather than a chat window.',
        },
      ],
    },
    {
      id: 'setup',
      eyebrow: 'Setup',
      heading: 'How to set up OpenClaw',
      blocks: [
        {
          type: 'steps',
          items: [
            { title: 'Run the install script', text: 'Installation is a single command.' },
            { title: 'Run the onboarding wizard', text: 'It configures authentication, gateway settings and channels.' },
            { title: 'Open the Web Control UI', text: 'A browser dashboard on localhost for managing chats and monitoring sessions.' },
            { title: 'Add the mobile apps (optional)', text: 'iOS and Android companion apps give you mobile access, with voice.' },
          ],
        },
        {
          type: 'p',
          text: 'For a hands-on walkthrough of channels, custom skills, multiple agents and production deployment, see my [OpenClaw setup guide](/blog/openclaw-deep-dive-setup).',
        },
      ],
    },
    {
      id: 'privacy',
      eyebrow: 'Privacy',
      heading: 'A privacy-first AI assistant you control',
      blocks: [
        {
          type: 'p',
          text: 'Many AI services want your data. OpenClaw takes the opposite approach: the Gateway runs locally, you bring your own API keys, and you choose your own models. For developers handling sensitive code or business data, that control matters.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'What "local" covers',
          text: 'The Gateway, its settings and your keys stay on your machine. The model you choose still processes the messages it answers, so if nothing should leave your hardware, pair OpenClaw with a local model.',
        },
      ],
    },
    {
      id: 'extensibility',
      eyebrow: 'Extensibility',
      heading: 'Extending OpenClaw with plugins and community skills',
      blocks: [
        {
          type: 'p',
          text: "OpenClaw's plugin system lets the community add new channels, tools and capabilities. It can also write new skills for itself based on your requests.",
        },
        {
          type: 'p',
          text: 'A growing set of community skills means its functionality keeps expanding without waiting for core updates.',
        },
      ],
    },
  ],
  pullQuote: {
    text: 'Personal AI does not have to be a cloud service you subscribe to. It can be an open-source tool you own and control.',
    after: 2,
  },
  takeaways: [
    'OpenClaw is an open-source, MIT-licensed gateway that connects your messaging apps to AI agents and runs on your own hardware.',
    'One Gateway process serves WhatsApp, Telegram, Discord, Slack, Signal and iMessage, with memory and context across conversations.',
    'It is built for agents: tool use, sessions, memory and multi-agent routing, with Claude, GPT or local models.',
    'You keep control of your keys and models; for fully local processing, pair it with a local model.',
    'Plugins and community skills let it grow without waiting for core updates.',
  ],
  faq: [
    {
      q: 'What is OpenClaw?',
      a: 'OpenClaw is an open-source, self-hosted AI gateway that bridges messaging apps such as WhatsApp, Telegram, Discord and iMessage with AI agents. It runs on your own machine as a single Gateway process and is MIT licensed.',
    },
    {
      q: 'Which messaging apps does OpenClaw work with?',
      a: 'Its channels include WhatsApp, Telegram, Discord, Slack, Signal and iMessage, all managed by one Gateway process.',
    },
    {
      q: 'Which AI models can OpenClaw use?',
      a: 'It works with Claude, GPT and local models. You bring your own API keys and choose the model.',
    },
    {
      q: 'Is OpenClaw private?',
      a: 'The Gateway runs locally and you keep control of your keys and models. The model you choose still sees the messages it answers, so use a local model if nothing should leave your hardware.',
    },
    {
      q: 'How do you install OpenClaw?',
      a: 'Run the install script, then the onboarding wizard to set up authentication, gateway settings and channels. The Web Control UI on localhost lets you manage chats and sessions in a browser.',
    },
  ],
};

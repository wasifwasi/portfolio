export const meta = {
  id: 'openclaw-deep-dive-setup',
  title: 'OpenClaw Setup Guide: Channels, Custom Skills and Deployment',
  excerpt:
    'A hands-on OpenClaw setup guide: install it, connect WhatsApp, Telegram and Discord, build a custom skill, chain tools, run multiple agents and lock it down.',
  date: 'March 22, 2026',
  dateISO: '2026-03-22',
  category: 'AI agents',
  keywords: [
    'OpenClaw setup',
    'OpenClaw tutorial',
    'OpenClaw custom skill',
    'OpenClaw WhatsApp setup',
    'OpenClaw Telegram and Discord',
    'OpenClaw Docker deployment',
    'self-hosted AI agent pipeline',
    'OpenClaw security',
  ],
  tags: ['OpenClaw', 'AI Agents', 'Self-Hosted', 'DevOps'],
  project: null,
  cover: {
    src: '/img/blog/openclaw-deep-dive-setup.webp',
    alt: 'Single-board computer on a desk in front of a monitor showing a terminal',
  },
};

export default {
  dek:
    'A hands-on walkthrough of setting up OpenClaw from zero: connecting WhatsApp, Telegram and Discord, building a custom skill, chaining tools into workflows, and hardening it for always-on use.',
  sections: [
    {
      id: 'install',
      eyebrow: 'Getting started',
      heading: 'Installing OpenClaw: prerequisites and first run',
      blocks: [
        {
          type: 'p',
          text: 'In [my previous post](/blog/openclaw-personal-ai-gateway) I covered what OpenClaw is and why it matters. This time I go hands-on: setting it up from zero, connecting it to messaging apps, building a custom skill, and running a personal AI agent pipeline on your own hardware.',
        },
        {
          type: 'table',
          caption: 'What you need before you start',
          head: ['Requirement', 'Why'],
          rows: [
            ['Node.js', 'OpenClaw runs on Node. Check the official docs for the supported version.'],
            ['Docker', 'For the always-on deployment later in this guide'],
            ['A model', 'An API key for Claude or GPT, or a local model through Ollama'],
          ],
        },
        {
          type: 'p',
          text: 'Start by cloning the OpenClaw repo and running the bootstrap script. A CLI wizard walks you through the gateway settings, such as the port, and your default model. When it finishes, you have a Gateway process running on localhost.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Your default model is not your only model',
          text: 'The wizard sets one default. Later in this guide you can give different agents different models, such as Claude for code and a local model for private queries.',
        },
      ],
    },
    {
      id: 'channels',
      eyebrow: 'Channels',
      heading: 'Connecting OpenClaw to WhatsApp, Telegram and Discord',
      blocks: [
        {
          type: 'p',
          text: 'Channels are how you reach your assistant. Each one needs a little setup:',
        },
        {
          type: 'table',
          caption: 'What each channel needs',
          head: ['Channel', 'What you need', 'How it connects'],
          rows: [
            ['WhatsApp', 'Your phone', 'Run the channel setup and scan the QR code to link your number'],
            ['Telegram', 'A bot token from BotFather', 'Add the token to the Gateway config'],
            ['Discord', 'A bot application with the message content intent enabled', 'Add the bot token to the Gateway config'],
          ],
        },
        {
          type: 'p',
          text: 'Once WhatsApp is linked, every message you send to your WhatsApp number is picked up by the Gateway, processed by your configured AI model, and answered in the same chat.',
        },
        {
          type: 'p',
          text: 'Telegram and Discord are set up in the Gateway configuration: the token, the channels or groups to listen to, and permission rules. Because one Gateway handles every channel, your assistant keeps its context whether you message it from WhatsApp, Telegram or Discord.',
        },
      ],
    },
    {
      id: 'custom-skill',
      eyebrow: 'Custom skills',
      heading: 'Building a custom OpenClaw skill: a GitHub PR reviewer',
      blocks: [
        {
          type: 'p',
          text: "Skills are the heart of OpenClaw's extensibility. Each skill lives in its own directory. As an example, here is a skill that reviews GitHub pull requests on command.",
        },
        {
          type: 'steps',
          items: [
            { title: 'Read the request', text: 'The skill takes the parsed user message: which pull request, in which repository.' },
            { title: 'Fetch the diff', text: 'It calls the GitHub API to get the pull request diff.' },
            { title: 'Ask the model', text: 'It sends the diff to your LLM with a review prompt.' },
            { title: 'Reply in chat', text: 'It returns the formatted review to the channel you asked from.' },
          ],
        },
        {
          type: 'p',
          text: 'Once the skill is registered, you can send this from any channel:',
        },
        {
          type: 'code',
          lang: 'text',
          code: 'review PR #42 on my-repo',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Follow the current skill format',
          text: 'The files a skill needs and how it is registered can change between OpenClaw versions, so check the skills section of the official docs when you build one.',
        },
      ],
    },
    {
      id: 'tool-chains',
      eyebrow: 'Workflows',
      heading: 'Tool chains: multi-step AI agent workflows',
      blocks: [
        {
          type: 'p',
          text: "Tool chains compose skills into a sequence, and each step can use the previous step's output. Here is a \"deploy\" command sent from chat:",
        },
        {
          type: 'flow',
          caption: 'A deploy command as a tool chain',
          steps: ['Run tests via your CI API', 'Wait for results', 'Create a release tag', 'Trigger the deployment webhook', 'Report status to your chat'],
        },
        {
          type: 'p',
          text: 'A chain like this also needs conditions and error handling, so a failed test run never turns into a deployment.',
        },
      ],
    },
    {
      id: 'memory-and-agents',
      eyebrow: 'Memory and agents',
      heading: 'OpenClaw memory, context and running multiple agents',
      blocks: [
        {
          type: 'p',
          text: 'OpenClaw keeps its memory locally and uses vector embeddings for semantic search, so your assistant can remember past conversations and refer back to them naturally. Two settings are worth thinking about early:',
        },
        {
          type: 'list',
          items: [
            '**Context isolation**, so work and personal conversations do not bleed into each other',
            '**Manual memory injection**, to start the assistant off with project-specific knowledge',
          ],
        },
        {
          type: 'p',
          text: 'For bigger setups, OpenClaw supports multi-agent routing. You define specialised agents, and each one keeps its own system prompt, tool access and memory while sharing the same channels.',
        },
        {
          type: 'table',
          caption: 'An example multi-agent setup',
          head: ['Agent', 'Model', 'Used for'],
          rows: [
            ['Code agent', 'Claude', 'Code tasks'],
            ['Writing agent', 'GPT', 'Creative writing'],
            ['Local agent', 'A local model via Ollama', 'Local-only queries'],
          ],
        },
      ],
    },
    {
      id: 'production',
      eyebrow: 'Deployment',
      heading: 'Deploying OpenClaw for always-on use',
      blocks: [
        {
          type: 'steps',
          items: [
            { title: 'Run it with Docker Compose', text: 'Deploy the Gateway with Docker Compose for always-on operation.' },
            {
              title: 'Add TLS if you expose the UI',
              text: 'If you want to reach the Web Control UI from outside, put a reverse proxy such as Caddy in front of it for TLS termination.',
            },
            { title: 'Survive reboots', text: 'Use systemd or Docker restart policies so the Gateway comes back after a reboot.' },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Think before exposing it',
          text: 'The Web Control UI manages an assistant that can act for you. Only expose it externally if you need to, and complete the hardening steps below first.',
        },
      ],
    },
    {
      id: 'security',
      eyebrow: 'Security',
      heading: 'OpenClaw security hardening checklist',
      blocks: [
        {
          type: 'p',
          text: 'Before going live, lock the deployment down:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '**Use an allowlist** so only approved contacts can message your AI.',
            '**Set rate limits** on each channel to prevent abuse.',
            '**Encrypt stored conversation data** at rest.',
            '**Keep API keys out of plain-text config.** Use a secrets manager or an encrypted `.env` file.',
            '**Audit skill permissions.** Limit file system and network access to what each skill actually needs.',
          ],
        },
        {
          type: 'p',
          text: 'OpenClaw gives you the building blocks for an AI assistant that is truly yours: shaped around your workflows, running on your terms, and extensible enough to grow with your needs.',
        },
      ],
    },
  ],
  pullQuote: {
    text: 'Single skills are powerful, but tool chains unlock real automation.',
    after: 2,
  },
  takeaways: [
    'The CLI wizard sets your gateway and default model and leaves a Gateway running on localhost.',
    'WhatsApp links with a QR code; Telegram needs a BotFather token and Discord a bot with the message content intent.',
    'A custom skill, like a GitHub PR reviewer, adds an ability you can call from any chat.',
    'Tool chains turn single skills into multi-step workflows, such as a deploy command that reports back to chat.',
    'Before going live, allowlist contacts, protect keys and stored data, and limit what each skill can access.',
  ],
  faq: [
    {
      q: 'What do I need to set up OpenClaw?',
      a: 'Node.js, Docker for an always-on deployment, and either an API key for Claude or GPT or a local model through Ollama. A CLI wizard then sets up the gateway and your default model.',
    },
    {
      q: 'How do I connect OpenClaw to WhatsApp?',
      a: 'Run the channel setup and scan the QR code with your phone. After that, messages you send to your WhatsApp number go through the Gateway to your configured model, and the reply comes back in the same chat.',
    },
    {
      q: 'How do I add Telegram or Discord to OpenClaw?',
      a: 'Telegram needs a bot token from BotFather. Discord needs a bot application with the message content intent enabled. Both go in the Gateway configuration with the token, the channels or groups to listen to, and permission rules.',
    },
    {
      q: 'Can OpenClaw run multiple AI agents?',
      a: 'Yes. You can set up specialised agents, for example Claude for code, GPT for creative writing and a local Ollama model for local-only queries. Each has its own system prompt, tool access and memory, and they share the same channels.',
    },
    {
      q: 'How do I secure an OpenClaw deployment?',
      a: 'Allow only approved contacts, set rate limits, encrypt stored data, keep API keys in a secrets manager or encrypted .env file, and give each skill only the file system and network access it needs.',
    },
  ],
};

export const meta = {
  id: 'ai-agents-revolution',
  title: 'AI Agents Explained: From Chatbots to Agentic Workflows',
  excerpt:
    'What AI agents are, how they differ from chatbots, how they are changing software development, and why the next step is people orchestrating agent teams.',
  date: 'December 08, 2025',
  dateISO: '2025-12-08',
  category: 'AI agents',
  keywords: [
    'AI agents',
    'what are AI agents',
    'AI agents vs chatbots',
    'agentic workflows',
    'AI agents in software development',
    'autonomous AI agents',
    'multi-agent systems',
  ],
  tags: ['AI Agents', 'LLMs', 'Automation', 'DevTools'],
  project: null,
  cover: {
    src: '/img/blog/ai-agents-revolution.webp',
    alt: 'Hand-drawn flow diagram of connected boxes and arrows on a whiteboard',
  },
};

export default {
  dek:
    'AI is moving from passive tools that answer prompts to active agents that make decisions and carry out tasks. Here is what an AI agent is, what it changes for developers, and where agentic workflows are heading.',
  sections: [
    {
      id: 'what-are-ai-agents',
      eyebrow: 'The basics',
      heading: 'What are AI agents?',
      blocks: [
        {
          type: 'p',
          text: 'A traditional chatbot waits for a prompt and replies to it. An AI agent is different: it can perceive its environment, reason about its goals and take actions to achieve them.',
        },
        {
          type: 'table',
          caption: 'Chatbot vs AI agent',
          head: ['Aspect', 'Traditional chatbot', 'AI agent'],
          rows: [
            ['Starting point', 'Waits for a prompt', 'Perceives its environment'],
            ['Thinking', 'Responds to the prompt', 'Reasons about goals'],
            ['Output', 'A reply', 'Actions, such as browsing the web, writing code or calling APIs'],
          ],
        },
      ],
    },
    {
      id: 'how-ai-agents-work',
      eyebrow: 'How they work',
      heading: 'How AI agents work: perceive, reason, act',
      blocks: [
        {
          type: 'flow',
          caption: 'What an AI agent does',
          steps: ['Perceive the environment', 'Reason about the goal', 'Take action'],
        },
        {
          type: 'p',
          text: 'The actions are real. An agent can browse the web, write code and interact with APIs independently, instead of handing text back for a person to act on.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'The key difference',
          text: 'A chatbot waits to be asked. An agent decides and acts.',
        },
      ],
    },
    {
      id: 'ai-agents-in-software-development',
      eyebrow: 'For developers',
      heading: 'How AI agents are changing software development',
      blocks: [
        {
          type: 'p',
          text: 'In software engineering, agents are growing from simple code completion tools into something closer to *pair programmers*. Code completion suggests what you type next. An agent can take on whole tasks:',
        },
        {
          type: 'list',
          items: ['Refactoring large parts of a codebase', 'Writing tests', 'Deploying applications'],
        },
      ],
    },
    {
      id: 'future-of-agentic-workflows',
      eyebrow: "What's next",
      heading: 'The future of AI agents: agentic workflows',
      blocks: [
        {
          type: 'p',
          text: 'As agents become more reliable, I expect a shift toward *agentic workflows*, where people orchestrate teams of specialized AI agents to solve complex problems faster.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Reliability comes first',
          text: 'This shift depends on agents becoming more reliable. Even then, people are the ones orchestrating the agents.',
        },
        {
          type: 'p',
          text: 'My [BPOAI case study](/projects/bpoai) is a small example of a specialized agent team: nine agents, each with one job, wired together through webhooks and cron. I break it down in [How the BPOAI Agent Flow Works](/blog/building-a-9-agent-ai-backend-for-bpoai).',
        },
        {
          type: 'p',
          text: 'Orchestrating also means choosing where a person checks the work. I cover that in [When NOT to Let the AI Finish the Job](/blog/when-not-to-let-ai-finish-the-job).',
        },
      ],
    },
  ],
  pullQuote: {
    text: 'We are witnessing a shift from passive AI tools to active AI agents capable of autonomous decision-making and task execution.',
    after: 1,
  },
  takeaways: [
    'A chatbot waits for a prompt; an AI agent perceives its environment, reasons about goals and takes action.',
    'Agents can browse the web, write code and call APIs on their own.',
    'In software engineering, agents are moving from code completion toward pair programmers that refactor, test and deploy.',
    'As agents become more reliable, expect agentic workflows where people orchestrate teams of specialized agents.',
  ],
  faq: [
    {
      q: 'What is an AI agent?',
      a: 'An AI agent is an AI system that perceives its environment, reasons about a goal and takes actions to reach it, such as browsing the web, writing code or calling APIs.',
    },
    {
      q: 'What is the difference between an AI agent and a chatbot?',
      a: 'A traditional chatbot waits for a prompt and replies to it. An AI agent works toward a goal and takes actions on its own.',
    },
    {
      q: 'How are AI agents used in software development?',
      a: 'They are moving beyond code completion. Agents can work like pair programmers that refactor large parts of a codebase, write tests and even deploy applications.',
    },
    {
      q: 'What are agentic workflows?',
      a: 'Agentic workflows are setups where people orchestrate teams of specialized AI agents to solve complex problems. They become more practical as agents get more reliable.',
    },
  ],
};

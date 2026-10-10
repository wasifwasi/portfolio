export const meta = {
  id: 'security-flaw-react2shell',
  title: 'React2Shell: Fixing the React Server Components Vulnerability',
  excerpt:
    'React2Shell is a critical React Server Components vulnerability that can let attackers run arbitrary code on your server. What is at risk and how to fix it.',
  date: 'December 10, 2025',
  dateISO: '2025-12-10',
  category: 'Security',
  keywords: [
    'React2Shell',
    'React2Shell vulnerability',
    'React Server Components vulnerability',
    'how to fix React2Shell',
    'React remote code execution',
    'React security patch',
  ],
  tags: ['Security', 'React', 'Server Components', 'Vulnerability'],
  project: null,
  cover: {
    src: '/img/blog/security-flaw-react2shell.webp',
    alt: 'Laptop keyboard in a dark room lit by a screen of code',
  },
};

export default {
  dek:
    'React2Shell is a critical security vulnerability in React Server Components that can allow arbitrary code execution on the server. Here is what it puts at risk and what to do about it.',
  sections: [
    {
      id: 'what-is-react2shell',
      eyebrow: 'The flaw',
      heading: 'What is the React2Shell vulnerability?',
      blocks: [
        {
          type: 'p',
          text: 'React2Shell is a critical security vulnerability affecting React Server Components. The flaw can allow **arbitrary code execution**: an attacker getting their own code to run in your server environment.',
        },
        {
          type: 'table',
          caption: 'React2Shell at a glance',
          head: ['Question', 'Answer'],
          rows: [
            ['What is it?', 'A critical security vulnerability in React Server Components'],
            ['What can an attacker do?', 'Potentially execute arbitrary code'],
            ['Where?', 'In the server environment, gaining unauthorized access to it'],
            ['Who is at risk?', 'Applications running versions that have not been patched'],
            ['What is the fix?', 'Upgrade to a patched version immediately'],
          ],
        },
      ],
    },
    {
      id: 'impact',
      eyebrow: 'Impact',
      heading: 'Is my React app at risk from React2Shell?',
      blocks: [
        {
          type: 'p',
          text: 'Applications running unpatched versions are at risk. Attackers could exploit the flaw to gain unauthorized access to the server environment.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Why this one is critical',
          text: 'This is not a bug that breaks a page. An attacker who can run code on your server is working inside the environment your application runs in.',
        },
        {
          type: 'p',
          text: 'The only way to answer "am I affected?" is to know which versions your app actually runs and compare them with the patched versions in the official advisory.',
        },
      ],
    },
    {
      id: 'how-to-fix',
      eyebrow: 'The fix',
      heading: 'How to fix React2Shell: upgrade immediately',
      blocks: [
        {
          type: 'p',
          text: 'The fix is to upgrade. Developers are urged to do it immediately, not at the next planned dependency update.',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Check your versions',
              text: 'Find out whether your app uses React Server Components and which versions it runs.',
            },
            {
              title: 'Find the patched versions',
              text: 'Take the exact version numbers from the official React security advisory rather than from a summary.',
            },
            {
              title: 'Upgrade and redeploy',
              text: 'Move to a patched version as soon as you can. The fix only protects you once it is running in production.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Input validation is not a fix',
          text: 'Strict validation of the data that reaches your server is good practice, but it is not a substitute for the upgrade. If you cannot upgrade straight away, treat any stopgap as temporary and plan the upgrade now.',
        },
      ],
    },
    {
      id: 'lessons',
      eyebrow: 'Lessons',
      heading: 'React security lessons from React2Shell',
      blocks: [
        {
          type: 'p',
          text: 'Three habits matter most when a vulnerability like this lands:',
        },
        {
          type: 'list',
          items: [
            '**Treat critical advisories as same-day work.** The advice for React2Shell was to upgrade immediately.',
            '**Know your versions.** You cannot tell whether you are at risk without knowing what is deployed.',
            '**Keep validating input.** It does not replace a patch, but data passed to server code should never be trusted blindly.',
          ],
        },
      ],
    },
  ],
  pullQuote: {
    text: 'Developers are urged to upgrade to a patched version immediately.',
    after: 1,
  },
  takeaways: [
    'React2Shell is a critical vulnerability in React Server Components that can allow arbitrary code execution on the server.',
    'An attacker who exploits it can gain unauthorized access to your server environment.',
    'The fix is to upgrade to a patched version immediately, using the version numbers in the official advisory.',
    'Input validation is good practice, but it is not a replacement for the patch.',
  ],
  faq: [
    {
      q: 'What is React2Shell?',
      a: 'React2Shell is a critical security vulnerability in React Server Components. It can allow an attacker to execute arbitrary code and gain unauthorized access to your server environment.',
    },
    {
      q: 'Is my app affected by React2Shell?',
      a: 'Applications running unpatched versions are at risk. Check which versions your app runs and compare them with the patched versions listed in the official React security advisory.',
    },
    {
      q: 'How do I fix React2Shell?',
      a: 'Upgrade to a patched version immediately and redeploy. Take the exact version numbers from the official advisory.',
    },
    {
      q: 'Is input validation enough to protect against React2Shell?',
      a: 'No. Strict validation of data that reaches your server is worth having, but it does not replace the upgrade. Patching is the fix.',
    },
  ],
};

export const meta = {
  id: 'production-ready-auth-nextauth-v5-mongodb',
  title: 'NextAuth v5 and MongoDB: Production-Ready Auth for Next.js',
  excerpt:
    'How I built production-ready Next.js auth with NextAuth v5 and MongoDB: credentials login, bcrypt hashing, protected routes, Zod validation and password reset.',
  date: 'May 02, 2026',
  dateISO: '2026-05-02',
  category: 'Security',
  keywords: [
    'NextAuth v5 MongoDB',
    'NextAuth credentials provider',
    'Next.js password reset email',
    'Next.js middleware protected routes',
    'Nodemailer password reset',
    'Zod validation client and server',
    'bcryptjs password hashing',
  ],
  tags: ['Next.js', 'NextAuth', 'MongoDB', 'Zod', 'Security'],
  project: null,
  cover: {
    src: '/img/blog/production-ready-auth-nextauth-v5-mongodb.webp',
    alt: 'Old brass key resting on a laptop keyboard',
  },
};

export default {
  dek:
    'A reusable authentication foundation for Next.js 16 that covers the whole account lifecycle: registration, login, protected routes and email password reset, built on NextAuth v5, MongoDB, Zod and Nodemailer.',
  sections: [
    {
      id: 'account-lifecycle',
      eyebrow: 'The goal',
      heading: 'What production-ready authentication in Next.js covers',
      blocks: [
        {
          type: 'p',
          text: 'Authentication is the feature everyone needs and nobody enjoys rebuilding. At AIDEVGEN I built Auth System, a production-ready foundation for the whole account lifecycle on Next.js 16 and NextAuth v5.',
        },
        {
          type: 'table',
          caption: 'The account lifecycle, stage by stage',
          head: ['Stage', 'How it is handled'],
          rows: [
            ['Registration', 'The form is validated with Zod, and the password is hashed with bcryptjs before it reaches MongoDB'],
            ['Login', 'A NextAuth v5 credentials provider verifies the hash on sign-in'],
            ['Protected access', 'Middleware redirects any request without a valid session'],
            ['Recovery', 'A time-limited, single-use reset token is sent by email with Nodemailer'],
          ],
        },
        {
          type: 'p',
          text: 'This is what goes into doing each stage properly.',
        },
      ],
    },
    {
      id: 'nextauth-credentials-provider',
      eyebrow: 'Login',
      heading: 'NextAuth v5 credentials provider with bcrypt password hashing',
      blocks: [
        {
          type: 'p',
          text: 'The app uses NextAuth v5 (beta) with a credentials provider. That gives full control over the login flow while still leaning on a proven session layer.',
        },
        {
          type: 'p',
          text: 'Passwords are hashed with bcryptjs before they ever touch the database, and the provider verifies the hash on sign-in.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Never store anything reversible',
          text: 'Storing a password in any reversible form is a non-starter. Only the bcryptjs hash is stored.',
        },
      ],
    },
    {
      id: 'middleware-protected-routes',
      eyebrow: 'Protection',
      heading: 'Protecting Next.js routes with middleware',
      blocks: [
        {
          type: 'p',
          text: 'Protected pages are guarded in middleware. A request without a valid session is redirected before the page renders.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'One place for the rule',
          text: 'Checking sessions in middleware, rather than page by page, keeps protection consistent and puts the rule in one place. That is exactly where you want your security logic.',
        },
        {
          type: 'p',
          text: 'I used the same middleware-first approach, with JWT sessions, in [VoltOutreach](/blog/ai-assisted-recruitment-platform-nextjs-mongodb), where it enforces the split between the public portal and the admin area.',
        },
      ],
    },
    {
      id: 'password-reset-flow',
      eyebrow: 'Recovery',
      heading: 'Building a secure password reset flow with Nodemailer',
      blocks: [
        {
          type: 'p',
          text: 'Password reset is the trickiest part of any auth system. Auth System runs it over email, with Nodemailer and Gmail SMTP:',
        },
        {
          type: 'steps',
          items: [
            { title: 'The user requests a reset', text: 'They enter their email address. The response never reveals whether that address is registered.' },
            { title: 'A token is emailed', text: 'Nodemailer sends a time-limited, single-use token.' },
            { title: 'The user sets a new password', text: 'The token is checked, the new password is set, and the used token is removed.' },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Fail safely',
          text: 'The token has to be single-use and expiring, the email has to be reliable, and the whole flow has to fail safely without ever revealing whether an address is registered.',
        },
      ],
    },
    {
      id: 'zod-validation',
      eyebrow: 'Validation',
      heading: 'Zod validation shared between client and server',
      blocks: [
        {
          type: 'p',
          text: 'Every form and API route is validated with Zod, and the same schemas run on both the client and the server.',
        },
        {
          type: 'table',
          caption: 'One schema, two jobs',
          head: ['Where it runs', 'Its role'],
          rows: [
            ['Server', 'The source of truth: where the rules are actually enforced'],
            ['Client', 'A mirror of the server, so the user is told early when something is invalid'],
          ],
        },
        {
          type: 'p',
          text: 'Sharing schemas means the rules cannot drift between where the user is told something is invalid and where it is enforced.',
        },
      ],
    },
    {
      id: 'mongodb-reset-tokens',
      eyebrow: 'Storage',
      heading: 'Storing users and password reset tokens in MongoDB',
      blocks: [
        {
          type: 'p',
          text: 'MongoDB stores users and reset tokens. It is a simple data model, but the details matter. Reset tokens:',
        },
        {
          type: 'list',
          items: ['Carry an expiry', 'Are removed once used', 'Are never logged'],
          ordered: false,
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Why the lifecycle matters',
          text: 'Keeping the token lifecycle tight is what stops the reset flow from becoming an attack vector.',
        },
      ],
    },
    {
      id: 'reusable-auth',
      eyebrow: 'Reuse',
      heading: 'Why build a reusable auth foundation',
      blocks: [
        {
          type: 'p',
          text: 'The point of Auth System is reuse. Auth is the same across most products. Only the branding changes.',
        },
        {
          type: 'p',
          text: 'Getting a secure, modern implementation right once and dropping it into the next project saves real time. It also avoids reintroducing the same subtle bugs every time.',
        },
      ],
    },
  ],
  pullQuote: {
    text: 'Registration, login, protected access and recovery, done correctly, become a starting point rather than a recurring tax.',
    after: 5,
  },
  takeaways: [
    'A NextAuth v5 credentials provider gives you full control over login while relying on a proven session layer.',
    'Hash passwords with bcryptjs before they reach the database, and never store anything reversible.',
    'Protect routes in middleware so the rule lives in one place.',
    'Make reset tokens time-limited and single-use, remove them after use, never log them, and never reveal whether an email is registered.',
    'Share Zod schemas between client and server so validation rules cannot drift.',
  ],
  faq: [
    {
      q: 'Can NextAuth v5 use a credentials provider with MongoDB?',
      a: 'Yes. In this project NextAuth v5 (beta) uses a credentials provider that verifies a bcryptjs password hash, and MongoDB stores the users and the password reset tokens.',
    },
    {
      q: 'How do you build a secure password reset in Next.js?',
      a: 'Email the user a time-limited, single-use token (here with Nodemailer over Gmail SMTP), remove the token once it is used, never log it, and never reveal whether an email address is registered.',
    },
    {
      q: 'Should route protection live in middleware or in each page?',
      a: 'In middleware. A request without a valid session is redirected before the page renders, which keeps protection consistent and puts the rule in one place.',
    },
    {
      q: 'Why validate with Zod on both the client and the server?',
      a: 'Running the same schemas on both sides means the rules cannot drift. The server is the source of truth, and the client mirrors it so users see problems early.',
    },
  ],
};

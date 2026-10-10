export const meta = {
  id: 'multi-tenant-from-day-one-pos-saas',
  title: 'Multi-Tenant SaaS Architecture from Day One: A POS Case Study',
  excerpt:
    'Multi-tenant SaaS architecture for a POS with one customer: why every table has a tenantId, what it cost up front and where I drew the line on over-engineering.',
  date: 'July 26, 2026',
  dateISO: '2026-07-26',
  category: 'SaaS architecture',
  keywords: [
    'multi-tenant SaaS architecture',
    'multi-tenancy from day one',
    'when to build multi-tenancy',
    'shared database multi-tenancy',
    'tenantId row-level scoping',
    'Prisma multi-tenant schema',
    'YAGNI vs multi-tenancy',
  ],
  tags: ['SaaS', 'Multi-tenancy', 'Prisma', 'PostgreSQL', 'Supabase'],
  project: 'multi-department-pos',
  cover: {
    src: '/img/blog/multi-tenant-from-day-one-pos-saas.webp',
    alt: 'Row of small lit shopfronts on a city street in the evening',
  },
};

export default {
  dek:
    'My POS has exactly one customer, yet nearly every table carries a tenantId. This is what building multi-tenant from day one cost, what it bought, and where preparing for SaaS turns into over-engineering.',
  sections: [
    {
      id: 'one-customer',
      eyebrow: 'The question',
      heading: 'Should you build multi-tenant from day one?',
      blocks: [
        {
          type: 'p',
          text: "The [POS I'm building](/projects/multi-department-pos) has exactly one customer: a cloth house in Attock with a branch in Kamra. And yet the very first model in the Prisma schema is `Tenant`, and nearly every table hangs off it.",
        },
        {
          type: 'p',
          text: '"You aren\'t gonna need it" is usually right, and premature SaaS architecture is a classic way to kill a simple project. So this is my honest accounting of why I broke the rule, what it actually cost, and where I drew the line.',
        },
      ],
    },
    {
      id: 'retrofit-cost',
      eyebrow: 'The case',
      heading: 'The real cost of retrofitting multi-tenancy later',
      blocks: [
        {
          type: 'p',
          text: 'Multi-tenancy is nearly unique among "later" features in how sharply its cost curve bends.',
        },
        {
          type: 'table',
          caption: 'Adding tenancy now versus later',
          head: ['When you add it', 'What it takes'],
          rows: [
            ['On a fresh schema', 'Adding `tenantId`: hours of work'],
            ['In a live system', 'Migrating every table, rewriting every query, re-testing every report and auditing every endpoint for cross-tenant leaks, all against production data whose integrity is the product'],
          ],
        },
        {
          type: 'p',
          text: 'Most speculative features cost about the same whenever you build them. Tenancy costs far more later.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Why it was the cheap option here',
          text: 'Two things together made day-one tenancy the cheap choice: that cost asymmetry, and a client who explicitly sees this as a product for other stores eventually.',
        },
      ],
    },
    {
      id: 'shared-database',
      eyebrow: 'The design',
      heading: 'Shared-database multi-tenancy with row-level scoping',
      blocks: [
        {
          type: 'p',
          text: 'The implementation is deliberately unclever: one shared database with `Tenant` at the root.',
        },
        {
          type: 'list',
          items: [
            'Departments, users, products, tickets, bills, shifts and audit logs all carry the tenant scoping',
            'Uniqueness is tenant-scoped: two stores can both have a "Menswear" department, and ticket numbering is per tenant',
            'Every query runs through a data layer that takes tenant context from the authenticated session',
            'No separate databases per tenant and no dynamic schemas',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Never take the tenant from the client',
          text: 'Tenant context always comes from the authenticated session, never from client input.',
        },
        {
          type: 'p',
          text: 'For a system whose tenants are cloth stores rather than banks, row-level scoping in one Postgres database is the right amount of isolation.',
        },
      ],
    },
    {
      id: 'schema-rigor',
      eyebrow: 'The surprise',
      heading: 'How multi-tenancy improved a single-store data model',
      blocks: [
        {
          type: 'p',
          text: 'The unexpected benefit was rigor. For every table I had to decide: does this belong to the tenant, a department, or a user? That forced ownership questions I would otherwise have answered lazily, and it caught real modeling errors early.',
        },
        {
          type: 'p',
          text: 'One example: is the product catalog tenant-wide with per-department stock, or per-department entirely? Working through it produced the `CatalogScope` concept and the clean catalog and stock split that the whole inventory feature now rests on. I describe that split in [POS Database Design: Why My Retail POS Has Tickets and Bills](/blog/modeling-real-store-tickets-and-bills-pos).',
        },
      ],
    },
    {
      id: 'avoid-over-engineering',
      eyebrow: 'The line',
      heading: 'Avoiding over-engineering: structural now, additive later',
      blocks: [
        {
          type: 'p',
          text: 'Everything that would make multi-tenancy *operational* does not exist. That is the over-engineering trap: those features are exactly the ones that are cheap to add later, because they are additive rather than structural, and expensive to maintain now.',
        },
        {
          type: 'table',
          caption: 'What I built and what I deferred',
          head: ['Piece', 'Kind', 'Status'],
          rows: [
            ['Tenant scoping in the schema', 'Structural', 'Built from day one'],
            ['Self-serve signup', 'Additive', 'Deferred'],
            ['Tenant provisioning flows', 'Additive', 'Deferred'],
            ['Billing and subscriptions', 'Additive', 'Deferred'],
            ['Per-tenant theming', 'Additive', 'Deferred'],
            ['Super-admin console', 'Additive', 'Deferred'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'The rule I would generalize',
          text: '**Bake in what is structural, defer what is additive.** Schema scoping is structural. A pricing page is additive.',
        },
      ],
    },
    {
      id: 'auth-and-roles',
      eyebrow: 'Access control',
      heading: 'Supabase auth and role-based access in one data layer',
      blocks: [
        {
          type: 'p',
          text: 'Supabase handles authentication. Role-based access for department staff, checkout staff and the owner is enforced in the data layer, alongside tenant scoping.',
        },
        {
          type: 'flow',
          caption: 'How every query inherits its permissions',
          steps: ['Session', 'User', 'Role and tenant', 'Data layer', 'Scoped query'],
        },
        {
          type: 'p',
          text: 'Getting authorization and tenancy into the same chokepoint means there is one place where "who can see what" lives. That is precisely the code you want boring and centralized when tenant two arrives.',
        },
      ],
    },
    {
      id: 'when-to-use',
      eyebrow: 'The verdict',
      heading: 'When multi-tenancy from day one is worth it',
      blocks: [
        {
          type: 'p',
          text: "Multi-tenancy from day one isn't a universal rule. It's a bet on cost asymmetry.",
        },
        {
          type: 'list',
          items: [
            'Take it when retrofitting would be catastrophic',
            'Take it when a plausible product path exists',
            'Take it only if you can resist building the operational layer prematurely',
            'Skip it when SaaS is a fantasy',
          ],
        },
        {
          type: 'p',
          text: 'For this POS the bet has already paid for itself once, in schema rigor, before a second tenant ever shows up.',
        },
      ],
    },
  ],
  pullQuote: {
    text: 'The discipline of tenancy is mostly the discipline of knowing who owns what, and that pays off even with one tenant.',
    after: 3,
  },
  takeaways: [
    'Multi-tenancy from day one is a bet on cost asymmetry: cheap on a fresh schema, very expensive to retrofit into a live system.',
    'Row-level scoping with a tenantId in one shared Postgres database is enough isolation when your tenants are shops, not banks.',
    'Take tenant context from the authenticated session, never from client input.',
    'Bake in what is structural, such as schema scoping, and defer what is additive, such as signup, billing and admin consoles.',
    'Deciding who owns each table improves the data model even when there is only one tenant.',
  ],
  faq: [
    {
      q: 'When should you build multi-tenancy from day one?',
      a: 'When retrofitting it later would be catastrophic, a plausible product path to other customers exists, and you can hold off on building signup, billing and admin tooling until they are needed. Skip it when SaaS is a fantasy.',
    },
    {
      q: 'Should each tenant get its own database?',
      a: 'Not for a system like this. My POS uses one shared Postgres database with row-level tenant scoping and no dynamic schemas. For tenants that are cloth stores rather than banks, that is the right amount of isolation.',
    },
    {
      q: 'Is multi-tenancy from day one over-engineering?',
      a: 'It can be. The structural part, scoping every table to a tenant, is cheap on a fresh schema and very expensive to retrofit. The operational part, such as self-serve signup, billing and a super-admin console, is additive and can wait.',
    },
    {
      q: 'How do you prevent cross-tenant data leaks?',
      a: "Take the tenant from the authenticated session, never from client input, and run every query through one data layer that applies both the tenant scope and the user's role.",
    },
  ],
};

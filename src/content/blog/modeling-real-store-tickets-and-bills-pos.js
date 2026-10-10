export const meta = {
  id: 'modeling-real-store-tickets-and-bills-pos',
  title: 'POS Database Design: Why My Retail POS Has Tickets and Bills',
  excerpt:
    'POS database design for a multi-department store, where sales are rung up on each floor but paid at one counter, and how that split shaped my Prisma schema.',
  date: 'July 12, 2026',
  dateISO: '2026-07-12',
  category: 'SaaS architecture',
  keywords: [
    'POS database design',
    'POS data model',
    'multi-department POS',
    'Prisma schema design',
    'PostgreSQL data modeling',
    'cash drawer shift reconciliation',
    'audit log schema',
  ],
  tags: ['Prisma', 'PostgreSQL', 'Data modeling', 'Retail tech'],
  project: 'multi-department-pos',
  cover: {
    src: '/img/blog/modeling-real-store-tickets-and-bills-pos.webp',
    alt: 'Receipt printer feeding out a paper receipt next to a card terminal on a shop counter',
  },
};

export default {
  dek:
    'In a multi-department cloth store, a sale is recorded on one floor and paid for at a different counter. That one domain insight shaped my whole POS database design: tickets, bills, shifts and escalations in Prisma and PostgreSQL.',
  sections: [
    {
      id: 'how-the-store-works',
      eyebrow: 'The domain',
      heading: 'How a multi-department store records sales and takes payment',
      blocks: [
        {
          type: 'p',
          text: "I'm building a POS as a freelance project for Sher-e-Punjab Cloth House, a multi-department clothing store in Attock with a branch in Kamra. The full build is in the [Multi-Department POS case study](/projects/multi-department-pos).",
        },
        {
          type: 'p',
          text: "Before writing any code, I spent time understanding how the shop actually moves money. A customer browses the fabric floor and picks something. The department staff ring it up, but no money changes hands there. The customer gets a numbered slip and keeps shopping: another slip from menswear, another from the children's floor. At the exit sits one central counter where all the slips are combined and paid in a single transaction.",
        },
        {
          type: 'flow',
          caption: 'How one customer visit moves through the store',
          steps: [
            'Department rings up the item',
            'Numbered slip',
            'More slips from other floors',
            'Central counter combines them',
            'One payment',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'The insight the whole schema hangs on',
          text: "Where a sale is recorded and where money is taken are different places. Departments sell; the counter collects. Every off-the-shelf POS I looked at assumes these are the same event. They aren't.",
        },
        {
          type: 'p',
          text: 'Miss that, and no amount of clean code makes the system match reality.',
        },
      ],
    },
    {
      id: 'tickets-and-bills',
      eyebrow: 'Core model',
      heading: 'Tickets vs bills: separating sales from payments in the schema',
      blocks: [
        {
          type: 'p',
          text: 'So the schema has two distinct aggregates, one for each side of that split, joined by a table that is more than plumbing.',
        },
        {
          type: 'table',
          caption: 'The two core entities and the link between them',
          head: ['Entity', 'Whose record', 'What it holds'],
          rows: [
            ['`Ticket`', "A department's record of a sale", 'Its line items, its department, the staffer who rang it, a human-legible sequential number and a status'],
            ['`Bill`', "The counter's record of a payment", 'The payment method, the checkout staffer, and a link to one or more tickets'],
            ['The join table', 'The business event itself', 'Which slips were settled together in one payment'],
          ],
        },
        {
          type: 'p',
          text: 'The join table between tickets and bills isn\'t plumbing. It *is* the business event of "these three slips were settled together."',
        },
        {
          type: 'p',
          text: 'Returns and exchanges then hang off this structure with their own models. "The customer returns the menswear item from a three-ticket bill" has to be expressible precisely:',
        },
        {
          type: 'list',
          items: ['Which line item', 'Which decision', 'Which refund method', 'Settled how'],
        },
      ],
    },
    {
      id: 'stock-per-department',
      eyebrow: 'Inventory',
      heading: 'Tracking stock per department, not per store',
      blocks: [
        {
          type: 'p',
          text: 'Inventory follows the same logic. Products and variants are catalog-level, but stock is a `DepartmentStock` row. The same shirt can be plentiful upstairs and sold out at the branch.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Why per-department stock helps',
          text: "That granularity is what makes the owner's stock view honest, and it localizes discrepancies. When a count is off, you know *which floor* to ask.",
        },
      ],
    },
    {
      id: 'shifts-and-cash',
      eyebrow: 'Cash',
      heading: 'Shift tracking for cash drawer reconciliation',
      blocks: [
        {
          type: 'p',
          text: 'Cash is the other half of trust. A `Shift` records a drawer session:',
        },
        {
          type: 'list',
          items: ['Who opened it', 'How much float it started with', 'The counted total at close'],
        },
        {
          type: 'p',
          text: 'Because every bill is stamped with its staffer and till, expected versus counted is a query, not an argument.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'The record protects people too',
          text: "The schema's job here is social as much as technical. Staff are protected by the record, and the owner sees discrepancies as data instead of suspicion.",
        },
      ],
    },
    {
      id: 'escalations-and-audit-log',
      eyebrow: 'Authority',
      heading: 'Owner approvals and audit logs built into the schema',
      blocks: [
        {
          type: 'p',
          text: "In a family-run store, some actions are the owner's alone: big discounts, voiding a ticket, an unusual refund. Rather than burying that in UI logic, there's an `EscalationRequest` model.",
        },
        {
          type: 'steps',
          items: [
            { title: 'The till raises a request', text: 'A typed request for the action that needs the owner.' },
            { title: 'The owner decides', text: 'They approve or reject it.' },
            { title: 'The decision stays linked', text: 'It is permanently linked to the ticket it affected.' },
          ],
        },
        {
          type: 'p',
          text: 'Sensitive actions also write to an append-only `AuditLog`. Together they give a simple rule:',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'The rule',
          text: '**If it involves money or authority, it leaves a row.**',
        },
        {
          type: 'p',
          text: 'I wrote more about why a deliberate approval step like this matters in [Human-in-the-Loop Automation: When Not to Let AI Finish the Job](/blog/when-not-to-let-ai-finish-the-job).',
        },
      ],
    },
    {
      id: 'prisma-postgres',
      eyebrow: 'The stack',
      heading: 'Why Prisma 7 and PostgreSQL suit a POS data model',
      blocks: [
        {
          type: 'p',
          text: 'This domain is relational to its bones: tickets joining bills, stock per department, decisions linked to documents.',
        },
        {
          type: 'table',
          caption: 'What each part of the stack gives the schema',
          head: ['Choice', 'What it gives'],
          rows: [
            ['PostgreSQL', 'Real foreign keys and transactions. A bill and its ticket-status flips commit atomically or not at all.'],
            ['Prisma 7 with the `pg` driver adapter', 'A typed schema that doubles as living documentation of the domain model.'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Why not a document store',
          text: 'A document database would have forced me to hand-roll exactly the integrity the business depends on.',
        },
        {
          type: 'p',
          text: 'The same schema is scoped per tenant from day one, which I cover in [Multi-Tenant SaaS Architecture from Day One](/blog/multi-tenant-from-day-one-pos-saas). The till and checkout screens built on top of it are covered in [POS UI design for repetitive retail work](/blog/designing-ui-for-repetitive-retail-work).',
        },
      ],
    },
  ],
  pullQuote: { text: 'Schema design was mostly anthropology, and the code is better for it.', after: 1 },
  takeaways: [
    'Find the place where the real-world process splits what software habitually merges; here it was sale versus payment.',
    'Model tickets and bills as separate entities, joined by a table that records which slips were settled together.',
    'Keep stock per department so a wrong count points to a specific floor.',
    'Stamp every bill with its staffer and till so cash reconciliation becomes a query.',
    'Put authority in the schema: owner approvals and an append-only audit log for anything involving money.',
  ],
  faq: [
    {
      q: 'What is the difference between a ticket and a bill in a POS?',
      a: "In my POS, a ticket is a department's record of a sale: its line items, department, staffer, sequential number and status. A bill is the central counter's record of a payment for one or more tickets, with the payment method and the checkout staffer.",
    },
    {
      q: 'Why separate sales and payments in a POS database?',
      a: "Because in a multi-department store they happen in different places. Departments ring up sales, and one counter takes payment for all of a customer's slips at once. A schema that treats them as one event cannot match how the shop works.",
    },
    {
      q: 'How do you reconcile a cash drawer in a POS?',
      a: 'A Shift records who opened the drawer, the starting float and the counted total at close. Every bill is stamped with its staffer and till, so comparing expected and counted cash is a query.',
    },
    {
      q: 'Why use PostgreSQL instead of a document database for a POS?',
      a: 'The data is relational: tickets join bills, stock is per department, and decisions link to documents. Postgres gives real foreign keys and transactions, so a bill and its ticket-status changes commit together or not at all.',
    },
    {
      q: 'How should a POS handle discounts that need owner approval?',
      a: 'Model the approval as data. In my POS, a till raises a typed escalation request, the owner approves or rejects it, and the decision stays linked to the ticket. Sensitive actions also go to an append-only audit log.',
    },
  ],
};

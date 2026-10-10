export const meta = {
  id: 'building-marketplace-with-escrow',
  title: 'Marketplace Escrow Payments with Stripe Connect: Bible Trader',
  excerpt:
    'How I built marketplace escrow payments with Stripe Connect for Bible Trader: funds held until delivery is confirmed, item trades, disputes and edge cases.',
  date: 'January 03, 2026',
  dateISO: '2026-01-03',
  category: 'Web development',
  keywords: [
    'marketplace escrow payments',
    'Stripe Connect escrow',
    'Stripe Connect destination charges',
    'peer-to-peer marketplace payments',
    'marketplace dispute resolution',
    'Stripe webhook verification',
    'idempotent Stripe payments',
  ],
  tags: ['Stripe Connect', 'Payments', 'Marketplace', 'Security', 'React'],
  project: 'bible-trader',
  cover: {
    src: '/img/blog/building-marketplace-with-escrow.webp',
    alt: 'Stack of old hardcover books beside a parcel tied with string',
  },
};

export default {
  dek:
    'A peer-to-peer marketplace lives or dies on trust. For Bible Trader I built escrow payments on Stripe Connect, a trade system, a dispute process and safeguards for the cases where people do not behave.',
  stats: [{ value: '48h', label: 'Window to open a dispute after delivery' }],
  sections: [
    {
      id: 'why-escrow',
      eyebrow: 'The problem',
      heading: 'Why a peer-to-peer marketplace needs escrow',
      blocks: [
        {
          type: 'p',
          text: 'Building a peer-to-peer marketplace means solving one fundamental problem: trust. [Bible Trader](/projects/bible-trader) is a platform where users buy, sell and trade religious books and collectibles, and I built its escrow payment system with Stripe.',
        },
        {
          type: 'p',
          text: 'In a traditional marketplace transaction, either the buyer or the seller takes on the risk. Escrow removes it by holding the funds until both parties confirm the transaction is complete.',
        },
        {
          type: 'table',
          caption: 'Who carries the risk',
          head: ['How the sale works', 'Who is exposed'],
          rows: [
            ['Buyer pays first, no escrow', 'The buyer, if the item never arrives'],
            ['Seller ships first, no escrow', 'The seller, if the buyer never pays'],
            ['Escrow', 'Neither side alone: the funds wait until the transaction is confirmed'],
          ],
        },
      ],
    },
    {
      id: 'stripe-connect-escrow',
      eyebrow: 'The payment flow',
      heading: 'How escrow payments work with Stripe Connect',
      blocks: [
        {
          type: 'p',
          text: 'I used Stripe Connect with the destination charges model. The rule at the centre of the system is simple: the buyer pays when they purchase, but the seller is only paid once the buyer confirms delivery and is satisfied.',
        },
        {
          type: 'steps',
          items: [
            { title: 'The buyer pays', text: 'The buyer purchases an item and the payment is collected through Stripe Connect.' },
            { title: 'The funds are held', text: 'The seller is not paid at this point.' },
            { title: 'The item is delivered', text: 'Shipping integration lets tracking verify the delivery.' },
            { title: 'The buyer confirms', text: 'The buyer confirms delivery and that they are satisfied.' },
            { title: 'The seller is paid', text: 'Only then are the funds released to the seller.' },
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Escrow in one sentence',
          text: 'Nobody gets the money until both sides agree the deal is done.',
        },
      ],
    },
    {
      id: 'trade-system',
      eyebrow: 'Trades',
      heading: 'Building a trade system for item swaps',
      blocks: [
        {
          type: 'p',
          text: 'Bible Trader also allows direct trades between users: swapping items without money changing hands. I built a matching system where users propose trades, and both parties must accept before the items are marked for exchange.',
        },
        {
          type: 'flow',
          caption: 'How a trade is agreed',
          steps: ['A user proposes a trade', 'The other user reviews it', 'Both parties accept', 'Items marked for exchange'],
        },
      ],
    },
    {
      id: 'dispute-resolution',
      eyebrow: 'Disputes',
      heading: 'Marketplace dispute resolution: a structured process',
      blocks: [
        {
          type: 'p',
          text: 'Despite best efforts, disputes happen. I built a structured process for them:',
        },
        {
          type: 'steps',
          items: [
            { title: 'Open a dispute', text: 'Either party can open a dispute within 48 hours of delivery.' },
            { title: 'Provide evidence', text: 'They submit their evidence through the app.' },
            { title: 'Admin review', text: 'An admin reviews the case and decides the outcome.' },
          ],
        },
        {
          type: 'table',
          caption: 'What an admin can decide',
          head: ['Outcome', 'What happens to the funds'],
          rows: [
            ['Release the funds', 'The seller is paid'],
            ['Issue a refund', 'The buyer gets the money back'],
            ['Split the difference', 'The funds are divided between buyer and seller'],
          ],
        },
      ],
    },
    {
      id: 'payment-security',
      eyebrow: 'Security',
      heading: 'Securing marketplace payments: webhooks, idempotency and verification',
      blocks: [
        {
          type: 'p',
          text: 'Security came first in every part of the payment flow. These are the measures I put in place:',
        },
        {
          type: 'table',
          caption: 'Security measures and why each one is there',
          head: ['Measure', 'Why it is there'],
          rows: [
            ['Webhook verification on all sensitive operations', 'Prevents spoofed requests'],
            ['Idempotent payment intents', 'Prevents double charges'],
            ['Email confirmation', 'Required to verify every user'],
            ['Optional phone verification', 'An extra check for high-value transactions'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Plan for retries',
          text: 'A payment request can be sent more than once. Making payment intents idempotent means a retry cannot charge the buyer twice.',
        },
      ],
    },
    {
      id: 'edge-cases',
      eyebrow: 'Edge cases',
      heading: 'Handling marketplace edge cases: no shipment and false claims',
      blocks: [
        {
          type: 'p',
          text: 'Real-world use needed careful handling. Two questions shaped this part of the system:',
        },
        {
          type: 'list',
          items: ['What if a seller never ships?', 'What if a buyer falsely claims an item never arrived?'],
        },
        {
          type: 'p',
          text: 'I answered them with three safeguards:',
        },
        {
          type: 'list',
          items: [
            '**Automatic release timers**',
            '**Shipping integration**, so tracking can verify delivery',
            '**A reputation system** that influences dispute outcomes',
          ],
        },
      ],
    },
  ],
  pullQuote: {
    text: 'The technical payment integration is just the beginning. The real challenge is designing systems that handle human behavior at scale.',
    after: 4,
  },
  takeaways: [
    'Trust is the core problem in a peer-to-peer marketplace, and escrow solves it by holding funds until the transaction is confirmed.',
    'Release the seller\'s payment only after the buyer confirms delivery and is satisfied.',
    'Disputes need a defined process: a time window, evidence, and an admin who can release, refund or split.',
    'Verify webhooks and make payment intents idempotent to stop spoofing and double charges.',
    'Plan for bad behavior with release timers, delivery tracking and a reputation system.',
  ],
  faq: [
    {
      q: 'How do escrow payments work in a marketplace?',
      a: 'The buyer pays when they purchase, but the funds are held. The seller is paid only after the buyer confirms delivery and satisfaction, so neither side carries the risk alone.',
    },
    {
      q: 'Which Stripe setup did you use for marketplace escrow?',
      a: 'For Bible Trader I used Stripe Connect with the destination charges model, and the funds are released to the seller only after the buyer confirms delivery.',
    },
    {
      q: 'How should a marketplace handle payment disputes?',
      a: 'In Bible Trader, either party can open a dispute within 48 hours of delivery and submit evidence in the app. An admin reviews the case and can release the funds, issue a refund or split the difference.',
    },
    {
      q: 'How do you prevent double charges and spoofed payments?',
      a: 'All sensitive operations use webhook verification to prevent spoofing, and payment intents are idempotent so a retried request cannot charge the buyer twice.',
    },
    {
      q: 'How do trades work without money?',
      a: 'A user proposes a swap, and both parties must accept before the items are marked for exchange. No money changes hands.',
    },
  ],
};

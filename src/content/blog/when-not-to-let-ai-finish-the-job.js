export const meta = {
  id: 'when-not-to-let-ai-finish-the-job',
  title: 'Human-in-the-Loop Automation: When Not to Let AI Finish the Job',
  excerpt:
    'Why my automation systems stop and ask a person: human-in-the-loop design in a visa pipeline and a retail POS, and a simple rule for where the stop should go.',
  date: 'August 02, 2026',
  dateISO: '2026-08-02',
  category: 'Opinion',
  keywords: [
    'human in the loop AI',
    'human-in-the-loop automation',
    'when to automate',
    'AI approval workflow',
    'approval gates in automation',
    'reversible vs irreversible actions',
    'AI accountability',
  ],
  tags: ['AI agents', 'Human-in-the-loop', 'Automation', 'Trust'],
  project: 'umrahflow',
  cover: {
    src: '/img/blog/when-not-to-let-ai-finish-the-job.webp',
    alt: 'Printed document with tick marks and a red pen on a desk',
  },
};

export default {
  dek:
    'I shipped two automation systems this year, a visa pipeline and a retail POS. Both ended up with the same design move: a deliberate stop before the step that cannot be undone.',
  sections: [
    {
      id: 'the-deliberate-stop',
      eyebrow: 'The pattern',
      heading: 'Two automation systems with the same design move',
      blocks: [
        {
          type: 'p',
          text: 'This year I shipped two automation-heavy freelance systems back to back. [UmrahFlow](/projects/umrahflow) turns WhatsApp passport photos into staged government visa submissions. The other is a [multi-department retail POS](/projects/multi-department-pos) with owner-approval escalations.',
        },
        {
          type: 'p',
          text: 'On paper they automate very different things. In practice they converged on the same design move, and I now think it decides whether an automation system survives contact with the real world: **the deliberate stop.**',
        },
        {
          type: 'table',
          caption: 'What each system automates, and where it stops',
          head: ['System', 'What it automates', 'Where it stops'],
          rows: [
            [
              'UmrahFlow',
              'An AI agent classifies WhatsApp messages, OCR reads passports with Claude vision cross-checked against MRZ check digits, and a bridge builds complete submission plans',
              'The final submission to the Saudi Nusuk portal: an operator logs in and runs it by hand',
            ],
            [
              'Multi-department POS',
              'Ticketing, billing, stock and reconciliation',
              'A big discount, a voided ticket or an unusual refund becomes an `EscalationRequest` that waits for the owner',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Forbidden, not missing',
          text: 'Neither stop is a missing feature or an AI limitation. In both systems the automation could easily take the last step. It is *forbidden* from taking it.',
        },
      ],
    },
    {
      id: 'where-to-stop',
      eyebrow: 'Placement',
      heading: 'Where to put the human in the loop',
      blocks: [
        {
          type: 'p',
          text: 'The rule behind both decisions: automate everything **reversible**, gate everything **irreversible**.',
        },
        {
          type: 'table',
          caption: 'Reversible and irreversible actions in my two systems',
          head: ['Action', 'Cost of getting it wrong', 'Decision'],
          rows: [
            ['Classifying a WhatsApp message', "Two seconds of a reviewer's time", 'Automate'],
            ['Submitting to a government portal', 'Can cost a pilgrim their pilgrimage and an agency its standing', 'Gate'],
            ['Ringing up a ticket', 'A mistake can be voided', 'Automate'],
            ['Granting a discount', 'Money already out the door', 'Gate'],
          ],
        },
        {
          type: 'p',
          text: 'So the gate goes exactly at the reversibility boundary. Not at the start of the pipeline, where it would strangle the value of the automation. Not after the end, where it would only observe the damage.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'A quick test',
          text: 'Cost of a wrong action, divided by cost of asking, tells you where the human belongs.',
        },
      ],
    },
    {
      id: 'loaded-action',
      eyebrow: 'Design',
      heading: 'Designing an approval step that is not a bottleneck',
      blocks: [
        {
          type: 'p',
          text: 'Human-in-the-loop fails when it means "the human does the work anyway". The craft is in what the human receives.',
        },
        {
          type: 'table',
          caption: 'What the person at each stop receives',
          head: ['System', 'Who decides', 'What they get'],
          rows: [
            ['UmrahFlow', 'The operator', 'A fully staged, validated submission job. No retyping of passport data, just one deliberate keystroke.'],
            ['POS', 'The owner', 'A typed request linked to the exact ticket and amount, answerable from a phone in seconds'],
          ],
        },
        {
          type: 'p',
          text: 'The automation does almost all of the work. The human supplies the small part that is pure judgment and accountability.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Gate or bottleneck?',
          text: "If your approval step takes longer than the task it approves, you haven't designed a gate. You've designed a bottleneck with extra steps.",
        },
      ],
    },
    {
      id: 'trust',
      eyebrow: 'Trust',
      heading: 'Why a human checkpoint lets you automate more',
      blocks: [
        {
          type: 'p',
          text: 'Here is the commercially interesting part: the human gate is what makes the aggressive automation *acceptable*.',
        },
        {
          type: 'list',
          items: [
            'The visa agency tolerates an AI agent answering their customers on WhatsApp precisely because nothing reaches the government without staff approval.',
            'The store owner tolerates staff-run tills precisely because actions that need authority escalate to them.',
          ],
          ordered: false,
        },
        {
          type: 'p',
          text: 'Trust in the whole system is anchored by the checkpoint. Remove it and every upstream automation becomes a liability negotiation. Keep it and the automation upstream can be fearless.',
        },
      ],
    },
    {
      id: 'accountability',
      eyebrow: 'Accountability',
      heading: 'AI accountability: keeping a person attached to the outcome',
      blocks: [
        {
          type: 'p',
          text: "There is also a blunter reason. An AI cannot be accountable to the Saudi government, and a till cannot be accountable for the owner's margins.",
        },
        {
          type: 'p',
          text: 'When something goes wrong, "the model decided" is not an answer any regulator, client or family business accepts. The deliberate stop keeps a human being attached to the consequences.',
        },
        {
          type: 'p',
          text: 'Both systems also write that attachment down, so the chain of judgment can be reconstructed later:',
        },
        {
          type: 'list',
          items: [
            'UmrahFlow keeps agent traces. More in [WhatsApp webhooks: debouncing albums and draining queues](/blog/taming-whatsapp-as-an-app-input).',
            'The POS keeps audit logs. More in [why my POS has tickets and bills](/blog/modeling-real-store-tickets-and-bills-pos).',
          ],
          ordered: false,
        },
      ],
    },
    {
      id: 'the-rule',
      eyebrow: 'The rule',
      heading: 'When to automate and when to ask a human',
      blocks: [
        {
          type: 'p',
          text: 'As models get better, the temptation is to move the line and let the AI finish the job. My experience shipping these two systems points the other way. The better the automation, the more valuable the well-placed stop, because more rides on each remaining human decision.',
        },
        {
          type: 'steps',
          items: [
            { title: 'Automate the reversible', text: 'If a mistake is cheap to undo, let the automation do it.' },
            { title: 'Gate the irreversible', text: 'Put the stop exactly at the reversibility boundary.' },
            { title: 'Hand over a loaded action', text: 'Give the person a one-keystroke action with full context, not the work itself.' },
            { title: 'Write the decision down', text: 'Keep traces and audit logs so the chain of judgment can be reconstructed.' },
          ],
        },
        {
          type: 'p',
          text: 'You can see where the stop sits in the full UmrahFlow pipeline in [From WhatsApp photo to government portal](/blog/whatsapp-to-government-portal-visa-automation).',
        },
      ],
    },
  ],
  pullQuote: {
    text: 'The most valuable line of code I wrote this year checks a status field and waits.',
    after: 2,
  },
  takeaways: [
    'Automate everything reversible and gate everything irreversible.',
    'Put the human at the reversibility boundary: not at the start of the pipeline, and not after the damage is done.',
    'A good stop is a loaded action: the person gets full context and makes one decision, not the whole task.',
    'The human checkpoint is what makes aggressive automation upstream acceptable to the business.',
    'Keep a person accountable for irreversible actions, and record their decisions.',
  ],
  faq: [
    {
      q: 'What is human-in-the-loop automation?',
      a: 'It is automation that does the work but stops at chosen points for a person to decide. In my systems the automation prepares everything, and the person supplies the judgment and accountability at the step that cannot be undone.',
    },
    {
      q: 'Where should a human approval step go in an automated workflow?',
      a: 'At the reversibility boundary. Automate what is cheap to undo, such as classifying a WhatsApp message, and gate what is not, such as submitting to a government portal or granting a discount.',
    },
    {
      q: 'How do you stop human review from becoming a bottleneck?',
      a: 'Hand the person a loaded action. The UmrahFlow operator gets a staged, validated job and contributes one keystroke. The POS owner gets a typed request linked to the exact ticket and amount. If approval takes longer than the task it approves, it is a bottleneck.',
    },
    {
      q: 'Will better AI models remove the need for human approval?',
      a: 'In my experience it works the other way. The better the automation, the more rides on each remaining human decision, so a well-placed stop becomes more valuable, not less.',
    },
    {
      q: 'Why should an AI agent not take the final, irreversible step?',
      a: 'Because an AI cannot be accountable for the result. "The model decided" is not an answer a regulator, client or family business accepts, so a person needs to stay attached to the consequences.',
    },
  ],
};

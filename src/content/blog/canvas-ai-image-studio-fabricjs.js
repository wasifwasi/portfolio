export const meta = {
  id: 'canvas-ai-image-studio-fabricjs',
  title: 'Fabric.js and Next.js: Building a Canvas-Based AI Image Studio',
  excerpt:
    'How I built a canvas-based AI image studio with Fabric.js and Next.js: layers, AI generation, templates and html2canvas export. Now live as HookFeed.',
  date: 'April 10, 2026',
  dateISO: '2026-04-10',
  category: '3D & web graphics',
  keywords: [
    'Fabric.js canvas editor',
    'AI image studio',
    'Fabric.js with Next.js',
    'Fabric.js layers panel',
    'html2canvas export',
    'Fabric.js performance',
    'Fabric.js toJSON save and load',
    'AI image generation API route',
  ],
  tags: ['Fabric.js', 'Next.js', 'Canvas', 'AI images', 'html2canvas'],
  project: 'clay-imaginary',
  cover: {
    src: '/img/blog/canvas-ai-image-studio-fabricjs.webp',
    alt: 'Monitor showing an image-editing canvas with layered photos, a pen tablet on the desk',
  },
};

export default {
  dek:
    'Clay Imaginary is a drag-and-drop AI image studio where creators generate, composite, edit and export visuals in one place, and it is now live as HookFeed. This is how the Fabric.js canvas engine, the layers and the AI generation pipeline fit together.',
  stats: [
    { value: '1024×1024', label: 'Typical square working resolution while editing' },
    { value: '1080×1350', label: 'Working resolution for portrait social posts' },
  ],
  sections: [
    {
      id: 'ai-image-studio',
      eyebrow: 'The idea',
      heading: 'Why creators want an AI image studio, not another prompt box',
      blocks: [
        {
          type: 'p',
          text: 'Creators do not want another text-to-image tool. They want a studio: one workspace where they can generate, composite, edit and export polished visuals without bouncing between Photoshop, Figma and five AI tabs.',
        },
        {
          type: 'p',
          text: 'Clay Imaginary is that studio. I built it with the AIDEVGEN team using Next.js 15, React 19 and Fabric.js. Clay Imaginary was the working name: the product is now live as [HookFeed](https://www.hookfeed.ai/), and the [case study](/projects/clay-imaginary) covers what it became.',
        },
        {
          type: 'table',
          caption: 'The studio stack',
          head: ['Part', 'Tool'],
          rows: [
            ['App', 'Next.js 15 and React 19'],
            ['Canvas engine', 'Fabric.js'],
            ['Layer reordering', 'react-draggable'],
            ['AI generation', 'A server-side API route that proxies to the image model'],
            ['Export', 'html2canvas'],
            ['Sign-in', 'Google OAuth through `@react-oauth/google`'],
            ['Saved projects', 'Fabric JSON from `canvas.toJSON()`, stored per user'],
          ],
        },
      ],
    },
    {
      id: 'fabricjs-vs-canvas',
      eyebrow: 'The engine',
      heading: 'Fabric.js vs the raw Canvas API for an image editor',
      blocks: [
        {
          type: 'p',
          text: 'Raw `<canvas>` is great for drawing and terrible for editing. With it, you would have to build the editing basics from scratch.',
        },
        {
          type: 'table',
          caption: 'What an editor needs, and who provides it',
          head: ['Editing feature', 'Raw canvas', 'Fabric.js'],
          rows: [
            ['Selection', 'Build it yourself', 'Built in'],
            ['Transformation (move, rotate, scale)', 'Build it yourself', 'Built in'],
            ['Grouping', 'Build it yourself', 'Built in'],
            ['Serialization', 'Build it yourself', 'Built in (`canvas.toJSON()`)'],
            ['Undo and redo', 'Build it yourself', 'Still yours to build, but the event model makes it possible'],
          ],
        },
        {
          type: 'p',
          text: 'In Fabric.js, objects are first-class. Each one has a position, rotation, scale and event handlers. That meant we could focus on the creative features, such as AI generation, templates and exports, instead of reinventing a scene graph.',
        },
      ],
    },
    {
      id: 'fabricjs-layers',
      eyebrow: 'Layers',
      heading: 'Building a Figma-style layers panel with Fabric.js',
      blocks: [
        {
          type: 'p',
          text: 'Every element on the canvas is a Fabric object with a `layerId`: an AI-generated image, a text headline, a shape or an uploaded asset.',
        },
        {
          type: 'steps',
          items: [
            { title: 'Drag in the layer panel', text: 'A side panel renders the layer stack, and react-draggable lets users reorder it with a drag.' },
            { title: 'Update the z-index', text: "Reordering updates Fabric's internal z-index." },
            { title: 'Re-render and sync', text: 'The canvas re-renders, and a shared state store keeps the layer panel in sync.' },
          ],
        },
        {
          type: 'p',
          text: 'It feels like Figma. It is a few hundred lines of code.',
        },
      ],
    },
    {
      id: 'ai-image-generation',
      eyebrow: 'Generation',
      heading: 'Adding AI image generation to a canvas editor',
      blocks: [
        {
          type: 'p',
          text: 'The user types a prompt, picks a style preset and hits generate. The request goes to a server-side API route that proxies to the image model.',
        },
        {
          type: 'flow',
          caption: 'From prompt to editable layer',
          steps: ['Prompt and style preset', 'Server-side API route', 'Image model', 'Image URL returned', 'Fabric image on the canvas'],
        },
        {
          type: 'p',
          text: 'The returned image URL is loaded into a Fabric image object and dropped onto the canvas at the last click position, ready to be moved, scaled or composited with other layers.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Why proxy through the server',
          text: 'It keeps API keys off the client, and it lets us rate-limit, log and swap providers without a client update.',
        },
      ],
    },
    {
      id: 'templates',
      eyebrow: 'Templates',
      heading: 'Solving the blank canvas problem with templates',
      blocks: [
        {
          type: 'p',
          text: 'Cold start is the enemy of creative tools. A blank canvas intimidates users, so Clay Imaginary shipped with a showcase gallery of templates, including:',
        },
        {
          type: 'list',
          items: [
            'Product mockups',
            'Recipe cards',
            'Finance infographics',
            'Meme formats',
            'Quote cards',
            'AI tech news layouts',
            'Gym posts',
          ],
          ordered: false,
        },
        {
          type: 'p',
          text: 'Each template is a pre-populated Fabric scene the user can remix. This is also how the product sells itself: the showcase page doubles as a landing page and a starting point.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'What I would change',
          text: 'If I started again, I would build the template system as a first-class primitive from day one, rather than as a gallery layered on top.',
        },
      ],
    },
    {
      id: 'export-and-performance',
      eyebrow: 'Export & speed',
      heading: 'Exporting with html2canvas and keeping Fabric.js fast',
      blocks: [
        {
          type: 'p',
          text: "Fabric has its own `toDataURL` method, but we use html2canvas for the final export. The studio overlays HTML UI on top of the canvas: annotations, watermarks for free users and branding frames. html2canvas captures the composed DOM and canvas region as a single PNG, which is what users actually want to post to Instagram or LinkedIn.",
        },
        {
          type: 'p',
          text: '**Fabric handles editing; html2canvas handles shipping.**',
        },
        {
          type: 'p',
          text: 'For performance, the naive approach is to render at full 4K resolution while editing. Do not. We edit at a lower working resolution and upscale on export:',
        },
        {
          type: 'table',
          caption: 'Working resolutions while editing',
          head: ['Format', 'Working resolution'],
          rows: [
            ['Square', '1024×1024'],
            ['Portrait social post', '1080×1350'],
          ],
        },
        {
          type: 'p',
          text: 'This keeps drag, rotate and scale interactions smooth, even on mid-range laptops.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Very large compositions',
          text: "Set Fabric's `renderOnAddRemove: false` and batch the updates manually, so the canvas does not re-render on every object you add or remove.",
        },
      ],
    },
    {
      id: 'saving-projects-undo',
      eyebrow: 'Persistence',
      heading: 'Saving Fabric.js projects with toJSON, and why undo comes first',
      blocks: [
        {
          type: 'p',
          text: 'Google OAuth through `@react-oauth/google` handles sign-in. Projects serialise as Fabric JSON through `canvas.toJSON()` and live in a backend store keyed by user ID.',
        },
        {
          type: 'p',
          text: 'Deserialising a project restores every layer with its exact state: position, rotation, opacity and filters. That makes sharing simple. A URL plus a JSON blob is a fully editable remix.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Build undo and redo early',
          text: "If I started Clay Imaginary over, I would invest earlier in a proper undo/redo history stack. Fabric's event model makes it possible but not free: you need to snapshot state on every mutation, and bolting it on later is painful.",
        },
        {
          type: 'p',
          text: 'For another browser-based editor, with time-travel undo on a Zustand store, see [Designing a Real House in the Browser](/blog/designing-houses-in-the-browser-react-three-konva).',
        },
      ],
    },
  ],
  pullQuote: {
    text: 'Skip the pure-canvas detour and stand on the shoulders of a mature scene graph. Your users want features, not reinvented wheels.',
    after: 1,
  },
  takeaways: [
    'Use Fabric.js rather than raw canvas for an editor: selection, transforms, grouping and serialization come built in.',
    'Proxy AI generation through a server-side route so API keys stay off the client and providers can be swapped.',
    'Templates beat a blank canvas, and a showcase gallery can double as the landing page.',
    'Edit at social-post resolution and upscale on export to keep interactions smooth.',
    'Build the undo/redo history stack early, because bolting it on later is painful.',
  ],
  faq: [
    {
      q: 'Why use Fabric.js instead of the raw Canvas API?',
      a: 'Raw canvas is good for drawing but poor for editing. Fabric.js gives you first-class objects with position, rotation, scale and event handlers, plus selection, transformation, grouping and serialization, so you can focus on product features instead of building a scene graph.',
    },
    {
      q: 'Does Fabric.js have undo and redo built in?',
      a: "Not for free. Fabric's event model makes it possible, but you need to snapshot state on every mutation. Build the history stack early rather than bolting it on later.",
    },
    {
      q: 'How do you export a Fabric.js canvas with HTML overlays?',
      a: "Clay Imaginary uses html2canvas instead of Fabric's own `toDataURL`, because annotations, free-user watermarks and branding frames are HTML overlays. html2canvas captures the composed DOM and canvas region as one PNG.",
    },
    {
      q: 'How do you keep a Fabric.js editor fast?',
      a: 'Edit at a lower working resolution, usually 1024×1024 or 1080×1350 for social ratios, and upscale on export. For very large compositions, set `renderOnAddRemove: false` and batch updates manually.',
    },
    {
      q: 'Is Clay Imaginary the same product as HookFeed?',
      a: 'Yes. Clay Imaginary was the working name while we built it. The product is now live as HookFeed at hookfeed.ai.',
    },
  ],
};

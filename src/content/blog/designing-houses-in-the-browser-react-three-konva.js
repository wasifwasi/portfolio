export const meta = {
  id: 'designing-houses-in-the-browser-react-three-konva',
  title: '3D House Design in the Browser with react-konva and Three.js',
  excerpt:
    '3D house design in the browser for a real, irregular plot: how I built a react-konva floor planner, live react-three-fiber 3D and a passive-design score.',
  date: 'June 14, 2026',
  dateISO: '2026-06-14',
  category: '3D & web graphics',
  keywords: [
    '3D house design in the browser',
    'react-konva floor plan editor',
    'react-three-fiber house model',
    '2D floor plan to 3D',
    'irregular plot house design',
    'passive design for hot climates',
    'Zustand undo redo with zundo',
  ],
  tags: ['Three.js', 'react-konva', 'Zustand', 'Next.js', '3D web'],
  project: 'home-structure',
  cover: {
    src: '/img/blog/designing-houses-in-the-browser-react-three-konva.webp',
    alt: "Architect's desk with a floor plan, a white model house and a laptop",
  },
};

export default {
  dek:
    'homeStructure is a browser-based house design studio for a real, irregular plot in Attock. You draw the floor plan in 2D on the exact boundary, watch it build in live 3D, and get passive-design advice for a hot, semi-arid climate.',
  stats: [
    { value: '2,455 sq ft', label: 'Irregular trapezoid plot, about 9 Marla' },
    { value: '3 of 4', label: 'Plot sides that are shared party walls' },
    { value: '3', label: '3D render modes: Massing, Realistic and Blocks' },
    { value: '6', label: 'Camera presets, from Front to Iso' },
  ],
  sections: [
    {
      id: 'real-plot',
      eyebrow: 'The problem',
      heading: 'House design software for a real, irregular plot',
      blocks: [
        {
          type: 'p',
          text: "Most house-design tools assume a clean rectangular lot. Real plots aren't like that.",
        },
        {
          type: 'p',
          text: '[homeStructure](/projects/home-structure) is a personal project I built to design a climate-smart house on a **real, irregular trapezoid plot** in Attock, Pakistan:',
        },
        {
          type: 'list',
          items: [
            'About 2,455 sq ft, roughly 9 Marla',
            'Traced from satellite imagery',
            'Three of its four sides are shared party walls',
          ],
        },
        {
          type: 'p',
          text: 'You draw the floor plan on the exact boundary, watch it build in live 3D, and get passive-design advice tuned to a hot, semi-arid climate. It is [live here](https://home-structure-nxnh.vercel.app/) and runs entirely in the browser.',
        },
      ],
    },
    {
      id: 'single-source-of-truth',
      eyebrow: 'Architecture',
      heading: 'One FloorPlan document as the single source of truth',
      blocks: [
        {
          type: 'p',
          text: 'The whole app is driven by a single `FloorPlan` document, validated with a Zod schema and measured entirely in feet. That one document feeds:',
        },
        {
          type: 'list',
          items: ['The 2D editor', 'The 3D viewer', 'The model thumbnails', 'The climate score'],
        },
        {
          type: 'flow',
          caption: 'From an edit to the 3D view',
          steps: ['Edit in the 2D planner', 'FloorPlan document (Zod, feet)', '3D geometry derived from it', 'Live 3D view'],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Why one document',
          text: 'Keeping a single source of truth is what makes "edit in 2D, see it in 3D instantly" actually work, without the two views drifting apart.',
        },
      ],
    },
    {
      id: '2d-floor-planner',
      eyebrow: '2D editor',
      heading: 'Building a 2D floor plan editor with react-konva',
      blocks: [
        {
          type: 'p',
          text: 'The editor is built on react-konva. You add, drag, resize and label rooms directly on the irregular boundary, with grid snapping and a live readout of area, Marla and plot coverage.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'The hard part is constraint',
          text: 'Rooms must stay inside a non-rectangular polygon and respect locked party walls.',
        },
        {
          type: 'table',
          caption: 'The libraries behind the editor',
          head: ['Library', 'Job in the editor'],
          rows: [
            ['`react-konva`', 'The 2D canvas: adding, dragging, resizing and labelling rooms'],
            ['`@flatten-js/core`', 'Polygon containment, so rooms stay inside the plot'],
            ['`earcut`', 'Triangulating the footprint for area calculations'],
          ],
        },
      ],
    },
    {
      id: 'live-3d',
      eyebrow: 'Live 3D',
      heading: 'From floor plan to live 3D with react-three-fiber',
      blocks: [
        {
          type: 'p',
          text: 'The same plan extrudes into 3D the moment you change it, using react-three-fiber over Three.js with helpers from `@react-three/drei`.',
        },
        {
          type: 'table',
          caption: '3D viewer options',
          head: ['Option', 'Choices'],
          rows: [
            ['Render modes', 'Massing, Realistic, Blocks'],
            ['Camera presets', 'Front, Back, Left, Right, Top, Iso'],
          ],
        },
        {
          type: 'p',
          text: 'Because the geometry is derived from the FloorPlan document, the 3D view is never out of sync with the 2D editor.',
        },
      ],
    },
    {
      id: 'undo-redo-persistence',
      eyebrow: 'State',
      heading: 'Undo and redo with Zustand and zundo, plus JSON export',
      blocks: [
        {
          type: 'p',
          text: 'State lives in a Zustand store, with `zundo` layered on top for time-travel undo and redo. That is essential for a design tool, where you experiment constantly.',
        },
        {
          type: 'list',
          items: [
            '**Undo and redo:** Zustand plus `zundo` time travel',
            '**Autosave:** everything saves to localStorage',
            '**Import and export:** the plan travels as JSON, so a design is portable and shareable as a plain data file',
          ],
        },
      ],
    },
    {
      id: 'passive-design-score',
      eyebrow: 'Climate',
      heading: 'Passive design scoring for a hot, semi-arid climate',
      blocks: [
        {
          type: 'p',
          text: 'Because three sides are blind party walls, every viable layout relies on a central courtyard (sehan) for light and cross-ventilation. homeStructure makes that trade-off visible with a live passive-design score, plus a checklist and sun diagram covering:',
        },
        {
          type: 'list',
          items: ['Courtyard placement', 'Shading', 'Roof strategy', 'Zoning', 'Monsoon handling'],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'The goal',
          text: 'Turn vague "good design" intuition into a concrete number you can push up as you edit.',
        },
      ],
    },
    {
      id: 'lessons',
      eyebrow: 'Lessons',
      heading: 'What I learned building a browser-based design tool',
      blocks: [
        {
          type: 'list',
          items: [
            '**Derive, don\'t sync.** Deriving 3D from a single validated document is far more robust than syncing two separate models.',
            '**Solve the geometry early.** Constraining an editor to an irregular boundary is mostly a geometry problem. Investing early in a solid containment-and-snapping layer paid off across every feature built on top of it.',
          ],
        },
        {
          type: 'p',
          text: 'homeStructure runs entirely in the browser, with no installs and no plugins. It is a small proof that climate-smart planning for a real, awkward plot can be approachable, visual and immediate. [Try the live demo](https://home-structure-nxnh.vercel.app/) or read the [homeStructure case study](/projects/home-structure).',
        },
      ],
    },
  ],
  pullQuote: { text: 'Let one representation be the truth and compute the rest.', after: 1 },
  takeaways: [
    'Drive every view from one validated document so the 2D plan and the 3D model never drift apart.',
    'Constraining an editor to an irregular boundary is mostly a geometry problem, so build containment and snapping early.',
    'Add time-travel undo and redo to the state store, because a design tool is used for constant experiments.',
    'Save plans as plain JSON so designs are portable and shareable.',
    'Turn passive-design intuition into a live score that changes as you edit.',
  ],
  faq: [
    {
      q: 'Can you design a house in 3D in the browser?',
      a: 'Yes. homeStructure runs entirely in the browser with no installs or plugins. You draw a 2D floor plan on the real plot boundary and it builds in live 3D as you edit.',
    },
    {
      q: 'How do you keep a 2D floor plan and a 3D model in sync?',
      a: 'Do not sync them. In homeStructure, one Zod-validated FloorPlan document is the source of truth, and the 3D view, thumbnails and climate score are all derived from it.',
    },
    {
      q: 'How do you keep rooms inside an irregular plot?',
      a: 'Treat it as a geometry problem. The editor uses @flatten-js/core for polygon containment, respects locked party walls, snaps to a grid, and uses earcut to triangulate the footprint for area.',
    },
    {
      q: 'Why does the house design rely on a central courtyard?',
      a: "Three of the plot's four sides are blind party walls, so every viable layout relies on a central courtyard (sehan) for light and cross-ventilation.",
    },
    {
      q: 'How does homeStructure handle undo and redo?',
      a: 'State lives in a Zustand store with zundo layered on top for time-travel undo and redo. Plans also autosave to localStorage and can be imported and exported as JSON.',
    },
  ],
};

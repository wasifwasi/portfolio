export const meta = {
  id: 'web-performance-optimization',
  title: 'Web Performance Optimization: A Practical Guide to Faster Sites',
  excerpt:
    'A web performance optimization guide covering code splitting, image formats, caching, the critical rendering path, Core Web Vitals and network tuning.',
  date: 'January 20, 2026',
  dateISO: '2026-01-20',
  category: 'Web development',
  keywords: [
    'web performance optimization',
    'improve Core Web Vitals',
    'code splitting and lazy loading',
    'image optimization WebP AVIF',
    'browser caching strategy',
    'critical rendering path',
    'reduce JavaScript bundle size',
  ],
  tags: ['Performance', 'Core Web Vitals', 'Caching', 'Lazy Loading', 'SEO'],
  project: null,
  cover: {
    src: '/img/blog/web-performance-optimization.webp',
    alt: 'Light trails from traffic on a curving city highway at night',
  },
};

export default {
  dek:
    'Page speed shapes user experience, search rankings and conversion rates. This guide covers the techniques that make web apps fast, from code splitting and images to caching, Core Web Vitals and the network.',
  stats: [
    { value: '2.5s', label: 'Largest Contentful Paint (LCP) should stay under this' },
    { value: '0.1', label: 'Cumulative Layout Shift (CLS) should stay under this' },
  ],
  sections: [
    {
      id: 'code-splitting-lazy-loading',
      eyebrow: 'Load less',
      heading: 'Code splitting, lazy loading and bundle size',
      blocks: [
        {
          type: 'p',
          text: 'Website speed directly affects user experience, SEO rankings and conversion rates. Even small delays in page load can cost conversions. A good first step is to stop shipping everything at once.',
        },
        {
          type: 'p',
          text: 'Instead of loading the whole application upfront, split the code into smaller chunks that load on demand. In React, use dynamic imports with `React.lazy()` and `Suspense` to defer a component until it is needed. This cuts the initial bundle size and shortens the time before the page becomes interactive.',
        },
        {
          type: 'code',
          lang: 'jsx',
          code: `import { lazy, Suspense } from 'react';

// Downloaded only when the dashboard is rendered
const Dashboard = lazy(() => import('./Dashboard'));

export default function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Dashboard />
    </Suspense>
  );
}`,
        },
        {
          type: 'p',
          text: 'Then keep the chunks small. Analyze your bundle regularly with a tool like webpack-bundle-analyzer, remove unused dependencies, and let tree shaking strip out dead code. Look for lighter alternatives to heavy libraries: using date-fns instead of moment.js can shrink a bundle considerably.',
        },
      ],
    },
    {
      id: 'image-optimization',
      eyebrow: 'Images',
      heading: 'Image optimization: WebP, AVIF and responsive images',
      blocks: [
        {
          type: 'p',
          text: 'Images often make up a large share of page weight, so they are worth optimizing carefully:',
        },
        {
          type: 'steps',
          items: [
            { title: 'Use modern formats', text: 'Serve WebP or AVIF, which produce smaller files than older formats.' },
            { title: 'Serve the right size', text: 'Use `srcset` so each device downloads an image sized for its screen.' },
            { title: 'Lazy load below the fold', text: 'Load images further down the page only when they are needed.' },
          ],
        },
        {
          type: 'code',
          lang: 'html',
          code: `<img
  src="gallery-800.avif"
  srcset="gallery-400.avif 400w, gallery-800.avif 800w, gallery-1600.avif 1600w"
  sizes="(max-width: 600px) 100vw, 800px"
  width="800"
  height="450"
  loading="lazy"
  alt="Gallery photo"
>`,
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Always set width and height',
          text: 'Without `width` and `height` the browser cannot reserve space for an image, so the layout shifts when it loads. Setting them prevents that shift.',
        },
      ],
    },
    {
      id: 'caching-strategies',
      eyebrow: 'Caching',
      heading: 'Web caching strategies: browser, CDN and service workers',
      blocks: [
        {
          type: 'p',
          text: 'Use several layers of caching, each doing a different job:',
        },
        {
          type: 'table',
          caption: 'A multi-layer caching approach',
          head: ['Layer', 'What it does'],
          rows: [
            ['Browser cache', 'Keeps files on the device, controlled by proper `Cache-Control` headers'],
            ['CDN', 'Caches your static assets'],
            ['Service worker', 'Enables offline-first experiences'],
            ['Content-hashed filenames', 'Cache busting: users get updated files after a release, while unchanged files keep their cache hits'],
          ],
        },
      ],
    },
    {
      id: 'critical-rendering-path',
      eyebrow: 'First paint',
      heading: 'How to optimize the critical rendering path',
      blocks: [
        {
          type: 'p',
          text: 'The critical rendering path is what the browser has to load before it can show the page. Make it as short as you can:',
        },
        {
          type: 'list',
          items: [
            'Inline critical CSS to remove render-blocking requests.',
            'Defer non-critical JavaScript with the `async` or `defer` attributes.',
            'Preload essential resources such as fonts and hero images with `<link rel="preload">`.',
            'Consider server-side rendering (SSR) or static site generation (SSG) for a faster First Contentful Paint.',
          ],
        },
        {
          type: 'code',
          lang: 'html',
          code: `<head>
  <!-- Inline the CSS the first screen needs -->
  <style>/* critical CSS */</style>

  <!-- Fetch the font and hero image early -->
  <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/img/hero.avif" as="image">

  <!-- Run non-critical scripts without blocking rendering -->
  <script src="/js/analytics.js" defer></script>
</head>`,
        },
      ],
    },
    {
      id: 'backend-and-network',
      eyebrow: 'Server side',
      heading: 'Database, API and network optimization',
      blocks: [
        {
          type: 'p',
          text: 'Speed is not only a front-end job. The back end and the network need the same attention:',
        },
        {
          type: 'table',
          caption: 'Server and network checklist',
          head: ['Area', 'What to do'],
          rows: [
            ['Database queries', 'Add proper indexes and avoid N+1 query problems'],
            ['Large datasets', 'Paginate instead of returning everything'],
            ['API payloads', 'Fetch only the fields you need, with GraphQL or sparse fieldsets'],
            ['Frequently accessed data', 'Cache it in Redis or Memcached to reduce database load'],
            ['Protocol', 'Enable HTTP/2 or HTTP/3 for multiplexed connections'],
            ['Compression', 'Use Brotli, which usually compresses better than gzip'],
            ['Third-party scripts', 'Use fewer of them to cut DNS lookups'],
            ['Resource hints', 'Add `dns-prefetch` and `preconnect` for external domains'],
          ],
        },
      ],
    },
    {
      id: 'core-web-vitals',
      eyebrow: 'Measure',
      heading: 'Core Web Vitals targets and how to measure them',
      blocks: [
        {
          type: 'p',
          text: "Focus on Google's Core Web Vitals. Two of the key targets:",
        },
        {
          type: 'table',
          caption: 'Core Web Vitals targets',
          head: ['Metric', 'What it measures', 'Target'],
          rows: [
            ['Largest Contentful Paint (LCP)', 'How fast the main content loads', 'Under 2.5s'],
            ['Cumulative Layout Shift (CLS)', 'How much the layout moves while loading', 'Under 0.1'],
          ],
        },
        {
          type: 'p',
          text: 'Measure them continuously with Lighthouse, WebPageTest and Chrome DevTools.',
        },
        {
          type: 'p',
          text: 'Rich visuals make this harder. My [BPOAI case study](/projects/bpoai) shows the trade-off: an immersive 3D landing page has to be balanced against fast loading and good Core Web Vitals.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Keep it running',
          text: 'Set performance budgets, monitor with tools like SpeedCurve or Calibre, and make performance a core part of your development workflow.',
        },
      ],
    },
  ],
  pullQuote: { text: 'Performance optimization is an ongoing process, not a one-time task.', after: 4 },
  takeaways: [
    'Split code with `React.lazy()` and `Suspense` so users only download what they need, and keep bundles lean.',
    'Serve WebP or AVIF with `srcset`, always set `width` and `height`, and lazy load images below the fold.',
    'Layer your caching: `Cache-Control` headers, a CDN, service workers and content-hashed filenames.',
    'Fix the back end too: indexes, no N+1 queries, pagination, lean payloads and Redis or Memcached.',
    'Track Core Web Vitals such as LCP under 2.5s and CLS under 0.1, and set performance budgets.',
  ],
  faq: [
    {
      q: 'What is code splitting in React?',
      a: 'Code splitting breaks your app into smaller chunks that load on demand. In React you use dynamic imports with `React.lazy()` and `Suspense`, which shrinks the initial bundle so the page becomes interactive sooner.',
    },
    {
      q: 'Which image format is best for web performance?',
      a: 'Modern formats like WebP and AVIF give smaller files than older formats. Pair them with `srcset` for responsive sizes, set `width` and `height`, and lazy load images below the fold.',
    },
    {
      q: 'What are good LCP and CLS scores?',
      a: 'Aim for a Largest Contentful Paint under 2.5 seconds and a Cumulative Layout Shift under 0.1. Measure both with Lighthouse, WebPageTest or Chrome DevTools.',
    },
    {
      q: 'How do I stop images causing layout shifts?',
      a: 'Always set `width` and `height` attributes on your images, so the browser can reserve the space before the image loads.',
    },
    {
      q: 'What tools can I use to measure and monitor web performance?',
      a: 'Lighthouse, WebPageTest and Chrome DevTools for measuring, webpack-bundle-analyzer for bundle size, and SpeedCurve or Calibre for ongoing monitoring.',
    },
  ],
};

export const meta = {
  id: 'code-speed-optimization',
  title: 'Code Optimization Techniques: Algorithms, React and Network',
  excerpt:
    'Three code optimization techniques that cut latency: choose efficient algorithms, stop unnecessary React re-renders, and shrink what goes over the network.',
  date: 'December 05, 2025',
  dateISO: '2025-12-05',
  category: 'Web development',
  keywords: [
    'code optimization techniques',
    'how to make code faster',
    'algorithm time complexity',
    'React re-render optimization',
    'React.memo vs useMemo vs useCallback',
    'reduce application latency',
    'frontend performance optimization',
  ],
  tags: ['Performance', 'Algorithms', 'React', 'Optimization'],
  project: null,
  cover: {
    src: '/img/blog/code-speed-optimization.webp',
    alt: 'Silver stopwatch on a desk beside a laptop',
  },
};

export default {
  dek:
    'Milliseconds matter. These are the three areas I focus on to keep applications fast: the algorithms underneath, how often React re-renders, and how much data travels over the network.',
  sections: [
    {
      id: 'why-speed-matters',
      eyebrow: 'Why it matters',
      heading: 'Why code speed optimization matters',
      blocks: [
        {
          type: 'p',
          text: 'In a fast-paced digital world, milliseconds matter. Speed and efficiency are a necessity, not a nice extra. I focus on three core areas, from the lowest level up:',
        },
        {
          type: 'table',
          caption: 'Three areas of code speed optimization',
          head: ['Area', 'What to do', 'What it improves'],
          rows: [
            ['Algorithms', 'Choose the right algorithm, for example O(n log n) instead of O(n²)', 'Processing time on large datasets'],
            ['React rendering', 'Use `React.memo`, `useMemo` and `useCallback`', 'Fewer unnecessary re-renders on the front end'],
            ['Network', 'Compress assets, split code, lazy load and cache', 'Payload size and perceived response speed'],
          ],
        },
      ],
    },
    {
      id: 'algorithmic-efficiency',
      eyebrow: 'Algorithms',
      heading: 'Algorithmic efficiency: from O(n²) to O(n log n)',
      blocks: [
        {
          type: 'p',
          text: 'The foundation of optimization is choosing the right algorithm. Moving from O(n²) to O(n log n) can drastically reduce processing time for large datasets.',
        },
        {
          type: 'p',
          text: 'A simple example is checking a list for duplicates. Comparing every item with every other item is O(n²). Sorting first and then comparing neighbors is O(n log n):',
        },
        {
          type: 'code',
          lang: 'js',
          code: `// O(n²): compares every pair of numbers
function hasDuplicateSlow(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] === numbers[j]) return true;
    }
  }
  return false;
}

// O(n log n): sort once, then compare neighbors
function hasDuplicateFast(numbers) {
  const sorted = [...numbers].sort((a, b) => a - b);
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === sorted[i - 1]) return true;
  }
  return false;
}`,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Start with the algorithm',
          text: 'The larger the dataset, the bigger the gap between an O(n²) approach and an O(n log n) one. Check the algorithm before anything else.',
        },
      ],
    },
    {
      id: 'react-re-renders',
      eyebrow: 'React',
      heading: 'How to prevent unnecessary re-renders in React',
      blocks: [
        {
          type: 'p',
          text: 'On the front end, preventing unnecessary re-renders is key. Components should only update when they really need to. React gives you three tools for this:',
        },
        {
          type: 'table',
          caption: 'React memoization tools',
          head: ['Tool', 'What it memoizes', 'Use it for'],
          rows: [
            ['`React.memo`', 'A component', 'Skipping a re-render when its props have not changed'],
            ['`useMemo`', 'A computed value', 'Avoiding an expensive recalculation on every render'],
            ['`useCallback`', 'A function', 'Keeping the same function between renders, so memoized children do not re-render'],
          ],
        },
        {
          type: 'code',
          lang: 'jsx',
          code: `import { memo, useCallback, useMemo, useState } from 'react';

// Re-renders only when its props change
const ProductRow = memo(function ProductRow({ product, onSelect }) {
  return <li onClick={() => onSelect(product.id)}>{product.name}</li>;
});

function ProductList({ products, query }) {
  const [selectedId, setSelectedId] = useState(null);

  // Recalculated only when products or query change
  const visible = useMemo(
    () => products.filter((p) => p.name.includes(query)),
    [products, query]
  );

  // Same function on every render, so ProductRow can skip re-rendering
  const handleSelect = useCallback((id) => setSelectedId(id), []);

  return (
    <>
      <p>Selected: {selectedId}</p>
      <ul>
        {visible.map((p) => (
          <ProductRow key={p.id} product={p} onSelect={handleSelect} />
        ))}
      </ul>
    </>
  );
}`,
        },
      ],
    },
    {
      id: 'network-optimization',
      eyebrow: 'Network',
      heading: 'Network optimization for faster response times',
      blocks: [
        {
          type: 'p',
          text: 'Finally, reduce what travels over the network:',
        },
        {
          type: 'list',
          items: [
            '**Compress assets** to cut payload size.',
            '**Split your code** so each page loads only what it needs.',
            '**Lazy load** anything that is not needed straight away.',
            '**Cache efficiently** to improve perceived response speed.',
          ],
        },
        {
          type: 'p',
          text: 'For a deeper look at each of these, see [Web Performance Optimization: A Practical Guide to Faster Sites](/blog/web-performance-optimization).',
        },
        {
          type: 'p',
          text: 'Focus on these three areas and your applications stay snappy and responsive, which is the best user experience you can give.',
        },
      ],
    },
  ],
  pullQuote: { text: 'Optimizing your code for speed and efficiency is no longer optional.', after: 0 },
  takeaways: [
    'Start with the algorithm: moving from O(n²) to O(n log n) can drastically cut processing time on large datasets.',
    'Use `React.memo`, `useMemo` and `useCallback` so components only re-render when they need to.',
    'Shrink payloads with compression, code splitting and lazy loading.',
    'Efficient caching makes an application feel faster to respond.',
  ],
  faq: [
    {
      q: 'How can I make my code run faster?',
      a: 'Focus on three areas: choose efficient algorithms, prevent unnecessary re-renders in your UI, and reduce what you send over the network with compression, code splitting, lazy loading and caching.',
    },
    {
      q: 'Why is O(n log n) faster than O(n²)?',
      a: 'The work an O(n²) algorithm does grows with the square of the input size, while O(n log n) grows far more slowly. On large datasets, switching from one to the other can drastically reduce processing time.',
    },
    {
      q: 'When should I use React.memo, useMemo and useCallback?',
      a: 'Use them to stop unnecessary re-renders: `React.memo` to skip re-rendering a component whose props have not changed, `useMemo` for expensive computed values, and `useCallback` for functions you pass to memoized children.',
    },
    {
      q: 'Does caching make an app feel faster?',
      a: 'Yes. Efficient caching can significantly improve perceived response speed, alongside compression, code splitting and lazy loading.',
    },
  ],
};

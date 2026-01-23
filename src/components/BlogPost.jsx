import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';

const blogContent = {
  'web-performance-optimization': {
    title: 'Web Performance Optimization: A Complete Guide',
    date: 'January 20, 2026',
    content: (
      <>
        <p>Website speed directly impacts user experience, SEO rankings, and conversion rates. Studies show that a 1-second delay in page load time can result in a 7% reduction in conversions. Here's a comprehensive guide to making your web applications lightning-fast.</p>

        <h3>1. Code Splitting & Lazy Loading</h3>
        <p>Instead of loading your entire application upfront, split your code into smaller chunks that load on demand. In React, use dynamic imports with React.lazy() and Suspense to defer loading of components until they're needed. This dramatically reduces initial bundle size and Time to Interactive (TTI).</p>

        <h3>2. Image Optimization</h3>
        <p>Images often account for 50%+ of page weight. Use modern formats like WebP or AVIF for 30-50% smaller file sizes. Implement responsive images with srcset to serve appropriately sized images based on device. Always specify width and height attributes to prevent layout shifts, and use lazy loading for below-the-fold images.</p>

        <h3>3. Caching Strategies</h3>
        <p>Implement a multi-layer caching approach: browser caching with proper Cache-Control headers, CDN caching for static assets, and service workers for offline-first experiences. Use cache busting with content hashes in filenames to ensure users get updated content while maximizing cache hits.</p>

        <h3>4. Critical Rendering Path Optimization</h3>
        <p>Inline critical CSS to eliminate render-blocking requests. Defer non-critical JavaScript with async or defer attributes. Preload essential resources like fonts and hero images using link rel="preload". Consider server-side rendering (SSR) or static site generation (SSG) for faster First Contentful Paint.</p>

        <h3>5. Database & API Optimization</h3>
        <p>On the backend, optimize database queries with proper indexing and avoid N+1 query problems. Implement pagination for large datasets. Use GraphQL or sparse fieldsets to fetch only required data. Add Redis or Memcached for frequently accessed data to reduce database load.</p>

        <h3>6. Core Web Vitals</h3>
        <p>Focus on Google's Core Web Vitals: Largest Contentful Paint (LCP) should be under 2.5s, First Input Delay (FID) under 100ms, and Cumulative Layout Shift (CLS) under 0.1. Use tools like Lighthouse, WebPageTest, and Chrome DevTools to measure and monitor these metrics continuously.</p>

        <h3>7. Bundle Analysis & Tree Shaking</h3>
        <p>Regularly analyze your bundle with tools like webpack-bundle-analyzer. Remove unused dependencies and leverage tree shaking to eliminate dead code. Consider lighter alternatives for heavy libraries—for example, date-fns instead of moment.js can save 90% bundle size.</p>

        <h3>8. Network Optimization</h3>
        <p>Enable HTTP/2 or HTTP/3 for multiplexed connections. Use Brotli compression for 15-20% better compression than gzip. Minimize DNS lookups by reducing third-party scripts. Implement resource hints like dns-prefetch and preconnect for external domains.</p>

        <p>Performance optimization is an ongoing process, not a one-time task. Establish performance budgets, set up monitoring with tools like SpeedCurve or Calibre, and make performance a core part of your development workflow. Your users—and your business metrics—will thank you.</p>
      </>
    ),
  },
  'ai-powered-car-maintenance': {
    title: 'Building an AI-Powered Car Maintenance App',
    date: 'January 05, 2026',
    content: (
      <>
        <p>Car maintenance can be confusing, especially when mysterious dashboard lights appear. I built an AI-powered mobile app using React Native and Google Gemini AI to help users understand and address their vehicle maintenance needs.</p>
        <h3>The Problem</h3>
        <p>Most car owners don't know what their dashboard warning lights mean, often ignoring critical issues or overpaying for simple fixes. Traditional solutions require manual lookups or expensive diagnostic tools.</p>
        <h3>Integrating Google Gemini AI</h3>
        <p>I chose Google Gemini for its powerful multimodal capabilities. The app uses the Gemini Vision API to analyze photos of dashboard lights and provide instant, accurate explanations of what each light means and recommended actions.</p>
        <h3>Dashboard Light Scanner</h3>
        <p>Users simply snap a photo of their dashboard. The AI identifies all visible warning lights, explains their meaning, urgency level, and provides step-by-step guidance on what to do next—whether it's a simple fix or requires professional attention.</p>
        <h3>Tire Inspection Feature</h3>
        <p>Beyond dashboard lights, the app can analyze tire conditions from photos. It detects wear patterns, tread depth issues, and potential alignment problems, helping users know when it's time for rotation or replacement.</p>
        <h3>Maintenance Quote Analysis</h3>
        <p>One of the most valuable features is the quote analyzer. Users can upload repair quotes from mechanics, and the AI evaluates whether the pricing is fair, identifies unnecessary services, and suggests questions to ask the mechanic.</p>
        <h3>Technical Implementation</h3>
        <p>The React Native app uses Expo for cross-platform deployment, with a Node.js backend handling Gemini API calls. I implemented image compression to optimize API costs and response times while maintaining accuracy.</p>
        <p>This project demonstrates how AI can democratize expertise, giving everyday car owners the knowledge they need to make informed maintenance decisions.</p>
      </>
    ),
  },
  'building-marketplace-with-escrow': {
    title: 'Building a Secure Marketplace with Escrow Payments',
    date: 'January 03, 2026',
    content: (
      <>
        <p>Building a peer-to-peer marketplace requires solving one fundamental problem: trust. For Bible Trader, a platform where users buy, sell, and trade religious books and collectibles, I implemented a robust escrow payment system using Stripe.</p>
        <h3>Why Escrow Matters</h3>
        <p>In traditional marketplace transactions, either the buyer or seller takes on risk. Escrow eliminates this by holding funds until both parties confirm the transaction is complete, protecting everyone involved.</p>
        <h3>Stripe Connect Implementation</h3>
        <p>I used Stripe Connect with the "destination charges" model. When a buyer purchases an item, funds are captured but held in a pending state. The seller only receives payment once the buyer confirms delivery and satisfaction.</p>
        <h3>The Trade System</h3>
        <p>Bible Trader allows direct trades between users—swapping items without money changing hands. I built a matching system where users can propose trades, and both parties must accept before items are marked for exchange.</p>
        <h3>Dispute Resolution Flow</h3>
        <p>Despite best efforts, disputes happen. I implemented a structured dispute process: either party can open a dispute within 48 hours of delivery, providing evidence through the app. Admins review cases and can release funds, issue refunds, or split the difference.</p>
        <h3>Security Considerations</h3>
        <p>Security was paramount. All sensitive operations use webhook verification to prevent spoofing. Payment intents are idempotent to prevent double-charges. User verification requires email confirmation and optional phone verification for high-value transactions.</p>
        <h3>Handling Edge Cases</h3>
        <p>Real-world scenarios required careful handling: what if a seller never ships? What if a buyer claims non-delivery falsely? I implemented automatic release timers, shipping integration for tracking verification, and a reputation system that influences dispute outcomes.</p>
        <p>Building this marketplace taught me that the technical payment integration is just the beginning—the real challenge is designing systems that handle human behavior at scale.</p>
      </>
    ),
  },
  'next-19-new-features': {
    title: 'Next 19 New Features',
    date: 'December 12, 2025',
    content: (
      <>
        <p>Next.js 19 has arrived, bringing a suite of powerful new features designed to streamline development and boost application performance.</p>
        <h3>1. Enhanced TurboPack</h3>
        <p>The build system has been completely overhauled with the latest version of TurboPack, offering up to 50% faster build times.</p>
        <h3>2. Server Actions 2.0</h3>
        <p>Server Actions have been refined for better type safety and easier error handling, making full-stack React even more seamless.</p>
        <h3>3. Built-in AI SDK Integration</h3>
        <p>Next.js 19 introduces native support for AI SDKs, simplifying the integration of LLMs into your applications.</p>
        <p>These features mark a significant step forward for the React framework, solidifying its position as a top choice for modern web development.</p>
      </>
    ),
  },
  'security-flaw-react2shell': {
    title: 'Security Flaw: react2shell',
    date: 'December 10, 2025',
    content: (
      <>
        <p>A critical security vulnerability has been identified in the popular `react2shell` library.</p>
        <h3>The Vulnerability</h3>
        <p>The flaw allows for potential arbitrary code execution if user input is not properly sanitized before being passed to the shell execution context.</p>
        <h3>Impact</h3>
        <p>Applications using `react2shell` versions prior to 1.4.5 are at risk. Attackers could exploit this to gain unauthorized access to the server environment.</p>
        <h3>Mitigation</h3>
        <p>Developers are urged to upgrade to version 1.4.5 or later immediately. If an upgrade is not possible, ensure strict input validation is in place for any data passed to the library.</p>
      </>
    ),
  },
  'ai-agents-revolution': {
    title: 'The Rise of AI Agents',
    date: 'December 08, 2025',
    content: (
      <>
        <p>We are witnessing a paradigm shift from passive AI tools to active AI agents capable of autonomous decision-making and task execution.</p>
        <h3>What are AI Agents?</h3>
        <p>Unlike traditional chatbots that wait for prompts, AI agents can perceive their environment, reason about goals, and take actions to achieve them. They can browse the web, write code, and interact with APIs independently.</p>
        <h3>Impact on Development</h3>
        <p>In software engineering, agents are evolving from simple code completion tools to "pair programmers" that can refactor entire codebases, write tests, and even deploy applications.</p>
        <h3>The Future</h3>
        <p>As these agents become more reliable, we will see a shift towards "agentic workflows" where humans orchestrate teams of specialized AI agents to solve complex problems faster than ever before.</p>
      </>
    ),
  },
  'code-speed-optimization': {
    title: 'Mastering Code & Speed Optimization',
    date: 'December 05, 2025',
    content: (
      <>
        <p>In today's fast-paced digital world, milliseconds matter. Optimizing your code for speed and efficiency is no longer optional—it's a necessity.</p>
        <h3>1. Algorithmic Efficiency</h3>
        <p>The foundation of optimization lies in choosing the right algorithms. Moving from O(n²) to O(n log n) can drastically reduce processing time for large datasets.</p>
        <h3>2. Minimizing Re-renders in React</h3>
        <p>For frontend performance, preventing unnecessary re-renders is key. Utilize `React.memo`, `useMemo`, and `useCallback` to ensure components only update when absolutely necessary.</p>
        <h3>3. Network Optimization</h3>
        <p>Reduce payload sizes by compressing assets, using code splitting, and implementing lazy loading. Efficient caching strategies can also significantly improve perceived response speeds.</p>
        <p>By focusing on these core areas, you can ensure your applications remain snappy and responsive, providing the best possible user experience.</p>
      </>
    ),
  },
};

const BlogPost = () => {
  const { id } = useParams();
  const post = blogContent[id];
  const blogPostRef = useRef(null);

  useEffect(() => {
    if (!post) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animate back link
      tl.fromTo(
        '.blog--back-link',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6 }
      )
        // Animate title
        .fromTo(
          '.blog-post .section--title',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.3'
        )
        // Animate subtitle
        .fromTo(
          '.blog-post .section--subtitle',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.4'
        )
        // Animate content
        .fromTo(
          '.blog--content',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.3'
        );

      // Animate paragraphs and headings with stagger
      gsap.fromTo(
        '.blog--content p, .blog--content h3',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.5,
        }
      );
    }, blogPostRef);

    return () => ctx.revert();
  }, [post]);

  if (!post) {
    return (
      <div className="blog-post section container" data-aos="fade-up">
        <h2>Post not found</h2>
        <Link to="/blog" className="button button--flex">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <section className="blog-post section" id="blog-post" ref={blogPostRef}>
      <div className="container">
        <Link to="/blog" className="blog--back-link">
          <i className="ri-arrow-left-line"></i> Back to Blogs
        </Link>
        <h1 className="section--title">{post.title}</h1>
        <span className="section--subtitle">{post.date}</span>
        <div className="blog--content">{post.content}</div>
      </div>
    </section>
  );
};

export default BlogPost;

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './Blog.css';

const blogContent = {
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

  if (!post) {
    return (
      <div className="blog-post section container">
        <h2>Post not found</h2>
        <Link to="/blog" className="button button--flex">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <section className="blog-post section" id="blog-post">
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

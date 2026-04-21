import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CardBeam from './CardBeam';
import PulseBeams from './PulseBeams';
import Pagination from './Pagination';
import SEO from './SEO';

const BLOGS_PER_PAGE = 6;

gsap.registerPlugin(ScrollTrigger);

const blogs = [
  {
    id: 'ai-lead-capture-trades-businesses',
    title: 'Building an AI Lead-Capture Platform for Trades Businesses',
    excerpt: 'How I built Plumber\'s Mate AI — an automation platform that captures leads, books jobs, sends quotes, collects payments, and re-engages old customers with Next.js 16 and React 19.',
    date: 'April 18, 2026',
    tags: ['Next.js', 'AI Automation', 'SaaS', 'Lead Generation', 'Framer Motion'],
    icons: ['🔧', '🤖', '📞', '📅', '⚡'],
  },
  {
    id: 'canvas-ai-image-studio-fabricjs',
    title: 'Canvas-Based AI Image Studios with Fabric.js and Next.js',
    excerpt: 'A technical walkthrough of building Clay Imaginary — a drag-and-drop AI image studio with Fabric.js compositing, html2canvas export, and AI-powered generation for creators.',
    date: 'April 10, 2026',
    tags: ['Fabric.js', 'Next.js', 'AI Image Gen', 'Canvas API', 'html2canvas'],
    icons: ['🎨', '✨', '🖼️', '🧩', '🤖'],
  },
  {
    id: 'nextjs-20-whats-new',
    title: 'Next.js 20: Everything New You Need to Know',
    excerpt: 'From React Server Functions to the revamped Turbopack pipeline and native Edge-first routing—here\'s what makes Next.js 20 the biggest release yet.',
    date: 'March 28, 2026',
    tags: ['Next.js', 'React', 'Turbopack', 'Edge Computing', 'Full-Stack'],
    icons: ['▲', '⚛️', '⚡', '🌐', '🚀'],
  },
  {
    id: 'openclaw-deep-dive-setup',
    title: 'OpenClaw Deep Dive: Building Your Own AI Agent Pipeline',
    excerpt: 'A hands-on technical walkthrough of setting up OpenClaw from scratch—configuring channels, creating custom skills, wiring up tool chains, and deploying your personal AI agent stack.',
    date: 'March 22, 2026',
    tags: ['OpenClaw', 'AI Agents', 'Tutorial', 'Self-Hosted', 'DevOps'],
    icons: ['🦞', '🔧', '🤖', '🛠️', '📡'],
  },
  {
    id: 'react-native-expo-2026',
    title: 'React Native with Expo in 2026: The Ultimate Mobile Stack',
    excerpt: 'How Expo 54 and React Native 0.81 are making cross-platform mobile development faster than ever—from EAS builds to native modules, and why it\'s the go-to stack for startups.',
    date: 'March 15, 2026',
    tags: ['React Native', 'Expo', 'Mobile Dev', 'TypeScript', 'Cross-Platform'],
    icons: ['📱', '🚀', '⚛️', '🔷', '🏗️'],
  },
  {
    id: 'openclaw-personal-ai-gateway',
    title: 'OpenClaw: Your Personal AI Gateway to Messaging Apps',
    excerpt: 'How OpenClaw bridges WhatsApp, Telegram, Discord, and iMessage with AI agents—giving you a self-hosted, privacy-first AI assistant that actually does things.',
    date: 'March 10, 2026',
    tags: ['OpenClaw', 'AI Agents', 'Self-Hosted', 'WhatsApp', 'Automation'],
    icons: ['🦞', '💬', '🤖', '🔒', '⚡'],
  },
  {
    id: 'ai-automation-future',
    title: 'AI Automation: Transforming the Future of Work',
    excerpt: 'Explore how AI-driven automation is reshaping industries—from intelligent workflows and autonomous coding agents to no-code platforms and the evolving role of developers.',
    date: 'February 27, 2026',
    tags: ['AI', 'Automation', 'LLMs', 'Workflows', 'Future Tech'],
    icons: ['🤖', '⚡', '🧠', '🔗', '🚀'],
  },
  {
    id: 'web-performance-optimization',
    title: 'Web Performance Optimization: A Complete Guide',
    excerpt: 'Master critical techniques like code splitting, lazy loading, image optimization, caching strategies, and Core Web Vitals to build blazing-fast web applications.',
    date: 'January 20, 2026',
    tags: ['Performance', 'Core Web Vitals', 'Caching', 'Lazy Loading', 'SEO'],
    icons: ['⚡', '📊', '🗄️', '🖼️', '🔍'],
  },
  {
    id: 'ai-powered-car-maintenance',
    title: 'Building an AI-Powered Car Maintenance App',
    excerpt: 'How I integrated Google Gemini AI with React Native to create intelligent dashboard light scanning, tire inspection, and maintenance quote analysis.',
    date: 'January 05, 2026',
    tags: ['React Native', 'Google Gemini', 'AI/ML', 'Mobile Dev', 'Node.js'],
    icons: ['📱', '✨', '🚗', '🔧', '🟢'],
  },
  {
    id: 'building-marketplace-with-escrow',
    title: 'Building a Secure Marketplace with Escrow Payments',
    excerpt: 'A deep dive into implementing Stripe escrow payments, trade systems, and secure transactions for the Bible Trader marketplace platform.',
    date: 'January 03, 2026',
    tags: ['Stripe', 'Payments', 'Security', 'E-commerce', 'React'],
    icons: ['💳', '🔒', '🛒', '⚛️', '🔄'],
  },
  {
    id: 'next-19-new-features',
    title: 'Next 19 New Features',
    excerpt: 'Explore the groundbreaking features introduced in Next.js 19, from enhanced performance to new routing capabilities.',
    date: 'December 12, 2025',
    tags: ['Next.js', 'React', 'TurboPack', 'Server Actions', 'Full-Stack'],
    icons: ['▲', '⚛️', '⚡', '🔄', '🏗️'],
  },
  {
    id: 'security-flaw-react2shell',
    title: 'Security Flaw: react2shell',
    excerpt: 'A critical look at the recently discovered security vulnerability in the react2shell library and how to mitigate it.',
    date: 'December 10, 2025',
    tags: ['Security', 'Vulnerability', 'React', 'Code Audit', 'Best Practices'],
    icons: ['🛡️', '🐛', '⚛️', '🔍', '⚠️'],
  },
  {
    id: 'ai-agents-revolution',
    title: 'The Rise of AI Agents',
    excerpt: 'How autonomous AI agents are transforming software development, automation, and the future of work.',
    date: 'December 08, 2025',
    tags: ['AI Agents', 'Automation', 'LLMs', 'Future Tech', 'DevTools'],
    icons: ['🤖', '🧠', '🔗', '💡', '⚙️'],
  },
  {
    id: 'code-speed-optimization',
    title: 'Mastering Code & Speed Optimization',
    excerpt: 'Essential techniques to slash latency, optimize algorithms, and boost your application\'s response speed.',
    date: 'December 05, 2025',
    tags: ['Algorithms', 'React', 'Performance', 'Optimization', 'Best Practices'],
    icons: ['⚡', '📈', '⚛️', '🧮', '🏎️'],
  },
];

const stickyContent = [
  {
    title: "AI & Automation",
    description:
      "Exploring how AI agents, LLMs, and intelligent automation are revolutionizing software development — from autonomous coding to no-code workflows.",
    content: (
      <div className="sticky-scroll--icons">
        <span>🤖</span><span>🧠</span><span>⚡</span><span>🔗</span>
      </div>
    ),
  },
  {
    title: "Web Performance",
    description:
      "Deep dives into code splitting, lazy loading, caching strategies, Core Web Vitals, and everything needed to build blazing-fast web applications.",
    content: (
      <div className="sticky-scroll--icons">
        <span>📊</span><span>⚡</span><span>🖼️</span><span>🔍</span>
      </div>
    ),
  },
  {
    title: "Full-Stack Projects",
    description:
      "Building real-world applications with React, Node.js, Stripe payments, escrow systems, and marketplace architectures from concept to deployment.",
    content: (
      <div className="sticky-scroll--icons">
        <span>💳</span><span>⚛️</span><span>🟢</span><span>🛒</span>
      </div>
    ),
  },
  {
    title: "Security & Best Practices",
    description:
      "Analyzing vulnerabilities, code audit techniques, and implementing security-first development practices to build resilient applications.",
    content: (
      <div className="sticky-scroll--icons">
        <span>🛡️</span><span>🔒</span><span>🐛</span><span>⚠️</span>
      </div>
    ),
  },
];

const Blog = () => {
  const blogRef = useRef(null);
  const containerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(blogs.length / BLOGS_PER_PAGE);

  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * BLOGS_PER_PAGE;
    return blogs.slice(start, start + BLOGS_PER_PAGE);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (containerRef.current) {
      const top = containerRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo(
        '.blog--header',
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.blog--header',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate blog cards with stagger
      gsap.fromTo(
        '.blog--card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
        }
      );

      // Hover effects now handled by CSS meteors
    }, blogRef);

    return () => ctx.revert();
  }, [currentPage]);

  return (
    <section className="blog section" id="blog" ref={blogRef}>
      <SEO
        title="Blog | Wasif Rehman - Full Stack Developer"
        description="Read articles about web development, AI/ML, React, Node.js, mobile development, and software engineering best practices."
        path="/blog"
      />
      <PulseBeams className="blog--pulse-beams" />
      <div className="blog--header container">
        <h2 className="section--title">Latest Blogs</h2>
        <span className="section--subtitle">My thoughts & insights</span>
      </div>

      <div className="blog--container container grid" ref={containerRef}>
        {paginatedBlogs.map((blog, index) => (
          <Link
            to={`/blog/${blog.id}`}
            className="blog--card"
            key={blog.id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <CardBeam icons={blog.icons} />
            <div className="blog--tags">
              {blog.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="blog--tag">{tag}</span>
              ))}
            </div>
            <h3 className="blog--title">{blog.title}</h3>
            <p className="blog--description">{blog.excerpt}</p>
            <span className="blog--date">{blog.date}</span>
            <span className="blog--button button button--flex">
              Read More <ArrowRight size={18} className="button--icon" />
            </span>
          </Link>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default Blog;

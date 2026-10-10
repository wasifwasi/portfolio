import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CardBeam from './CardBeam';
import Pagination from './Pagination';
import SEO from './SEO';
import { blogs } from '../data/blogs';

const BLOGS_PER_PAGE = 6;

gsap.registerPlugin(ScrollTrigger);


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
        title="Blog | Wasif Rehman - Full-Stack & AI Engineer"
        description="Read articles about web development, AI/ML, React, Node.js, mobile development, and software engineering best practices."
        path="/blog"
      />
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

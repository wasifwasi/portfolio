import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Blog.css';

gsap.registerPlugin(ScrollTrigger);

const blogs = [
  {
    id: 'ai-powered-car-maintenance',
    title: 'Building an AI-Powered Car Maintenance App',
    excerpt: 'How I integrated Google Gemini AI with React Native to create intelligent dashboard light scanning, tire inspection, and maintenance quote analysis.',
    date: 'January 05, 2026',
  },
  {
    id: 'building-marketplace-with-escrow',
    title: 'Building a Secure Marketplace with Escrow Payments',
    excerpt: 'A deep dive into implementing Stripe escrow payments, trade systems, and secure transactions for the Bible Trader marketplace platform.',
    date: 'January 03, 2026',
  },
  {
    id: 'next-19-new-features',
    title: 'Next 19 New Features',
    excerpt: 'Explore the groundbreaking features introduced in Next.js 19, from enhanced performance to new routing capabilities.',
    date: 'December 12, 2025',
  },
  {
    id: 'security-flaw-react2shell',
    title: 'Security Flaw: react2shell',
    excerpt: 'A critical look at the recently discovered security vulnerability in the react2shell library and how to mitigate it.',
    date: 'December 10, 2025',
  },
  {
    id: 'ai-agents-revolution',
    title: 'The Rise of AI Agents',
    excerpt: 'How autonomous AI agents are transforming software development, automation, and the future of work.',
    date: 'December 08, 2025',
  },
  {
    id: 'code-speed-optimization',
    title: 'Mastering Code & Speed Optimization',
    excerpt: 'Essential techniques to slash latency, optimize algorithms, and boost your application\'s response speed.',
    date: 'December 05, 2025',
  },
];

const Blog = () => {
  const blogRef = useRef(null);

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
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.blog--container',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Hover animation setup for blog cards
      const cards = document.querySelectorAll('.blog--card');
      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });
    }, blogRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="blog section" id="blog" ref={blogRef}>
      <div className="blog--header container">
        <h2 className="section--title">Latest Blogs</h2>
        <span className="section--subtitle">My thoughts & insights</span>
      </div>

      <div className="blog--container container grid">
        {blogs.map((blog, index) => (
          <Link
            to={`/blog/${blog.id}`}
            className="blog--card"
            key={blog.id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <h3 className="blog--title">{blog.title}</h3>
            <p className="blog--description">{blog.excerpt}</p>
            <span className="blog--date">{blog.date}</span>
            <span className="blog--button button button--flex">
              Read More <ArrowRight size={18} className="button--icon" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Blog;

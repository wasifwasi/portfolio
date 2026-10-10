import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarClock } from 'lucide-react';
import SEO from './SEO';
import BookCallLink from './BookCallLink';
import { posts, categories, coverSrcSet, readTime } from '../lib/blog';

const PAGE_SIZE = 9;

const Cover = ({ post, sizes, eager = false }) =>
  post.cover ? (
    <img
      src={post.cover.src}
      srcSet={coverSrcSet(post.cover)}
      sizes={sizes}
      alt=""
      width={1200}
      height={675}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
    />
  ) : (
    <span className="journal--cover-blank" />
  );

const Blog = () => {
  const [category, setCategory] = useState('all');
  const [shown, setShown] = useState(PAGE_SIZE);

  const filtered = category === 'all' ? posts : posts.filter((post) => post.category === category);
  // The newest post is featured above the grid when nothing is filtered
  const [featured, ...rest] = category === 'all' ? filtered : [null, ...filtered];
  const visible = rest.slice(0, shown);

  const choose = (next) => {
    setCategory(next);
    setShown(PAGE_SIZE);
  };

  return (
    <section className="journal section" id="blog">
      <SEO
        title="Blog: AI Agents, Automation and SaaS Engineering | Wasif Rehman"
        description="Write-ups from building AI agents, document automation, multi-tenant SaaS and React Native apps: the architecture, the trade-offs and what I'd do again."
        path="/blog"
        crumbs={[{ name: 'Blog', path: '/blog' }]}
      />
      <div className="container">
        <header className="section-head journal--head">
          <p className="journal--kicker">Blog</p>
          <h1 className="section-head--title">Notes from building AI agents, SaaS and mobile apps</h1>
          <p className="section-head--lead">
            {posts.length} write-ups from real projects: how the systems work, the trade-offs I made and what I'd do
            again.
          </p>
        </header>

        {featured && (
          <motion.article
            className="journal--featured"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link to={`/blog/${featured.id}`} className="journal--featured-media" tabIndex={-1} aria-hidden="true">
              <Cover post={featured} sizes="(min-width: 900px) 600px, 100vw" eager />
            </Link>
            <div className="journal--featured-body">
              <p className="journal--meta">
                <span className="journal--category">Latest · {featured.category}</span>
                <span>{readTime(featured.readMinutes)}</span>
              </p>
              <h2 className="journal--featured-title">
                <Link to={`/blog/${featured.id}`}>{featured.title}</Link>
              </h2>
              <p className="journal--excerpt">{featured.excerpt}</p>
              <p className="journal--foot">
                <time dateTime={featured.dateISO}>{featured.date}</time>
                <Link to={`/blog/${featured.id}`} className="work--link">
                  Read the post <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </p>
            </div>
          </motion.article>
        )}

        <div className="archive--filters journal--filters" role="group" aria-label="Filter posts by topic">
          <button
            type="button"
            className={`archive--filter ${category === 'all' ? 'is-active' : ''}`}
            aria-pressed={category === 'all'}
            onClick={() => choose('all')}
          >
            All topics <span>{posts.length}</span>
          </button>
          {categories.map((c) => (
            <button
              key={c.name}
              type="button"
              className={`archive--filter ${category === c.name ? 'is-active' : ''}`}
              aria-pressed={category === c.name}
              onClick={() => choose(c.name)}
            >
              {c.name} <span>{c.count}</span>
            </button>
          ))}
        </div>

        <ul className="journal--grid">
          {visible.map((post, i) => (
            <motion.li
              key={post.id}
              className="journal--card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(i % PAGE_SIZE, 6) * 0.04 }}
            >
              <Link to={`/blog/${post.id}`} className="journal--media" tabIndex={-1} aria-hidden="true">
                <Cover post={post} sizes="(min-width: 1000px) 360px, (min-width: 640px) 50vw, 100vw" />
              </Link>
              <div className="journal--body">
                <p className="journal--meta">
                  <span className="journal--category">{post.category}</span>
                  <span>{readTime(post.readMinutes)}</span>
                </p>
                <h2 className="journal--title">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h2>
                <p className="journal--excerpt">{post.excerpt}</p>
                <p className="journal--foot">
                  <time dateTime={post.dateISO}>{post.date}</time>
                </p>
              </div>
            </motion.li>
          ))}
        </ul>

        {rest.length > shown && (
          <div className="journal--more">
            <button type="button" className="btn btn--ghost" onClick={() => setShown((n) => n + PAGE_SIZE)}>
              Show more posts <span className="journal--more-count">{rest.length - shown} left</span>
            </button>
          </div>
        )}

        <aside className="case--cta journal--cta">
          <h2>Building something like this?</h2>
          <p>Tell me about it on a free 15-minute call. You'll get a written scope and a price before any work starts.</p>
          <div className="case--actions">
            <BookCallLink className="btn btn--primary">
              <CalendarClock size={18} aria-hidden="true" /> Book a 15-min call
            </BookCallLink>
            <Link to="/projects" className="btn btn--ghost">
              See the projects <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Blog;

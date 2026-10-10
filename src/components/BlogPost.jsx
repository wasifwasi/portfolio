import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CalendarClock, Linkedin, Github } from 'lucide-react';
import SEO from './SEO';
import NotFound from './NotFound';
import BookCallLink from './BookCallLink';
import ProjectImage from './ProjectImage';
import { Block, Inline } from './BlogBlocks';
import { findPost, relatedPosts, coverSrcSet, readTime } from '../lib/blog';
import { plainInline } from '../content/blog/inline';
import { projectsData } from '../data/projects';
import { CONTACT } from '../data/site';

const SITE_URL = 'https://portfolio-wod3.vercel.app';
const sectionNumber = (i) => String(i + 1).padStart(2, '0');

const PostCard = ({ post }) => (
  <li className="post--related-card">
    <Link to={`/blog/${post.id}`} className="post--related-media" tabIndex={-1} aria-hidden="true">
      {post.cover && (
        <img src={post.cover.src} srcSet={coverSrcSet(post.cover)} sizes="(min-width: 900px) 320px, 100vw" alt="" width={1200} height={675} loading="lazy" decoding="async" />
      )}
    </Link>
    <p className="post--related-meta">{post.category} · {readTime(post.readMinutes)}</p>
    <h3><Link to={`/blog/${post.id}`}>{post.title}</Link></h3>
  </li>
);

const BlogPost = () => {
  const { id } = useParams();
  const post = findPost(id);
  const [loaded, setLoaded] = useState({ id: null, body: null });

  useEffect(() => {
    if (!post) return undefined;
    let active = true;
    post.loadBody().then((body) => active && setLoaded({ id: post.id, body }));
    return () => {
      active = false;
    };
  }, [post]);

  if (!post) return <NotFound />;

  const body = loaded.id === post.id ? loaded.body : null;
  const project = post.project ? projectsData.find((p) => p.slug === post.project) : null;
  const related = relatedPosts(post);
  const pageUrl = `${SITE_URL}/blog/${post.id}`;
  const faqSchema = body?.faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: body.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: plainInline(item.a) },
        })),
      }
    : null;

  return (
    <article className="post">
      <SEO
        title={`${post.title} | Wasif Rehman`}
        description={post.excerpt}
        path={`/blog/${post.id}`}
        image={post.cover?.src}
        type="article"
        crumbs={[{ name: 'Blog', path: '/blog' }, { name: post.title, path: `/blog/${post.id}` }]}
        article={{
          title: post.title,
          excerpt: post.excerpt,
          datePublished: post.dateISO,
          tags: post.keywords,
          section: post.category,
        }}
        schemas={faqSchema ? [faqSchema] : []}
      />

      <header className={`post--hero ${post.cover ? 'has-cover' : ''}`}>
        <div className="container post--hero-grid">
          <div className="post--hero-text">
            <Link to="/blog" className="post--back">
              <ArrowLeft size={16} aria-hidden="true" /> All posts
            </Link>
            <p className="post--kicker">
              {post.category}
              {project && <> · <Link to={`/projects/${project.slug}`}>{project.title}</Link></>}
            </p>
            <h1 className="post--title">{post.title}</h1>
            <p className="post--dek">{body ? <Inline text={body.dek} /> : post.excerpt}</p>
            <div className="post--byline">
              <img src="/img/me/avatar-128.webp" alt="" width={44} height={44} />
              <p>
                <span className="post--author">Wasif Rehman</span>
                <span className="post--byline-meta">
                  <time dateTime={post.dateISO}>{post.date}</time> · {readTime(post.readMinutes)}
                </span>
              </p>
            </div>
          </div>
          {post.cover && (
            <figure className="post--cover">
              <img
                src={post.cover.src}
                srcSet={coverSrcSet(post.cover)}
                sizes="(min-width: 1000px) 560px, 100vw"
                alt={post.cover.alt}
                width={1200}
                height={675}
                fetchPriority="high"
                decoding="async"
              />
              <figcaption>{post.cover.credit || 'Image generated for this article'}</figcaption>
            </figure>
          )}
        </div>
      </header>

      {!body ? (
        <div className="post--loading container" aria-busy="true">
          <span className="route-fallback--spinner" />
        </div>
      ) : (
        <>
          <div className="post--intro">
            <div className="container post--intro-grid">
              <div className="post--summary">
                <p className="post--label">In short</p>
                <ul>
                  {body.takeaways.map((item, i) => <li key={i}><Inline text={item} /></li>)}
                </ul>
              </div>
              <nav className="post--toc" aria-labelledby="post-toc-title">
                <p className="post--label" id="post-toc-title">In this post</p>
                <ol>
                  {body.sections.map((section, i) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`}>
                        <span>{sectionNumber(i)}</span>
                        {section.heading}
                      </a>
                    </li>
                  ))}
                  {body.faq?.length > 0 && (
                    <li>
                      <a href="#faq">
                        <span>{sectionNumber(body.sections.length)}</span>
                        Frequently asked questions
                      </a>
                    </li>
                  )}
                </ol>
              </nav>
            </div>
            {body.stats?.length > 0 && (
              <div className="container">
                <ul className="post--stats">
                  {body.stats.map((stat, i) => (
                    <li key={i}>
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {body.sections.map((section, i) => (
            <React.Fragment key={section.id}>
              <section id={section.id} className={`post--section ${i % 2 === 0 ? 'is-band' : ''}`}>
                <div className="container post--section-grid">
                  <header className="post--side">
                    <p className="post--eyebrow">
                      <span>{sectionNumber(i)}</span> {section.eyebrow}
                    </p>
                    <h2>{section.heading}</h2>
                  </header>
                  <div className={`post--prose ${i === 0 ? 'is-lead' : ''}`}>
                    {section.blocks.map((block, b) => <Block key={b} block={block} />)}
                  </div>
                </div>
              </section>
              {body.pullQuote && Math.min(body.pullQuote.after, body.sections.length - 1) === i && (
                <figure className="post--pull">
                  <div className="container">
                    <blockquote><p><Inline text={body.pullQuote.text} /></p></blockquote>
                    <figcaption>Wasif Rehman</figcaption>
                  </div>
                </figure>
              )}
            </React.Fragment>
          ))}

          {body.faq?.length > 0 && (
            <section id="faq" className={`post--section ${body.sections.length % 2 === 0 ? 'is-band' : ''}`}>
              <div className="container post--section-grid">
                <header className="post--side">
                  <p className="post--eyebrow">
                    <span>{sectionNumber(body.sections.length)}</span> FAQ
                  </p>
                  <h2>Frequently asked questions</h2>
                </header>
                <div className="post--faq">
                  {body.faq.map((item, i) => (
                    <details key={i} open={i === 0}>
                      <summary>{item.q}</summary>
                      <p><Inline text={item.a} /></p>
                    </details>
                  ))}
                </div>
              </div>
            </section>
          )}

          <footer className="post--end">
            <div className="container post--end-grid">
              <aside className="post--cta">
                <p className="post--label">What to do next</p>
                <h2>{project ? `Need something like ${project.title} built?` : 'Have a project like this in mind?'}</h2>
                <p>
                  Tell me about it on a free 15-minute call. You'll get a written scope and a price before any work starts.
                </p>
                <div className="post--cta-actions">
                  <BookCallLink className="btn btn--primary">
                    <CalendarClock size={18} aria-hidden="true" /> Book a 15-min call
                  </BookCallLink>
                  <Link to="/projects" className="btn btn--ghost">
                    See the projects <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </aside>

              {project && (
                <Link to={`/projects/${project.slug}`} className="post--project">
                  <span className="post--project-media">
                    <ProjectImage src={project.image} alt={project.alt} contain={project.isLogo} sizes="(min-width: 900px) 360px, 100vw" />
                  </span>
                  <span className="post--project-body">
                    <span className="post--label">The case study</span>
                    <strong>{project.title}</strong>
                    <span>{project.subtitle}</span>
                    <span className="work--link">
                      Read the case study <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              )}

              <div className="post--author-box">
                <img src="/img/me/avatar.webp" alt="Wasif Rehman" width={96} height={96} loading="lazy" />
                <div>
                  <p className="post--label">Written by</p>
                  <p className="post--author-name">Wasif Rehman</p>
                  <p>
                    Full-stack and AI engineer. I build AI agents, automation pipelines, Next.js platforms and React
                    Native apps, and I write up what I learn along the way.
                  </p>
                  <p className="post--author-links">
                    <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin size={15} aria-hidden="true" /> LinkedIn
                    </a>
                    <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">
                      <Github size={15} aria-hidden="true" /> GitHub
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Share this post
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {related.length > 0 && (
              <div className="container post--related">
                <div className="post--related-head">
                  <h2>Keep reading</h2>
                  <Link to="/blog" className="work--link">
                    All posts <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
                <ul>
                  {related.map((other) => <PostCard key={other.id} post={other} />)}
                </ul>
              </div>
            )}
          </footer>
        </>
      )}
    </article>
  );
};

export default BlogPost;

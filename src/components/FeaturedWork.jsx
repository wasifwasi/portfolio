import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, ExternalLink, CalendarClock, MessageCircle } from "lucide-react";
import { FEATURED_WORK, whatsappLink } from "../data/site";
import { projectsData } from "../data/projects";
import Picture from "./Picture";
import BookCallLink from "./BookCallLink";

const reveal = (i) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay: (i % 2) * 0.06, ease: [0.22, 1, 0.36, 1] },
});

const FeaturedWork = () => {
  return (
    <section className="work section" id="work">
      <div className="container">
        <header className="section-head">
          <h2 className="section-head--title">What I've built</h2>
          <p className="section-head--lead">
            Five recent projects. Each one links to a full case study with the architecture and
            what I was responsible for.
          </p>
        </header>

        <div className="work--grid">
          {FEATURED_WORK.map((item, i) => {
            const wide = item.size === "wide";
            return (
              <motion.article key={item.slug} className={`work--card ${wide ? "work--card-wide" : ""}`} {...reveal(i)}>
                <Link to={`/projects/${item.slug}`} className="work--media" tabIndex={-1} aria-hidden="true">
                  <Picture base={item.image} alt={item.alt} focus={item.focus} sizes={wide ? "(min-width: 1000px) 560px, 100vw" : "(min-width: 1000px) 380px, 100vw"} />
                  {item.real && <span className="work--badge">Screenshot from the live app</span>}
                </Link>

                <div className="work--body">
                  <p className="work--meta">
                    <span className="work--kind">{item.kind}</span>
                    <span className="work--context">{item.context}</span>
                  </p>
                  <h3 className="work--title">
                    <Link to={`/projects/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <p className="work--problem">{item.problem}</p>
                  <p className="work--solution">{item.solution}</p>

                  {wide && item.flow && (
                    <ol className="work--flow" aria-label={`${item.title}, step by step`}>
                      {item.flow.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  )}

                  <ul className="work--stack" aria-label="Stack">
                    {item.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>

                  <div className="work--links">
                    {item.demo && (
                      <a href={item.demo} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--small">
                        Try it live <ExternalLink size={15} aria-hidden="true" />
                      </a>
                    )}
                    <Link to={`/projects/${item.slug}`} className="work--link">
                      Case study <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                    {item.blog && (
                      <Link to={`/blog/${item.blog}`} className="work--link work--link-muted">
                        <BookOpen size={15} aria-hidden="true" /> How it works
                      </Link>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}

          <motion.aside className="work--cta" {...reveal(1)}>
            <h3>Have something like this in mind?</h3>
            <p>Tell me about it on a 15-minute call. By the end you'll know whether I'm the right person for it.</p>
            <div className="work--cta-actions">
              <BookCallLink className="btn btn--primary">
                <CalendarClock size={18} aria-hidden="true" /> Book a call
              </BookCallLink>
              <a
                href={whatsappLink("Hi Wasif, I saw your work and have a project in mind.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost"
              >
                <MessageCircle size={18} aria-hidden="true" /> WhatsApp
              </a>
            </div>
          </motion.aside>
        </div>

        <p className="work--more">
          <Link to="/projects" className="work--link">
            All {projectsData.length} projects <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  );
};

export default FeaturedWork;

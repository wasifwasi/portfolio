import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Workflow, Sparkles, Rocket, Check, ArrowRight } from "lucide-react";
import { SERVICES, projectTitle } from "../data/site";

const ICONS = { "ai-automation": Workflow, "ai-feature": Sparkles, mvp: Rocket };

const Services = () => {
  return (
    <section className="offer section" id="services">
      <div className="container">
        <header className="section-head">
          <h2 className="section-head--title">What I can build for you</h2>
          <p className="section-head--lead">
            Three common starting points. Each one begins with a free 15-minute call and a written
            scope with the price before any work starts.
          </p>
        </header>

        <div className="offer--grid">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.slug];
            return (
              <motion.article
                key={service.slug}
                className="offer--card"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="offer--icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <h3 className="offer--title">{service.title}</h3>
                <p className="offer--pitch">{service.pitch}</p>

                <p className="offer--label">What you get</p>
                <ul className="offer--list">
                  {service.includes.map((line) => (
                    <li key={line}>
                      <Check size={16} aria-hidden="true" /> {line}
                    </li>
                  ))}
                </ul>

                <p className="offer--label">Proof</p>
                <ul className="offer--proof">
                  {service.proof.map((slug) => (
                    <li key={slug}>
                      <Link to={`/projects/${slug}`}>{projectTitle(slug)}</Link>
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/?service=${service.slug}#contact`}
                  className="btn btn--ghost offer--cta"
                >
                  Get a free estimate <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;

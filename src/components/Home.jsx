import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarClock, ArrowRight } from "lucide-react";
import { HERO, HERO_STRIP, METRICS } from "../data/site";
import Picture from "./Picture";
import { SIZES } from "../lib/images";
import BookCallLink from "./BookCallLink";

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const Home = () => {
  return (
    <section className="hero section" id="home">
      <div className="container">
        <div className="hero--top">
          <motion.div className="hero--intro" {...rise(0)}>
            <p className="hero--status">
              <span className="hero--status-dot" aria-hidden="true" /> Taking on new projects
            </p>

            <h1 className="hero--title">{HERO.title}</h1>

            <p className="hero--lead">{HERO.lead}</p>

            <div className="hero--actions">
              <BookCallLink className="btn btn--primary">
                <CalendarClock size={18} aria-hidden="true" /> Book a 15-min call
              </BookCallLink>
              <a href="#work" className="btn btn--ghost">
                See the work <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>

            <dl className="hero--facts">
              {METRICS.map((m) => (
                <div key={m.label}>
                  <dt>{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.figure className="hero--portrait" {...rise(0.1)}>
            <Picture base="img/me/hero" alt="Wasif Rehman" sizes={SIZES.heroPortrait} width={480} height={600} priority />
            <figcaption>
              <b>Wasif Rehman</b>
              <span>Full-stack &amp; AI engineer</span>
            </figcaption>
          </motion.figure>
        </div>

        <ul className="hero--strip">
          {HERO_STRIP.map((item, i) => (
            <motion.li key={item.slug} {...rise(0.18 + i * 0.07)}>
              <Link to={`/projects/${item.slug}`} className="hero--tile">
                <Picture base={item.image} alt={item.alt} eager sizes={SIZES.heroTile} />
                <span className="hero--tile-text">
                  <b>{item.title}</b>
                  <span>{item.caption}</span>
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Home;

import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, MessageCircle } from "lucide-react";
import SEO from "./SEO";
import ProjectImage from "./ProjectImage";
import { SIZES } from "../lib/images";
import { projectsData } from "../data/projects";

const AI_PATTERN = /\bAI\b|Claude|Gemini|Groq|Anthropic|OpenAI|Whisper/;
const isAI = (p) => AI_PATTERN.test(p.subtitle) || p.tags.some((t) => AI_PATTERN.test(t));
const isMobile = (p) => p.tags.some((t) => /React Native|Expo/.test(t));

const FILTERS = [
  { key: "all", label: "All", test: () => true },
  { key: "ai", label: "AI", test: isAI },
  { key: "web", label: "Web apps", test: (p) => !isMobile(p) },
  { key: "mobile", label: "Mobile apps", test: isMobile },
];

// Personal and freelance projects invite a conversation; AIDEVGEN team projects don't
const canDiscuss = (project) => project.company !== "AIDEVGEN";
const contextLine = (p) => (p.company === "AIDEVGEN" ? `${p.role} at AIDEVGEN` : p.company);

const Projects = () => {
  const [filter, setFilter] = useState("all");

  const ordered = useMemo(() => [...projectsData].sort((a, b) => b.id - a.id), []);
  const active = FILTERS.find((f) => f.key === filter);
  const visible = ordered.filter(active.test);

  return (
    <section className="archive section" id="projects">
      <SEO
        title="Projects | Wasif Rehman - Full-Stack & AI Engineer"
        description="Case studies of AI agents, automation pipelines, SaaS platforms and mobile apps: the problem, what I built, and the stack."
        path="/projects"
      />
      <div className="container">
        <header className="section-head">
          <h1 className="section-head--title">All projects</h1>
          <p className="section-head--lead">
            {projectsData.length} projects, newest first. Each one has a case study with my role and how
            it was built.
          </p>
        </header>

        <div className="archive--filters" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`archive--filter ${filter === f.key ? "is-active" : ""}`}
              aria-pressed={filter === f.key}
              onClick={() => setFilter(f.key)}
            >
              {f.label} <span>{ordered.filter(f.test).length}</span>
            </button>
          ))}
        </div>

        <ul className="archive--grid">
          {visible.map((project, i) => (
            <motion.li
              key={project.slug}
              className="archive--card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(i, 6) * 0.04 }}
            >
              <Link to={`/projects/${project.slug}`} className="archive--media" tabIndex={-1} aria-hidden="true">
                <ProjectImage
                  src={project.image}
                  alt={project.alt}
                  contain={project.isLogo}
                  sizes={SIZES.projectCard}
                  priority={i === 0}
                  eager={i < 3}
                />
              </Link>
              <div className="archive--body">
                <p className="archive--meta">
                  <span className="archive--kind">{project.subtitle}</span>
                  <span>{contextLine(project)}</span>
                </p>
                <h2 className="archive--title">
                  <Link to={`/projects/${project.slug}`}>{project.title}</Link>
                </h2>
                <p className="archive--desc">{project.description}</p>
                <ul className="archive--tags" aria-label="Stack">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <div className="archive--links">
                  <Link to={`/projects/${project.slug}`} className="work--link">
                    Case study <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  {project.demo && project.demo !== "#" && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="work--link work--link-muted">
                      Live app <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  )}
                  {canDiscuss(project) && (
                    <Link to={`/?discuss=${encodeURIComponent(project.slug)}#contact`} className="work--link work--link-muted">
                      <MessageCircle size={14} aria-hidden="true" /> Discuss
                    </Link>
                  )}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Projects;

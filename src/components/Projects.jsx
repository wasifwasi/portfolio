import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, ExternalLink, ArrowRight, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SEO from "./SEO";
import Pagination from "./Pagination";
import { projectsData } from "../data/projects";

const PROJECTS_PER_PAGE = 6;

gsap.registerPlugin(ScrollTrigger);

// Optimized Image Component with lazy loading, placeholder, and smooth transitions
const OptimizedImage = ({ src, alt, className, isLogo }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);

  return (
    <div ref={containerRef} className="optimized-image-container">
      {/* Skeleton placeholder */}
      <div
        className={`image-skeleton ${isLoaded ? "hidden" : ""}`}
        aria-hidden="true"
      />

      {/* Actual image */}
      {isInView && !hasError && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`${className} ${isLoaded ? "loaded" : "loading"}`}
          onLoad={handleLoad}
          onError={handleError}
          decoding="async"
          fetchPriority="low"
        />
      )}

      {/* Error fallback */}
      {hasError && (
        <div className={`image-fallback ${isLogo ? "logo-fallback" : ""}`}>
          <span>{alt.split(" - ")[0]}</span>
        </div>
      )}
    </div>
  );
};

const Projects = () => {
  const projectsRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projectsData.length / PROJECTS_PER_PAGE);

  // Newest first (highest id), with any featured project pinned to the very top
  const orderedProjects = useMemo(() => {
    return [...projectsData].sort((a, b) => {
      if (!!b.featured !== !!a.featured) return b.featured ? 1 : -1;
      return b.id - a.id;
    });
  }, []);

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * PROJECTS_PER_PAGE;
    return orderedProjects.slice(start, start + PROJECTS_PER_PAGE);
  }, [currentPage, orderedProjects]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (containerRef.current) {
      const top = containerRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleCardClick = (slug) => {
    navigate(`/projects/${slug}`);
  };

  const handleExternalClick = (e) => {
    e.stopPropagation();
  };

  // Personal & freelance projects invite a conversation; company (AIDEVGEN) ones don't
  const canDiscuss = (project) => project.company !== "AIDEVGEN";

  const handleDiscuss = (e, project) => {
    e.stopPropagation();
    navigate(`/?discuss=${encodeURIComponent(project.slug)}#contact`);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo(
        ".projects .section--title-1",
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".projects .section--title-1",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate project cards with stagger
      gsap.fromTo(
        ".projects--card",
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
        }
      );

      // Image hover is now handled by CSS border beam effect
    }, projectsRef);

    return () => ctx.revert();
  }, [currentPage]);

  return (
    <section className="projects section" id="projects" ref={projectsRef}>
      <SEO
        title="Projects | Wasif Rehman - Full-Stack & AI Engineer"
        description="Case studies of AI agents, automation pipelines, SaaS platforms and mobile apps — the problem, what I built, and the stack."
        path="/projects"
      />
      <h2 className="section--title-1">
        <span>Projects.</span>
      </h2>
      <div className="projects--container container grid" ref={containerRef}>
        {paginatedProjects.map((project, index) => (
          <article
            className="projects--card"
            key={project.id}


            onClick={() => handleCardClick(project.slug)}
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardClick(project.slug);
              }
            }}
          >
            <div className="projects--image-link">
              <div className="projects--image">
                {project.featured && (
                  <span className="projects--featured-badge">
                    <Sparkles size={13} aria-hidden="true" /> Featured
                  </span>
                )}
                <OptimizedImage
                  src={project.image}
                  alt={project.alt}
                  className={`projects--img ${project.isLogo ? 'logo-img' : ''}`}
                  isLogo={project.isLogo}
                />
                <div className="projects--image-overlay">
                  <span>View Details</span>
                </div>
              </div>
            </div>

            <div className="projects--content">
              <div className="projects--header">
                <h3 className="projects--subtitle">{project.subtitle}</h3>
                <div className="projects--meta">
                  <span className="projects--role">{project.role}</span>
                  <span className="projects--company">{project.company}</span>
                </div>
              </div>

              <div className="projects--title-link">
                <h2 className="projects--title">{project.title}</h2>
              </div>

              <p className="project--description">{project.description}</p>

              <div className="projects--tags">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="projects--tag">{tag}</span>
                ))}
              </div>

              <div className="projects--buttons">
                <span className="projects-link projects-link--details">
                  <ArrowRight size={16} aria-hidden="true" /> Details
                </span>
                {canDiscuss(project) && (
                  <button
                    type="button"
                    className="projects-link projects-link--discuss"
                    onClick={(e) => handleDiscuss(e, project)}
                  >
                    <MessageCircle size={16} aria-hidden="true" /> Discuss this project
                  </button>
                )}

                {project.demo !== "#" && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="projects-link"
                    onClick={handleExternalClick}
                  >
                    <ExternalLink size={16} aria-hidden="true" /> Demo
                  </a>
                )}
              </div>
            </div>
          </article>
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

export default Projects;

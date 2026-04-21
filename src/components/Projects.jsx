import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SEO from "./SEO";
import Pagination from "./Pagination";

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
          fetchpriority="low"
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

// Project data - Update the github and demo links with your actual URLs
const projectsData = [
  {
    id: 2,
    slug: "freenote-app",
    image: "img/freenote.png",
    alt: "FreeNote - AI-Powered Voice Note App",
    subtitle: "Mobile App & AI",
    title: "FreeNote",
    description:
      "AI-powered voice note-taking app with real-time transcription, smart summarization, interactive AI chat, PDF export, and cloud sync. Built with React Native, Expo, Firebase, and Groq AI.",
    github: "https://github.com/wasifwasi",
    demo: "#",
    isLogo: true,
    role: "Full-Stack Developer",
    company: "AIDEVGEN",
    tags: ["React Native", "Expo", "Firebase", "Groq AI", "TypeScript"],
  },
  {
    id: 3,
    slug: "prove-it-auto",
    image: "img/project_img_1.png",
    alt: "Prove It Auto - AI-Powered Car Maintenance App",
    subtitle: "Mobile App & AI",
    title: "Prove It Auto",
    description:
      "AI-powered car maintenance app featuring dashboard light scanning, tire inspection, maintenance quote analysis, and service scheduling. Built with React Native, Node.js, MongoDB, and Google Gemini AI.",
    github: "https://github.com/wasifwasi",
    demo: "#",
    isLogo: true,
    role: "Full-Stack Developer",
    company: "AIDEVGEN",
    tags: ["React Native", "Node.js", "MongoDB", "Gemini AI"],
  },
  {
    id: 4,
    slug: "ecommerce-platform",
    image: "img/ecommerce.png",
    alt: "E-Commerce Platform Dashboard",
    subtitle: "Full-Stack MERN",
    title: "E-Commerce Platform",
    description:
      "A complete e-commerce solution with product management, cart functionality, Stripe payments, user authentication, and admin dashboard. Built with MongoDB, Express, React, and Node.js.",
    github: "https://github.com/wasifwasi",
    demo: "#",
    role: "Full-Stack Developer",
    company: "Personal Project",
    tags: ["MongoDB", "Express", "React", "Node.js", "Stripe"],
  },
  {
    id: 5,
    slug: "live-voting-system",
    image: "img/vote.png",
    alt: "Live Voting System Dashboard",
    subtitle: "Full Stack Development",
    title: "Live Voting System",
    description:
      "Created a live voting system using React, Node.js, and MongoDB for accurate vote forecasting and analysis with real-time updates.",
    github: "https://github.com/wasifwasi",
    demo: "#",
    role: "Full-Stack Developer",
    company: "Freelance",
    tags: ["React", "Node.js", "MongoDB", "Socket.io", "Real-time"],
  },
  {
    id: 6,
    slug: "academic-analytics",
    image: "img/edu.png",
    alt: "Academic Analytics System Interface",
    subtitle: "Full-Stack Development",
    title: "Academic Analytics System",
    description:
      "Built a comprehensive academic analytics system with team collaboration features, real-time updates, and drag-and-drop interface using the MERN stack.",
    github: "https://github.com/wasifwasi",
    demo: "#",
    role: "Full-Stack Developer",
    company: "Freelance",
    tags: ["React", "Node.js", "MongoDB", "Express", "Analytics"],
  },
  {
    id: 7,
    slug: "bible-trader",
    image: "img/bible-trader.png",
    alt: "Bible Trader - Marketplace Platform",
    subtitle: "Full-Stack E-commerce",
    title: "Bible Trader",
    description:
      "A marketplace platform for buying, selling, and trading Bibles. Features escrow payments, Stripe integration, trade requests, and daily verse display. Built with React, TypeScript, Tailwind CSS, and Supabase.",
    github: "https://github.com/wasifwasi",
    demo: "#",
    isLogo: true,
    role: "Full-Stack Developer",
    company: "AIDEVGEN",
    tags: ["React", "TypeScript", "Tailwind", "Supabase", "Stripe"],
  },
  {
    id: 8,
    slug: "mmpb-recruitment",
    image: "img/mmpb.png",
    alt: "Master Man Power Bureau - Recruitment Platform",
    subtitle: "Full-Stack Recruitment Platform",
    title: "Master Man Power Bureau",
    description:
      "International recruitment agency platform for overseas employment. Features job listings, application tracking, CV management with AWS S3, admin dashboard, and email notifications. Built with Next.js, NestJS, PostgreSQL, and Prisma.",
    github: "https://github.com/wasifwasi",
    demo: "#",
    isLogo: true,
    role: "Full-Stack Developer",
    company: "Freelance",
    tags: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "AWS S3"],
  },
  {
    id: 9,
    slug: "zareen-couture",
    image: "img/zareen.png",
    alt: "Zareen Couture - Luxury Bridal E-Commerce",
    subtitle: "Full-Stack E-commerce",
    title: "Zareen Couture",
    description:
      "Luxury Pakistani bridal couture e-commerce platform with advanced filtering, custom order system, virtual consultation booking, and global shipping. Built with Next.js, TypeScript, and Tailwind CSS.",
    github: "https://github.com/wasifwasi",
    demo: "#",
    isLogo: true,
    role: "Full-Stack Developer",
    company: "Freelance",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Lucide"],
  },
  {
    id: 10,
    slug: "plumbers-mate-ai",
    image: "img/plumbers-mate.png",
    alt: "Plumber's Mate AI - AI Business Automation Platform",
    subtitle: "AI SaaS & Business Automation",
    title: "Plumber's Mate AI",
    description:
      "AI-powered business automation platform for plumbing businesses — captures leads, books jobs, automates quotes, payments, and Google review requests, and re-engages old leads. Built with Next.js 16, React 19, TypeScript, Tailwind CSS, and Framer Motion.",
    github: "https://github.com/wasifwasi",
    demo: "#",
    isLogo: true,
    role: "Full-Stack Developer (Collaborator)",
    company: "AIDEVGEN",
    tags: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: 11,
    slug: "clay-imaginary",
    image: "img/clay-imaginary.png",
    alt: "Clay Imaginary - AI Image Generation Studio",
    subtitle: "AI Image Generation & Editing",
    title: "Clay Imaginary",
    description:
      "AI-powered image generation and editing studio with canvas-based compositing, drag-and-drop design, and export-to-image workflows for social, product, and content creators. Built with Next.js 15, React 19, Fabric.js, Framer Motion, and html2canvas.",
    github: "https://github.com/wasifwasi",
    demo: "#",
    isLogo: true,
    role: "Full-Stack Developer (Collaborator)",
    company: "AIDEVGEN",
    tags: ["Next.js", "React 19", "Fabric.js", "TypeScript", "Tailwind CSS"],
  },
];

const Projects = () => {
  const projectsRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projectsData.length / PROJECTS_PER_PAGE);

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * PROJECTS_PER_PAGE;
    return projectsData.slice(start, start + PROJECTS_PER_PAGE);
  }, [currentPage]);

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
        title="Projects | Wasif Rehman - Full Stack Developer"
        description="Explore my portfolio of full-stack projects including enterprise systems, AI-powered apps, mobile applications, and e-commerce platforms."
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
            data-aos="fade-up"
            data-aos-delay={index * 100}
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
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="projects-link"
                  onClick={handleExternalClick}
                >
                  <Github size={16} aria-hidden="true" /> Code
                </a>

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

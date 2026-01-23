import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    id: 1,
    slug: "erpnext-system",
    image: "img/erpnext.png",
    alt: "ERPNext - Enterprise Resource Planning System",
    subtitle: "Full-Stack ERP Solution",
    title: "ERPNext System",
    description:
      "Enterprise-grade ERP system with 35+ modules including accounting, inventory, HR/payroll, CRM, manufacturing, and sales. Built on Frappe Framework with Python, Vue.js, MariaDB, and Redis.",
    github: "https://github.com/wasifwasi",
    demo: "#",
    isLogo: true,
    role: "Full-Stack Developer",
    company: "Frappe Technologies",
    tags: ["Python", "Vue.js", "MariaDB", "Redis", "Frappe"],
  },
  {
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
];

const Projects = () => {
  const projectsRef = useRef(null);
  const navigate = useNavigate();

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
          y: 80,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects--container",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate project images on hover effect setup
      const cards = document.querySelectorAll(".projects--card");
      cards.forEach((card) => {
        const img = card.querySelector(".projects--img");

        card.addEventListener("mouseenter", () => {
          gsap.to(img, {
            scale: 1.1,
            duration: 0.4,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(img, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        });
      });
    }, projectsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="projects section" id="projects" ref={projectsRef}>
      <h2 className="section--title-1">
        <span>Projects.</span>
      </h2>
      <div className="projects--container container grid">
        {projectsData.map((project, index) => (
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
    </section>
  );
};

export default Projects;

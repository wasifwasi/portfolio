import React, { useEffect, useRef } from "react";
import { Github, ExternalLink } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Project data - Update the github and demo links with your actual URLs
const projectsData = [
  {
    id: 1,
    image: "img/project_img_1.png",
    alt: "Prove It Auto - AI-Powered Car Maintenance App",
    subtitle: "Mobile App & AI",
    title: "Prove It Auto",
    description:
      "AI-powered car maintenance app featuring dashboard light scanning, tire inspection, maintenance quote analysis, and service scheduling. Built with React Native, Node.js, MongoDB, and Google Gemini AI.",
    github: "https://github.com/wasifwasi",
    demo: "#",
    isLogo: true,
  },
  {
    id: 2,
    image: "img/skin.png",
    alt: "Skin Disease Detection AI Application Interface",
    subtitle: "AI & Machine Learning",
    title: "Skin Disease Detection AI",
    description:
      "Developed an advanced deep learning model achieving 98% accuracy in detecting early-stage skin conditions. Built with Python, TensorFlow, and OpenCV for real-time predictions.",
    github: "https://github.com/wasifwasi",
    demo: "#",
  },
  {
    id: 3,
    image: "img/vote.png",
    alt: "Live Voting System Dashboard",
    subtitle: "Full Stack Development",
    title: "Live Voting System",
    description:
      "Created a live voting system using React, Node.js, and MongoDB for accurate vote forecasting and analysis with real-time updates.",
    github: "https://github.com/wasifwasi",
    demo: "#",
  },
  {
    id: 4,
    image: "img/edu.png",
    alt: "Academic Analytics System Interface",
    subtitle: "Full-Stack Development",
    title: "Academic Analytics System",
    description:
      "Built a comprehensive academic analytics system with team collaboration features, real-time updates, and drag-and-drop interface using the MERN stack.",
    github: "https://github.com/wasifwasi",
    demo: "#",
  },
  {
    id: 5,
    image: "img/bible-trader.png",
    alt: "Bible Trader - Marketplace Platform",
    subtitle: "Full-Stack E-commerce",
    title: "Bible Trader",
    description:
      "A marketplace platform for buying, selling, and trading Bibles. Features escrow payments, Stripe integration, trade requests, and daily verse display. Built with React, TypeScript, Tailwind CSS, and Supabase.",
    github: "https://github.com/wasifwasi",
    demo: "#",
    isLogo: true,
  },
];

const Projects = () => {
  const projectsRef = useRef(null);

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
          >
            <div className="projects--image">
              <img
                src={project.image}
                alt={project.alt}
                className={`projects--img ${project.isLogo ? 'logo-img' : ''}`}
                loading="lazy"
              />
            </div>
            <div className="projects--content">
              <h3 className="projects--subtitle">{project.subtitle}</h3>
              <h2 className="projects--title">{project.title}</h2>
              <p className="project--description">{project.description}</p>
            </div>

            <div className="projects--buttons">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="projects-link"
              >
                <Github size={16} aria-hidden="true" /> Code
              </a>

              {project.demo !== "#" && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="projects-link"
                >
                  <ExternalLink size={16} aria-hidden="true" /> Demo
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;

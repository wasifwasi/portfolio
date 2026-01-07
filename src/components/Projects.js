import React from "react";
import { Github, ExternalLink } from "lucide-react";

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
  return (
    <section className="projects section" id="projects">
      <h2 className="section--title-1">
        <span>Projects.</span>
      </h2>
      <div className="projects--container container grid">
        {projectsData.map((project) => (
          <article className="projects--card" key={project.id}>
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

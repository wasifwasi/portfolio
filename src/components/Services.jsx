import React, { useRef, useState, useCallback } from "react";
import { Layers, Bot, Workflow } from "lucide-react";
import PulseBeams from "./PulseBeams";

const Card3D = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState(
    "perspective(1000px) rotateY(0deg) rotateX(0deg)"
  );

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateY = (x / rect.width) * 20;
    const rotateX = -(y / rect.height) * 20;
    setTransform(
      `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`
    );
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(1000px) rotateY(0deg) rotateX(0deg)");
  }, []);

  return (
    <div
      ref={cardRef}
      className={`card-3d ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
};

const CardItem = ({ children, className = "", translateZ = 0, as: Tag = "div" }) => (
  <Tag
    className={className}
    style={{
      transform: `translateZ(${translateZ}px)`,
      transformStyle: "preserve-3d",
      transition: "transform 0.2s ease",
    }}
  >
    {children}
  </Tag>
);

const Services = () => {
  const servicesData = [
    {
      icon: Layers,
      title: "MERN Stack Development",
      description: (
        <>
          Building scalable full-stack applications with <b>MongoDB, Express, React & Node.js</b>.
          From RESTful APIs to dynamic dashboards, delivering end-to-end
          solutions with clean architecture.
        </>
      ),
    },
    {
      icon: Bot,
      title: "AI Integration & Automation",
      description: (
        <>
          Integrating <b>AI-powered features</b> into web applications including
          chatbots, smart assistants, and workflow automation using
          <b> OpenAI, Google Gemini</b>, and other LLM APIs.
        </>
      ),
    },
    {
      icon: Workflow,
      title: "API & Backend Solutions",
      description: (
        <>
          Designing robust <b>REST & GraphQL APIs</b> with authentication,
          real-time features using <b>Socket.io</b>, and database optimization.
          Building backends that scale efficiently.
        </>
      ),
    },
  ];

  return (
    <section className="services section" id="services">
      <PulseBeams className="services--pulse-beams" />
      <h2
        className="section--title-2"
        data-aos="fade-right"
        data-aos-duration="800"
      >
        <span>Services.</span>
      </h2>
      <div className="services--container container grid">
        {servicesData.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <Card3D
              key={index}
              className="services--card"
            >
              <article
                className="services--card-inner"
                data-aos="fade-up"
                data-aos-delay={index * 150}
                data-aos-duration="800"
              >
                <div className="services--border"></div>
                <div className="services--content">
                  <CardItem translateZ={60}>
                    <div className="services--icon">
                      <div className="services--box"></div>
                      <IconComponent size={32} strokeWidth={1.5} />
                    </div>
                  </CardItem>
                  <CardItem translateZ={40} as="h2" className="services--title">
                    {service.title}
                  </CardItem>
                  <CardItem translateZ={20} as="p" className="services--description">
                    {service.description}
                  </CardItem>
                </div>
              </article>
            </Card3D>
          );
        })}
      </div>
    </section>
  );
};

export default Services;

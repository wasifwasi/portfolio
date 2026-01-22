import React from "react";
import { Layers, Bot, Workflow } from "lucide-react";

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
      title: "AI & Automation",
      description: (
        <>
          Integrating <b>AI-powered features</b> into web applications including
          chatbots, image recognition, and smart automation. Expertise in
          <b> TensorFlow, OpenCV</b>, and LLM APIs like Google Gemini.
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
            <article
              className="services--card"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              data-aos-duration="800"
            >
              <div className="services--border"></div>
              <div className="services--content">
                <div
                  className="services--icon"
                  data-aos="zoom-in"
                  data-aos-delay={index * 150 + 200}
                >
                  <div className="services--box"></div>
                  <IconComponent size={32} strokeWidth={1.5} />
                </div>
                <h2 className="services--title">{service.title}</h2>
                <p className="services--description">{service.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Services;

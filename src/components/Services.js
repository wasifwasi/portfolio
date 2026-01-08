import React from "react";
import { ScanEye, Code2, Palette } from "lucide-react";

const Services = () => {
  const servicesData = [
    {
      icon: ScanEye,
      title: "AI & Computer Vision",
      description: (
        <>
          Expertise in building AI-powered image detection models,
          specifically for <b>skin disease diagnosis</b> and <b>human eye detection</b>,
          leveraging deep learning for accurate analysis.
        </>
      ),
    },
    {
      icon: Code2,
      title: "Full-Stack & Migration",
      description: (
        <>
          Building dynamic <b>E-commerce platforms</b> and specializing in
          <b> migrating static HTML/CSS/JS</b> sites to scalable, modern
          React applications for better performance.
        </>
      ),
    },
    {
      icon: Palette,
      title: "Web Design & UI/UX",
      description: (
        <>
          Designing professional, interactive interfaces that <b>wow</b> users.
          Focus on responsive layouts, aesthetic visuals, and seamless
          user experiences.
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

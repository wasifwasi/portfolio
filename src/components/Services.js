import React from "react";
import { ScanEye, Code2, Palette } from "lucide-react";

const Services = () => {
  return (
    <section className="services section" id="services">
      <h2 className="section--title-2">
        <span>Services.</span>
      </h2>
      <div className="services--container container grid">
        <article className="services--card">
          <div className="services--border"></div>
          <div className="services--content">
            <div className="services--icon">
              <div className="services--box"></div>
              <ScanEye size={32} strokeWidth={1.5} />
            </div>
            <h2 className="services--title">AI & Computer Vision</h2>
            <p className="services--description">
              Expertise in building AI-powered image detection models,
              specifically for <b>skin disease diagnosis</b> and <b>human eye detection</b>,
              leveraging deep learning for accurate analysis.
            </p>
          </div>
        </article>

        <article className="services--card">
          <div className="services--border"></div>
          <div className="services--content">
            <div className="services--icon">
              <div className="services--box"></div>
              <Code2 size={32} strokeWidth={1.5} />
            </div>
            <h2 className="services--title">Full-Stack & Migration</h2>
            <p className="services--description">
              Building dynamic <b>E-commerce platforms</b> and specializing in
              <b> migrating static HTML/CSS/JS</b> sites to scalable, modern
              React applications for better performance.
            </p>
          </div>
        </article>

        <article className="services--card">
          <div className="services--border"></div>
          <div className="services--content">
            <div className="services--icon">
              <div className="services--box"></div>
              <Palette size={32} strokeWidth={1.5} />
            </div>
            <h2 className="services--title">Web Design & UI/UX</h2>
            <p className="services--description">
              Designing professional, interactive interfaces that <b>wow</b> users.
              Focus on responsive layouts, aesthetic visuals, and seamless
              user experiences.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Services;

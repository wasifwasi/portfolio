import React from "react";

const Services = () => {
  return (
    <section className="services section" id="services.">
      <h2 className="section--title-2">
        <span>Services.</span>
      </h2>
      <div className="services--container container grid">
        <article className="services--card">
          <div className="services--border"></div>
          <div className="services--content">
            <div className="services--icon">
              <div className="services--box"></div>
              <i className="ri-layout-4-line"></i>
            </div>
            <h2 className="services--title">Web Design</h2>
            <p className="services--description">
              Beautiful and elegant designs with interfaces that are
              intuitive, efficient and pleasant to use for the user.
            </p>
          </div>
        </article>

        <article className="services--card">
          <div className="services--border"></div>
          <div className="services--content">
            <div className="services--icon">
              <div className="services--box"></div>
              <i className="ri-code-box-line"></i>
            </div>
            <h2 className="services--title">Development</h2>
            <p className="services--description">
              Custom web development tailored to your specifications,
              designed to provide a flawless user experience.
            </p>
          </div>
        </article>

        <article className="services--card">
          <div className="services--border"></div>
          <div className="services--content">
            <div className="services--icon">
              <div className="services--box"></div>
              <i className="ri-wordpress-line"></i>
            </div>
            <h2 className="services--title">WordPress</h2>
            <p className="services--description">
              Leverage our WordPress development expertise to bring your
              website concepts to life.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Services;

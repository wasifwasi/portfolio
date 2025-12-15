import React from "react";

const Projects = () => {
  return (
    <section className="projects section" id="projects">
      <h2 className="section--title-1">
        <span>Projects.</span>
      </h2>
      <div className="projects--container container grid">
        <article className="projects--card">
          <div className="projects--image">
            <img
              src="img/hasnain-project.png"
              alt=""
              className="projects--img"
            />
            <button type="button" className="projects--button buttons">
              <i className="ri-arrow-right-up-fill" aria-hidden="true"></i>
            </button>
          </div>
          <div className="projects--content">
            <h3 className="projects--subtitle">WordPress Website</h3>
            <h2 className="projects--title">Personal Portfolio</h2>
            <p className="project--description">
              Undertook a WordPress portfolio project, focusing on design
              and layout to create a professional online presence that
              effectively highlights my skills and experience.
            </p>
          </div>

          <div className="projects--buttons">
            <button type="button" className="projects-link">
              <i className="ri-github-fill" aria-hidden="true"></i> View
            </button>

            <button type="button" className="projects-link">
              <i className="ri-dribbble-fill" aria-hidden="true"></i> View
            </button>
          </div>
        </article>

        <article className="projects--card">
          <div className="projects--image">
            <img
              src="img/hasnain-project2.png"
              alt=""
              className="projects--img"
            />
            <button type="button" className="projects--button buttons">
              <i className="ri-arrow-right-up-fill" aria-hidden="true"></i>
            </button>
          </div>
          <div className="projects--content">
            <h3 className="projects--subtitle">Website</h3>
            <h2 className="projects--title">Animated Log In Form</h2>
            <p className="project--description">
              Developed an interactive and visually appealing login form by
              combining HTML, CSS, JavaScript, jQuery, and Bootstrap,
              demonstrating expertise in dynamic design and user
              interaction.
            </p>
          </div>

          <div className="projects--buttons">
            <button type="button" className="projects-link">
              <i className="ri-github-fill" aria-hidden="true"></i> View
            </button>

            <button type="button" className="projects-link">
              <i className="ri-dribbble-fill" aria-hidden="true"></i> View
            </button>
          </div>
        </article>

        <article className="projects--card">
          <div className="projects--image">
            <img
              src="img/hasnian-project1.png"
              alt=""
              className="projects--img"
            />
            <button type="button" className="projects--button buttons">
              <i className="ri-arrow-right-up-fill" aria-hidden="true"></i>
            </button>
          </div>
          <div className="projects--content">
            <h3 className="projects--subtitle">Website</h3>
            <h2 className="projects--title">Netflix Clone</h2>
            <p className="project--description">
              Successfully replicated the Netflix user interface, paying
              close attention to design and structure to deliver an
              immersive user experience using HTML and CSS.
            </p>
          </div>

          <div className="projects--buttons">
            <button type="button" className="projects-link">
              <i className="ri-github-fill" aria-hidden="true"></i> View
            </button>

            <button type="button" className="projects-link">
              <i className="ri-dribbble-fill" aria-hidden="true"></i> View
            </button>
          </div>
        </article>

        <article className="projects--card">
          <div className="projects--image">
            <img
              src="img/dp.png"
              alt=""
              className="projects--img"
            />
            <button type="button" className="projects--button buttons">
              <i className="ri-arrow-right-up-fill" aria-hidden="true"></i>
            </button>
          </div>
          <div className="projects--content">
            <h3 className="projects--subtitle">AI & Machine Learning</h3>
            <h2 className="projects--title">Skin Disease Detection AI</h2>
            <p className="project--description">
              Developed an advanced deep learning model achieving 98% accuracy
              in detecting early-stage skin conditions. Built with Python,
              TensorFlow, and OpenCV for real-time predictions.
            </p>
          </div>

          <div className="projects--buttons">
            <button type="button" className="projects-link">
              <i className="ri-github-fill" aria-hidden="true"></i> View
            </button>

            <button type="button" className="projects-link">
              <i className="ri-dribbble-fill" aria-hidden="true"></i> View
            </button>
          </div>
        </article>

        <article className="projects--card">
          <div className="projects--image">
            <img
              src="img/random-lines.svg"
              alt=""
              className="projects--img"
            />
            <button type="button" className="projects--button buttons">
              <i className="ri-arrow-right-up-fill" aria-hidden="true"></i>
            </button>
          </div>
          <div className="projects--content">
            <h3 className="projects--subtitle">Data Science</h3>
            <h2 className="projects--title">Sales Forecasting Tool</h2>
            <p className="project--description">
              Created a predictive analytics platform for retail businesses
              using time-series analysis and machine learning algorithms
              for accurate sales forecasting and trend analysis.
            </p>
          </div>

          <div className="projects--buttons">
            <button type="button" className="projects-link">
              <i className="ri-github-fill" aria-hidden="true"></i> View
            </button>

            <button type="button" className="projects-link">
              <i className="ri-dribbble-fill" aria-hidden="true"></i> View
            </button>
          </div>
        </article>

        <article className="projects--card">
          <div className="projects--image">
            <img
              src="img/curved-arrow.svg"
              alt=""
              className="projects--img"
            />
            <button type="button" className="projects--button buttons">
              <i className="ri-arrow-right-up-fill" aria-hidden="true"></i>
            </button>
          </div>
          <div className="projects--content">
            <h3 className="projects--subtitle">Full-Stack Development</h3>
            <h2 className="projects--title">Task Management App</h2>
            <p className="project--description">
              Built a comprehensive task management application with team
              collaboration features, real-time updates, and drag-and-drop
              interface using the MERN stack.
            </p>
          </div>

          <div className="projects--buttons">
            <button type="button" className="projects-link">
              <i className="ri-github-fill" aria-hidden="true"></i> View
            </button>

            <button type="button" className="projects-link">
              <i className="ri-dribbble-fill" aria-hidden="true"></i> View
            </button>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Projects;

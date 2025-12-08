import "./App.css";

function App() {
  return (
    <div>
      {/* <!--==================== HEADER ====================--> */}
      <header className="header" id="header">
        <nav className="nav container">
          <a href="#home" className="nav--logo">
            <span className="nav--logo-circle">
              <img src="img/icon.png" alt="Wasif logo" />
            </span>
            <span className="nav--logo-name">Wasif Rehman</span>
          </a>
          <div className="nav--menu" id="nav-menu">
            <span className="nav--title">Menu</span>
            <h3 className="nav--name">Wasif</h3>

            <ul className="nav--list">
              <li className="nav--item">
                <a href="#home" className="nav--link active-link">
                  Home
                </a>
              </li>

              <li className="nav--item">
                <a href="#about" className="nav--link">
                  About Me
                </a>
              </li>

              <li className="nav--item">
                <a href="#projects" className="nav--link">
                  Projects
                </a>
              </li>

              <li className="nav--item">
                <a href="#contact" className="nav--link nav--link-buttonn">
                  Contact Me
                </a>
              </li>
            </ul>

            <div className="nav--close" id="nav-close">
              <i className="ri-close-line"></i>
            </div>
          </div>

          <div className="nav--buttons">
            <div className="nav--toggle" id="nav-toggle">
              <i className="ri-menu-4-line"></i>
            </div>
          </div>
        </nav>
      </header>

      {/* <!--==================== MAIN ====================--> */}
      <main className="main">
        {/* <!--==================== HOME ====================--> */}
        <section className="home section" id="home">
          <div className="home--container container grid">
            <h1 className="home--name">Wasif Rehman</h1>
            <div className="home--profile">
              <div className="home--image">
                <img src="img/dp.png" alt="" className="home--img" />
                <div className="home--shadow"></div>

                <img
                  src="img/curved-arrow.svg"
                  alt=""
                  className="home--arrow"
                />
                <img
                  src="img/random-lines.svg"
                  alt=""
                  className="home--line"
                />
                <div className="geometric-box"></div>
              </div>
              <div className="home--social">
                <a
                  href="https://www.instagram.com/les_troll_them"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home--social-link"
                >
                  <i className="ri-instagram-line"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/wasif-rehman-32210a18b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home--social-link"
                >
                  <i className="ri-linkedin-box-line"></i>
                </a>
                <a
                  href="https://github.com/wasifwasi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home--social-link"
                >
                  <i className="ri-github-line"></i>
                </a>
              </div>
            </div>
            <div className="home--info">
              <p className="home--description">
                <b>Full-Stack Developer</b>, with knowledge in web development
                and design, I offer the best projects resulting in quality work.
              </p>
              <a href="#about" className="home--scroll">
                <div className="home--scroll-box">
                  <i className="ri-arrow-down-s-line"></i>
                </div>

                <span className="home--scroll-text">Scroll Down</span>
              </a>
            </div>
          </div>
        </section>

        {/* <!--==================== ABOUT ====================--> */}
        <section className="about section" id="about">
          <div className="about--container container grid">
            <h2 className="section--title-1">
              <span>About Me.</span>
            </h2>
            <div className="about--profile">
              <div className="about--image">
                <img
                  src="img/has_-removebg-preview.png"
                  alt="Wasif Rehman"
                  className="about--img"
                />
                <div className="about--shadow"></div>

                <div className="geometric-box"></div>
                <img
                  src="img/random-lines.svg"
                  alt=""
                  className="about--line"
                />
                <div className="about--box"></div>
              </div>
            </div>
            <div className="about--info">
              <p className="about--description">
                Passionate about creating <b>Web Pages</b> with
                <b>HTML,CSS,JS</b>, I have years of experience and clients are
                happy with the projects carried out.
              </p>
              <ul className="about--list">
                <li className="about--item">
                  <b>My Skills Are:</b> HTML, CSS, JavaScript, React, Git &
                  GitHub, Bootstrap, React.
                </li>
              </ul>
              <div className="about--buttons">
                <a href="#contact" className="buttons">
                  <i className="ri-send-plane-line" aria-hidden="true"></i>{" "}
                  Contact Me
                </a>
                <a
                  href="https://www.linkedin.com/in/wasif-rehman-32210a18b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button--ghost"
                >
                  <i className="ri-linkedin-box-line" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* <!--==================== SERVICES ====================--> */}
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

        {/* <!--==================== PROJECTS ====================--> */}
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
                  <i className="ri-arrow-right-up-line" aria-hidden="true"></i>
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
                  <i className="ri-github-line" aria-hidden="true"></i> View
                </button>

                <button type="button" className="projects-link">
                  <i className="ri-dribbble-line" aria-hidden="true"></i> View
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
                  <i className="ri-arrow-right-up-line" aria-hidden="true"></i>
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
                  <i className="ri-github-line" aria-hidden="true"></i> View
                </button>

                <button type="button" className="projects-link">
                  <i className="ri-dribbble-line" aria-hidden="true"></i> View
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
                  <i className="ri-arrow-right-up-line" aria-hidden="true"></i>
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
                  <i className="ri-github-line" aria-hidden="true"></i> View
                </button>

                <button type="button" className="projects-link">
                  <i className="ri-dribbble-line" aria-hidden="true"></i> View
                </button>
              </div>
            </article>
          </div>
        </section>

        {/* <!--==================== CONTACT ====================--> */}
        <section className="contact section" id="contact">
          <div className="contact--container grid">
            <div className="contact--data">
              <h2 className="section--title-2">
                <span>Contact Me.</span>
              </h2>

              <p className="contact--description-1">
                I will read all emails. Send me any message you want and I'll
                get back to you.
              </p>

              <p className="contact--description-2">
                I need your <b>Name</b> and <b>Email Address</b>, but you won't
                receive anything other than your reply.
              </p>

              <div className="geometric-box"></div>
            </div>

            <div className="contact--mail">
              <h2 className="contact--title">Send Me A Message</h2>

              <form action="" className="contact--form" id="contact-form">
                <div className="contact--group">
                  <div className="contact--box">
                    <input
                      type="text"
                      name="user_name"
                      className="contact--input"
                      id="name"
                      required
                      placeholder="Name"
                    />
                    <label htmlFor="name" className="contact--label">
                      First Name
                    </label>
                  </div>

                  <div className="contact--box">
                    <input
                      type="email"
                      name="user_email"
                      className="contact--input"
                      id="email"
                      required
                      placeholder="Email Address"
                    />
                    <label htmlFor="email" className="contact--label">
                      Email Address
                    </label>
                  </div>
                </div>

                <div className="contact--box">
                  <input
                    type="text"
                    name="user_subject"
                    className="contact--input"
                    id="subject"
                    required
                    placeholder="Subject"
                  />
                  <label htmlFor="subject" className="contact--label">
                    Subject
                  </label>
                </div>

                <div className="contact--box contact--area">
                  <textarea
                    name="user_message"
                    id="message"
                    className="contact--input"
                    required
                    placeholder="Message"
                  ></textarea>
                  <label htmlFor="message" className="contact--label">
                    Message
                  </label>
                </div>

                <p className="contact--message" id="contact-message"></p>

                <button type="submit" className="contact--button buttons">
                  <i className="ri-send-plane-line"></i> Send Message
                </button>
              </form>
            </div>
            <div className="contact--social">
              <img
                src="img/curved-arrow.svg"
                alt=""
                className="contact--social-arrow"
              />

              <div className="contact--social-data">
                <div>
                  <p className="contact--social-description-1">
                    Does not send emails
                  </p>

                  <p className="contact--social-description-2">
                    Write me on my social networks
                  </p>
                </div>

                <div className="contact--social-links">
                  <a
                    href="https://www.instagram.com/les_troll_them/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact--social-link"
                  >
                    <i className="ri-instagram-line" aria-hidden="true"></i>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/wasif-rehman-32210a18b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact--social-link"
                  >
                    <i className="ri-linkedin-line" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* <!--==================== FOOTER ====================--> */}
      <footer className="footer">
        <div className="footer--container container grid">
          <ul className="footer--links">
            <li>
              <a href="#about" className="footer--link">
                About
              </a>
            </li>

            <li>
              <a href="#services." className="footer--link">
                Services
              </a>
            </li>

            <li>
              <a href="#projects" className="footer--link">
                Projects
              </a>
            </li>
          </ul>

          <span className="footer--copy">
            &#169; All Rights Reserved By
            <a href="#home">wasifwasi.</a>
          </span>
        </div>
      </footer>

      {/* <!--========== SCROLL UP ==========--> */}
      <a href="#header" className="scrollup" id="scroll-uo">
        <i className="ri-arrow-up-s-line"></i>
      </a>
    </div>
  );
}

export default App;

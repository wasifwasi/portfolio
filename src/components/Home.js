import React from "react";
import { Instagram, Linkedin, Github, ArrowDown } from "lucide-react";

const Home = () => {
  return (
    <section className="home section" id="home">
      <div className="home--container container grid">
        <h1 className="home--name">Wasif Rehman</h1>
        <div className="home--profile">
          <div className="home--image">
            <img src="img/dp.png" alt="Wasif Rehman - Full-Stack Developer" className="home--img" />
            <div className="home--shadow"></div>

            <img
              src="img/curved-arrow.svg"
              alt=""
              aria-hidden="true"
              className="home--arrow"
            />
            <img
              src="img/random-lines.svg"
              alt=""
              aria-hidden="true"
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
              <Instagram />
            </a>
            <a
              href="https://www.linkedin.com/in/wasif-rehman-32210a18b/"
              target="_blank"
              rel="noopener noreferrer"
              className="home--social-link"
            >
              <Linkedin />
            </a>
            <a
              href="https://github.com/wasifwasi"
              target="_blank"
              rel="noopener noreferrer"
              className="home--social-link"
            >
              <Github />
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
              <i><ArrowDown /></i>
            </div>

            <span className="home--scroll-text">Scroll Down</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;

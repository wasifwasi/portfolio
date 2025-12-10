import React from "react";

const Home = () => {
  return (
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
              
            </a>
            <a
              href="https://www.linkedin.com/in/wasif-rehman-32210a18b/"
              target="_blank"
              rel="noopener noreferrer"
              className="home--social-link"
            >
              <i className="ri-linkedin-box-fill"></i>
            </a>
            <a
              href="https://github.com/wasifwasi"
              target="_blank"
              rel="noopener noreferrer"
              className="home--social-link"
            >
              <i className="ri-github-fill"></i>
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
              <i className="ri-arrow-down-s-fill"></i>
            </div>

            <span className="home--scroll-text">Scroll Down</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;

import React, { useState, useEffect } from "react";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [activeNav, setActiveNav] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("header");
      if (window.scrollY >= 50) {
        header.classList.add("shadow-header");
      } else {
        header.classList.remove("shadow-header");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollActive = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollDown = window.scrollY;

      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute("id");

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
          setActiveNav(`#${sectionId}`);
        }
      });
    };

    window.addEventListener("scroll", handleScrollActive);
    return () => window.removeEventListener("scroll", handleScrollActive);
  }, []);

  return (
    <header className="header" id="header">
      <nav className="nav container">
        <a href="#home" className="nav--logo">
          <span className="nav--logo-circle">
            <img src="img/icon.png" alt="Wasif logo" />
          </span>
          <span className="nav--logo-name">Wasif Rehman</span>
        </a>
        <div className={`nav--menu ${toggle ? "show-menu" : ""}`} id="nav-menu">
          <span className="nav--title">Menu</span>
          <ul className="nav--list">
            <li className="nav--item">
              <a
                href="#home"
                className={`nav--link ${activeNav === "#home" ? "active-link" : ""}`}
                onClick={() => {
                    setActiveNav("#home");
                    setToggle(false);
                }}
              >
                Home
              </a>
            </li>
            <li className="nav--item">
              <a
                href="#about"
                className={`nav--link ${activeNav === "#about" ? "active-link" : ""}`}
                onClick={() => {
                    setActiveNav("#about");
                    setToggle(false);
                }}
              >
                About Me
              </a>
            </li>
            <li className="nav--item">
              <a
                href="#projects"
                className={`nav--link ${activeNav === "#projects" ? "active-link" : ""}`}
                onClick={() => {
                    setActiveNav("#projects");
                    setToggle(false);
                }}
              >
                Projects
              </a>
            </li>
            <li className="nav--item">
              <a
                href="#contact"
                className={`nav--link nav--link-buttonn ${activeNav === "#contact" ? "active-link" : ""}`}
                onClick={() => {
                    setActiveNav("#contact");
                    setToggle(false);
                }}
              >
                Contact Me
              </a>
            </li>
          </ul>

          <div className="nav--close" id="nav-close" onClick={() => setToggle(false)}>
            <i className="ri-close-line"></i>
          </div>
        </div>

        <div className="nav--buttons">
          <div className="nav--toggle" id="nav-toggle" onClick={() => setToggle(true)}>
            <i className="ri-menu-4-line"></i>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

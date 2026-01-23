import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Instagram, Linkedin, Github, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const handleSectionClick = (e, hash) => {
    e.preventDefault();
    if (isHome) {
      // On home page, just scroll to section
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to home page first, then scroll
      navigate("/");
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const handlePageClick = (e, path) => {
    e.preventDefault();
    // Only navigate if not already on that page
    if (!location.pathname.startsWith(path)) {
      navigate(path);
    } else {
      // Already on the page, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">
      <div className="footer--container container">
        {/* Top Section */}
        <div className="footer--top" data-aos="fade-up" data-aos-duration="800">
          <div className="footer--brand">
            <a href="#home" className="footer--logo">
              <span className="footer--logo-icon">W</span>
              <span className="footer--logo-text">Wasif Rehman</span>
            </a>
            <p className="footer--description">
              Full-Stack Developer & AI Engineer crafting modern web experiences.
            </p>
          </div>

          <div className="footer--nav">
            <h4 className="footer--title">Quick Links</h4>
            <ul className="footer--links">
              <li>
                <a href="#home" className="footer--link" onClick={(e) => handleSectionClick(e, "#home")}>Home</a>
              </li>
              <li>
                <a href="#about" className="footer--link" onClick={(e) => handleSectionClick(e, "#about")}>About Me</a>
              </li>
              <li>
                <a href="/projects" className="footer--link" onClick={(e) => handlePageClick(e, "/projects")}>Projects</a>
              </li>
              <li>
                <a href="/blog" className="footer--link" onClick={(e) => handlePageClick(e, "/blog")}>My Blogs</a>
              </li>
              <li>
                <a href="#contact" className="footer--link" onClick={(e) => handleSectionClick(e, "#contact")}>Contact Me</a>
              </li>
            </ul>
          </div>

          <div className="footer--social-section">
            <h4 className="footer--title">Connect</h4>
            <div className="footer--social">
              <a
                href="https://github.com/wasifwasi"
                target="_blank"
                rel="noopener noreferrer"
                className="footer--social-link"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/wasif-rehman-32210a18b/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer--social-link"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/les_troll_them"
                target="_blank"
                rel="noopener noreferrer"
                className="footer--social-link"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="mailto:wasifrehman58@gmail.com"
                className="footer--social-link"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer--divider"></div>

        {/* Bottom Section */}
        <div className="footer--bottom" data-aos="fade-up" data-aos-delay="200" data-aos-offset="0" data-aos-anchor-placement="top-bottom">
          <span className="footer--copy">
            &copy; {currentYear} Wasif Rehman. All Rights Reserved.
          </span>
          <span className="footer--made-with">
            Made with <Heart size={14} className="footer--heart" />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

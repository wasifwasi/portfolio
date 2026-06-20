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
        <div className="footer--top">
          <div className="footer--brand">
            <a href="#home" className="footer--logo">
              <span className="footer--logo-icon">W</span>
              <span className="footer--logo-text">Wasif Rehman</span>
            </a>
            <p className="footer--description">
              Solution Architect & AI Engineer designing end-to-end web, mobile & AI systems.
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
              <a
                href="https://wa.me/923088934229"
                target="_blank"
                rel="noopener noreferrer"
                className="footer--social-link"
                aria-label="WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer--divider"></div>

        {/* Bottom Section */}
        <div className="footer--bottom">
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

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [activeNav, setActiveNav] = useState("#home");
  const [darkTheme, setDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });
  const location = useLocation();

  // Apply theme on mount and changes
  useEffect(() => {
    if (darkTheme) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  }, [darkTheme]);

  const toggleTheme = () => {
    setDarkTheme((prev) => !prev);
  };

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
    // Only run scroll active logic on home page
    if (location.pathname !== "/") {
        setActiveNav("");
        return;
    }

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
  }, [location.pathname]);

  // Helper to handle navigation
  const handleNavClick = (hash) => {
    setActiveNav(hash);
    setToggle(false);
  };

  const isHome = location.pathname === "/";

  return (
    <header className="header" id="header">
      <nav className="nav container">
        <Link to="/" className="nav--logo">
          <span className="nav--logo-circle">
            <img src="img/icon.png" alt="Wasif logo" />
          </span>
          <span className="nav--logo-name">Wasif Rehman</span>
        </Link>
        <div className={`nav--menu ${toggle ? "show-menu" : ""}`} id="nav-menu">
          <span className="nav--title">Menu</span>
          <ul className="nav--list">
            <li className="nav--item">
              {isHome ? (
                  <a
                    href="#home"
                    className={`nav--link ${activeNav === "#home" ? "active-link" : ""}`}
                    onClick={() => handleNavClick("#home")}
                  >
                    Home
                  </a>
              ) : (
                  <Link
                    to="/"
                    className={`nav--link ${activeNav === "#home" ? "active-link" : ""}`}
                    onClick={() => handleNavClick("#home")}
                  >
                    Home
                  </Link>
              )}
            </li>
            <li className="nav--item">
              {isHome ? (
                <a
                    href="#about"
                    className={`nav--link ${activeNav === "#about" ? "active-link" : ""}`}
                    onClick={() => handleNavClick("#about")}
                >
                    About Me
                </a>
              ) : (
                <Link
                    to="/#about" // Note: This might not scroll automatically without extra logic, but keeps URL correct
                    className={`nav--link ${activeNav === "#about" ? "active-link" : ""}`}
                    onClick={() => handleNavClick("#about")}
                >
                    About Me
                </Link>
              )}
            </li>
            <li className="nav--item">
              <Link
                to="/projects"
                className={`nav--link ${location.pathname.startsWith("/projects") ? "active-link" : ""}`}
                onClick={() => {
                    setActiveNav("");
                    setToggle(false);
                }}
              >
                Projects
              </Link>
            </li>
            <li className="nav--item">
              <Link
                to="/blog"
                className={`nav--link ${location.pathname.startsWith("/blog") ? "active-link" : ""}`}
                onClick={() => {
                    setActiveNav(""); // Clear active nav for sections
                    setToggle(false);
                }}
              >
                My Blogs
              </Link>
            </li>
            <li className="nav--item">
              {isHome ? (
                <a
                    href="#contact"
                    className={`nav--link nav--link-buttonn ${activeNav === "#contact" ? "active-link" : ""}`}
                    onClick={() => handleNavClick("#contact")}
                >
                    Contact Me
                </a>
              ) : (
                <Link
                    to="/#contact"
                    className={`nav--link nav--link-buttonn ${activeNav === "#contact" ? "active-link" : ""}`}
                    onClick={() => handleNavClick("#contact")}
                >
                    Contact Me
                </Link>
              )}
            </li>
          </ul>

          <div className="nav--close" id="nav-close" onClick={() => setToggle(false)}>
            <X size={24} />
          </div>
        </div>

        <div className="nav--buttons">
          <div className="nav--theme" onClick={toggleTheme}>
            {darkTheme ? <Sun size={20} /> : <Moon size={20} />}
          </div>
          <div className="nav--toggle" id="nav-toggle" onClick={() => setToggle(true)}>
            <Menu size={20} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

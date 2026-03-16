import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import SparklesCore from "./SparklesCore";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [activeNav, setActiveNav] = useState("#home");
  const [darkTheme, setDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const hasAnimated = useRef(false);

  // Initial header animation on mount
  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate logo
      tl.fromTo(
        ".nav--logo",
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8 }
      )
        // Animate nav items with stagger
        .fromTo(
          ".nav--item",
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          "-=0.4"
        )
        // Animate theme toggle
        .fromTo(
          ".nav--theme",
          { opacity: 0, scale: 0.5, rotate: -180 },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.6 },
          "-=0.3"
        );
    }, headerRef);

    return () => ctx.revert();
  }, []);

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
    // Add rotation animation on theme toggle
    gsap.to(".nav--theme", {
      rotate: "+=360",
      duration: 0.5,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const header = document.getElementById("header");

      // Shadow on scroll
      if (currentScrollY >= 50) {
        header?.classList.add("shadow-header");
      } else {
        header?.classList.remove("shadow-header");
      }

      // Floating nav: show at top, show on scroll up, hide on scroll down
      if (currentScrollY < 100) {
        setVisible(true);
      } else if (currentScrollY < lastScrollY.current) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current + 10) {
        setVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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

  // Handle navigation to home page sections from other pages
  const handleSectionNavigation = (hash) => {
    setActiveNav(hash);
    setToggle(false);

    // Navigate to home page first, then scroll to section
    navigate("/");

    // Use setTimeout to allow the page to render before scrolling
    setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const isHome = location.pathname === "/";

  return (
    <AnimatePresence mode="wait">
      <motion.header
        className="header"
        id="header"
        ref={headerRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
      <SparklesCore
        className="header--sparkles"
        particleColor="hsl(14, 98%, 50%)"
        particleDensity={120}
        minSize={0.4}
        maxSize={2}
        speed={3}
      />
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
                <a
                    href="#about"
                    className={`nav--link ${activeNav === "#about" ? "active-link" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSectionNavigation("#about");
                    }}
                >
                    About Me
                </a>
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
                <a
                    href="#contact"
                    className={`nav--link nav--link-buttonn ${activeNav === "#contact" ? "active-link" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSectionNavigation("#contact");
                    }}
                >
                    Contact Me
                </a>
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
    </motion.header>
    </AnimatePresence>
  );
};

export default Header;

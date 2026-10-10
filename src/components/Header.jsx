import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, CalendarClock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BookCallLink from "./BookCallLink";

const SECTION_LINKS = [
  { hash: "#work", label: "Work" },
  { hash: "#services", label: "Services" },
  { hash: "#about", label: "About" },
];

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [activeNav, setActiveNav] = useState("#home");
  // Dark is the default; only an explicit "light" choice switches it off
  const [darkTheme, setDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme !== "light";
  });
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const touchStartY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const menuRef = useRef(null);

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

  // Close mobile menu on scroll
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
        // Auto-close mobile menu when navbar hides
        setToggle(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Swipe right to close mobile menu (sidebar slides from right)
  const touchStartX = useRef(0);

  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const swipeDistance = touchEndX - touchStartX.current;

      // Swipe right (positive distance) closes menu
      if (swipeDistance > 50 && toggle) {
        setToggle(false);
      }
    };

    if (toggle) {
      document.addEventListener("touchstart", handleTouchStart, { passive: true });
      document.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [toggle]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!toggle) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toggle]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [toggle]);

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
      <nav className="nav container">
        <Link to="/" className="nav--logo">
          <span className="nav--logo-circle">
            <img src="/img/me/avatar-128.webp" alt="" width={32} height={32} />
          </span>
          <span className="nav--logo-name">Wasif Rehman</span>
        </Link>
        {/* Overlay behind sidebar */}
        <div
          className={`nav--menu-overlay ${toggle ? "show-overlay" : ""}`}
          onClick={() => setToggle(false)}
        />

        <div ref={menuRef} className={`nav--menu ${toggle ? "show-menu" : ""}`} id="nav-menu">
          <button type="button" className="nav--close" id="nav-close" onClick={() => setToggle(false)} aria-label="Close menu">
            <X size={20} />
          </button>

          <span className="nav--title">Menu</span>
          <ul className="nav--list">
            {SECTION_LINKS.map(({ hash, label }) => (
              <li className="nav--item" key={hash}>
                <a
                  href={hash}
                  className={`nav--link ${activeNav === hash || (hash === "#work" && location.pathname.startsWith("/projects")) ? "active-link" : ""}`}
                  onClick={(e) => {
                    if (isHome) {
                      handleNavClick(hash);
                    } else {
                      e.preventDefault();
                      handleSectionNavigation(hash);
                    }
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="nav--item">
              <Link
                to="/blog"
                className={`nav--link ${location.pathname.startsWith("/blog") ? "active-link" : ""}`}
                onClick={() => {
                  setActiveNav("");
                  setToggle(false);
                }}
              >
                Blog
              </Link>
            </li>
            <li className="nav--item">
              <a
                href="#contact"
                className={`nav--link ${activeNav === "#contact" ? "active-link" : ""}`}
                onClick={(e) => {
                  if (isHome) {
                    handleNavClick("#contact");
                  } else {
                    e.preventDefault();
                    handleSectionNavigation("#contact");
                  }
                }}
              >
                Contact
              </a>
            </li>
            <li className="nav--item">
              <BookCallLink className="nav--cta" onClick={() => setToggle(false)}>
                <CalendarClock size={16} aria-hidden="true" /> Book a call
              </BookCallLink>
            </li>
          </ul>
        </div>

        <div className="nav--buttons">
          <button
            type="button"
            className="nav--theme"
            onClick={toggleTheme}
            aria-label={darkTheme ? "Switch to light theme" : "Switch to dark theme"}
          >
            {darkTheme ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button type="button" className="nav--toggle" id="nav-toggle" onClick={() => setToggle(true)} aria-label="Open menu">
            <Menu size={20} />
          </button>
        </div>
      </nav>
    </motion.header>
    </AnimatePresence>
  );
};

export default Header;

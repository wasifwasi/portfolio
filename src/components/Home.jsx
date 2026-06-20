import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Github, ArrowDown, ArrowRight, Mail } from "lucide-react";
import { gsap } from "gsap";
import PulseBeams from "./PulseBeams";

const Home = () => {
  const homeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".home--eyebrow",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          ".home--name",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.3"
        )
        .fromTo(
          ".home--role",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          ".home--description",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          ".home--cta",
          { opacity: 0, y: 20, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12 },
          "-=0.4"
        )
        .fromTo(
          ".home--social-link",
          { opacity: 0, y: 16, scale: 0.6 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.1 },
          "-=0.3"
        )
        .fromTo(
          ".home--avatar",
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.7 },
          "-=0.6"
        );

      // Gentle, low-cost bounce on the scroll indicator only
      gsap.to(".home--scroll-box", {
        y: 8,
        duration: 0.9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, homeRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="home section" id="home" ref={homeRef}>
      <PulseBeams className="home--pulse-beams" />
      <div className="home--container container">
        <div className="home--content">
          <span className="home--eyebrow">
            <span className="home--eyebrow-dot" /> Available for new projects
          </span>

          <h1 className="home--name">
            Wasif <span className="home--name-accent">Rehman</span>
          </h1>

          <p className="home--role">
            <span>Solution Architect</span> &amp; Full-Stack Developer
          </p>

          <p className="home--description">
            I design and ship end-to-end systems across web, mobile, and AI —
            from real-time platforms and 3D experiences to AI-powered automation,
            built on Next.js, React, and modern cloud stacks.
          </p>

          <div className="home--actions">
            <Link to="/projects" className="home--cta home--cta-primary">
              View Projects <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a href="#contact" className="home--cta home--cta-ghost">
              <Mail size={18} aria-hidden="true" /> Contact Me
            </a>
          </div>

          <div className="home--social">
            <a
              href="https://www.instagram.com/les_troll_them"
              target="_blank"
              rel="noopener noreferrer"
              className="home--social-link"
              aria-label="Instagram"
            >
              <Instagram />
            </a>
            <a
              href="https://www.linkedin.com/in/wasif-rehman-32210a18b/"
              target="_blank"
              rel="noopener noreferrer"
              className="home--social-link"
              aria-label="LinkedIn"
            >
              <Linkedin />
            </a>
            <a
              href="https://github.com/wasifwasi"
              target="_blank"
              rel="noopener noreferrer"
              className="home--social-link"
              aria-label="GitHub"
            >
              <Github />
            </a>
          </div>
        </div>

        <div className="home--visual">
          <div className="home--avatar">
            <img
              src="img/dp.webp"
              alt="Wasif Rehman"
              width={320}
              height={320}
              fetchpriority="high"
              decoding="async"
              className="home--avatar-img"
            />
            <span className="home--avatar-ring" aria-hidden="true" />
          </div>
        </div>
      </div>

      <a href="#about" className="home--scroll" aria-label="Scroll down">
        <div className="home--scroll-box">
          <ArrowDown size={18} />
        </div>
        <span className="home--scroll-text">Scroll Down</span>
      </a>
    </section>
  );
};

export default Home;

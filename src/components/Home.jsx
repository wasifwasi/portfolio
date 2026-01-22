import React, { useEffect, useRef } from "react";
import { Instagram, Linkedin, Github, ArrowDown } from "lucide-react";
import { gsap } from "gsap";

const Home = () => {
  const homeRef = useRef(null);
  const nameRef = useRef(null);
  const profileRef = useRef(null);
  const infoRef = useRef(null);
  const socialRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline for coordinated animations
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate name with split text effect
      tl.fromTo(
        nameRef.current,
        { opacity: 0, y: -80, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2 }
      )
        // Profile image with scale and rotation
        .fromTo(
          profileRef.current,
          { opacity: 0, scale: 0.8, rotate: -5 },
          { opacity: 1, scale: 1, rotate: 0, duration: 1 },
          "-=0.8"
        )
        // Info section slides in from left
        .fromTo(
          infoRef.current,
          { opacity: 0, x: -60 },
          { opacity: 1, x: 0, duration: 0.8 },
          "-=0.6"
        )
        // Social links stagger in
        .fromTo(
          ".home--social-link",
          { opacity: 0, y: 30, scale: 0.5 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.15 },
          "-=0.4"
        );

      // Floating animation for profile image
      gsap.to(profileRef.current, {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Continuous bounce for scroll indicator
      gsap.to(".home--scroll-box", {
        y: 10,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Geometric box rotation
      gsap.to(".geometric-box", {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "linear",
      });
    }, homeRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="home section" id="home" ref={homeRef}>
      <div className="home--container container grid">
        <h1 className="home--name" ref={nameRef}>Wasif Rehman</h1>
        <div className="home--profile" ref={profileRef}>
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
          <div className="home--social" ref={socialRef}>
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
        <div className="home--info" ref={infoRef}>
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

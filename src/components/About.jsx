import React, { useEffect, useRef } from "react";
import { Linkedin, Send } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillsGrid from "./SkillsGrid";
import Cover from "./Cover";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo(
        ".section--title-1",
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".section--title-1",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate 3D profile
      gsap.fromTo(
        ".about--profile",
        { opacity: 0, scale: 0.8, rotate: 5 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: ".about--profile",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate description
      gsap.fromTo(
        ".about--description",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".about--description",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate list items
      gsap.fromTo(
        ".about--item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".about--list",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate buttons
      gsap.fromTo(
        ".about--buttons a",
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".about--buttons",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about section" id="about" ref={aboutRef}>
      <div className="about--container container grid">
        <h2 className="section--title-1">
          <span>About Me.</span>
        </h2>
        <div className="about--profile">
           <SkillsGrid />
        </div>
        <div className="about--info">
          <p className="about--description">
            I am a <Cover>Solution Architect</Cover> who designs and ships complete systems end-to-end — from
            architecture and data modeling to <Cover>React</Cover> and <Cover>Next.js</Cover> frontends, robust
            <Cover> Node.js</Cover> and <Cover>NestJS</Cover> backends, and cloud infrastructure. I lead projects
            spanning <Cover>AI-powered automation</Cover>, real-time platforms, 3D experiences, and cross-platform
            mobile apps — turning ambiguous requirements into scalable, production-grade solutions that drive real
            business results.
          </p>
          <ul className="about--list">
            <li className="about--item">
              <b>Architecture:</b> System design, API design, data modeling, multi-tenant platforms, payments &amp; auth.
            </li>
            <li className="about--item">
              <b>Core Tech:</b> Next.js, React, React Native, Node.js, NestJS, TypeScript, PostgreSQL, MongoDB, Prisma, Supabase.
            </li>
            <li className="about--item">
              <b>AI &amp; Cloud:</b> Anthropic, Gemini &amp; Groq AI, AWS S3, Stripe, Three.js, real-time &amp; serverless.
            </li>
          </ul>
          <div className="about--buttons">
            <a href="#contact" className="buttons">
              <Send size={18} aria-hidden="true" />{" "}
              Contact Me
            </a>
            <a
              href="https://www.linkedin.com/in/wasif-rehman-32210a18b/"
              target="_blank"
              rel="noopener noreferrer"
              className="button--ghost"
            >
              <Linkedin aria-hidden="true"/>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};


export default About;

import React from "react";
import { Linkedin, Send } from "lucide-react";
import Skills3D from "./Skills3D";

const About = () => {
  return (
    <section className="about section" id="about">
      <div className="about--container container grid">
        <h2 className="section--title-1">
          <span>About Me.</span>
        </h2>
        <div className="about--profile">
           {/* Replaced static image with 3D Skills Cloud */}
           <Skills3D />
        </div>
        <div className="about--info">
          <p className="about--description">
            I am a <b>Full-Stack Developer</b> and <b>AI Engineer</b> with a passion for
            building intelligent web applications. Specialized in <b>Computer Vision</b>
             (Image Detection) and migrating legacy sites to modern <b>React</b> architectures.
            I create professional, high-performance digital solutions that drive results.
          </p>
          <ul className="about--list">
            <li className="about--item">
              <b>Core Tech:</b> React JS, Next.js, Node.js, Python (AI/ML), Three.js, Tailwind CSS.
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

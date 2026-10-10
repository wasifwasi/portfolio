import React from "react";
import { motion } from "framer-motion";
import { Linkedin, CalendarClock } from "lucide-react";
import BookCallLink from "./BookCallLink";
import { CONTACT } from "../data/site";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const About = () => {
  return (
    <section className="bio section" id="about">
      <div className="container">
        <header className="section-head">
          <h2 className="section-head--title">About me</h2>
        </header>

        <motion.div className="bio--text" {...reveal}>
          <p>
            I've been shipping production software since 2022: at software houses, as a
            full-stack developer at AIDEVGEN, and for my own freelance clients. I like owning a
            product end to end: the data model, the API, the AI layer, the web and mobile UI, and
            the deployment that keeps it running.
          </p>
          <p>
            I write in plain English, show working software early, and say so when something
            shouldn't be automated.
          </p>

          <ul className="bio--list">
            <li>
              <b>Backend &amp; data</b> Node.js, NestJS, Python / FastAPI, PostgreSQL, MongoDB,
              Supabase, Prisma
            </li>
            <li>
              <b>AI</b> Claude, OpenAI, Gemini, Groq and Whisper for agents, OCR, transcription
              and summaries
            </li>
            <li>
              <b>Web &amp; mobile</b> Next.js, React 19, React Native (Expo), TypeScript
            </li>
          </ul>

          <div className="bio--actions">
            <BookCallLink className="btn btn--primary">
              <CalendarClock size={18} aria-hidden="true" /> Book a 15-min call
            </BookCallLink>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost btn--icon"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

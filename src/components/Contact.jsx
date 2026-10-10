import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Send, CalendarClock, Mail, MessageCircle, Linkedin, Github } from "lucide-react";
import BookCallLink from "./BookCallLink";
import {
  BOOK_CALL_IS_CALENDLY,
  CONTACT,
  SERVICES,
  projectTitle,
  whatsappLink,
} from "../data/site";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const Contact = () => {
  const form = useRef();
  const location = useLocation();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({ state: "idle", text: "" });

  // Prefill when arriving via "Discuss this project" or "Get a free estimate"
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const projectSlug = params.get("discuss");
    const serviceSlug = params.get("service");
    if (!projectSlug && !serviceSlug) return;

    if (projectSlug) {
      const name = projectTitle(projectSlug);
      setSubject(`Project inquiry: ${name}`);
      setMessage(`Hi Wasif, I came across your ${name} project and would like to discuss something similar. `);
    } else {
      const service = SERVICES.find((s) => s.slug === serviceSlug);
      const title = service ? service.title : serviceSlug;
      setSubject(`Estimate request: ${title}`);
      setMessage(`Hi Wasif, I'd like a free estimate (${title}). Here's what I'm building: `);
    }

    const section = document.getElementById("contact");
    if (section) {
      requestAnimationFrame(() => section.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }, [location.search]);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus({ state: "sending", text: "Sending…" });

    emailjs
      .sendForm("service_tmpwlqa", "template_5qlb69h", form.current, {
        publicKey: "hukBj5RRKNCFDMk5E",
      })
      .then(
        () => {
          setStatus({ state: "sent", text: "Thanks, your message is in. I'll reply by email." });
          form.current.reset();
          setSubject("");
          setMessage("");
        },
        (error) => {
          setStatus({
            state: "error",
            text: "That didn't send. Please try WhatsApp or email instead.",
          });
          console.error("Error sending message:", error);
        }
      );
  };

  return (
    <section className="connect section" id="contact">
      <div className="container connect--container">
        <motion.div className="connect--intro" {...reveal}>
          <h2 className="section-head--title">Tell me what you're building.</h2>
          <p className="connect--lead">
            The fastest way to start is a quick call. I'll ask about your users, your deadline and
            your budget, then send a written scope and a fixed quote.
          </p>

          <div className="connect--channels">
            <BookCallLink className="connect--channel connect--channel-primary">
              <CalendarClock size={20} aria-hidden="true" />
              <span>
                <b>Book a 15-min call</b>
                <small>{BOOK_CALL_IS_CALENDLY ? "Pick a time that suits you" : "Message me on WhatsApp to set a time"}</small>
              </span>
            </BookCallLink>
            <a
              href={whatsappLink("Hi Wasif, I'd like to talk about a project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="connect--channel"
            >
              <MessageCircle size={20} aria-hidden="true" />
              <span>
                <b>WhatsApp</b>
                <small>{CONTACT.whatsappDisplay}</small>
              </span>
            </a>
            <a href={`mailto:${CONTACT.email}`} className="connect--channel">
              <Mail size={20} aria-hidden="true" />
              <span>
                <b>Email</b>
                <small>{CONTACT.email}</small>
              </span>
            </a>
          </div>

          <div className="connect--social">
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={18} />
            </a>
          </div>
        </motion.div>

        <motion.div className="connect--panel" {...reveal}>
          <h3 className="connect--panel-title">Or send a message</h3>

          <form ref={form} onSubmit={sendEmail} className="connect--form" id="contact-form">
            <div className="connect--row">
              <label className="connect--field">
                <span>Name</span>
                <input type="text" name="user_name" required autoComplete="name" />
              </label>
              <label className="connect--field">
                <span>Email</span>
                <input type="email" name="user_email" required autoComplete="email" />
              </label>
            </div>

            <label className="connect--field">
              <span>Subject</span>
              <input
                type="text"
                name="user_subject"
                id="subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. WhatsApp AI agent for our support team"
              />
            </label>

            <label className="connect--field">
              <span>Message</span>
              <textarea
                name="user_message"
                id="message"
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What are you building, who is it for, and when do you need it?"
              />
            </label>

            <button type="submit" className="btn btn--primary connect--submit" disabled={status.state === "sending"}>
              <Send size={18} aria-hidden="true" /> {status.state === "sending" ? "Sending…" : "Send message"}
            </button>

            <p className={`connect--status connect--status-${status.state}`} role="status" aria-live="polite">
              {status.text}
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

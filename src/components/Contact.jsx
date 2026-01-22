import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Send, Instagram, Linkedin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const form = useRef();
  const contactRef = useRef(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo(
        ".contact .section--title-2",
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".contact .section--title-2",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate contact data
      gsap.fromTo(
        ".contact--data",
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".contact--data",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate contact form (mail section)
      gsap.fromTo(
        ".contact--mail",
        { opacity: 0, x: 60, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".contact--mail",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate form inputs with stagger
      gsap.fromTo(
        ".contact--box",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".contact--form",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate submit button
      gsap.fromTo(
        ".contact--button",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: ".contact--button",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate social section
      gsap.fromTo(
        ".contact--social",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".contact--social",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate social links with stagger
      gsap.fromTo(
        ".contact--social-link",
        { opacity: 0, scale: 0.5, rotate: -15 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.5,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".contact--social-links",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Floating animation for geometric box
      gsap.to(".contact .geometric-box", {
        y: -10,
        rotation: 5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, contactRef);

    return () => ctx.revert();
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_tmpwlqa",
        "template_5qlb69h",
        form.current,
        {
          publicKey: "hukBj5RRKNCFDMk5E",
        }
      )
      .then(
        () => {
          setMessage("Message sent successfully ✅");
          setTimeout(() => {
            setMessage("");
          }, 5000);
          e.target.reset();
        },
        (error) => {
          setMessage(`Message not sent ❌: ${error.text}`);
          console.error("Error sending message:", error);
        }
      );
  };

  return (
    <section className="contact section" id="contact" ref={contactRef}>
      <div className="contact--container grid">
        <div className="contact--data">
          <h2 className="section--title-2">
            <span>Contact Me.</span>
          </h2>

          <p className="contact--description-1">
            I will read all emails. Send me any message you want and I'll
            get back to you.
          </p>

          <p className="contact--description-2">
            I need your <b>Name</b> and <b>Email Address</b>, but you won't
            receive anything other than your reply.
          </p>

          <div className="geometric-box"></div>
        </div>

        <div className="contact--mail">
          <h2 className="contact--title">Send Me A Message</h2>

          <form ref={form} onSubmit={sendEmail} className="contact--form" id="contact-form">
            <div className="contact--group">
              <div className="contact--box">
                <input
                  type="text"
                  name="user_name"
                  className="contact--input"
                  id="name"
                  required
                  placeholder="Name"
                />
                <label htmlFor="name" className="contact--label">
                  First Name
                </label>
              </div>

              <div className="contact--box">
                <input
                  type="email"
                  name="user_email"
                  className="contact--input"
                  id="email"
                  required
                  placeholder="Email Address"
                />
                <label htmlFor="email" className="contact--label">
                  Email Address
                </label>
              </div>
            </div>

            <div className="contact--box">
              <input
                type="text"
                name="user_subject"
                className="contact--input"
                id="subject"
                required
                placeholder="Subject"
              />
              <label htmlFor="subject" className="contact--label">
                Subject
              </label>
            </div>

            <div className="contact--box contact--area">
              <textarea
                name="user_message"
                id="message"
                className="contact--input"
                required
                placeholder="Message"
              ></textarea>
              <label htmlFor="message" className="contact--label">
                Message
              </label>
            </div>

            <p className="contact--message" id="contact-message">{message}</p>

            <button type="submit" className="contact--button buttons">
              <Send size={18} /> Send Message
            </button>
          </form>
        </div>
        <div className="contact--social">
          <img
            src="img/curved-arrow.svg"
            alt=""
            aria-hidden="true"
            className="contact--social-arrow"
          />

          <div className="contact--social-data">
            <div>
              <p className="contact--social-description-1">
                Does not send emails
              </p>

              <p className="contact--social-description-2">
                Write me on my social networks
              </p>
            </div>

            <div className="contact--social-links">
              <a
                href="https://www.instagram.com/les_troll_them/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact--social-link"
              >
                <Instagram size={20} aria-hidden="true" />
              </a>

              <a
                href="https://www.linkedin.com/in/wasif-rehman-32210a18b/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact--social-link"
              >
                <Linkedin size={20} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

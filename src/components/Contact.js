import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Send, Instagram, Linkedin } from "lucide-react";

const Contact = () => {
  const form = useRef();
  const [message, setMessage] = useState("");

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
    <section className="contact section" id="contact">
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

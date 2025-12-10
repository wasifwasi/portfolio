import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollUp from "./components/ScrollUp";

function App() {
  useEffect(() => {
    if (typeof window.ScrollReveal === "function") {
      const sr = window.ScrollReveal({
        origin: "top",
        distance: "60px",
        duration: 2500,
        delay: 400,
        // reset:true
      });
      sr.reveal(`.home--profile, .about--image, .contact--mail`, { origin: "right" });
      sr.reveal(
        `.home--name, .home--info,.about--container,.contact--data,.contact--social,.section--title-1,.about--info`,
        { origin: "left" }
      );
      sr.reveal(`.services--card, .projects--card`, { interval: 100 });
    }
  }, []);

  return (
    <div>
      <Header />
      <main className="main">
        <Home />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ScrollUp />
    </div>
  );
}

export default App;

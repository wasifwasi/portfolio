import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import ProjectDetail from "./components/ProjectDetail";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";
import Chatbot from "./components/Chatbot";
import TracingBeam from "./components/TracingBeam";
import NotFound from "./components/NotFound";
import SEO from "./components/SEO";

function App() {
  const location = useLocation();

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: false,
      mirror: true,
      offset: 100,
    });
  }, []);

  useEffect(() => {
    // Refresh AOS on route change
    AOS.refresh();
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      <Header />
      <main className="main">
        <TracingBeam>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SEO />
                  <Home />
                  <About />
                  <Services />
                  <Contact />
                </>
              }
            />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TracingBeam>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;

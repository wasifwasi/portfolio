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
import ScrollUp from "./components/ScrollUp";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";

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
        <Routes>
          <Route
            path="/"
            element={
              <>
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
        </Routes>
      </main>
      <Footer />
      <ScrollUp />
    </div>
  );
}

export default App;

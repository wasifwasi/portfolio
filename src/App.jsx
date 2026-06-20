import React, { useEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import TracingBeam from "./components/TracingBeam";
import SEO from "./components/SEO";

// Code-split non-home routes — each becomes its own chunk loaded on demand
const Projects = lazy(() => import("./components/Projects"));
const ProjectDetail = lazy(() => import("./components/ProjectDetail"));
const Blog = lazy(() => import("./components/Blog"));
const BlogPost = lazy(() => import("./components/BlogPost"));
const NotFound = lazy(() => import("./components/NotFound"));
const Chatbot = lazy(() => import("./components/Chatbot"));

const RouteFallback = () => (
  <div className="route-fallback" aria-busy="true" aria-live="polite">
    <span className="route-fallback--spinner" />
  </div>
);

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      <Header />
      <main className="main">
        <TracingBeam>
          <Suspense fallback={<RouteFallback />}>
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
          </Suspense>
        </TracingBeam>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
    </div>
  );
}

export default App;

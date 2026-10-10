import React, { useEffect, useState, useCallback, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Header from "./components/Header";
import Home from "./components/Home";
import FeaturedWork from "./components/FeaturedWork";
import Services from "./components/Services";
import Process from "./components/Process";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SEO from "./components/SEO";
import { OPEN_BOOKING_EVENT, loadAvailability, openFullCalendar } from "./lib/booking";

// Code-split non-home routes — each becomes its own chunk loaded on demand
const Projects = lazy(() => import("./components/Projects"));
const ProjectDetail = lazy(() => import("./components/ProjectDetail"));
const Blog = lazy(() => import("./components/Blog"));
const BlogPost = lazy(() => import("./components/BlogPost"));
const NotFound = lazy(() => import("./components/NotFound"));
const Chatbot = lazy(() => import("./components/Chatbot"));
const Playbook = lazy(() => import("./components/Playbook"));
const BookingModal = lazy(() => import("./components/BookingModal"));

// Opens the booking box when any "Book a call" button fires OPEN_BOOKING_EVENT.
// If the free-slot feed isn't set up (no Calendly token), it goes straight to Calendly's full calendar.
function BookingRoot() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onOpen = () => {
      const quick = new Promise((resolve) => setTimeout(() => resolve("pending"), 150));
      const answer = loadAvailability().then(
        () => "ok",
        (err) => (err.status === 503 ? "not-configured" : "error")
      );
      Promise.race([answer, quick]).then((result) => {
        if (result === "not-configured") openFullCalendar();
        else setOpen(true);
      });
    };
    window.addEventListener(OPEN_BOOKING_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_BOOKING_EVENT, onOpen);
  }, []);

  if (!open) return null;
  return (
    <Suspense fallback={null}>
      <BookingModal onClose={close} />
    </Suspense>
  );
}

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
    <MotionConfig reducedMotion="user">
      <div>
        <Header />
        <main className="main">
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <SEO />
                    <Home />
                    <FeaturedWork />
                    <Services />
                    <Process />
                    <About />
                    <Contact />
                  </>
                }
              />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/playbook" element={<Playbook />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
        <BookingRoot />
      </div>
    </MotionConfig>
  );
}

export default App;

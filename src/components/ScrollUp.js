import React, { useEffect, useState } from "react";

const ScrollUp = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 350) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    const Home = document.getElementById("Home");
    if (Home) {
        Home.scrollIntoView({ behavior: "smooth" });
    } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <a 
        href="#Home" 
        className={`scrollup ${showScroll ? "show-scroll" : ""}`} 
        id="scroll-up"
        onClick={scrollToTop}
    >
      <i className="ri-arrow-up-s-fill"></i>
    </a>
  );
};

export default ScrollUp;

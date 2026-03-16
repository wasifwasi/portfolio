import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const gradients = [
  "linear-gradient(135deg, hsl(14, 98%, 50%) 0%, hsl(30, 100%, 55%) 100%)",
  "linear-gradient(135deg, hsl(220, 80%, 50%) 0%, hsl(260, 70%, 55%) 100%)",
  "linear-gradient(135deg, hsl(160, 70%, 40%) 0%, hsl(190, 80%, 45%) 100%)",
  "linear-gradient(135deg, hsl(280, 70%, 50%) 0%, hsl(320, 80%, 55%) 100%)",
];

const bgColors = [
  "hsla(0, 0%, 6%, 0.95)",
  "hsla(220, 20%, 8%, 0.95)",
  "hsla(160, 15%, 6%, 0.95)",
  "hsla(280, 15%, 6%, 0.95)",
];

const StickyScroll = ({ content }) => {
  const containerRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollTop / scrollHeight;

      const breakpoints = content.map((_, i) => i / content.length);
      breakpoints.forEach((bp, i) => {
        if (progress >= bp - 0.05 && progress < bp + 1 / content.length) {
          setActiveCard(i);
        }
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [content]);

  return (
    <motion.div
      ref={containerRef}
      className="sticky-scroll"
      animate={{ backgroundColor: bgColors[activeCard % bgColors.length] }}
      transition={{ duration: 0.5 }}
    >
      {/* Left: scrolling content */}
      <div className="sticky-scroll--content">
        {content.map((item, i) => (
          <div key={i} className="sticky-scroll--item">
            <motion.h3
              className="sticky-scroll--title"
              animate={{ opacity: activeCard === i ? 1 : 0.25 }}
              transition={{ duration: 0.3 }}
            >
              {item.title}
            </motion.h3>
            <motion.p
              className="sticky-scroll--desc"
              animate={{ opacity: activeCard === i ? 1 : 0.25 }}
              transition={{ duration: 0.3 }}
            >
              {item.description}
            </motion.p>
          </div>
        ))}
        <div style={{ height: "10rem" }} />
      </div>

      {/* Right: sticky visual */}
      <motion.div
        className="sticky-scroll--visual"
        animate={{
          background: gradients[activeCard % gradients.length],
        }}
        transition={{ duration: 0.5 }}
      >
        {content[activeCard]?.content || (
          <div className="sticky-scroll--visual-text">
            {content[activeCard]?.title}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default StickyScroll;

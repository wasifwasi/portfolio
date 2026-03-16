import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Sparkles = () => {
  const random = () => Math.random();
  const randomMove = () => Math.random() * 4 - 2;

  return (
    <div className="card-beam--sparkles">
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={i}
          className="card-beam--spark"
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: [0, random(), 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: random() * 2 + 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

const CardBeam = ({ icons = [] }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const circles = containerRef.current?.querySelectorAll(".card-beam--circle");
    if (!circles || circles.length === 0) return;

    let current = 0;
    const animateNext = () => {
      circles.forEach((c) => {
        c.style.transform = "translateY(0px) scale(1)";
      });
      if (circles[current]) {
        circles[current].style.transform = "translateY(-6px) scale(1.15)";
      }
      current = (current + 1) % circles.length;
    };

    animateNext();
    const interval = setInterval(animateNext, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card-beam" ref={containerRef}>
      <div className="card-beam--icons">
        {icons.map((icon, i) => (
          <div
            key={i}
            className={`card-beam--circle card-beam--circle-${i % 3 === 1 ? "lg" : "sm"}`}
          >
            <span className="card-beam--emoji">{icon}</span>
          </div>
        ))}
      </div>
      <div className="card-beam--line">
        <div className="card-beam--spark-container">
          <Sparkles />
        </div>
      </div>
    </div>
  );
};

export default CardBeam;

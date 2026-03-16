import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Cover = ({ children, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const [beams, setBeams] = useState([]);

  useEffect(() => {
    if (isHovered) {
      const newBeams = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.3,
      }));
      setBeams(newBeams);
    }
  }, [isHovered]);

  return (
    <span
      ref={ref}
      className={`cover-wrapper ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Beams on hover */}
      <AnimatePresence>
        {isHovered && beams.map((beam) => (
          <motion.span
            key={beam.id}
            className="cover-beam"
            style={{ left: `${beam.x}%` }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100%", opacity: [0, 1, 0] }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: beam.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Sparkles on hover */}
      <AnimatePresence>
        {isHovered && Array.from({ length: 12 }, (_, i) => (
          <motion.span
            key={`spark-${i}`}
            className="cover-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 0.6,
              delay: Math.random() * 0.4,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Text with gradient animation on hover */}
      <motion.span
        className="cover-text"
        animate={
          isHovered
            ? {
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }
            : { backgroundPosition: "0% 50%" }
        }
        transition={
          isHovered
            ? { duration: 1.5, repeat: Infinity, ease: "linear" }
            : { duration: 0.3 }
        }
      >
        {children}
      </motion.span>

      {/* Bottom line animation */}
      <motion.span
        className="cover-line"
        animate={
          isHovered
            ? { scaleX: 1, opacity: 1 }
            : { scaleX: 0, opacity: 0 }
        }
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </span>
  );
};

export default Cover;

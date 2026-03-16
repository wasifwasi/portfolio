import React, { useMemo } from "react";
import { motion } from "framer-motion";

const SparklesCore = ({
  className = "",
  particleColor = "#ffffff",
  particleDensity = 60,
  minSize = 0.4,
  maxSize = 1.4,
  speed = 4,
}) => {
  const particles = useMemo(() => {
    return Array.from({ length: particleDensity }, (_, i) => {
      const size = minSize + Math.random() * (maxSize - minSize);
      return {
        id: i,
        size,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 6 + speed,
        delay: Math.random() * speed * 0.5,
        moveX1: (Math.random() - 0.5) * 50,
        moveY1: (Math.random() - 0.5) * 40,
        moveX2: (Math.random() - 0.5) * 60,
        moveY2: (Math.random() - 0.5) * 50,
        moveX3: (Math.random() - 0.5) * 40,
        moveY3: (Math.random() - 0.5) * 30,
        peakScale: 1 + Math.random() * 1.5,
      };
    });
  }, [particleDensity, minSize, maxSize, speed]);

  return (
    <div className={`sparkles-core ${className}`}>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="sparkles-particle"
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: particleColor,
            top: `${p.y}%`,
            left: `${p.x}%`,
            boxShadow: `0 0 ${p.size * 3}px ${particleColor}`,
          }}
          animate={{
            opacity: [0, 0.8, 1, 0.6, 0],
            scale: [0, p.peakScale, 0.8, p.peakScale * 0.6, 0],
            x: [0, p.moveX1, p.moveX2, p.moveX3, 0],
            y: [0, p.moveY1, p.moveY2, p.moveY3, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

export default SparklesCore;

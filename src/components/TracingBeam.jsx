import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const TracingBeam = ({ children, className = "" }) => {
  const ref = useRef(null);
  const contentRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [children]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    { stiffness: 500, damping: 90 }
  );

  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    { stiffness: 500, damping: 90 }
  );

  return (
    <motion.div ref={ref} className={`tracing-beam ${className}`}>
      <div className="tracing-beam--line">
        <div className="tracing-beam--dot-wrapper">
          <motion.div
            className="tracing-beam--dot-outer"
            style={{
              boxShadow: useTransform(
                scrollYProgress,
                (v) =>
                  v > 0
                    ? "none"
                    : "rgba(0, 0, 0, 0.24) 0px 3px 8px"
              ),
            }}
          >
            <motion.div
              className="tracing-beam--dot-inner"
              style={{
                backgroundColor: useTransform(
                  scrollYProgress,
                  (v) => (v > 0 ? "var(--first-color)" : "white")
                ),
                borderColor: useTransform(
                  scrollYProgress,
                  (v) => (v > 0 ? "var(--first-color)" : "#d4d4d8")
                ),
              }}
            />
          </motion.div>
        </div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="tracing-beam--svg"
          aria-hidden="true"
        >
          <path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="var(--tracing-beam-track)"
            strokeOpacity="0.16"
          />
          <path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#tracing-gradient)"
            strokeWidth="3"
          />
          <defs>
            <motion.linearGradient
              id="tracing-gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="hsl(14, 98%, 50%)" stopOpacity="0" />
              <stop stopColor="hsl(14, 98%, 50%)" />
              <stop offset="0.325" stopColor="hsl(14, 80%, 65%)" />
              <stop offset="1" stopColor="hsl(30, 100%, 60%)" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef} className="tracing-beam--content">
        {children}
      </div>
    </motion.div>
  );
};

export default TracingBeam;

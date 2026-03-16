import React from "react";
import { motion } from "framer-motion";

const grad1 = {
  initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
  animate: {
    x1: ["0%", "0%", "200%"],
    x2: ["0%", "0%", "180%"],
    y1: ["80%", "0%", "0%"],
    y2: ["100%", "20%", "20%"],
  },
};

const grad2 = {
  initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
  animate: {
    x1: ["20%", "100%", "100%"],
    x2: ["0%", "90%", "90%"],
    y1: ["80%", "80%", "-20%"],
    y2: ["100%", "100%", "0%"],
  },
};

const grad3 = {
  initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
  animate: {
    x1: ["20%", "100%", "100%"],
    x2: ["0%", "90%", "90%"],
    y1: ["80%", "80%", "-20%"],
    y2: ["100%", "100%", "0%"],
  },
};

const grad4 = {
  initial: { x1: "40%", x2: "50%", y1: "160%", y2: "180%" },
  animate: { x1: "0%", x2: "10%", y1: "-40%", y2: "-20%" },
};

const grad5 = {
  initial: { x1: "-40%", x2: "-10%", y1: "0%", y2: "20%" },
  animate: {
    x1: ["40%", "0%", "0%"],
    x2: ["10%", "0%", "0%"],
    y1: ["0%", "0%", "180%"],
    y2: ["20%", "20%", "200%"],
  },
};

const grad6 = {
  initial: { x1: "100%", x2: "100%", y1: "0%", y2: "20%" },
  animate: {
    x1: ["100%", "0%", "0%"],
    x2: ["100%", "10%", "10%"],
    y1: ["0%", "0%", "100%"],
    y2: ["20%", "20%", "120%"],
  },
};

const grad7 = {
  initial: { x1: "0%", x2: "0%", y1: "0%", y2: "20%" },
  animate: {
    x1: ["0%", "100%", "100%"],
    x2: ["0%", "90%", "90%"],
    y1: ["0%", "50%", "100%"],
    y2: ["20%", "70%", "120%"],
  },
};

const grad8 = {
  initial: { x1: "50%", x2: "60%", y1: "-20%", y2: "0%" },
  animate: {
    x1: ["50%", "0%", "0%"],
    x2: ["60%", "10%", "10%"],
    y1: ["-20%", "50%", "120%"],
    y2: ["0%", "70%", "140%"],
  },
};

const grad9 = {
  initial: { x1: "-20%", x2: "0%", y1: "50%", y2: "70%" },
  animate: {
    x1: ["-20%", "50%", "120%"],
    x2: ["0%", "70%", "140%"],
    y1: ["50%", "0%", "0%"],
    y2: ["70%", "20%", "20%"],
  },
};

const grad10 = {
  initial: { x1: "100%", x2: "100%", y1: "80%", y2: "100%" },
  animate: {
    x1: ["100%", "50%", "0%"],
    x2: ["100%", "60%", "10%"],
    y1: ["80%", "40%", "0%"],
    y2: ["100%", "60%", "20%"],
  },
};

const GradientColors = () => (
  <>
    <stop stopColor="hsl(14, 98%, 50%)" stopOpacity="0" />
    <stop stopColor="hsl(14, 98%, 50%)" />
    <stop offset="0.325" stopColor="hsl(14, 80%, 65%)" />
    <stop offset="1" stopColor="hsl(30, 100%, 60%)" stopOpacity="0" />
  </>
);

const makeTransition = (delay = 0) => ({
  duration: 2,
  repeat: Infinity,
  repeatType: "loop",
  ease: "linear",
  repeatDelay: 2,
  delay,
});

const PulseBeamsSVG = () => (
  <svg
    width="858"
    height="434"
    viewBox="0 0 858 434"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="pulse-beams--svg"
  >
    {/* Original static paths */}
    <path d="M269 220.5H16.5C10.9772 220.5 6.5 224.977 6.5 230.5V398.5" stroke="var(--pulse-beam-line)" />
    <path d="M568 200H841C846.523 200 851 195.523 851 190V40" stroke="var(--pulse-beam-line)" />
    <path d="M425.5 274V333C425.5 338.523 421.023 343 415.5 343H152C146.477 343 142 347.477 142 353V426.5" stroke="var(--pulse-beam-line)" />
    <path d="M493 274V333.226C493 338.749 497.477 343.226 503 343.226H760C765.523 343.226 770 347.703 770 353.226V427" stroke="var(--pulse-beam-line)" />
    <path d="M380 168V17C380 11.4772 384.477 7 390 7H414" stroke="var(--pulse-beam-line)" />

    {/* New additional static paths */}
    <path d="M120 100H50C44.477 100 40 104.477 40 110V300" stroke="var(--pulse-beam-line)" />
    <path d="M700 120H800C805.523 120 810 115.523 810 110V20" stroke="var(--pulse-beam-line)" />
    <path d="M330 274V380C330 385.523 325.523 390 320 390H80C74.477 390 70 394.477 70 400V430" stroke="var(--pulse-beam-line)" />
    <path d="M580 274V360C580 365.523 584.477 370 590 370H820C825.523 370 830 374.477 830 380V430" stroke="var(--pulse-beam-line)" />
    <path d="M460 168V50C460 44.477 464.477 40 470 40H550" stroke="var(--pulse-beam-line)" />

    {/* Original animated gradient paths */}
    <path d="M269 220.5H16.5C10.9772 220.5 6.5 224.977 6.5 230.5V398.5" stroke="url(#grad1)" strokeWidth="2" />
    <path d="M568 200H841C846.523 200 851 195.523 851 190V40" stroke="url(#grad2)" strokeWidth="2" />
    <path d="M425.5 274V333C425.5 338.523 421.023 343 415.5 343H152C146.477 343 142 347.477 142 353V426.5" stroke="url(#grad3)" strokeWidth="2" />
    <path d="M493 274V333.226C493 338.749 497.477 343.226 503 343.226H760C765.523 343.226 770 347.703 770 353.226V427" stroke="url(#grad4)" strokeWidth="2" />
    <path d="M380 168V17C380 11.4772 384.477 7 390 7H414" stroke="url(#grad5)" strokeWidth="2" />

    {/* New animated gradient paths */}
    <path d="M120 100H50C44.477 100 40 104.477 40 110V300" stroke="url(#grad6)" strokeWidth="2" />
    <path d="M700 120H800C805.523 120 810 115.523 810 110V20" stroke="url(#grad7)" strokeWidth="2" />
    <path d="M330 274V380C330 385.523 325.523 390 320 390H80C74.477 390 70 394.477 70 400V430" stroke="url(#grad8)" strokeWidth="2" />
    <path d="M580 274V360C580 365.523 584.477 370 590 370H820C825.523 370 830 374.477 830 380V430" stroke="url(#grad9)" strokeWidth="2" />
    <path d="M460 168V50C460 44.477 464.477 40 470 40H550" stroke="url(#grad10)" strokeWidth="2" />

    <defs>
      <motion.linearGradient variants={grad1} animate="animate" initial="initial" transition={makeTransition(0.4)} id="grad1"><GradientColors /></motion.linearGradient>
      <motion.linearGradient variants={grad2} animate="animate" initial="initial" transition={makeTransition(1.2)} id="grad2"><GradientColors /></motion.linearGradient>
      <motion.linearGradient variants={grad3} animate="animate" initial="initial" transition={makeTransition(0.8)} id="grad3"><GradientColors /></motion.linearGradient>
      <motion.linearGradient variants={grad4} animate="animate" initial="initial" transition={makeTransition(1.6)} id="grad4"><GradientColors /></motion.linearGradient>
      <motion.linearGradient variants={grad5} animate="animate" initial="initial" transition={makeTransition(0.2)} id="grad5"><GradientColors /></motion.linearGradient>
      <motion.linearGradient variants={grad6} animate="animate" initial="initial" transition={makeTransition(0.6)} id="grad6"><GradientColors /></motion.linearGradient>
      <motion.linearGradient variants={grad7} animate="animate" initial="initial" transition={makeTransition(1.0)} id="grad7"><GradientColors /></motion.linearGradient>
      <motion.linearGradient variants={grad8} animate="animate" initial="initial" transition={makeTransition(1.4)} id="grad8"><GradientColors /></motion.linearGradient>
      <motion.linearGradient variants={grad9} animate="animate" initial="initial" transition={makeTransition(0.3)} id="grad9"><GradientColors /></motion.linearGradient>
      <motion.linearGradient variants={grad10} animate="animate" initial="initial" transition={makeTransition(1.8)} id="grad10"><GradientColors /></motion.linearGradient>
    </defs>

    {/* Original endpoint circles */}
    <circle cx="851" cy="34" r="6.5" fill="var(--pulse-beam-dot)" stroke="var(--pulse-beam-dot-stroke)" />
    <circle cx="770" cy="427" r="6.5" fill="var(--pulse-beam-dot)" stroke="var(--pulse-beam-dot-stroke)" />
    <circle cx="142" cy="427" r="6.5" fill="var(--pulse-beam-dot)" stroke="var(--pulse-beam-dot-stroke)" />
    <circle cx="6.5" cy="398.5" r="6" fill="var(--pulse-beam-dot)" stroke="var(--pulse-beam-dot-stroke)" />
    <circle cx="420.5" cy="6.5" r="6" fill="var(--pulse-beam-dot)" stroke="var(--pulse-beam-dot-stroke)" />

    {/* New endpoint circles */}
    <circle cx="40" cy="300" r="6.5" fill="var(--pulse-beam-dot)" stroke="var(--pulse-beam-dot-stroke)" />
    <circle cx="810" cy="20" r="6.5" fill="var(--pulse-beam-dot)" stroke="var(--pulse-beam-dot-stroke)" />
    <circle cx="70" cy="430" r="6.5" fill="var(--pulse-beam-dot)" stroke="var(--pulse-beam-dot-stroke)" />
    <circle cx="830" cy="430" r="6.5" fill="var(--pulse-beam-dot)" stroke="var(--pulse-beam-dot-stroke)" />
    <circle cx="550" cy="40" r="6" fill="var(--pulse-beam-dot)" stroke="var(--pulse-beam-dot-stroke)" />
  </svg>
);

const PulseBeams = ({ children, className = "" }) => {
  return (
    <div className={`pulse-beams ${className}`}>
      {children}
      <div className="pulse-beams--background">
        <PulseBeamsSVG />
      </div>
    </div>
  );
};

export default PulseBeams;

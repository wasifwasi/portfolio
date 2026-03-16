import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "React", icon: "⚛️" },
      { name: "Next.js", icon: "▲" },
      { name: "React Native", icon: "📱" },
      { name: "TypeScript", icon: "🔷" },
      { name: "Vue.js", icon: "💚" },
      { name: "Tailwind CSS", icon: "💨" },
      { name: "Expo", icon: "🚀" },
      { name: "Redux", icon: "🔮" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      { name: "Node.js", icon: "🟢" },
      { name: "Express", icon: "⚡" },
      { name: "NestJS", icon: "🐈" },
      { name: "Python", icon: "🐍" },
      { name: "GraphQL", icon: "◈" },
      { name: "Socket.io", icon: "🔌" },
      { name: "Prisma", icon: "🔺" },
      { name: "Frappe", icon: "🏗️" },
    ],
  },
  {
    id: "database",
    label: "Database",
    skills: [
      { name: "MongoDB", icon: "🍃" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "Firebase", icon: "🔥" },
      { name: "Supabase", icon: "⚡" },
      { name: "MariaDB", icon: "🐬" },
      { name: "Redis", icon: "🔴" },
      { name: "AWS S3", icon: "☁️" },
    ],
  },
  {
    id: "ai",
    label: "AI",
    skills: [
      { name: "Groq AI", icon: "🧠" },
      { name: "Gemini AI", icon: "✨" },
      { name: "OpenAI", icon: "🤖" },
      { name: "Whisper", icon: "🎙️" },
      { name: "LangChain", icon: "🔗" },
      { name: "Claude", icon: "🟠" },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.9,
    transition: { duration: 0.15 },
  },
};

const SkillsGrid = () => {
  const [activeTab, setActiveTab] = useState("frontend");
  const activeCategory = categories.find((c) => c.id === activeTab);

  return (
    <div className="skills-grid-wrapper">
      <div className="skills-grid-header">
        <span className="skills-grid-dot"></span>
        <span className="skills-grid-label">Tech Stack</span>
      </div>

      {/* Tabs */}
      <div className="skills-tabs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`skills-tab ${activeTab === cat.id ? "active" : ""}`}
            onClick={() => setActiveTab(cat.id)}
          >
            {cat.label}
            {activeTab === cat.id && (
              <motion.span
                className="skills-tab-indicator"
                layoutId="tab-indicator"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {activeCategory.skills.map((skill) => (
            <motion.div
              key={skill.name}
              className="skills-grid-item"
              variants={itemVariants}
              whileHover={{
                scale: 1.08,
                y: -4,
                transition: { duration: 0.2 },
              }}
            >
              <span className="skills-grid-icon">{skill.icon}</span>
              <span className="skills-grid-name">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SkillsGrid;

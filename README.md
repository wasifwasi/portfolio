# Wasif's Portfolio

**v1.1** | A modern, interactive portfolio website showcasing my work as a Full-Stack Developer and AI Engineer. Built with React 19 and featuring 3D visualizations, professional animations, and a complete blog system.

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 19, React Router DOM 7, Vite 7 |
| **3D Graphics** | Three.js, @react-three/fiber, @react-three/drei |
| **Animations** | GSAP (with ScrollTrigger), AOS |
| **Icons** | Lucide React |
| **Email** | EmailJS |
| **Testing** | React Testing Library, Jest DOM |

## Features

### Core Sections
- **Home** - Hero section with staggered GSAP entrance animations and floating profile image
- **About** - Bio with interactive 3D skills cloud (15 technologies in golden spiral distribution)
- **Services** - MERN Stack Development, AI & Automation, API & Backend Solutions
- **Projects** - Five featured projects with hover effects and lazy-loaded images
- **Blog** - Six technical articles with dynamic routing
- **Contact** - EmailJS-powered contact form with validation

### Technical Highlights
- **3D Skills Cloud** - Interactive Three.js visualization with camera-facing text and orbit controls
- **Dark Mode** - Full theme support with localStorage persistence and rotation animation
- **Responsive Design** - Mobile-first approach with hamburger menu
- **Smooth Animations** - GSAP timelines, ScrollTrigger, and AOS for professional motion effects
- **Accessibility** - ARIA labels, semantic HTML, prefers-reduced-motion support

## Featured Projects

1. **Prove It Auto** - AI-powered car maintenance app (React Native, Node.js, MongoDB, Google Gemini)
2. **Skin Disease Detection AI** - Deep learning model with 98% accuracy (Python, TensorFlow, OpenCV)
3. **Live Voting System** - Real-time voting platform (React, Node.js, MongoDB)
4. **Academic Analytics System** - MERN stack with drag-and-drop functionality
5. **Bible Trader** - Marketplace with Stripe escrow payments (TypeScript, Supabase)

## Blog Posts

- Building an AI-Powered Car Maintenance App
- Building a Secure Marketplace with Escrow Payments
- Next 19 New Features
- Security Flaw: react2shell
- The Rise of AI Agents
- Mastering Code & Speed Optimization

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd portfolio

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Vite development server |
| `npm run build` | Build for production (outputs to `build/`) |
| `npm run preview` | Preview production build locally |
| `npm test` | Run tests |

## Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Header.jsx      # Navigation with dark mode toggle
│   │   ├── Home.jsx        # Hero section with GSAP animations
│   │   ├── About.jsx       # About section with 3D skills cloud
│   │   ├── Skills3D.jsx    # Interactive Three.js visualization
│   │   ├── Services.jsx    # Services showcase
│   │   ├── Projects.jsx    # Project portfolio
│   │   ├── Blog.jsx        # Blog listing page
│   │   ├── BlogPost.jsx    # Individual blog post view
│   │   ├── Contact.jsx     # Contact form with EmailJS
│   │   ├── Footer.jsx      # Footer with social links
│   │   └── ScrollUp.jsx    # Scroll-to-top button
│   ├── App.jsx             # Main app with routing
│   ├── main.jsx            # React entry point
│   └── index.css           # Global styles
├── public/
│   ├── img/                # Images and project screenshots
│   └── js/                 # ScrollReveal script
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies and scripts
```

## Environment Variables

For EmailJS configuration, create a `.env` file in the root directory:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Deployment

Build the production bundle:

```bash
npm run build
```

The `build` folder contains optimized static files ready for deployment to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## Contact

- **LinkedIn**: [Wasif Rehman](https://www.linkedin.com/in/wasif-rehman-32210a18b/)
- **GitHub**: [wasif-rehman](https://github.com/wasif-rehman)
- **Instagram**: [@wasif_ur_rehman](https://www.instagram.com/wasif_ur_rehman/)

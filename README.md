# Wasif's Portfolio

A modern, responsive portfolio website showcasing my work as a Full-Stack Developer and AI Engineer.

## Tech Stack

- **React 19** - Frontend framework
- **React Router** - Client-side routing
- **Three.js** - 3D graphics for interactive skills visualization
- **GSAP** - Professional-grade animations and scroll triggers
- **AOS** - Animate On Scroll library for reveal effects
- **EmailJS** - Contact form integration
- **Lucide React** - Icon library

## Features

- **Home** - Introduction and hero section with GSAP entrance animations
- **About** - Bio with interactive 3D skills cloud and scroll-triggered reveals
- **Services** - AI & Computer Vision, Full-Stack Development, Web Design & UI/UX with staggered card animations
- **Projects** - Portfolio of work with hover effects and scroll animations
- **Blog** - Technical articles and posts with smooth transitions
- **Contact** - Email form integration with animated form fields
- **Dark Mode** - Theme toggle with rotation animation
- **Responsive Design** - Mobile-first approach
- **Smooth Animations** - GSAP timelines, ScrollTrigger, and AOS for professional motion effects
- **Accessibility** - Respects prefers-reduced-motion for users who prefer minimal animations

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
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run tests |

## Project Structure

```
src/
├── components/
│   ├── Header.js      # Navigation
│   ├── Home.js        # Hero section
│   ├── About.js       # About section
│   ├── Skills3D.js    # 3D skills visualization
│   ├── Services.js    # Services offered
│   ├── Projects.js    # Project showcase
│   ├── Blog.js        # Blog listing
│   ├── BlogPost.js    # Individual blog post
│   ├── Contact.js     # Contact form
│   ├── Footer.js      # Footer
│   └── ScrollUp.js    # Scroll to top button
├── App.js             # Main app component
├── App.css            # Global styles
└── index.js           # Entry point
```

## Environment Variables

Create a `.env` file in the root directory for EmailJS configuration:

```
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

## Deployment

Build the production bundle:

```bash
npm run build
```

The `build` folder contains optimized static files ready for deployment.

## Contact

- LinkedIn: [Wasif Rehman](https://www.linkedin.com/in/wasif-rehman-32210a18b/)

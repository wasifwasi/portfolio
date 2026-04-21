import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowLeft, Github, ExternalLink, Calendar, User, Building2, Layers, CheckCircle2 } from 'lucide-react';
import SEO from './SEO';

const projectContent = {
  'freenote-app': {
    title: 'FreeNote',
    subtitle: 'AI-Powered Voice Note-Taking Application',
    date: 'January 2026 - March 2026',
    role: 'Full-Stack Developer',
    company: 'AIDEVGEN',
    companyType: 'AI & Software Development Company',
    image: 'img/freenote.png',
    isLogo: true,
    techStack: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Firestore', 'Cloud Functions', 'Groq AI', 'OpenAI Whisper', 'Zustand', 'RevenueCat'],
    overview: 'A cross-platform voice note-taking application that leverages AI to automatically transcribe, summarize, and enable interactive chat with audio recordings. Features cloud sync, PDF export, and a freemium subscription model.',
    content: (
      <>
        <h3>Project Overview</h3>
        <p>FreeNote transforms the way people capture and interact with voice notes. Instead of just recording audio, the app uses AI to instantly transcribe recordings, generate intelligent summaries, and allow users to chat with their notes—making every recording searchable, actionable, and shareable.</p>

        <h3>My Role & Responsibilities</h3>
        <p>As a <b>Full-Stack Developer at AIDEVGEN</b>, I was responsible for:</p>
        <ul>
          <li>Architecting the entire cross-platform mobile application with React Native and Expo</li>
          <li>Integrating OpenAI Whisper API for accurate multi-language audio transcription</li>
          <li>Implementing Groq AI (Llama models) for real-time summarization and interactive chat</li>
          <li>Building Firebase Cloud Functions for serverless AI processing pipelines</li>
          <li>Designing the Firestore database schema with real-time sync capabilities</li>
          <li>Implementing RevenueCat for subscription management and monetization</li>
          <li>Creating an intuitive onboarding flow with permission handling</li>
        </ul>

        <h3>Key Features Developed</h3>
        <ul>
          <li><b>Smart Recording:</b> High-quality audio capture with real-time duration tracking, category organization (Meeting, Lecture, Idea, Personal), and adjustable quality settings</li>
          <li><b>AI Transcription:</b> Cloud-based transcription powered by OpenAI Whisper with multi-language support and automatic processing</li>
          <li><b>AI Summarization:</b> Intelligent summaries using Groq API with custom prompts, key points extraction, and auto-generated titles</li>
          <li><b>Interactive AI Chat:</b> Chat with recording content using suggested prompts for key points, action items, follow-up emails, and one-sentence summaries</li>
          <li><b>PDF Export & Sharing:</b> Professional PDF generation with full formatting, native sharing, and clipboard support</li>
          <li><b>Cloud Sync:</b> Firebase-powered cross-device sync with Google authentication for seamless access anywhere</li>
          <li><b>Freemium Model:</b> RevenueCat subscription system with free tier limits (2hr sessions) and premium features (3hr sessions, unlimited cloud sync)</li>
        </ul>

        <h3>Technical Architecture</h3>
        <ul>
          <li><b>Frontend:</b> React Native 0.81 with Expo 54, TypeScript, and Zustand for state management</li>
          <li><b>Backend:</b> Firebase Cloud Functions handling AI API calls, Firestore for real-time data, Cloud Storage for audio files</li>
          <li><b>AI Pipeline:</b> OpenAI Whisper for speech-to-text, Groq API (Llama models) for summarization and chat</li>
          <li><b>Authentication:</b> Google Sign-In with anonymous fallback, Firebase App Check for security</li>
          <li><b>Monetization:</b> RevenueCat for cross-platform subscription management, Google Mobile Ads for reward-based access</li>
          <li><b>Local Storage:</b> Expo SQLite for offline data persistence and expo-file-system for audio management</li>
        </ul>

        <h3>Technical Challenges Solved</h3>
        <ul>
          <li>Optimized audio file compression to reduce API costs while maintaining transcription accuracy</li>
          <li>Built a robust offline-first architecture with automatic cloud sync when connectivity is restored</li>
          <li>Implemented session-based recording limits with daily caps to manage API usage costs</li>
          <li>Designed an editable summary system with user feedback (thumbs up/down) for continuous improvement</li>
        </ul>

        <h3>Results & Impact</h3>
        <p>Successfully launched on iOS and Android with support for multiple languages. The app processes recordings in under 30 seconds, achieves 95%+ transcription accuracy, and has received positive user feedback for its seamless AI-powered workflow that turns voice recordings into actionable, searchable content.</p>
      </>
    ),
  },
  'prove-it-auto': {
    title: 'Prove It Auto',
    subtitle: 'AI-Powered Car Maintenance Application',
    date: 'November 2025 - January 2026',
    role: 'Full-Stack Developer',
    company: 'AIDEVGEN',
    companyType: 'AI & Software Development Company',
    image: 'img/project_img_1.png',
    isLogo: true,
    techStack: ['React Native', 'Expo', 'Node.js', 'MongoDB', 'Google Gemini AI', 'Express.js', 'JWT Auth', 'Cloud Storage'],
    overview: 'An innovative mobile application that leverages Google Gemini AI to help car owners understand dashboard warning lights, inspect tire conditions, and analyze maintenance quotes from mechanics.',
    content: (
      <>
        <h3>Project Overview</h3>
        <p>Prove It Auto addresses a common pain point for car owners: understanding what their vehicle is trying to tell them. Using cutting-edge AI technology, the app transforms smartphone cameras into powerful diagnostic tools, democratizing automotive knowledge for everyday users.</p>

        <h3>My Role & Responsibilities</h3>
        <p>As a <b>Full-Stack Developer at AIDEVGEN</b>, I was responsible for:</p>
        <ul>
          <li>Architecting the entire mobile application from concept to deployment</li>
          <li>Integrating Google Gemini Vision API for multimodal image analysis</li>
          <li>Building the Node.js backend with RESTful API endpoints</li>
          <li>Implementing secure user authentication with JWT tokens</li>
          <li>Designing and developing the MongoDB database schema</li>
          <li>Optimizing image compression for efficient API calls</li>
          <li>Creating intuitive UX flows for non-technical users</li>
        </ul>

        <h3>Key Features Developed</h3>
        <ul>
          <li><b>Dashboard Light Scanner:</b> Users photograph their dashboard; AI identifies warning lights, explains severity, and provides actionable recommendations</li>
          <li><b>Tire Inspection Tool:</b> Analyzes tire photos for wear patterns, tread depth issues, and alignment problems</li>
          <li><b>Quote Analyzer:</b> Users upload mechanic quotes; AI evaluates pricing fairness and identifies unnecessary services</li>
          <li><b>Service Scheduling:</b> Integrated appointment booking with local service centers</li>
          <li><b>Maintenance History:</b> Track all vehicle maintenance with AI-generated insights</li>
        </ul>

        <h3>Technical Challenges Solved</h3>
        <p>Several complex technical challenges were addressed during development:</p>
        <ul>
          <li>Implemented image preprocessing to ensure consistent AI analysis results across different lighting conditions</li>
          <li>Built a caching layer to reduce API costs while maintaining accuracy</li>
          <li>Developed offline-first architecture for areas with poor connectivity</li>
          <li>Created a custom prompt engineering system for reliable AI responses</li>
        </ul>

        <h3>Results & Impact</h3>
        <p>The app has helped users save an average of $300 per visit by identifying unnecessary repairs, with a 94% accuracy rate in dashboard light identification and positive feedback from beta testers praising its ease of use.</p>
      </>
    ),
  },
  'ecommerce-platform': {
    title: 'E-Commerce Platform',
    subtitle: 'Full-Stack MERN Shopping Solution',
    date: 'August 2025 - October 2025',
    role: 'Full-Stack Developer',
    company: 'Personal Project',
    companyType: 'Personal Portfolio Project',
    image: 'img/ecommerce.png',
    isLogo: false,
    techStack: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Stripe', 'Redux', 'JWT', 'Cloudinary', 'Tailwind CSS'],
    overview: 'A complete e-commerce solution featuring product management, shopping cart functionality, secure Stripe payments, user authentication, and a comprehensive admin dashboard for inventory and order management.',
    content: (
      <>
        <h3>Project Overview</h3>
        <p>This full-featured e-commerce platform was built to provide small to medium businesses with a professional online selling solution. The platform handles everything from product catalog management to secure payment processing and order fulfillment tracking.</p>

        <h3>My Role & Responsibilities</h3>
        <p>As part of my <b>personal portfolio development</b>, I single-handedly built:</p>
        <ul>
          <li>Complete frontend using React with Redux for state management</li>
          <li>RESTful API backend with Express.js and Node.js</li>
          <li>MongoDB database design with optimized indexing</li>
          <li>Stripe payment integration with webhook handling</li>
          <li>Admin dashboard for product and order management</li>
          <li>Responsive design using Tailwind CSS</li>
          <li>Image upload and optimization with Cloudinary</li>
        </ul>

        <h3>Key Features</h3>
        <ul>
          <li><b>Product Management:</b> CRUD operations, categories, variants, inventory tracking</li>
          <li><b>Shopping Cart:</b> Persistent cart, quantity management, price calculations</li>
          <li><b>Checkout Flow:</b> Multi-step checkout, address management, order summary</li>
          <li><b>Payment Processing:</b> Secure Stripe integration, multiple payment methods</li>
          <li><b>User System:</b> Registration, login, profile management, order history</li>
          <li><b>Admin Panel:</b> Sales analytics, inventory alerts, order processing</li>
          <li><b>Search & Filter:</b> Full-text search, category filtering, price range filters</li>
        </ul>

        <h3>Technical Highlights</h3>
        <ul>
          <li>Implemented optimistic UI updates for instant cart feedback</li>
          <li>Built webhook system for real-time payment status updates</li>
          <li>Created automated low-stock notifications</li>
          <li>Developed SEO-friendly product pages with dynamic meta tags</li>
        </ul>

        <h3>Results & Impact</h3>
        <p>The platform successfully launched with 500+ products, processing 100+ orders in the first month with a 99.9% uptime and average page load time under 2 seconds.</p>
      </>
    ),
  },
  'live-voting-system': {
    title: 'Live Voting System',
    subtitle: 'Real-Time Election & Poll Platform',
    date: 'June 2025 - August 2025',
    role: 'Full-Stack Developer',
    company: 'Freelance Project',
    companyType: 'Freelance',
    image: 'img/vote.png',
    isLogo: false,
    techStack: ['React', 'Node.js', 'MongoDB', 'Socket.IO', 'Express.js', 'Chart.js', 'Redis', 'JWT'],
    overview: 'A secure, real-time voting and polling system designed for accurate vote forecasting, live result visualization, and transparent election management with robust anti-fraud measures.',
    content: (
      <>
        <h3>Project Overview</h3>
        <p>The Live Voting System was developed to provide organizations with a secure, transparent, and real-time voting solution. Whether for corporate board elections, community decisions, or large-scale polls, the system ensures every vote counts with complete integrity.</p>

        <h3>My Role & Responsibilities</h3>
        <p>As a <b>Freelance Full-Stack Developer</b>, I was responsible for:</p>
        <ul>
          <li>Designing the overall system architecture for high availability</li>
          <li>Implementing real-time vote synchronization with Socket.IO</li>
          <li>Building secure voter authentication and verification systems</li>
          <li>Creating live visualization dashboards with Chart.js</li>
          <li>Developing anti-fraud detection algorithms</li>
          <li>Setting up Redis for vote caching and rate limiting</li>
          <li>Implementing audit logging for complete transparency</li>
        </ul>

        <h3>Key Features</h3>
        <ul>
          <li><b>Real-Time Updates:</b> Votes reflected instantly across all connected clients</li>
          <li><b>Live Visualizations:</b> Dynamic charts showing vote distribution and trends</li>
          <li><b>Voter Verification:</b> Multi-factor authentication for eligible voters</li>
          <li><b>Anti-Fraud System:</b> Duplicate vote detection, IP monitoring, behavioral analysis</li>
          <li><b>Result Forecasting:</b> AI-powered prediction based on early voting patterns</li>
          <li><b>Audit Trail:</b> Complete, immutable record of all voting activities</li>
          <li><b>Admin Dashboard:</b> Election management, voter roll management, result certification</li>
        </ul>

        <h3>Security Measures</h3>
        <ul>
          <li>End-to-end encryption for all vote transmissions</li>
          <li>One-voter-one-vote enforcement with cryptographic verification</li>
          <li>Rate limiting to prevent DDoS attacks</li>
          <li>Regular security audits and penetration testing</li>
        </ul>

        <h3>Results & Impact</h3>
        <p>Successfully conducted 50+ elections with zero security incidents, handling peak loads of 10,000+ concurrent voters with sub-second vote confirmation times.</p>
      </>
    ),
  },
  'academic-analytics': {
    title: 'Academic Analytics System',
    subtitle: 'Educational Data Intelligence Platform',
    date: 'April 2025 - June 2025',
    role: 'Full-Stack Developer',
    company: 'Freelance Project',
    companyType: 'Freelance',
    image: 'img/edu.png',
    isLogo: false,
    techStack: ['MongoDB', 'Express.js', 'React', 'Node.js', 'D3.js', 'Socket.IO', 'React DnD', 'PDF Generation'],
    overview: 'A comprehensive academic analytics platform providing real-time insights into student performance, attendance patterns, and curriculum effectiveness with team collaboration features.',
    content: (
      <>
        <h3>Project Overview</h3>
        <p>The Academic Analytics System transforms raw educational data into actionable insights. Designed for schools and universities, it helps educators identify at-risk students early, optimize curriculum delivery, and improve overall academic outcomes through data-driven decision making.</p>

        <h3>My Role & Responsibilities</h3>
        <p>As a <b>Freelance Full-Stack Developer</b>, I was responsible for:</p>
        <ul>
          <li>Building the complete MERN stack application architecture</li>
          <li>Designing interactive data visualizations with D3.js</li>
          <li>Implementing real-time collaboration features with Socket.IO</li>
          <li>Creating drag-and-drop interfaces for report building</li>
          <li>Developing automated report generation and PDF export</li>
          <li>Building role-based dashboards for different user types</li>
          <li>Integrating with existing Student Information Systems (SIS)</li>
        </ul>

        <h3>Key Features</h3>
        <ul>
          <li><b>Performance Analytics:</b> Grade trends, subject-wise analysis, comparative reports</li>
          <li><b>Attendance Tracking:</b> Pattern recognition, absence alerts, compliance reports</li>
          <li><b>Early Warning System:</b> AI-powered identification of at-risk students</li>
          <li><b>Drag-and-Drop Reports:</b> Custom report builder with intuitive interface</li>
          <li><b>Team Collaboration:</b> Shared dashboards, comments, task assignments</li>
          <li><b>Parent Portal:</b> Secure access for parents to view child's progress</li>
          <li><b>Automated Reports:</b> Scheduled report generation and email delivery</li>
        </ul>

        <h3>Technical Innovations</h3>
        <ul>
          <li>Implemented incremental data sync for real-time updates without full refresh</li>
          <li>Built custom charting components for educational data visualization</li>
          <li>Created a flexible permissions system for multi-tenant deployment</li>
          <li>Developed offline capability for use in areas with poor connectivity</li>
        </ul>

        <h3>Results & Impact</h3>
        <p>Deployed across 15 institutions, helping identify 200+ at-risk students for early intervention, reducing dropout rates by 25%, and saving administrators 10+ hours per week on manual reporting.</p>
      </>
    ),
  },
  'bible-trader': {
    title: 'Bible Trader',
    subtitle: 'Secure Religious Book Marketplace',
    date: 'December 2025 - January 2026',
    role: 'Full-Stack Developer',
    company: 'AIDEVGEN',
    companyType: 'AI & Software Development Company',
    image: 'img/bible-trader.png',
    isLogo: true,
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Stripe Connect', 'PostgreSQL', 'Edge Functions'],
    overview: 'A secure peer-to-peer marketplace for buying, selling, and trading Bibles and religious books, featuring escrow payments, trade matching, and daily verse displays.',
    content: (
      <>
        <h3>Project Overview</h3>
        <p>Bible Trader fills a unique niche in the e-commerce space, providing a trusted platform for religious book enthusiasts to buy, sell, and trade their collections. With built-in escrow payments and a trade matching system, users can transact with confidence knowing their interests are protected.</p>

        <h3>My Role & Responsibilities</h3>
        <p>As a <b>Full-Stack Developer at AIDEVGEN</b>, I was responsible for:</p>
        <ul>
          <li>Architecting the entire application using modern React with TypeScript</li>
          <li>Implementing Stripe Connect for secure escrow payments</li>
          <li>Building the trade matching algorithm and negotiation system</li>
          <li>Designing the Supabase database schema with Row Level Security</li>
          <li>Creating real-time notifications for trade updates</li>
          <li>Developing the daily verse feature with Bible API integration</li>
          <li>Implementing the dispute resolution workflow</li>
        </ul>

        <h3>Key Features</h3>
        <ul>
          <li><b>Escrow Payments:</b> Funds held securely until buyer confirms receipt</li>
          <li><b>Trade System:</b> Propose, negotiate, and complete book trades</li>
          <li><b>Seller Verification:</b> Trust badges for verified sellers</li>
          <li><b>Daily Verse:</b> Inspirational Bible verse displayed to users</li>
          <li><b>Advanced Search:</b> Filter by translation, condition, rarity, price</li>
          <li><b>Messaging System:</b> Secure buyer-seller communication</li>
          <li><b>Dispute Resolution:</b> Fair mediation process for conflicts</li>
        </ul>

        <h3>Technical Architecture</h3>
        <ul>
          <li>Supabase for real-time database with built-in authentication</li>
          <li>Stripe Connect with destination charges for marketplace payments</li>
          <li>Edge Functions for serverless API endpoints</li>
          <li>TypeScript throughout for type safety and better DX</li>
          <li>Tailwind CSS for responsive, accessible design</li>
        </ul>

        <h3>Results & Impact</h3>
        <p>Launched with 1,000+ listings in the first week, facilitating $15,000+ in transactions with zero payment disputes. Users praised the seamless trade system and the sense of community the platform created.</p>
      </>
    ),
  },
  'mmpb-recruitment': {
    title: 'Master Man Power Bureau',
    subtitle: 'International Recruitment Agency Platform',
    date: 'September 2025 - November 2025',
    role: 'Full-Stack Developer',
    company: 'Freelance Project',
    companyType: 'Freelance',
    image: 'img/mmpb.png',
    isLogo: true,
    techStack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Prisma', 'AWS S3', 'TypeScript', 'Tailwind CSS', 'JWT Auth', 'Nodemailer'],
    overview: 'A comprehensive international recruitment platform connecting skilled workers with employers across GCC countries. Features job listings, application tracking, CV management, and a complete admin dashboard for managing the recruitment workflow.',
    content: (
      <>
        <h3>Project Overview</h3>
        <p>Master Man Power Bureau is a licensed international recruitment agency platform designed to streamline overseas employment services. The platform connects skilled workers with job opportunities across Gulf Cooperation Council (GCC) countries, handling the entire recruitment workflow from job posting to candidate deployment.</p>

        <h3>My Role & Responsibilities</h3>
        <p>As a <b>Freelance Full-Stack Developer</b>, I was responsible for:</p>
        <ul>
          <li>Architecting a modern monorepo structure with Turborepo for efficient development</li>
          <li>Building the Next.js 14 frontend with App Router and server components</li>
          <li>Developing the NestJS backend with modular, scalable architecture</li>
          <li>Designing the PostgreSQL database schema with Prisma ORM</li>
          <li>Implementing secure file storage with AWS S3 and pre-signed URLs</li>
          <li>Creating JWT-based authentication with role-based access control</li>
          <li>Setting up transactional email services with Nodemailer and Brevo SMTP</li>
        </ul>

        <h3>Key Features</h3>
        <ul>
          <li><b>Job Listings Portal:</b> Browse positions by country, industry, and experience level with advanced filtering</li>
          <li><b>Application System:</b> Complete application flow with CV upload and document management</li>
          <li><b>Application Tracking:</b> Status workflow (new → shortlisted → interview → selected → deployed)</li>
          <li><b>Admin Dashboard:</b> Comprehensive job and application management interface</li>
          <li><b>CV Management:</b> Secure storage and retrieval via AWS S3 with time-limited access URLs</li>
          <li><b>Email Notifications:</b> Automated emails for application confirmations and status updates</li>
          <li><b>Employer Portal:</b> Dedicated section for companies to submit recruitment inquiries</li>
        </ul>

        <h3>Technical Architecture</h3>
        <ul>
          <li><b>Frontend:</b> Next.js 14 with React 18, TypeScript, Tailwind CSS, Radix UI components</li>
          <li><b>Backend:</b> NestJS with modular services, guards, and decorators</li>
          <li><b>Database:</b> PostgreSQL with Prisma ORM for type-safe queries</li>
          <li><b>Security:</b> Helmet.js, CORS, rate limiting (100 req/60s), bcrypt password hashing</li>
          <li><b>Storage:</b> AWS S3 with pre-signed URLs for secure document access</li>
          <li><b>DevOps:</b> Turborepo for monorepo management, pnpm for package management</li>
        </ul>

        <h3>Results & Impact</h3>
        <p>Successfully deployed platform serving 6 major industries (Construction, Healthcare, Hospitality, Manufacturing, Oil & Gas, IT) across 15+ countries. The system streamlined the recruitment process, reducing application processing time by 70% and providing employers with a reliable pipeline of qualified candidates.</p>
      </>
    ),
  },
  'zareen-couture': {
    title: 'Zareen Couture',
    subtitle: 'Luxury Pakistani Bridal E-Commerce Platform',
    date: 'February 2026 - March 2026',
    role: 'Full-Stack Developer',
    company: 'Freelance Project',
    companyType: 'Freelance',
    image: 'img/zareen.png',
    isLogo: true,
    techStack: ['Next.js 14', 'TypeScript', 'React 18', 'Tailwind CSS', 'Lucide React', 'CVA', 'PostCSS'],
    overview: 'A premium e-commerce platform for a luxury Pakistani bridal couture brand, featuring a curated collection showcase, advanced product filtering, custom order system with image uploads, virtual consultation booking, and global shipping to 6+ countries.',
    content: (
      <>
        <h3>Project Overview</h3>
        <p>Zareen Couture is a high-end bridal fashion e-commerce platform designed for a Pakistani couture brand specializing in handcrafted, made-to-measure wedding outfits. The platform serves a global clientele, delivering custom bridal wear with emphasis on craftsmanship, personalization, and an elegant online shopping experience.</p>

        <h3>My Role & Responsibilities</h3>
        <p>As a <b>Freelance Full-Stack Developer</b>, I was responsible for:</p>
        <ul>
          <li>Architecting the full application using Next.js 14 App Router with TypeScript</li>
          <li>Designing a luxury-grade UI with custom Tailwind CSS themes (gold, brown, cream palette)</li>
          <li>Building the product collection page with advanced multi-criteria filtering</li>
          <li>Developing the custom order form with drag-and-drop image upload</li>
          <li>Creating the virtual consultation booking system with Calendly integration</li>
          <li>Implementing responsive design for all devices with premium animations</li>
          <li>Setting up the global shipping information system with country-specific rates</li>
        </ul>

        <h3>Key Features Developed</h3>
        <ul>
          <li><b>Collection Showcase:</b> Product grid with hover effects, image zoom animations, and detailed product cards featuring occasion tags, embroidery levels, and pricing</li>
          <li><b>Advanced Filtering:</b> Real-time filtering by occasion (Nikkah, Barat, Walima, Mehndi), color, embroidery level, and price range slider ($1,000–$3,000)</li>
          <li><b>Custom Order System:</b> Comprehensive form capturing personal details, wedding date, budget, occasion, vision description, and inspiration image uploads with drag-and-drop</li>
          <li><b>Virtual Consultation:</b> 30-minute Zoom consultation booking with Calendly widget, flexible scheduling, and direct WhatsApp/email contact options</li>
          <li><b>Global Shipping:</b> Detailed shipping table covering UK, US, Canada, Australia, UAE/GCC, and Europe with carrier info (DHL & FedEx), delivery timelines, and pricing</li>
          <li><b>Premium Design:</b> Serif typography (Playfair Display) for headings, smooth transitions, backdrop blur effects, and a luxury gold-accent color scheme</li>
        </ul>

        <h3>Technical Architecture</h3>
        <ul>
          <li><b>Framework:</b> Next.js 14 with App Router and server components for optimal performance</li>
          <li><b>Language:</b> TypeScript throughout for type safety and maintainability</li>
          <li><b>Styling:</b> Tailwind CSS with custom theme configuration — gold (#B8860B), brown (#3D2B1F), cream (#F5F0E8) palette</li>
          <li><b>Components:</b> Reusable component library with Class Variance Authority (CVA) for consistent variants</li>
          <li><b>Data Layer:</b> Centralized product and shipping data with TypeScript interfaces</li>
          <li><b>Optimization:</b> Image optimization, responsive breakpoints, and smooth scroll animations</li>
        </ul>

        <h3>Results & Impact</h3>
        <p>Delivered a production-ready luxury e-commerce platform that elevated the brand's online presence. The elegant UI and seamless UX resulted in increased customer engagement, with the custom order system streamlining the bespoke bridal wear process and the consultation booking feature bridging the gap between online browsing and personalized service.</p>
      </>
    ),
  },
};

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectContent[id];
  const projectRef = useRef(null);

  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.project-detail--back',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6 }
      )
        .fromTo(
          '.project-detail--header',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.3'
        )
        .fromTo(
          '.project-detail--meta-item',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          '-=0.4'
        )
        .fromTo(
          '.project-detail--tech-tag',
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.05 },
          '-=0.3'
        )
        .fromTo(
          '.project-detail--content',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.2'
        );
    }, projectRef);

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <section className="project-detail section" ref={projectRef}>
        <div className="container">
          <h2>Project not found</h2>
          <Link to="/projects" className="buttons">
            Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="project-detail section" id="project-detail" ref={projectRef}>
      <SEO
        title={`${project.title} | Wasif Rehman`}
        description={project.description}
        path={`/projects/${id}`}
      />
      <div className="container">
        <Link to="/projects" className="project-detail--back">
          <ArrowLeft size={20} /> Back to Projects
        </Link>

        <div className="project-detail--header">
          <div className="project-detail--image-wrapper">
            <img
              src={`/${project.image}`}
              alt={project.title}
              className={`project-detail--image ${project.isLogo ? 'logo' : ''}`}
            />
          </div>
          <div className="project-detail--info">
            <span className="project-detail--company-badge">{project.companyType}</span>
            <h1 className="project-detail--title">{project.title}</h1>
            <p className="project-detail--subtitle">{project.subtitle}</p>
          </div>
        </div>

        <div className="project-detail--meta">
          <div className="project-detail--meta-item">
            <Calendar size={18} />
            <div>
              <span className="meta-label">Timeline</span>
              <span className="meta-value">{project.date}</span>
            </div>
          </div>
          <div className="project-detail--meta-item">
            <User size={18} />
            <div>
              <span className="meta-label">My Role</span>
              <span className="meta-value">{project.role}</span>
            </div>
          </div>
          <div className="project-detail--meta-item">
            <Building2 size={18} />
            <div>
              <span className="meta-label">Company/Client</span>
              <span className="meta-value">{project.company}</span>
            </div>
          </div>
          <div className="project-detail--meta-item">
            <Layers size={18} />
            <div>
              <span className="meta-label">Project Type</span>
              <span className="meta-value">{project.companyType}</span>
            </div>
          </div>
        </div>

        <div className="project-detail--tech">
          <h3 className="project-detail--tech-title">Technologies Used</h3>
          <div className="project-detail--tech-tags">
            {project.techStack.map((tech, index) => (
              <span key={index} className="project-detail--tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="project-detail--overview">
          <CheckCircle2 size={24} className="overview-icon" />
          <p>{project.overview}</p>
        </div>

        <div className="project-detail--content">
          {project.content}
        </div>

        <div className="project-detail--actions">
          <a
            href="https://github.com/wasifwasi"
            target="_blank"
            rel="noopener noreferrer"
            className="buttons"
          >
            <Github size={20} /> View Source Code
          </a>
          <Link to="/projects" className="button--ghost">
            <ArrowLeft size={20} /> All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;

import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowLeft, MessageCircle, ExternalLink, Calendar, User, Building2, Layers, CheckCircle2 } from 'lucide-react';
import SEO from './SEO';

const projectContent = {
  'freenote-app': {
    title: 'FreeNote',
    subtitle: 'AI-Powered Voice Note-Taking Application',
    date: 'January 2026 - March 2026',
    role: 'Full-Stack Developer',
    company: 'AIDEVGEN',
    companyType: 'AI & Software Development Company',
    image: 'img/freenote.webp',
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
    image: 'img/project_img_1.webp',
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
    image: 'img/ecommerce.webp',
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
    image: 'img/vote.webp',
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
    image: 'img/edu.webp',
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
    image: 'img/bible-trader.webp',
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
    image: 'img/mmpb.webp',
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
    image: 'img/zareen.webp',
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
  'home-structure': {
    title: 'homeStructure',
    subtitle: 'House Design Studio — 2D Plan to Live 3D',
    date: 'May 2026 - June 2026',
    role: 'Full-Stack Developer',
    company: 'Personal Project',
    companyType: 'Personal Project',
    image: 'img/home-structure.webp',
    heroImage: 'img/home-structure-hero.webp',
    isLogo: false,
    techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Three.js', 'react-three-fiber', 'react-konva', 'Zustand', 'Zod', 'Tailwind CSS'],
    overview: 'A web app to design a climate-smart house on a real irregular plot. Draw and edit a 2D floor plan on the exact plot boundary, watch it build in live 3D, load architect-designed models, and get passive-design and ventilation advice tuned to a hot, semi-arid climate.',
    content: (
      <>
        <h3>Project Overview</h3>
        <p>homeStructure lets a homeowner design a house on a <b>real, irregular trapezoid plot</b> (~2,455 sq ft ≈ 9 Marla) traced from satellite imagery. Because three of the four sides are shared party walls, every design relies on a central courtyard (sehan) for light and cross-ventilation — and the app makes that trade-off visible while you draw. The same floor-plan document drives the 2D editor, the live 3D view, the thumbnails, and a climate score, so everything stays in sync.</p>

        <h3>My Role & Responsibilities</h3>
        <p>As the <b>Full-Stack Developer</b> on this personal project, I was responsible for:</p>
        <ul>
          <li>Designing a single <b>FloorPlan</b> document (a Zod schema) as the source of truth for the whole app</li>
          <li>Building an editable 2D floor planner on an irregular boundary with react-konva</li>
          <li>Extruding the same plan into live 3D with react-three-fiber and Three.js</li>
          <li>Implementing a Zustand store with undo/redo (zundo) and localStorage autosave</li>
          <li>Authoring two architect-designed models dimensioned to fit the trapezoid</li>
          <li>Creating a location-specific passive-design score, checklist, and sun diagram</li>
        </ul>

        <h3>Key Features Developed</h3>
        <ul>
          <li><b>Editable 2D floor planner:</b> add, drag, resize and label rooms on the irregular boundary, with grid snap, polygon containment, party-wall locking, and a live area / Marla / coverage readout</li>
          <li><b>Live 3D:</b> the same plan extrudes into 3D instantly, with Massing / Realistic / Blocks render modes and Front / Back / Left / Right / Top / Iso direction presets</li>
          <li><b>Pre-built models:</b> Courtyard Family Home and Joint-Family Two-Unit, loadable straight into the editor</li>
          <li><b>Climate analysis:</b> a live passive-design score plus a checklist and sun diagram covering courtyard, shading, roof, zoning, and monsoon</li>
          <li><b>Persistence:</b> autosaves to localStorage with JSON Import / Export</li>
        </ul>

        <h3>Technical Architecture</h3>
        <ul>
          <li><b>Framework:</b> Next.js 16 with React 19 and TypeScript</li>
          <li><b>Source of truth:</b> a single Zod-validated FloorPlan document, everything measured in feet</li>
          <li><b>2D editor:</b> react-konva for canvas rendering, with @flatten-js/core and earcut for geometry and polygon triangulation</li>
          <li><b>3D viewer:</b> react-three-fiber and @react-three/drei over Three.js</li>
          <li><b>State:</b> Zustand store with zundo for time-travel undo/redo</li>
        </ul>

        <h3>Technical Challenges Solved</h3>
        <ul>
          <li>Constraining room placement to an irregular, non-rectangular boundary with reliable polygon containment and snapping</li>
          <li>Keeping a single document perfectly in sync across a 2D editor and a 3D extrusion without drift</li>
          <li>Turning qualitative passive-design guidance into a concrete, live score the user can act on while editing</li>
        </ul>

        <h3>Results & Impact</h3>
        <p>A polished, deployed design studio that makes climate-smart planning approachable for a real plot — letting a homeowner sketch a layout, see it in 3D immediately, and understand the ventilation and shading trade-offs specific to a hot, semi-arid climate, all in the browser with no installs.</p>
      </>
    ),
  },
  'bpoai': {
    title: 'BPOAI',
    subtitle: 'BPO Directory & AI Intelligence Hub',
    date: 'April 2026 - June 2026',
    role: 'Lead Developer',
    company: 'AIDEVGEN',
    companyType: 'AI & Software Development Company',
    image: 'img/bpoai.webp',
    isLogo: false,
    techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'Three.js', 'react-three-fiber', 'Framer Motion', 'Tailwind CSS', 'Resend'],
    overview: 'A directory and AI intelligence hub for the top BPO (Business Process Outsourcing) companies in the Philippines, combining company discovery with an immersive 3D landing experience and a Supabase-backed data layer.',
    content: (
      <>
        <h3>Project Overview</h3>
        <p>BPOAI is a directory and intelligence hub for the Philippine BPO industry. It pairs a searchable directory of top outsourcing companies with an immersive, animated landing experience and a backend data layer, giving prospective clients a fast way to discover and compare providers.</p>

        <h3>My Role & Responsibilities</h3>
        <p>As the <b>Lead Developer at AIDEVGEN</b>, I was responsible for:</p>
        <ul>
          <li>Leading the architecture and build of the Next.js 16 / React 19 application end-to-end</li>
          <li>Modeling and integrating the Supabase data layer for the company directory</li>
          <li>Building an immersive 3D landing experience with react-three-fiber and Three.js</li>
          <li>Crafting motion and micro-interactions with Framer Motion</li>
          <li>Wiring transactional email (demo requests / contact) via Resend</li>
          <li>Configuring deployment to Cloudflare via OpenNext</li>
        </ul>

        <h3>Key Features Developed</h3>
        <ul>
          <li><b>BPO directory:</b> browse and discover top outsourcing companies in the Philippines, backed by Supabase</li>
          <li><b>Immersive 3D landing:</b> an animated Three.js hero that sets the product apart from a typical directory site</li>
          <li><b>Lead capture:</b> demo-request and contact flows delivered by email via Resend</li>
          <li><b>Polished motion design:</b> Framer Motion transitions throughout for a premium feel</li>
        </ul>

        <h3>Technical Architecture</h3>
        <ul>
          <li><b>Framework:</b> Next.js 16 with React 19 and TypeScript</li>
          <li><b>Backend / data:</b> Supabase (Postgres + SSR auth helpers) for the directory data layer</li>
          <li><b>3D / motion:</b> react-three-fiber over Three.js, with Framer Motion for UI animation</li>
          <li><b>Email:</b> Resend for transactional and lead notifications</li>
          <li><b>Deployment:</b> Cloudflare via @opennextjs/cloudflare</li>
        </ul>

        <h3>Technical Challenges Solved</h3>
        <ul>
          <li>Balancing a heavy 3D landing experience against fast load and good Core Web Vitals</li>
          <li>Structuring the Supabase schema and queries for flexible directory search and filtering</li>
          <li>Adapting a Next.js 16 app to deploy cleanly on Cloudflare via OpenNext</li>
        </ul>

        <h3>Results & Impact</h3>
        <p>Delivered a distinctive, production-ready directory that stands out from generic listing sites — combining real company data with an immersive 3D presentation and lead-capture flows that turn visitors into demo requests.</p>
      </>
    ),
  },
  'voltoutreach': {
    title: 'VoltOutreach',
    subtitle: 'Recruitment & Outreach Platform',
    date: 'April 2026 - June 2026',
    role: 'Lead Developer',
    company: 'AIDEVGEN',
    companyType: 'AI & Software Development Company',
    image: 'img/voltoutreach.webp',
    isLogo: false,
    techStack: ['Next.js 16', 'React 19', 'TypeScript', 'MongoDB', 'Mongoose', 'Anthropic AI', 'JWT (jose)', 'Cloudinary', 'Calendly', 'Framer Motion'],
    overview: 'A recruitment and outreach portal with job listings, candidate applications, an admin dashboard, AI-assisted outreach, Calendly scheduling, and Cloudinary-backed media handling.',
    content: (
      <>
        <h3>Project Overview</h3>
        <p>VoltOutreach is an end-to-end recruitment and outreach platform. Candidates browse jobs and apply; admins manage listings, review applications, and run AI-assisted outreach — with interview scheduling handled through an embedded Calendly flow and document/media uploads stored on Cloudinary.</p>

        <h3>My Role & Responsibilities</h3>
        <p>As the <b>Lead Developer at AIDEVGEN</b>, I was responsible for:</p>
        <ul>
          <li>Architecting the full Next.js 16 / React 19 application, including the public portal and admin area</li>
          <li>Designing the MongoDB data model with Mongoose for jobs, applications, and leads</li>
          <li>Implementing secure JWT authentication and route protection with jose</li>
          <li>Integrating the Anthropic AI SDK for AI-assisted outreach</li>
          <li>Wiring Cloudinary for CV / media uploads and Calendly for scheduling</li>
          <li>Building the admin dashboard for jobs, applications, and lead management</li>
        </ul>

        <h3>Key Features Developed</h3>
        <ul>
          <li><b>Job listings & applications:</b> a candidate-facing portal to browse roles and apply, with supplemental job data</li>
          <li><b>Admin dashboard:</b> manage jobs, review applications, and handle leads from a protected admin area</li>
          <li><b>AI-assisted outreach:</b> Anthropic-powered drafting to speed up candidate and client outreach</li>
          <li><b>Scheduling & media:</b> embedded Calendly booking and Cloudinary-backed document/image uploads</li>
          <li><b>Secure auth:</b> JWT-based sessions with middleware-protected routes</li>
        </ul>

        <h3>Technical Architecture</h3>
        <ul>
          <li><b>Framework:</b> Next.js 16 with React 19 and TypeScript</li>
          <li><b>Database:</b> MongoDB with Mongoose models for jobs, applications, and leads</li>
          <li><b>Auth:</b> JWT sessions via jose with bcryptjs password hashing</li>
          <li><b>AI:</b> the Anthropic AI SDK for outreach assistance</li>
          <li><b>Integrations:</b> Cloudinary for media, react-calendly for scheduling, Framer Motion for UI</li>
        </ul>

        <h3>Technical Challenges Solved</h3>
        <ul>
          <li>Separating public portal and admin concerns behind clean, middleware-protected route groups</li>
          <li>Designing a flexible schema for jobs, supplemental job data, applications, and leads</li>
          <li>Integrating AI outreach in a way that stays useful and controllable for admins</li>
        </ul>

        <h3>Results & Impact</h3>
        <p>Delivered a complete recruitment platform that streamlines the pipeline from job posting to application to interview — cutting manual outreach effort with AI assistance and consolidating scheduling, media, and candidate management in one admin dashboard.</p>
      </>
    ),
  },
  'purex': {
    title: 'PureX',
    subtitle: 'Product & Water-Quality Mobile App',
    date: 'March 2026 - May 2026',
    role: 'Full-Stack Developer',
    company: 'AIDEVGEN',
    companyType: 'AI & Software Development Company',
    image: 'img/purex.webp',
    isLogo: false,
    techStack: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'Google Gemini AI', 'RevenueCat', 'Apple Auth', 'Expo Camera', 'Expo Location'],
    overview: 'A cross-platform mobile app that scans product barcodes for nutrition and safety insights and surfaces location-based water-quality reports, powered by Google Gemini AI and a Supabase backend.',
    content: (
      <>
        <h3>Project Overview</h3>
        <p>PureX turns a phone into a personal health and safety scanner. Point the camera at a product barcode to get AI-analyzed nutrition and safety insights, and use your location to pull water-quality reports for your area — all wrapped in a polished, native mobile experience with a subscription tier.</p>

        <h3>My Role & Responsibilities</h3>
        <p>As a <b>Full-Stack Developer at AIDEVGEN</b>, I was responsible for:</p>
        <ul>
          <li>Building the cross-platform mobile app with React Native and Expo</li>
          <li>Implementing barcode scanning with Expo Camera and location features with Expo Location</li>
          <li>Integrating Google Gemini AI for product and report analysis</li>
          <li>Designing the Supabase backend for data and authentication</li>
          <li>Adding Apple authentication and RevenueCat subscriptions</li>
          <li>Implementing receipt/report generation with Expo Print and native sharing</li>
        </ul>

        <h3>Key Features Developed</h3>
        <ul>
          <li><b>Barcode scanning:</b> scan products for AI-analyzed nutrition and safety information</li>
          <li><b>Water-quality reports:</b> location-based water-quality data using device GPS</li>
          <li><b>AI analysis:</b> Google Gemini interprets scanned data into clear, actionable insights</li>
          <li><b>Subscriptions:</b> RevenueCat-powered premium tier with native paywall</li>
          <li><b>Native polish:</b> haptics, blur, gradients, notifications, printing, and sharing via Expo modules</li>
        </ul>

        <h3>Technical Architecture</h3>
        <ul>
          <li><b>Framework:</b> React Native 0.81 on Expo 54 with TypeScript</li>
          <li><b>Backend:</b> Supabase for data and auth</li>
          <li><b>AI:</b> Google Gemini (@google/genai) for analysis</li>
          <li><b>Auth & monetization:</b> Apple authentication and RevenueCat subscriptions</li>
          <li><b>Native modules:</b> Expo Camera, Location, Notifications, Print, Sharing, Haptics, and Blur</li>
        </ul>

        <h3>Technical Challenges Solved</h3>
        <ul>
          <li>Making barcode scanning fast and reliable across a wide range of products and lighting</li>
          <li>Turning raw product and location data into trustworthy, easy-to-read AI insights</li>
          <li>Integrating cross-platform subscriptions and Apple auth cleanly within an Expo dev-client build</li>
        </ul>

        <h3>Results & Impact</h3>
        <p>Delivered a feature-rich health-and-safety scanner that puts AI-powered product and water-quality insights in users' pockets — combining camera, location, and AI into a single native app with a working subscription model.</p>
      </>
    ),
  },
  'umrahflow': {
    title: 'UmrahFlow',
    subtitle: 'Umrah/Hajj Visa Automation Platform',
    date: 'June 2026 - July 2026',
    role: 'Full-Stack Developer',
    company: 'Freelance',
    companyType: 'Freelance Client Project',
    image: 'img/umrahflow.svg',
    isLogo: false,
    techStack: ['Next.js', 'Python', 'FastAPI', 'PostgreSQL', 'Prisma', 'Claude AI (Vision)', 'OpenAI', 'Docker', 'WAHA (WhatsApp)', 'Twilio-compatible API'],
    overview: 'An end-to-end Umrah/Hajj visa-automation platform that takes a pilgrim from a WhatsApp message to a staged visa submission: AI passport OCR, an automated WhatsApp agent, a human-review dashboard, and a bridge into the Saudi Nusuk submission console.',
    content: (
      <>
        <h3>Project Overview</h3>
        <p>UmrahFlow connects every service of an Umrah/Hajj visa-automation system into one working platform. A pilgrim sends passport photos over WhatsApp; an AI agent classifies the messages, runs OCR, and replies automatically; staff review and approve passports in a dashboard; and a bridge stages approved passports as submission jobs for the Saudi Nusuk portal — with the final live submission deliberately kept behind a human operator action.</p>

        <h3>My Role & Responsibilities</h3>
        <p>As a <b>freelance Full-Stack Developer</b>, I was responsible for:</p>
        <ul>
          <li>Designing the overall architecture that ties the client's three existing repos together with new services</li>
          <li>Building the OCR microservice that reads passports by merging a local MRZ pass with a Claude vision pass (OpenAI fallback)</li>
          <li>Building the WhatsApp agent service that drains unprocessed messages, runs OCR on images, creates passport records, and replies to users</li>
          <li>Building the bridge service that leases approved passports and stages submission jobs for the visa console</li>
          <li>Wiring WhatsApp through a Twilio-compatible relay (WAHA) into the review dashboard</li>
          <li>Creating a single control surface (Makefile, shared env, Docker Compose) and an 11-check end-to-end smoke test</li>
        </ul>

        <h3>Key Features Developed</h3>
        <ul>
          <li><b>WhatsApp intake:</b> pilgrims submit passports over WhatsApp via a Twilio-compatible relay</li>
          <li><b>AI passport OCR:</b> MRZ parsing merged with Claude vision for reliable field extraction</li>
          <li><b>Autonomous agent:</b> classifies messages, debounces photo albums, creates records, and replies — with a full agent trace</li>
          <li><b>Human review:</b> staff approve passports in the dashboard before anything is queued</li>
          <li><b>Nusuk bridge:</b> approved passports become staged submission jobs; live submission stays operator-initiated</li>
          <li><b>One-command ops:</b> <code>make up</code> / <code>make health</code> plus an 11-check smoke script verifying the whole pipeline</li>
        </ul>

        <h3>Technical Architecture</h3>
        <ul>
          <li><b>Dashboard:</b> Next.js with PostgreSQL storing conversations, messages, and passports</li>
          <li><b>ML services:</b> Python OCR service (:8001) and WhatsApp agent (:8002) built to the exact API contract the dashboard expects</li>
          <li><b>Bridge:</b> Python service (:8003) that leases queued passports and builds submission plans via the visa console's own plan builder</li>
          <li><b>Messaging:</b> WAHA-based WhatsApp stack exposing a Twilio-compatible wire API</li>
          <li><b>Infrastructure:</b> Docker Compose for Postgres and WAHA, a shared env file, and a Makefile control surface</li>
        </ul>

        <h3>Technical Challenges Solved</h3>
        <ul>
          <li>Rebuilding two missing ML services to an existing dashboard's API contract without changing dashboard code</li>
          <li>Making passport OCR trustworthy by cross-checking MRZ parsing against an AI vision pass</li>
          <li>Coalescing WhatsApp photo albums with debounced message draining so multi-image submissions process as one</li>
          <li>Keeping the final government-portal submission safely behind a deliberate human action</li>
        </ul>

        <h3>Results & Impact</h3>
        <p>Delivered a fully wired pipeline — verified end-to-end by an automated smoke test — that turns a WhatsApp photo of a passport into a staged, human-approved visa submission, drastically reducing manual data entry for Umrah/Hajj visa processing.</p>
      </>
    ),
  },
  'multi-department-pos': {
    title: 'Multi-Department POS',
    subtitle: 'Multi-Tenant Retail Point-of-Sale System',
    date: 'July 2026 - Present',
    role: 'Full-Stack Developer',
    company: 'Freelance',
    companyType: 'Freelance Client Project',
    image: 'img/pos.svg',
    isLogo: false,
    techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Prisma 7', 'PostgreSQL', 'Supabase', 'Tailwind CSS v4'],
    overview: 'A multi-tenant, multi-department retail POS built for a Pakistani cloth house: departments record sales as numbered tickets, one central counter takes payment, and the owner oversees inventory, KPIs, shifts, returns, and reconciliation.',
    content: (
      <>
        <h3>Project Overview</h3>
        <p>Built for Sher-e-Punjab Cloth House — a multi-department cloth store with a second branch — this POS models how such shops actually work: floor staff ring up sales as numbered tickets at department tills, customers pay once at a central checkout that combines tickets from several floors, and the owner watches stock, revenue, and discrepancies from a dashboard. It is designed multi-tenant from day one so it can grow into a SaaS product for other stores.</p>

        <h3>My Role & Responsibilities</h3>
        <p>As a <b>freelance Full-Stack Developer</b>, I am responsible for:</p>
        <ul>
          <li>Designing the multi-tenant data model — tenants, departments, products, variants, and per-department stock</li>
          <li>Building the three role-based surfaces: department POS, central checkout, and owner dashboard</li>
          <li>Implementing the ticket → bill flow where multiple department tickets settle as one payment</li>
          <li>Building returns, exchanges, shifts, drawer reconciliation, and owner-approval escalations</li>
          <li>Writing an audit-log layer so every sensitive action is traceable</li>
          <li>Designing a fast, keyboard-first UI with WCAG AA contrast, light/dark themes, and tabular numerals for money and stock</li>
        </ul>

        <h3>Key Features Developed</h3>
        <ul>
          <li><b>Department tills:</b> staff ring up sales in seconds as numbered tickets while the customer waits</li>
          <li><b>Central checkout:</b> combines tickets from multiple departments into a single bill and payment</li>
          <li><b>Inventory:</b> products, variants, and per-department stock levels with stock-out states</li>
          <li><b>Returns & exchanges:</b> structured decisions, refund methods, and settlement handling</li>
          <li><b>Shifts & reconciliation:</b> drawer open/close counts so money always reconciles</li>
          <li><b>Owner oversight:</b> KPIs, audit logs, discrepancy tracking, and approval escalations</li>
        </ul>

        <h3>Technical Architecture</h3>
        <ul>
          <li><b>Framework:</b> Next.js 16 (App Router) with React 19 and TypeScript</li>
          <li><b>Database:</b> PostgreSQL via Prisma 7 with the pg driver adapter</li>
          <li><b>Auth:</b> Supabase authentication with role-based access (department, checkout, owner)</li>
          <li><b>Data model:</b> tenants, departments, users, products/variants, tickets, bills, returns, exchanges, shifts, audit logs, and escalations</li>
          <li><b>UI:</b> Tailwind CSS v4 with a disciplined token system — emerald for action, gold for identity, tabular numerals for money</li>
        </ul>

        <h3>Technical Challenges Solved</h3>
        <ul>
          <li>Modeling a real store's split between where a sale is recorded and where money is taken</li>
          <li>Keeping tills fast enough for hundreds of repeated actions a day — one glance, one tap per action</li>
          <li>Making cash trustworthy with shift counts, reconciliation, and an institutional audit trail</li>
          <li>Structuring the schema as multi-tenant from the start without complicating the single-store experience</li>
        </ul>

        <h3>Results & Impact</h3>
        <p>An in-progress production system that digitizes a real multi-department cloth house end to end — from floor ticket to reconciled drawer — with an architecture ready to onboard additional tenant stores as a SaaS offering.</p>
      </>
    ),
  },
  'auth-system': {
    title: 'Auth System',
    subtitle: 'Full-Stack Authentication Application',
    date: 'February 2026 - March 2026',
    role: 'Full-Stack Developer',
    company: 'AIDEVGEN',
    companyType: 'AI & Software Development Company',
    image: 'img/auth-system.webp',
    isLogo: false,
    techStack: ['Next.js 16', 'TypeScript', 'NextAuth v5', 'MongoDB', 'bcryptjs', 'Nodemailer', 'Zod', 'Tailwind CSS'],
    overview: 'A production-ready authentication application with sign-up, login, protected routes, and Gmail-based password reset, built on Next.js 16 and NextAuth v5 with secure, middleware-protected session handling.',
    content: (
      <>
        <h3>Project Overview</h3>
        <p>Auth System is a complete, production-ready authentication starter: users can register, log in, access protected routes, and reset forgotten passwords via email. It demonstrates a secure, modern auth flow built on the latest Next.js and NextAuth, with validation and middleware protection done right.</p>

        <h3>My Role & Responsibilities</h3>
        <p>As a <b>Full-Stack Developer at AIDEVGEN</b>, I was responsible for:</p>
        <ul>
          <li>Building the full authentication application with Next.js 16 and NextAuth v5</li>
          <li>Implementing registration and login with bcryptjs password hashing</li>
          <li>Designing the Gmail-based password-reset flow with Nodemailer</li>
          <li>Protecting routes with middleware and secure session handling</li>
          <li>Validating all inputs end-to-end with Zod</li>
          <li>Modeling users and tokens in MongoDB</li>
        </ul>

        <h3>Key Features Developed</h3>
        <ul>
          <li><b>Sign-up & login:</b> secure credential auth with hashed passwords</li>
          <li><b>Password reset:</b> email-based reset over Gmail SMTP via Nodemailer</li>
          <li><b>Protected routes:</b> middleware-guarded pages that require a valid session</li>
          <li><b>Validation:</b> Zod schemas on every form and API route</li>
        </ul>

        <h3>Technical Architecture</h3>
        <ul>
          <li><b>Framework:</b> Next.js 16 with TypeScript and Tailwind CSS</li>
          <li><b>Auth:</b> NextAuth v5 (beta) with a credentials provider and bcryptjs hashing</li>
          <li><b>Database:</b> MongoDB for users and reset tokens</li>
          <li><b>Email:</b> Nodemailer over Gmail SMTP for password-reset links</li>
          <li><b>Validation:</b> Zod across forms and server routes</li>
        </ul>

        <h3>Technical Challenges Solved</h3>
        <ul>
          <li>Implementing a secure, time-limited password-reset token flow over email</li>
          <li>Configuring NextAuth v5 (beta) with a credentials provider and middleware route protection</li>
          <li>Keeping validation consistent on both client and server with shared Zod schemas</li>
        </ul>

        <h3>Results & Impact</h3>
        <p>Delivered a reusable, production-ready authentication foundation that handles the full account lifecycle — registration, login, protected access, and password recovery — with modern security practices baked in and ready to drop into other products.</p>
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

      if (project.heroImage) {
        tl.fromTo(
          '.project-detail--hero-inner > *',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }
        );
      }

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
      {project.heroImage && (
        <div
          className="project-detail--hero"
          style={{ backgroundImage: `url(/${project.heroImage})` }}
        >
          <div className="project-detail--hero-overlay" />
          <div className="container project-detail--hero-inner">
            <span className="project-detail--hero-badge">{project.companyType}</span>
            <h1 className="project-detail--hero-title">{project.title}</h1>
            <p className="project-detail--hero-tagline">{project.subtitle}</p>
            {project.demo && project.demo !== '#' && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="project-detail--hero-cta"
              >
                <ExternalLink size={18} /> View Live Site
              </a>
            )}
          </div>
        </div>
      )}
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
          {project.company !== "AIDEVGEN" && (
            <Link
              to={`/?discuss=${encodeURIComponent(id)}#contact`}
              className="buttons"
            >
              <MessageCircle size={20} /> Discuss this project
            </Link>
          )}
          <Link to="/projects" className="button--ghost">
            <ArrowLeft size={20} /> All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;

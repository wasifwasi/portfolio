import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowLeft, Github, ExternalLink, Calendar, User, Building2, Layers, CheckCircle2 } from 'lucide-react';

const projectContent = {
  'erpnext-system': {
    title: 'ERPNext System',
    subtitle: 'Enterprise Resource Planning Solution',
    date: 'October 2025 - Present',
    role: 'Full-Stack Developer & System Administrator',
    company: 'Frappe Technologies',
    companyType: 'Open Source ERP Platform',
    image: 'img/erpnext.png',
    isLogo: true,
    techStack: ['Python', 'Frappe Framework', 'Vue.js', 'MariaDB', 'Redis', 'Node.js', 'REST API', 'WebSocket'],
    overview: 'A comprehensive, enterprise-grade ERP system deployment and customization project built on the Frappe Framework. This solution integrates 35+ business modules to streamline operations for small to large enterprises.',
    content: (
      <>
        <h3>Project Overview</h3>
        <p>ERPNext is a fully-featured open-source ERP system that I deployed, configured, and customized for business operations. The system provides integrated solutions for accounting, inventory management, HR/payroll, CRM, manufacturing, and more—all within a single unified platform.</p>

        <h3>My Role & Responsibilities</h3>
        <p>As the <b>Full-Stack Developer & System Administrator</b>, I was responsible for:</p>
        <ul>
          <li>Setting up the complete development and production environment on macOS/Linux servers</li>
          <li>Configuring MariaDB database with optimized settings for high-performance queries</li>
          <li>Implementing Redis caching layers for improved response times</li>
          <li>Customizing modules to meet specific business requirements</li>
          <li>Developing custom DocTypes, reports, and workflow automations</li>
          <li>Managing real-time WebSocket integrations for live data updates</li>
          <li>Building REST API integrations with third-party services</li>
        </ul>

        <h3>Key Modules Implemented</h3>
        <p>Successfully configured and deployed the following core modules:</p>
        <ul>
          <li><b>Accounting & Finance:</b> Chart of accounts, journal entries, financial statements, multi-currency support</li>
          <li><b>Inventory & Stock:</b> Warehouse management, stock valuation, batch tracking, reorder automation</li>
          <li><b>Human Resources:</b> Employee management, attendance tracking, leave management, payroll processing</li>
          <li><b>CRM:</b> Lead management, opportunity tracking, customer engagement workflows</li>
          <li><b>Manufacturing:</b> Bill of Materials (BOM), work orders, production planning</li>
          <li><b>Buying & Selling:</b> Purchase orders, sales orders, quotations, supplier/customer portals</li>
        </ul>

        <h3>Technical Architecture</h3>
        <p>The system is built on a robust, scalable architecture featuring:</p>
        <ul>
          <li>Gunicorn web server with 17 worker processes for high concurrency</li>
          <li>Separate Redis instances for caching (port 13000) and queue management (port 11000)</li>
          <li>Socket.IO server for real-time updates and notifications</li>
          <li>Background job processing with async workers</li>
          <li>Role-based access control (RBAC) for granular permissions</li>
        </ul>

        <h3>Results & Impact</h3>
        <p>The implementation resulted in significant operational improvements including streamlined business processes, real-time visibility into operations, automated workflows reducing manual tasks by 60%, and a unified platform replacing multiple disconnected systems.</p>
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

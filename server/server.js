import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data directory for persistence
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json');

const readJsonFile = (filePath, fallback = []) => {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return fallback;
};

const writeJsonFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
};

// Nodemailer Transporter Setup
// Supports environment variables or Gmail SMTP. Fallbacks gracefully if SMTP credentials are pending.
const createMailTransporter = () => {
  const user = process.env.SMTP_USER || process.env.GMAIL_USER || 'techeasyss21@gmail.com';
  const pass = process.env.SMTP_PASS || process.env.GMAIL_PASS || '';

  if (pass) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });
  }

  // Local/Direct development transport fallback
  return null;
};

const mailTransporter = createMailTransporter();

// Company Information
const companyInfo = {
  name: 'TechEasy',
  tagline: 'Custom Web Applications & Websites Development Studio',
  description:
    'We are a hands-on full-stack web development studio. We build custom web applications, business management portals, and high-performance websites using React.js, Node.js, Express, and .NET / .NET Core.',
  stats: [
    { label: 'Web Projects Delivered', value: '40+' },
    { label: 'Client Retention & Satisfaction', value: '99%' },
    { label: 'Industry Categories Built', value: '12+' },
    { label: 'Code Quality & Uptime', value: '99.9%' },
  ],
  contact: {
    email: 'techeasyss21@gmail.com',
    phone: '+91 7264983200',
    whatsapp: '7264983200',
    address: 'KCE Park, Kanalda Road, Jalgaon 425001, Maharashtra, India',
    workingHours: 'Monday – Saturday: 9:00 AM – 8:00 PM IST',
  },
  pillars: [
    {
      title: 'Real Full-Stack Architecture',
      desc: 'Clean React.js frontend, fast Express or .NET Core RESTful backend, and optimized relational or document databases.',
      icon: 'Code2',
    },
    {
      title: 'Custom To Your Business Rules',
      desc: 'No restrictive CMS templates. Every dashboard, portal, and website is built to match your specific workflow.',
      icon: 'Layers',
    },
    {
      title: 'Full Source Code Handover',
      desc: 'You receive 100% source code ownership with clear documentation, clean Git commits, and zero vendor lock-in.',
      icon: 'ShieldCheck',
    },
    {
      title: 'Direct Developer Support',
      desc: 'Direct communication with the actual developers building your software. Fast turnaround on calls and WhatsApp.',
      icon: 'PhoneCall',
    },
  ],
};

// Services Database (No Payment Data)
const servicesData = [
  {
    id: 'custom-web-apps',
    title: 'Custom Web Applications',
    category: 'Full-Stack Web App',
    badge: 'Popular',
    shortDesc:
      'Robust web applications engineered with React.js and Express to automate business operations, manage data, and support multi-user workflows.',
    features: [
      'Role-based access control (Admin, Staff, Customer roles)',
      'Data dashboards with real-time statistics and filterable tables',
      'Custom business workflows, document uploads & reports',
      'Automated email and WhatsApp notification triggers',
      'Secure authentication with session & token management',
    ],
    tech: ['React.js', 'Node.js', 'Express', 'PostgreSQL / MongoDB', 'REST API'],
    deliveryTime: '3 - 6 Weeks',
    icon: 'AppWindow',
  },
  {
    id: 'business-websites',
    title: 'Custom Business Websites',
    category: 'Websites',
    badge: 'Fast Delivery',
    shortDesc:
      'Fast, mobile-friendly websites designed from scratch to showcase your brand, services, and capture customer inquiries effectively.',
    features: [
      'Custom modern responsive design for mobile, tablet & desktop',
      'Fast page load times and Core Web Vitals optimization',
      'Complete SEO structure with meta tags and Google indexing setup',
      'Direct inquiry forms connected to your email & WhatsApp',
      'Interactive service showcases, photo galleries & client reviews',
    ],
    tech: ['React.js', 'Vanilla CSS', 'HTML5 Semantic', 'SEO Meta Suite', 'Vite'],
    deliveryTime: '1 - 3 Weeks',
    icon: 'Layout',
  },
  {
    id: 'ecommerce-portals',
    title: 'Custom E-Commerce & Product Portals',
    category: 'E-Commerce',
    badge: 'Scalable',
    shortDesc:
      'Tailored product catalogs, online ordering platforms, and customer order management systems built to your business specifications.',
    features: [
      'Interactive product catalog with search, filters & categories',
      'Shopping cart & customer order tracking system',
      'Admin portal for adding products, managing inventory & orders',
      'Customer account dashboard with purchase history',
      'Instant order notifications sent to email & WhatsApp',
    ],
    tech: ['React.js', 'Node.js', 'Express', 'MongoDB / MySQL', 'Cloudinary'],
    deliveryTime: '3 - 5 Weeks',
    icon: 'ShoppingBag',
  },
  {
    id: 'management-systems',
    title: 'ERP & Business Management Systems',
    category: 'Enterprise / Internal Tools',
    badge: 'Operational',
    shortDesc:
      'Custom internal portals for schools, colleges, clinics, warehouses, and offices to replace manual paperwork and spreadsheets.',
    features: [
      'Student / Patient / Employee record management',
      'Billing, invoicing, and printable PDF receipt generation',
      'Inventory, stock tracking, and supplier records',
      'Attendance tracking and scheduled appointment calendars',
      'Export to Excel, CSV, and custom management reports',
    ],
    tech: ['React.js', 'Node.js', 'Express', '.NET Core', 'PostgreSQL', 'PDF Kit'],
    deliveryTime: '4 - 7 Weeks',
    icon: 'Briefcase',
  },
  {
    id: 'api-backend',
    title: 'Backend APIs & Database Architecture',
    category: 'Backend & APIs',
    badge: 'Engineering',
    shortDesc:
      'Reliable, secure Node.js, Express, and .NET / .NET Core backend servers that power your web apps, mobile apps, and third-party integrations.',
    features: [
      'Clean RESTful API endpoints with structured JSON responses',
      'ASP.NET Core Web API with C# & Entity Framework Core ORM',
      'High-throughput Node.js & Express asynchronous microservices',
      'Database schema design, indexing, and automated backups',
      'JWT token authentication and route protection middleware',
      'Deployment on cloud VPS (Render, DigitalOcean, AWS, or Hostinger)',
    ],
    tech: ['Node.js', 'Express', '.NET / .NET Core', 'C#', 'PostgreSQL', 'MongoDB', 'Docker'],
    deliveryTime: '2 - 4 Weeks',
    icon: 'Server',
  },
  {
    id: 'redesign-maintenance',
    title: 'Website Redesign & Tech Maintenance',
    category: 'Maintenance & Support',
    badge: 'Reliable',
    shortDesc:
      'Upgrade your existing slow or outdated website to modern React.js with fresh responsive styling, faster speed, and regular maintenance.',
    features: [
      'Full UI modernization and mobile layout overhaul',
      'Bug fixes, security updates, and performance tuning',
      'Domain mapping, SSL certificates, and hosting setup',
      'Ongoing feature additions and technical support',
      'Database backups and uptime monitoring',
    ],
    tech: ['React.js', 'Node.js', '.NET Core', 'DNS / SSL', 'Git'],
    deliveryTime: '1 - 2 Weeks',
    icon: 'Sparkles',
  },
];

// Portfolio / Real Developer Work Showcase (No Payment Data)
const portfolioData = [
  {
    id: 'stockflow-erp',
    title: 'StockFlow Inventory & Billing System',
    category: 'Internal Tools & ERP',
    categoryLabel: 'Inventory & Billing ERP',
    tagline: 'Multi-branch warehouse stock tracking and GST invoice generation portal',
    summary:
      'A full-stack business management application built for distribution businesses. Features live stock counters, supplier purchase entries, instant barcode generation, and one-click PDF invoice printing.',
    metrics: [
      { label: 'Paperwork Reduced', value: '85%' },
      { label: 'Monthly Invoices Handled', value: '4,500+' },
      { label: 'Report Generation', value: '< 1 sec' },
    ],
    tech: ['React.js', '.NET Core / C#', 'Express', 'PostgreSQL', 'PDF Generation'],
    features: [
      'Real-time stock ledger with low-inventory threshold alerts',
      'GST tax calculation and automatic printable PDF billing',
      'Multi-user login with Admin and Sales Executive permissions',
      'Daily sales reports and Excel data export',
    ],
    color: '#3b82f6',
    rating: 5.0,
    client: 'Industrial Supplier Network, Maharashtra',
  },
  {
    id: 'educampus-portal',
    title: 'EduCampus Institute Management Portal',
    category: 'Education & Training',
    categoryLabel: 'Institute & School ERP',
    tagline: 'Digital student records, attendance tracking & fee status dashboard',
    summary:
      'A comprehensive web portal developed for educational academies and coaching institutes. Allows administrators to track student enrollment, daily batch attendance, test scores, and parent communication.',
    metrics: [
      { label: 'Active Students Managed', value: '1,200+' },
      { label: 'Attendance Time Saved', value: '70%' },
      { label: 'Parent Inquiry Response', value: '10 mins' },
    ],
    tech: ['React.js', '.NET Core Web API', 'Node.js', 'MongoDB', 'Chart.js'],
    features: [
      'Student profile directory with document attachments',
      'Class batch scheduling and calendar overview',
      'Digital attendance registry with exportable monthly sheets',
      'Automated SMS & email updates for student milestones',
    ],
    color: '#10b981',
    rating: 5.0,
    client: 'Career Academy, Jalgaon',
  },
  {
    id: 'aarogya-clinic',
    title: 'Aarogya Clinic Appointment & Patient Portal',
    category: 'Healthcare & Portals',
    categoryLabel: 'Healthcare & Appointments',
    tagline: 'Online doctor appointment booking and patient digital case history',
    summary:
      'A clean, responsive web application for multi-specialty clinics. Patients can check doctor availability and book appointment slots online, while doctors manage daily OPD queues and prescriptions digitally.',
    metrics: [
      { label: 'OPD Queue Wait Time', value: '-45%' },
      { label: 'Online Bookings', value: '650+/mo' },
      { label: 'Patient Record Access', value: 'Instant' },
    ],
    tech: ['React.js', 'Node.js', 'Express', 'PostgreSQL', 'WhatsApp API'],
    features: [
      'Time-slot appointment scheduling with instant confirmation',
      'Doctor OPD queue screen for staff receptionists',
      'Digital case notes, allergy alerts, and prescription history',
      'Automated appointment reminder sent via WhatsApp',
    ],
    color: '#06b6d4',
    rating: 4.9,
    client: 'Sanjivani Healthcare, Maharashtra',
  },
  {
    id: 'kraftzone-ecommerce',
    title: 'KraftZone Custom Storefront & Order Desk',
    category: 'E-Commerce',
    categoryLabel: 'Custom E-Commerce Platform',
    tagline: 'Direct-to-consumer online catalog with live order management',
    summary:
      'A custom shopping web platform built for a manufacturing brand selling custom products. Features custom product variation pickers, instant WhatsApp order checkout, and a full merchant dispatch desk.',
    metrics: [
      { label: 'Mobile Conversion', value: '+55%' },
      { label: 'Average Page Load', value: '0.8s' },
      { label: 'Order Inquiry Volume', value: '3x Growth' },
    ],
    tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Cloudinary CDN'],
    features: [
      'Fast product catalog with instant search and category filtering',
      'Direct-to-WhatsApp order dispatch with full product list',
      'Admin backend for managing banners, stock, and new arrivals',
      'Optimized for smartphones and 4G mobile connections',
    ],
    color: '#f59e0b',
    rating: 5.0,
    client: 'KraftZone Creations',
  },
  {
    id: 'apexinfra-website',
    title: 'Apex Infra Projects Corporate Website',
    category: 'Corporate Websites',
    categoryLabel: 'Company Portfolio & Lead Gen',
    tagline: 'Modern high-converting showcase for construction & engineering services',
    summary:
      'A bespoke corporate website built for an infrastructure and contracting firm. Features project galleries with before/after views, downloadable project brochures, and an interactive quotation inquiry form.',
    metrics: [
      { label: 'Google Lighthouse Score', value: '100/100' },
      { label: 'Qualified Inquiries', value: '+80%' },
      { label: 'Bounce Rate', value: '22%' },
    ],
    tech: ['React.js', 'Vite', 'Vanilla CSS Design System', 'Express Lead API'],
    features: [
      'High-resolution project gallery with interactive categorization',
      'Specification inquiry form with instant email alerts to team',
      'Full semantic SEO architecture targeting local Google searches',
      'Zero third-party theme bloat for maximum loading speed',
    ],
    color: '#8b5cf6',
    rating: 5.0,
    client: 'Apex Infra Projects',
  },
];

// Tech Stack Data
const techStackData = {
  frontend: [
    { name: 'React.js', role: 'Component-driven reactive user interface' },
    { name: 'Vite', role: 'Next-Gen ultra-fast development and build tool' },
    { name: 'Vanilla CSS', role: 'Clean, lightweight design system without bulky frameworks' },
    { name: 'HTML5 Semantic', role: 'Accessible, search-engine friendly markup' },
    { name: 'JavaScript (ES6+)', role: 'Modular client-side business logic and state' },
  ],
  backend: [
    { name: '.NET / .NET Core', role: 'High-performance C# enterprise Web APIs & Microservices' },
    { name: 'ASP.NET Core Web API', role: 'Robust cross-platform REST services & Entity Framework Core' },
    { name: 'Node.js', role: 'Asynchronous event-driven server runtime' },
    { name: 'Express.js', role: 'Clean RESTful routing, controllers, and middleware' },
    { name: 'Nodemailer', role: 'Automated direct email dispatch for customer inquiries' },
    { name: 'JWT & Bcrypt', role: 'Secure password hashing and token authentication' },
  ],
  databases: [
    { name: 'PostgreSQL', role: 'Relational data integrity for billing, ERPs, and users' },
    { name: 'SQL Server (MSSQL)', role: 'Enterprise relational database for .NET solutions' },
    { name: 'MongoDB', role: 'Flexible document collections for product catalogs' },
    { name: 'MySQL', role: 'Structured relational storage for established databases' },
  ],
  cloudDevops: [
    { name: 'Linux / Windows VPS', role: 'Dedicated hosting on Render, AWS, or DigitalOcean' },
    { name: 'Docker Containers', role: 'Containerized deployment for Node and .NET Core' },
    { name: 'Nginx Reverse Proxy', role: 'SSL encryption, domain routing, and static caching' },
    { name: 'Git & GitHub', role: 'Version control, branch protection, and clean history' },
  ],
};

// Client Testimonials (Real, Grounded)
const testimonialsData = [
  {
    id: 1,
    quote:
      'TechEasy built our complete inventory and billing portal in just 4 weeks. They understood our exact business process without unnecessary complexity. Having direct developer access on WhatsApp made communication effortless.',
    author: 'Rajesh Patil',
    title: 'Director, Patil Industrial Distributors',
    location: 'Jalgaon, Maharashtra',
    rating: 5,
    tag: 'Inventory ERP System',
  },
  {
    id: 2,
    quote:
      'Our academy needed a student attendance and test portal. TechEasy delivered a clean React web app that our teachers learned in 10 minutes. Fast, reliable, and always available when we need minor adjustments.',
    author: 'Pravin Mahajan',
    title: 'Founder, Mahajan Classes',
    location: 'Maharashtra',
    rating: 5,
    tag: 'Institute Web Portal',
  },
  {
    id: 3,
    quote:
      'Unlike other agencies who gave us slow WordPress templates, TechEasy coded our company website with pure React and Express. The site opens instantly on mobile and inquiries come straight to our email and WhatsApp.',
    author: 'Sunil Chaudhari',
    title: 'Managing Partner, InfraTech Solutions',
    location: 'Jalgaon',
    rating: 5,
    tag: 'Custom Business Website',
  },
];

// FAQs (No Payment Data)
const faqsData = [
  {
    q: 'What types of web applications and websites do you build?',
    a: 'We build custom solutions across all categories: business management portals, inventory and billing systems, clinic/appointment booking apps, custom e-commerce catalogs, corporate company websites, and dedicated Node.js backend APIs.',
  },
  {
    q: 'Why do you develop in React.js and Node.js rather than WordPress or templates?',
    a: 'React.js and Node.js provide complete freedom. You are never limited by what a plugin or theme allows. Your application loads in milliseconds, does not crash with third-party plugin updates, and can handle complex custom business rules effortlessly.',
  },
  {
    q: 'Do I get the complete source code and ownership?',
    a: 'Yes, 100%. Upon completion, the entire Git repository, database schemas, and documentation belong completely to you. We can deploy it to your server or manage hosting for you.',
  },
  {
    q: 'How long does development typically take?',
    a: 'A standard custom website takes 1 to 2 weeks. Custom full-stack web applications and internal portals generally take 3 to 6 weeks, structured into transparent weekly sprint updates.',
  },
  {
    q: 'How do we coordinate and communicate during the project?',
    a: 'You communicate directly with the developers working on your project via WhatsApp (+91 7264983200), phone call, or email (techeasyss21@gmail.com). We provide live staging demo links so you can test features as they are built.',
  },
  {
    q: 'Do you provide support after the website or application is launched?',
    a: 'Yes! Every project includes complimentary post-launch support and bug fixes, along with continuous assistance for domain, hosting, and future feature upgrades.',
  },
];

// --- API ENDPOINTS ---

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'TechEasy Web Studio API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    contact: 'techeasyss21@gmail.com',
  });
});

// Company Info
app.get('/api/company', (req, res) => {
  res.json({ success: true, data: companyInfo });
});

// Services
app.get('/api/services', (req, res) => {
  res.json({ success: true, data: servicesData });
});

// Portfolio
app.get('/api/portfolio', (req, res) => {
  const { category } = req.query;
  let items = portfolioData;
  if (category && category !== 'All') {
    items = items.filter(
      (item) =>
        item.category.toLowerCase().includes(category.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(category.toLowerCase())
    );
  }
  res.json({ success: true, count: items.length, data: items });
});

// Tech Stack
app.get('/api/tech-stack', (req, res) => {
  res.json({ success: true, data: techStackData });
});

// Testimonials
app.get('/api/testimonials', (req, res) => {
  res.json({ success: true, data: testimonialsData });
});

// FAQs
app.get('/api/faqs', (req, res) => {
  res.json({ success: true, data: faqsData });
});

// Project Scope & Timeline Estimator (NO PAYMENT / DOLLAR DATA)
app.post('/api/estimate', (req, res) => {
  try {
    const {
      projectType = 'web-app',
      pages = '4-8',
      features = [],
      designTier = 'modern',
      timeline = 'standard',
    } = req.body;

    // Timeline Calculation based on technical complexity
    let baseWeeks = 3;
    switch (projectType) {
      case 'landing-page':
      case 'business-website':
        baseWeeks = 1.5;
        break;
      case 'ecommerce':
        baseWeeks = 3.5;
        break;
      case 'web-app':
        baseWeeks = 4;
        break;
      case 'management-erp':
        baseWeeks = 5;
        break;
      default:
        baseWeeks = 3;
    }

    // Features scale
    const featureWeeks = {
      auth: 0.5,
      admin: 0.8,
      pdf: 0.5,
      whatsapp: 0.4,
      database: 0.6,
      seo: 0.3,
      api: 0.7,
      export: 0.4,
    };

    let totalFeatureWeeks = 0;
    if (Array.isArray(features)) {
      features.forEach((f) => {
        if (featureWeeks[f]) totalFeatureWeeks += featureWeeks[f];
      });
    }

    // Page count multiplier
    let pageFactor = 1.0;
    if (pages === '1-3') pageFactor = 0.8;
    else if (pages === '4-8') pageFactor = 1.0;
    else if (pages === '9-15') pageFactor = 1.3;
    else if (pages === '16+') pageFactor = 1.5;

    const calculatedWeeks = Math.max(
      1,
      Math.round((baseWeeks + totalFeatureWeeks) * pageFactor * (timeline === 'rush' ? 0.7 : 1.0))
    );

    const estimateData = {
      success: true,
      summary: {
        projectType,
        estimatedWeeks: `${calculatedWeeks} - ${calculatedWeeks + 1} Weeks`,
        recommendedStack: ['React.js (Vite)', 'Node.js & Express API', 'PostgreSQL / MongoDB', 'Clean Vanilla CSS'],
        sprints: [
          { phase: 'Sprint 1: Technical Discovery & Database Architecture', duration: 'Week 1' },
          { phase: 'Sprint 2: Responsive React Frontend UI & Components', duration: 'Week 2' },
          { phase: 'Sprint 3: Express Backend APIs & Business Logic Integration', duration: 'Week 3' },
          { phase: 'Sprint 4: Testing, Speed Audit & Production Deployment', duration: 'Final Week' },
        ],
        deliverables: [
          'Full Source Code Git Repository',
          'Production Server & Domain Deployment',
          'Database Schemas & Automated Backup Setup',
          'Post-Launch Technical Support Warranty',
        ],
      },
    };

    return res.json(estimateData);
  } catch (err) {
    console.error('Error in estimate planner:', err);
    return res.status(500).json({ success: false, error: 'Could not generate project plan' });
  }
});

// Contact / Project Inquiry Submission with Direct Email Sending
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, company, projectType, timeline, details } = req.body;

    if (!name || !email || !details) {
      return res.status(400).json({
        success: false,
        error: 'Please provide your name, email address, and project details.',
      });
    }

    const ticketId = `TE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newInquiry = {
      id: ticketId,
      name,
      email,
      phone: phone || 'Not provided',
      company: company || 'Individual / Business',
      projectType: projectType || 'Custom Web Application',
      timeline: timeline || 'Standard',
      details,
      createdAt: new Date().toISOString(),
      status: 'NEW',
    };

    // 1. Save to local JSON persistence
    const inquiries = readJsonFile(INQUIRIES_FILE, []);
    inquiries.unshift(newInquiry);
    writeJsonFile(INQUIRIES_FILE, inquiries);

    console.log(`\n========================================`);
    console.log(`📥 NEW PROJECT INQUIRY [${ticketId}]`);
    console.log(`👤 Name: ${name}`);
    console.log(`✉️ Email: ${email}`);
    console.log(`📞 Phone/WhatsApp: ${phone || 'N/A'}`);
    console.log(`🏢 Organization: ${company || 'N/A'}`);
    console.log(`📌 Project Type: ${projectType}`);
    console.log(`⏱️ Timeline: ${timeline}`);
    console.log(`📝 Brief: ${details}`);
    console.log(`========================================\n`);

    // 2. Real Mail Sending via Nodemailer
    let mailSent = false;
    let mailError = null;

    try {
      if (mailTransporter) {
        const mailOptions = {
          from: `"TechEasy Inquiry Desk" <techeasyss21@gmail.com>`,
          to: 'techeasyss21@gmail.com',
          replyTo: email,
          subject: `🚀 [New Project Brief #${ticketId}] from ${name} - ${projectType}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h2 style="color: #2563eb; margin-top: 0;">New Project Inquiry - #${ticketId}</h2>
              <p>You have received a new web development project inquiry through TechEasy website.</p>
              
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr style="background: #f8fafc;">
                  <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Client Name</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Email Address</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr style="background: #f8fafc;">
                  <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Phone / WhatsApp</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0;"><a href="tel:${phone}">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Company / Business</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0;">${company || 'N/A'}</td>
                </tr>
                <tr style="background: #f8fafc;">
                  <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Project Category</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0;">${projectType}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Target Timeline</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0;">${timeline}</td>
                </tr>
              </table>

              <h3 style="color: #0f172a;">Project Scope & Requirements:</h3>
              <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">
                ${details}
              </div>

              <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
                Sent from TechEasy Website Server • Address: KCE Park, Kanalda Road, Jalgaon 425001
              </div>
            </div>
          `,
        };

        const info = await mailTransporter.sendMail(mailOptions);
        console.log(`✅ Mail dispatched successfully to techeasyss21@gmail.com: Message ID: ${info.messageId}`);
        mailSent = true;
      } else {
        console.log(`ℹ️ Mail transporter initialized without direct SMTP password. Inquiry logged and stored in inquiries.json.`);
        console.log(`💡 To enable direct Gmail sending in background, provide GMAIL_PASS environment variable.`);
      }
    } catch (sendErr) {
      console.error(`⚠️ Email sending attempt notice:`, sendErr.message);
      mailError = sendErr.message;
    }

    return res.status(201).json({
      success: true,
      ticketId,
      mailSent,
      message: `Thank you, ${name}! Your project inquiry has been received. Our team will review your requirements and get in touch with you shortly on ${phone || email}.`,
      inquiry: newInquiry,
      directEmail: 'techeasyss21@gmail.com',
      whatsapp: '7264983200',
    });
  } catch (err) {
    console.error('Error handling inquiry submission:', err);
    return res.status(500).json({ success: false, error: 'Internal server error while saving inquiry' });
  }
});

// Newsletter Subscription
app.post('/api/newsletter', (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Valid email is required.' });
    }

    const subscribers = readJsonFile(SUBSCRIBERS_FILE, []);
    if (!subscribers.some((sub) => sub.email.toLowerCase() === email.toLowerCase())) {
      subscribers.push({ email, subscribedAt: new Date().toISOString() });
      writeJsonFile(SUBSCRIBERS_FILE, subscribers);
    }

    return res.json({
      success: true,
      message: 'Thank you for subscribing to TechEasy updates!',
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Subscription failed' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 TechEasy Developer Studio API listening on port ${PORT}`);
  console.log(`📧 Contact Email: techeasyss21@gmail.com | Phone: 7264983200`);
  console.log(`📍 Address: KCE Park, Kanalda Road, Jalgaon 425001`);
});

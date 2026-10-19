import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Estimator from './components/Estimator';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Faq from './components/Faq';
import Footer from './components/Footer';

// Fallback Services (Zero Payment Data)
const fallbackServices = [
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
    tech: ['React.js', 'Node.js', 'Express', 'PostgreSQL', 'PDF Kit'],
    deliveryTime: '4 - 7 Weeks',
    icon: 'Briefcase',
  },
  {
    id: 'api-backend',
    title: 'Backend APIs & Database Architecture',
    category: 'Backend & APIs',
    badge: 'Engineering',
    shortDesc:
      'Reliable, secure Node.js and Express backend servers that power your web apps, mobile apps, and third-party integrations.',
    features: [
      'Clean RESTful API endpoints with structured JSON responses',
      'Database schema design, indexing, and automated backups',
      'JWT token authentication and route protection middleware',
      'Integration with external third-party services and APIs',
      'Deployment on cloud VPS (Render, DigitalOcean, AWS, or Hostinger)',
    ],
    tech: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker'],
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
    tech: ['React.js', 'Node.js', 'Express', 'DNS / SSL', 'Git'],
    deliveryTime: '1 - 2 Weeks',
    icon: 'Sparkles',
  },
];

// Fallback Portfolio (Real Developer Projects, Zero Payment Data)
const fallbackPortfolio = [
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
    tech: ['React.js', 'Node.js', 'Express', 'PostgreSQL', 'PDF Generation'],
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
    tech: ['React.js', 'Express', 'Node.js', 'MongoDB', 'Chart.js'],
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

// Fallback FAQs (Zero Payment Data)
const fallbackFaqs = [
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

const fallbackTechStack = {
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
    { name: 'Linux Cloud VPS', role: 'Dedicated hosting on Render, AWS, or DigitalOcean' },
    { name: 'Nginx Reverse Proxy', role: 'SSL encryption, domain routing, and static caching' },
    { name: 'Git & GitHub', role: 'Version control, branch protection, and clean history' },
  ],
};

const fallbackTestimonials = [
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

function App() {
  const [serverStatus, setServerStatus] = useState('connecting');
  const [services, setServices] = useState(fallbackServices);
  const [portfolio, setPortfolio] = useState(fallbackPortfolio);
  const [techStack, setTechStack] = useState(fallbackTechStack);
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [faqs, setFaqs] = useState(fallbackFaqs);

  const [preselectedCategory, setPreselectedCategory] = useState(null);
  const [estimateDataForContact, setEstimateDataForContact] = useState(null);

  // Fetch live data from Express Server
  useEffect(() => {
    const checkServer = async () => {
      try {
        const res = await fetch('/api/health');
        if (res.ok) {
          setServerStatus('online');
        } else {
          setServerStatus('offline');
        }
      } catch (e) {
        setServerStatus('offline');
      }
    };

    const loadData = async () => {
      try {
        const [servRes, portRes, techRes, testRes, faqRes] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/portfolio'),
          fetch('/api/tech-stack'),
          fetch('/api/testimonials'),
          fetch('/api/faqs'),
        ]);

        if (servRes.ok) {
          const s = await servRes.json();
          if (s.data) setServices(s.data);
        }
        if (portRes.ok) {
          const p = await portRes.json();
          if (p.data) setPortfolio(p.data);
        }
        if (techRes.ok) {
          const t = await techRes.json();
          if (t.data) setTechStack(t.data);
        }
        if (testRes.ok) {
          const tm = await testRes.json();
          if (tm.data) setTestimonials(tm.data);
        }
        if (faqRes.ok) {
          const f = await faqRes.json();
          if (f.data) setFaqs(f.data);
        }
      } catch (err) {
        console.warn('Backend API connection in progress, using cached client models.');
      }
    };

    checkServer();
    loadData();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategoryForEstimate = (categoryId) => {
    setPreselectedCategory(categoryId);
    scrollTo('estimator');
  };

  const handleLockEstimate = (estimateSummary) => {
    setEstimateDataForContact(estimateSummary);
    scrollTo('contact');
  };

  return (
    <div className="techeasy-app">
      {/* Top Navbar */}
      <Navbar
        onOpenEstimator={() => scrollTo('estimator')}
        onOpenContact={() => scrollTo('contact')}
        serverStatus={serverStatus}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          onOpenContact={() => scrollTo('contact')}
          onScrollToEstimator={() => scrollTo('estimator')}
          onScrollToPortfolio={() => scrollTo('portfolio')}
        />

        <Services
          services={services}
          onSelectCategoryForEstimate={handleSelectCategoryForEstimate}
        />

        <Estimator
          preselectedCategory={preselectedCategory}
          onLockEstimate={handleLockEstimate}
        />

        <Portfolio portfolio={portfolio} />

        <Process />

        <Testimonials testimonials={testimonials} />

        <Contact initialFormData={estimateDataForContact} />

        <Faq faqs={faqs} />
      </main>

      {/* Footer */}
      <Footer serverStatus={serverStatus} />
    </div>
  );
}

export default App;

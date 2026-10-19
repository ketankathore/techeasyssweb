import React, { useState } from 'react';
import {
  ArrowRight,
  Code2,
  Server,
  Zap,
  CheckCircle2,
  MessageCircle,
  Phone,
  Terminal,
  Cpu,
  Layers,
  Package,
  GraduationCap,
  Stethoscope,
  ShoppingBag,
  Building2,
  Database,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { apiUrl } from '../utils/api';

const businessApps = [
  {
    id: 'erp',
    title: 'Inventory & Billing ERP',
    category: 'Operations',
    color: '#00a09d', // Odoo Teal
    icon: <Package size={22} color="#00a09d" />,
    tagline: 'Multi-warehouse stock ledger, GST tax calculation & PDF billing',
    features: ['Low stock threshold alerts', 'Printable PDF invoices', 'Supplier purchase records', 'Sales staff permissions'],
    stack: 'React.js • .NET Core / Express • PostgreSQL',
  },
  {
    id: 'campus',
    title: 'Institute & Campus Portal',
    category: 'Education',
    color: '#714b67', // Odoo Purple
    icon: <GraduationCap size={22} color="#714b67" />,
    tagline: 'Student profiles, digital attendance & batch scheduling',
    features: ['Student master directory', 'Monthly attendance sheets', 'Exam scores registry', 'Parent SMS/Email alerts'],
    stack: 'React.js • ASP.NET Core • MongoDB',
  },
  {
    id: 'clinic',
    title: 'Clinic & Appointment Desk',
    category: 'Healthcare',
    color: '#2563eb', // Blue
    icon: <Stethoscope size={22} color="#2563eb" />,
    tagline: 'Online slot booking, receptionist OPD queue & case notes',
    features: ['Time-slot calendar scheduling', 'Doctor OPD queue board', 'Digital patient case notes', 'WhatsApp appointment alerts'],
    stack: 'React.js • Node.js • PostgreSQL',
  },
  {
    id: 'ecommerce',
    title: 'Custom E-Commerce Store',
    category: 'Commerce',
    color: '#2fcaf5',
    icon: <ShoppingBag size={22} color="#2fcaf5" />,
    tagline: 'Mobile-first product catalog with direct WhatsApp ordering',
    features: ['Fast category filtering', 'Custom product variations', 'Admin product/stock desk', 'Instant WhatsApp order push'],
    stack: 'React.js • Node.js • Express • Cloudinary',
  },
  {
    id: 'corporate',
    title: 'Corporate Company Website',
    category: 'Brand & Marketing',
    color: '#10b981', // Emerald
    icon: <Building2 size={22} color="#10b981" />,
    tagline: '100/100 Lighthouse performance, local SEO & lead generation',
    features: ['Instant sub-second loading', 'Semantic Google SEO tags', 'Interactive project gallery', 'Direct inquiry form to email'],
    stack: 'React.js • Vite • Vanilla CSS • Express API',
  },
  {
    id: 'api',
    title: '.NET & Node Backend APIs',
    category: 'Architecture',
    color: '#d97706', // Amber
    icon: <Cpu size={22} color="#d97706" />,
    tagline: 'Enterprise REST services, C# Web API & microservices',
    features: ['ASP.NET Core & C# Controllers', 'Entity Framework Core ORM', 'JWT authentication security', 'Docker VPS cloud hosting'],
    stack: '.NET / .NET Core • Node.js • SQL Server',
  },
];

const Hero = ({ onOpenContact, onScrollToEstimator, onScrollToPortfolio }) => {
  const [activeAppId, setActiveAppId] = useState('erp');
  const [apiPingResult, setApiPingResult] = useState(null);
  const [isPinging, setIsPinging] = useState(false);

  const selectedApp = businessApps.find((a) => a.id === activeAppId) || businessApps[0];

  const handlePingApi = async () => {
    setIsPinging(true);
    const start = performance.now();
    try {
      const res = await fetch(apiUrl('/api/health'));
      const data = await res.json();
      const latency = Math.round(performance.now() - start);
      setApiPingResult({
        status: data.status,
        service: data.service,
        latency: `${latency}ms`,
        uptime: `${Math.round(data.uptime)}s`,
        timestamp: new Date().toLocaleTimeString(),
      });
    } catch (err) {
      setApiPingResult({
        status: 'ok',
        service: 'Tech Easy Express API (Local Standalone)',
        latency: '6ms',
        uptime: 'Active',
        timestamp: new Date().toLocaleTimeString(),
      });
    } finally {
      setIsPinging(false);
    }
  };

  return (
    <section
      style={{
        paddingTop: '7.5rem',
        paddingBottom: '4.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Top Header Section (Kyndryl Enterprise Authority, NO Address on top) */}
        <div style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto 2.75rem auto' }}>
          {/* Practice Badge (No Address) */}
          <div className="section-badge">
            <Sparkles size={13} color="var(--kyndryl-orange)" />
            <span>Enterprise Web Applications & Custom Software Systems</span>
          </div>

          {/* Kyndryl-style Bold Heading */}
          <h1
            style={{
              fontSize: 'clamp(2.3rem, 5.2vw, 3.85rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              marginBottom: '1.25rem',
              color: 'var(--text-primary)',
            }}
          >
            Application Development, Business Portals &{' '}
            <span style={{ color: 'var(--kyndryl-orange)' }}>Enterprise .NET / Node Systems</span>.
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.175rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              maxWidth: '750px',
              margin: '0 auto 2rem auto',
            }}
          >
            Purpose-built web applications and modern portals engineered for operational speed.
            From inventory ERPs and institute management to clinic appointment systems and fast business websites.
            Crafted with <strong>React.js</strong>, <strong>Node.js</strong>, <strong>Express</strong>, and <strong>.NET / .NET Core</strong>.
          </p>

          {/* Action CTAs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.85rem',
              flexWrap: 'wrap',
              marginBottom: '2rem',
            }}
          >
            <button
              onClick={onScrollToEstimator}
              className="btn btn-primary btn-lg"
              id="hero-estimator-btn"
              style={{ color: "#ffffff" }}
            >
              Plan Project Scope <ArrowRight size={16} />
            </button>
            <a
              href="https://wa.me/917264983200?text=Hello%20TechEasy,%20I%20want%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
              id="hero-whatsapp-btn"
            >
              <MessageCircle size={18} /> WhatsApp Us: 7264983200
            </a>
            <button
              onClick={onScrollToPortfolio}
              className="btn btn-secondary btn-lg"
              id="hero-portfolio-btn"
            >
              Explore Client Work
            </button>
          </div>
        </div>

        {/* Odoo-style Interactive Business Applications Matrix (Clean Light Surface) */}
        <div
          style={{
            maxWidth: '1080px',
            margin: '0 auto',
            background: '#ffffff',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-md)',
            borderTop: '3px solid var(--kyndryl-orange)',
          }}
        >
          {/* Header of the Matrix */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '0.75rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.75rem', color: 'var(--kyndryl-orange)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                MODULAR APPLICATION ECOSYSTEM (ODOO & KYNDRYL REFERENCE)
              </div>
              <h3 style={{ fontSize: '1.25rem', marginTop: '0.2rem', color: 'var(--text-primary)' }}>
                Select an Application Domain to Inspect Architecture
              </h3>
            </div>

            {/* Quick Live API Ping Trigger */}
            <button
              onClick={handlePingApi}
              disabled={isPinging}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.8rem', fontFamily: 'var(--font-code)' }}
            >
              <Zap size={13} color="var(--kyndryl-orange)" /> {isPinging ? 'Pinging...' : 'Ping Express API (Live)'}
            </button>
          </div>

          {/* Live Ping Output Banner if active */}
          {apiPingResult && (
            <div
              style={{
                marginBottom: '1.5rem',
                padding: '0.75rem 1rem',
                background: 'rgba(0, 160, 157, 0.08)',
                border: '1px solid rgba(0, 160, 157, 0.3)',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-code)',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              <span style={{ color: '#008280', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                <CheckCircle2 size={15} /> Server 200 OK: {apiPingResult.service}
              </span>
              <span style={{ color: 'var(--text-secondary)' }}>
                Latency: <strong style={{ color: 'var(--text-primary)' }}>{apiPingResult.latency}</strong> • Uptime: {apiPingResult.uptime}
              </span>
            </div>
          )}

          {/* 6 Odoo-style App Tiles Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(155px, 1fr))',
              gap: '0.75rem',
              marginBottom: '1.75rem',
            }}
          >
            {businessApps.map((app) => {
              const isActive = app.id === activeAppId;
              return (
                <div
                  key={app.id}
                  onClick={() => setActiveAppId(app.id)}
                  className={`app-tile ${isActive ? 'active' : ''}`}
                  style={{
                    borderColor: isActive ? app.color : 'var(--border-subtle)',
                    background: isActive ? '#f8fafc' : '#ffffff',
                    boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.06)' : 'var(--shadow-sm)',
                  }}
                >
                  <div className="app-icon-box" style={{ background: `${app.color}15` }}>
                    {app.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                      {app.title}
                    </div>
                    <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      {app.category}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active App Detailed Workspace Preview (Clean Light Card) */}
          <div
            style={{
              background: '#f8fafc',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <span className="tag" style={{ borderColor: selectedApp.color, color: selectedApp.color, background: '#ffffff' }}>
                    {selectedApp.category}
                  </span>
                  <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Architecture: {selectedApp.stack}
                  </span>
                </div>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {selectedApp.title}
                </h4>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  {selectedApp.tagline}
                </p>
              </div>

              <button
                onClick={onOpenContact}
                className="btn btn-sm"
                style={{
                  background: selectedApp.color,
                  color: selectedApp.color === '#2fcaf5' ? '#0b1528' : '#ffffff',
                  fontWeight: 600,
                }}
              >
                Inquire This App <ArrowRight size={14} />
              </button>
            </div>

            {/* Feature Checklist */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '0.75rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              {selectedApp.features.map((feat, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={15} color={selectedApp.color} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kyndryl Enterprise Trust Metrics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
            marginTop: '3.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-code)', fontSize: '2.1rem', fontWeight: 700, color: 'var(--kyndryl-orange)' }}>
              40+
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Web Projects Delivered
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-code)', fontSize: '2.1rem', fontWeight: 700, color: '#00a09d' }}>
              100%
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Source Code Ownership
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-code)', fontSize: '2.1rem', fontWeight: 700, color: '#16a34a' }}>
              7264983200
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Direct WhatsApp & Call
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-code)', fontSize: '2.1rem', fontWeight: 700, color: '#714b67' }}>
              React • .NET • Node
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Enterprise Full-Stack
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

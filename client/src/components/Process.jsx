import React from 'react';
import { Compass, PenTool, Code, CheckCircle, Rocket, ShieldCheck } from 'lucide-react';

const processSteps = [
  {
    step: '01',
    icon: <Compass size={22} color="#2fcaf5" />,
    title: 'Discovery & Schema Blueprint',
    desc: 'We analyze your target business workflows, map relational data schemas, and architect a comprehensive milestone timeline.',
    deliverable: 'Technical Specification & Wireframe Flows',
    theme: 'kyndryl-card',
  },
  {
    step: '02',
    icon: <PenTool size={22} color="#714b67" />,
    title: 'Responsive UI/UX & Design System',
    desc: 'We design high-fidelity interactive component systems with crisp typography, fluid micro-interactions, and mobile responsiveness.',
    deliverable: 'Figma Design System & Clickable Prototype',
    theme: 'odoo-card',
  },
  {
    step: '03',
    icon: <Code size={22} color="#00a09d" />,
    title: 'Agile Full-Stack Sprints',
    desc: 'We code with modular React components and Express or .NET Core REST APIs. You receive weekly live staging preview links and sprint demos.',
    deliverable: 'Weekly Live Staging Demos & Progress Commits',
    theme: 'teal-card',
  },
  {
    step: '04',
    icon: <CheckCircle size={22} color="#10b981" />,
    title: 'QA, Speed & Security Audit',
    desc: 'Cross-browser stress testing, automated API integration suites, Lighthouse Core Web Vitals optimization, and vulnerability sanitization.',
    deliverable: '100/100 Lighthouse Score & Security Audit Bill',
    theme: 'glass-card',
  },
  {
    step: '05',
    icon: <Rocket size={22} color="#d97706" />,
    title: 'Deployment & 30-Day Warranty',
    desc: 'Zero-downtime production launch, DNS setup, SSL certificates, monitoring dashboards, and 100% intellectual property source code handover.',
    deliverable: 'Production Deployment & Git Repository Transfer',
    theme: 'kyndryl-card',
  },
];

const Process = () => {
  return (
    <section id="process" className="section" style={{ position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            <Rocket size={13} /> Predictable Delivery Methodology
          </div>
          <h2 className="section-title">
            Our 5-Step <span style={{ color: 'var(--kyndryl-orange)' }}>Engineering Methodology</span>
          </h2>
          <p className="section-subtitle">
            No unexpected delays, no technical debt. We leverage transparent agile sprints
            so you always know the exact status of your web project.
          </p>
        </div>

        {/* Process Cards Grid (Light Theme) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', position: 'relative' }}>
          {processSteps.map((item) => (
            <div
              key={item.step}
              className={`glass-card ${item.theme}`}
              style={{
                padding: '1.75rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                background: '#ffffff',
              }}
            >
              <div>
                {/* Step Number & Icon */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-sm)',
                      background: '#f8fafc',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-code)',
                      fontSize: '1.6rem',
                      fontWeight: 700,
                      color: 'rgba(15, 23, 42, 0.15)',
                    }}
                  >
                    {item.step}
                  </span>
                </div>

                {/* Title & Desc */}
                <h3 style={{ fontSize: '1.18rem', fontWeight: 600, marginBottom: '0.65rem', color: 'var(--text-primary)' }}>{item.title}</h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {item.desc}
                </p>
              </div>

              {/* Deliverable Badge */}
              <div
                style={{
                  paddingTop: '0.85rem',
                  borderTop: '1px solid var(--border-subtle)',
                  fontSize: '0.78rem',
                  color: '#008280',
                  fontWeight: 600,
                  fontFamily: 'var(--font-code)',
                }}
              >
                ✦ {item.deliverable}
              </div>
            </div>
          ))}
        </div>

        {/* Guarantees Box (Kyndryl Enterprise Assurance, Light Theme) */}
        <div
          className="glass-card"
          style={{
            marginTop: '3.5rem',
            padding: '2rem',
            background: '#ffffff',
            border: '1px solid var(--border-subtle)',
            borderTop: '2px solid var(--kyndryl-orange)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShieldCheck size={28} color="#00a09d" />
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.98rem', color: 'var(--text-primary)' }}>Non-Disclosure Agreement (NDA)</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Strict confidentiality before discovery</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Rocket size={28} color="var(--kyndryl-orange)" />
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.98rem', color: 'var(--text-primary)' }}>30-Day Post-Launch Warranty</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Bug fixes & performance tuning included</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CheckCircle size={28} color="#714b67" />
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.98rem', color: 'var(--text-primary)' }}>100% Code & IP Ownership</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Clean Git repo handed over to you</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;

import React, { useState } from 'react';
import {
  Code2,
  Server,
  Database,
  Cloud,
  Check,
  X,
  Layers,
  Cpu,
  Shield,
  Zap,
} from 'lucide-react';

const TechStack = ({ techStack }) => {
  const [activeTab, setActiveTab] = useState('frontend');

  const tabs = [
    { id: 'frontend', label: 'Frontend Engine (React)', icon: <Code2 size={15} /> },
    { id: 'backend', label: 'Backend APIs (.NET & Node)', icon: <Server size={15} /> },
    { id: 'databases', label: 'Databases & Schemas', icon: <Database size={15} /> },
    { id: 'cloudDevops', label: 'Cloud Infrastructure', icon: <Cloud size={15} /> },
  ];

  const comparisonRows = [
    {
      feature: 'Page Speed & Lighthouse Score',
      techeasy: '98 - 100/100 (Instant sub-second load times)',
      traditional: '35 - 60/100 (Heavy plugin/theme overhead)',
    },
    {
      feature: 'Custom Business Logic & Workflows',
      techeasy: '100% Tailored to your exact business rules',
      traditional: 'Constrained by generic plugin limitations',
    },
    {
      feature: 'Backend Engine Choices',
      techeasy: 'High-speed Node/Express or Enterprise .NET Core C#',
      traditional: 'Rigid PHP CMS runtime with plugin bloat',
    },
    {
      feature: 'Security & Vulnerability Exposure',
      techeasy: 'Hardened REST APIs, strict JWT & sanitized SQL/NoSQL',
      traditional: 'Frequent security alerts from third-party plugins',
    },
    {
      feature: 'Full IP & Source Code Ownership',
      techeasy: '100% Full ownership with clean modular Git repository',
      traditional: 'Locked into proprietary platforms / CMS themes',
    },
  ];

  return (
    <section id="tech-stack" className="section" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Cpu size={13} /> Battle-Tested Engineering Stack
          </div>
          <h2 className="section-title">
            Engineered with <span style={{ color: 'var(--kyndryl-orange)' }}>React, Express, Node & .NET Core</span>
          </h2>
          <p className="section-subtitle">
            We build exclusively on modern, high-throughput technologies.
            Pairing React interfaces with Node.js/Express or enterprise ASP.NET Core ensures speed,
            security, and long-term scalability.
          </p>
        </div>

        {/* Tab Selectors (Odoo / Kyndryl Style) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.65rem',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
          }}
        >
          {tabs.map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  border: '1px solid',
                  borderColor: isActive ? 'var(--kyndryl-orange)' : 'var(--border-subtle)',
                  background: isActive ? 'rgba(47, 202, 245, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                  color: isActive ? '#2fcaf5' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {t.icon}
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tech Details Grid */}
        <div
          className="glass-card kyndryl-card"
          style={{
            padding: '2.25rem',
            marginBottom: '3.5rem',
            background: '#111624',
          }}
        >
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <div className="tag tag-orange" style={{ marginBottom: '0.85rem' }}>
                {tabs.find((t) => t.id === activeTab)?.label}
              </div>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '0.85rem' }}>
                {activeTab === 'frontend' && 'Snappy Reactive Interfaces with React.js'}
                {activeTab === 'backend' && 'High-Performance APIs with Node.js, Express & .NET Core'}
                {activeTab === 'databases' && 'Relational PostgreSQL, SQL Server & MongoDB'}
                {activeTab === 'cloudDevops' && 'Cloud-Native Deployments with Docker & VPS'}
              </h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                {activeTab === 'frontend' &&
                  'React delivers instant, zero-flicker transitions and modular UI components that scale seamlessly from simple landing pages to data-intensive business consoles.'}
                {activeTab === 'backend' &&
                  'We build high-throughput backends using Node.js & Express for real-time web applications, or enterprise ASP.NET Core with C# for strong data typing, Entity Framework ORM, and enterprise-grade reliability.'}
                {activeTab === 'databases' &&
                  'We match your project to the ideal database: PostgreSQL & SQL Server (MSSQL) for transactional business integrity, and MongoDB for flexible document collections.'}
                {activeTab === 'cloudDevops' &&
                  'Clean automated deployments using Docker containers, environment variable security, and optimized reverse proxies on Linux or Windows VPS.'}
              </p>
            </div>

            {/* List of Tools in this category */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {(techStack?.[activeTab] || []).map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '0.85rem 1.15rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#ffffff' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'right', fontFamily: 'var(--font-code)' }}>
                    {item.role}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Table (Kyndryl Enterprise Style) */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <h3 style={{ fontSize: '1.65rem', marginBottom: '0.35rem' }}>
            Why Custom Full-Stack Code Beats Generic Builders
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Compare our bespoke React + Node / .NET Core engineering against off-the-shelf templates
          </p>
        </div>

        <div
          className="glass-card"
          style={{
            padding: '1.25rem',
            overflowX: 'auto',
            background: '#111624',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <th style={{ padding: '0.85rem', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', fontFamily: 'var(--font-code)' }}>
                  Capability / Factor
                </th>
                <th style={{ padding: '0.85rem', color: 'var(--kyndryl-orange)', fontSize: '0.9rem', fontWeight: 700, fontFamily: 'var(--font-code)' }}>
                  ⚡ Tech Easy Custom (React + Express / .NET Core)
                </th>
                <th style={{ padding: '0.85rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-code)' }}>
                  Standard Templates / WordPress
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    background: idx % 2 === 0 ? 'rgba(255, 255, 255, 0.01)' : 'transparent',
                  }}
                >
                  <td style={{ padding: '0.95rem 0.85rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                    {row.feature}
                  </td>
                  <td style={{ padding: '0.95rem 0.85rem', fontSize: '0.85rem', color: '#00a09d', fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <Check size={15} color="#00a09d" />
                      <span>{row.techeasy}</span>
                    </div>
                  </td>
                  <td style={{ padding: '0.95rem 0.85rem', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <X size={15} color="#ef4444" />
                      <span>{row.traditional}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TechStack;

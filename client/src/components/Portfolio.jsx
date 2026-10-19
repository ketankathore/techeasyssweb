import React, { useState } from 'react';
import {
  ExternalLink,
  Star,
  CheckCircle2,
  TrendingUp,
  X,
  Code2,
  Layers,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const Portfolio = ({ portfolio = [] }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = [
    'All',
    'Internal Tools & ERP',
    'Education & Training',
    'Healthcare & Portals',
    'E-Commerce',
    'Corporate Websites',
  ];

  const filteredProjects =
    activeCategory === 'All'
      ? portfolio
      : portfolio.filter(
          (p) =>
            p.category === activeCategory ||
            p.categoryLabel.toLowerCase().includes(activeCategory.toLowerCase())
        );

  const cardBorderMap = {
    1: 'kyndryl-card',
    2: 'odoo-card',
    3: 'teal-card',
    4: 'kyndryl-card',
  };

  return (
    <section id="portfolio" className="section" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={13} /> Project Showcase & Case Studies
          </div>
          <h2 className="section-title">
            Featured <span style={{ color: 'var(--kyndryl-orange)' }}>Web Applications & Portals</span>
          </h2>
          <p className="section-subtitle">
            Explore live systems engineered with React.js, Node.js, Express, and .NET Core.
            Structured with Kyndryl-standard enterprise architecture and Odoo-inspired business workflows.
          </p>
        </div>

        {/* Category Filters (Odoo Modular Pill Style) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.45rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  border: '1px solid',
                  borderColor: isActive ? 'var(--kyndryl-orange)' : 'var(--border-subtle)',
                  background: isActive ? 'rgba(47, 202, 245, 0.12)' : '#ffffff',
                  color: isActive ? '#0284c7' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid (Kyndryl Structured Modular Cards) */}
        <div className="grid-2">
          {filteredProjects.map((project, idx) => {
            const cardTheme = cardBorderMap[project.id] || (idx % 2 === 0 ? 'kyndryl-card' : 'odoo-card');
            return (
              <div
                key={project.id}
                className={`glass-card ${cardTheme}`}
                style={{
                  padding: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  background: '#ffffff',
                }}
              >
                {/* Screen Mockup Top Banner (Light Theme) */}
                <div
                  style={{
                    height: '185px',
                    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                    borderBottom: '1px solid var(--border-subtle)',
                    position: 'relative',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    overflow: 'hidden',
                  }}
                >
                  {/* Window Controls & Category Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#ff3e00' }} />
                      <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#f59e0b' }} />
                      <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#10b981' }} />
                    </div>
                    <span className="tag tag-orange" style={{ fontSize: '0.72rem' }}>
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Project Title & Tagline */}
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                      {project.title}
                    </h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                      {project.tagline}
                    </div>
                  </div>

                  {/* Key Metrics Inside Mockup (IBM Plex Mono) */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      position: 'relative',
                      zIndex: 1,
                      background: '#ffffff',
                      padding: '0.45rem 0.75rem',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--border-subtle)',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                      flexWrap: 'wrap',
                    }}
                  >
                    {project.metrics.map((m, mIdx) => (
                      <div key={mIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <TrendingUp size={12} color="#00a09d" />
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{m.label}:</span>
                        <strong style={{ fontSize: '0.78rem', color: 'var(--text-primary)', fontFamily: 'var(--font-code)' }}>{m.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.15rem' }}>
                      {project.summary}
                    </p>

                    {/* Highlights */}
                    <div style={{ marginBottom: '1.25rem' }}>
                      <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.5rem', fontFamily: 'var(--font-code)' }}>
                        Delivered Business Capabilities:
                      </div>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {project.features.slice(0, 3).map((feat, fIdx) => (
                          <li key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                            <CheckCircle2 size={14} color="#00a09d" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tech Stack & Action */}
                  <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                      {project.tech.map((t) => (
                        <span key={t} className="tag" style={{ fontSize: '0.72rem' }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: '#d97706' }}>
                        <Star size={13} fill="#f59e0b" color="#f59e0b" />
                        <strong style={{ fontFamily: 'var(--font-code)' }}>{project.rating}</strong>
                        <span style={{ color: 'var(--text-muted)', marginLeft: '0.25rem' }}>{project.client}</span>
                      </div>

                      <button
                        onClick={() => setActiveModalProject(project)}
                        className="btn btn-secondary btn-sm"
                      >
                        Architecture View <ExternalLink size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Architecture Breakdown */}
        {activeModalProject && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(8px)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.25rem',
            }}
            onClick={() => setActiveModalProject(null)}
          >
            <div
              className="glass-card kyndryl-card"
              style={{
                maxWidth: '700px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '2.25rem',
                position: 'relative',
                background: '#ffffff',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.25)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveModalProject(null)}
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  background: '#f1f5f9',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                }}
              >
                <X size={16} />
              </button>

              <div className="tag tag-orange" style={{ marginBottom: '0.5rem' }}>
                {activeModalProject.categoryLabel}
              </div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>{activeModalProject.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '1.25rem' }}>
                {activeModalProject.tagline}
              </p>

              {/* Metrics Matrix */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                  background: 'rgba(47, 202, 245, 0.08)',
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(47, 202, 245, 0.25)',
                }}
              >
                {activeModalProject.metrics.map((m, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--kyndryl-orange)', fontFamily: 'var(--font-code)' }}>{m.value}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{m.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Project Architecture Summary</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {activeModalProject.summary}
                </p>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Delivered Capabilities</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {activeModalProject.features.map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <CheckCircle2 size={15} color="#00a09d" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Technology Stack</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {activeModalProject.tech.map((t) => (
                    <span key={t} className="tag tag-teal">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <a
                  href={`https://wa.me/917264983200?text=Hello%20TechEasy,%20I%20am%20interested%20in%20a%20project%20similar%20to%20${encodeURIComponent(activeModalProject.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm"
                >
                  Discuss Similar Project
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;

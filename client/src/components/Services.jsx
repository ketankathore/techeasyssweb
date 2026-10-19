import React, { useState } from 'react';
import {
  AppWindow,
  Layout,
  ShoppingBag,
  Sparkles,
  Briefcase,
  Server,
  ArrowRight,
  CheckCircle2,
  Clock,
  Layers,
  Cpu,
} from 'lucide-react';

const iconMap = {
  AppWindow: <AppWindow size={20} color="#00a09d" />,
  Layout: <Layout size={20} color="#2563eb" />,
  ShoppingBag: <ShoppingBag size={20} color="#2fcaf5" />,
  Sparkles: <Sparkles size={20} color="#10b981" />,
  Briefcase: <Briefcase size={20} color="#714b67" />,
  Server: <Server size={20} color="#f59e0b" />,
};

const cardThemeMap = {
  'custom-web-apps': 'teal-card',
  'business-websites': 'glass-card',
  'ecommerce-portals': 'kyndryl-card',
  'management-systems': 'odoo-card',
  'api-backend': 'kyndryl-card',
  'redesign-maintenance': 'glass-card',
};

const Services = ({ services = [], onSelectCategoryForEstimate }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filterTabs = [
    'All',
    'Full-Stack Web App',
    'Websites',
    'E-Commerce',
    'Enterprise / Internal Tools',
    'Backend & APIs',
  ];

  const filteredServices =
    selectedFilter === 'All'
      ? services
      : services.filter((s) => s.category === selectedFilter);

  return (
    <section id="services" className="section" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header (Kyndryl Practice Style) */}
        <div className="section-header">
          <div className="section-badge">
            <Layers size={13} /> Application Services & Practices
          </div>
          <h2 className="section-title">
            Tailored Development Across <span style={{ color: 'var(--kyndryl-orange)' }}>Every Industry Domain</span>
          </h2>
          <p className="section-subtitle">
            Drawing inspiration from modern enterprise application architectures and Odoo's modular business apps.
            We engineer custom software systems designed specifically for your operational workflow.
          </p>
        </div>

        {/* Filter Pills (Odoo Style) */}
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
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFilter(tab)}
              style={{
                padding: '0.42rem 0.95rem',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: '1px solid',
                borderColor: selectedFilter === tab ? 'var(--kyndryl-orange)' : 'var(--border-subtle)',
                background: selectedFilter === tab ? 'rgba(47, 202, 245, 0.12)' : '#ffffff',
                color: selectedFilter === tab ? '#0284c7' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Services Grid (Kyndryl Structured Cards) */}
        <div className="grid-3">
          {filteredServices.map((service) => {
            const cardTheme = cardThemeMap[service.id] || 'glass-card';
            return (
              <div
                key={service.id}
                className={`glass-card ${cardTheme}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: '#ffffff',
                }}
              >
                <div>
                  {/* Header with Icon & Category */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: 'var(--radius-sm)',
                        background: '#f8fafc',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {iconMap[service.icon] || <AppWindow size={20} color="#00a09d" />}
                    </div>
                    <span className="tag tag-orange">{service.badge}</span>
                  </div>

                  {/* Title & Desc in IBM Plex Sans */}
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.55rem', color: 'var(--text-primary)' }}>{service.title}</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                    {service.shortDesc}
                  </p>

                  {/* Key Capabilities List */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.55rem' }}>
                      Delivered Modules & Rules:
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                      {service.features.map((feat, idx) => (
                        <li
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.45rem',
                            fontSize: '0.825rem',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          <CheckCircle2 size={14} color="#2fcaf5" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer with Delivery Time and Tech Badges */}
                <div
                  style={{
                    paddingTop: '0.85rem',
                    borderTop: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'var(--font-code)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      <Clock size={12} /> {service.deliveryTime}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    {service.tech.map((t) => (
                      <span
                        key={t}
                        className="tag"
                        style={{
                          fontSize: '0.7rem',
                          padding: '0.18rem 0.45rem',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectCategoryForEstimate(service.id)}
                    className="btn btn-secondary"
                    style={{ width: '100%', padding: '0.55rem 0.9rem', fontSize: '0.85rem' }}
                  >
                    Plan Project Scope <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;

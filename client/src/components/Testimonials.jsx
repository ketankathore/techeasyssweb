import React from 'react';
import { Star, Quote, MessageSquare } from 'lucide-react';

const Testimonials = ({ testimonials = [] }) => {
  const cardThemes = ['kyndryl-card', 'odoo-card', 'teal-card'];

  return (
    <section className="section" style={{ position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            <MessageSquare size={13} /> Client Endorsements
          </div>
          <h2 className="section-title">
            Trusted by Business Owners & <span style={{ color: 'var(--kyndryl-orange)' }}>Tech Leaders</span>
          </h2>
          <p className="section-subtitle">
            Read what our clients say about our full-stack engineering velocity,
            communication, and technical execution.
          </p>
        </div>

        {/* Testimonials Grid (Kyndryl Structured Cards, Light Theme) */}
        <div className="grid-3">
          {testimonials.map((t, idx) => {
            const cardTheme = cardThemes[idx % cardThemes.length];
            return (
              <div
                key={t.id}
                className={`glass-card ${cardTheme}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '2rem',
                  background: '#ffffff',
                }}
              >
                <div>
                  {/* Star rating & quote icon */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                    <Quote size={22} color="rgba(0, 0, 0, 0.12)" />
                  </div>

                  {/* Quote Text */}
                  <p
                    style={{
                      fontSize: '0.95rem',
                      color: 'var(--text-primary)',
                      lineHeight: 1.65,
                      fontStyle: 'italic',
                      marginBottom: '1.75rem',
                    }}
                  >
                    "{t.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div
                  style={{
                    paddingTop: '1.25rem',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                      {t.author}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {t.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--kyndryl-orange)', marginTop: '0.2rem', fontFamily: 'var(--font-code)' }}>
                      {t.location}
                    </div>
                  </div>

                  <span className="tag tag-orange" style={{ fontSize: '0.72rem' }}>
                    {t.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

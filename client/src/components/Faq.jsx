import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

const Faq = ({ faqs = [] }) => {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="section" style={{ position: 'relative' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            <HelpCircle size={13} /> Common Queries
          </div>
          <h2 className="section-title">
            Frequently Asked <span style={{ color: 'var(--kyndryl-orange)' }}>Questions</span>
          </h2>
          <p className="section-subtitle">
            Answers to common questions about our custom web application, .NET Core APIs, and website development process.
          </p>
        </div>

        {/* Accordion List (Kyndryl Crisp Clean Style, Light Theme) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '1.25rem 1.6rem',
                  borderTop: `1px solid ${isOpen ? 'rgba(47, 202, 245, 0.4)' : 'var(--border-subtle)'}`,
                  borderRight: `1px solid ${isOpen ? 'rgba(47, 202, 245, 0.4)' : 'var(--border-subtle)'}`,
                  borderBottom: `1px solid ${isOpen ? 'rgba(47, 202, 245, 0.4)' : 'var(--border-subtle)'}`,
                  borderLeft: isOpen ? '3px solid var(--kyndryl-orange)' : '1px solid var(--border-subtle)',
                  background: isOpen ? '#f8fafc' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: isOpen ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                }}
                onClick={() => toggle(idx)}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      color: isOpen ? 'var(--kyndryl-orange)' : 'var(--text-primary)',
                      margin: 0,
                    }}
                  >
                    {faq.q}
                  </h3>
                  <div
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      color: isOpen ? 'var(--kyndryl-orange)' : 'var(--text-muted)',
                      flexShrink: 0,
                    }}
                  >
                    <ChevronDown size={18} />
                  </div>
                </div>

                {isOpen && (
                  <div
                    style={{
                      marginTop: '0.85rem',
                      paddingTop: '0.85rem',
                      borderTop: '1px solid var(--border-subtle)',
                      color: 'var(--text-secondary)',
                      fontSize: '0.92rem',
                      lineHeight: 1.65,
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;

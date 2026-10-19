import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

const Footer = ({ serverStatus }) => {
  return (
    <footer
      style={{
        background: '#ffffff',
        borderTop: '1px solid var(--border-subtle)',
        padding: '4.5rem 0 2rem 0',
        position: 'relative',
      }}
    >
      {/* Kyndryl top thin accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #2fcaf5 0%, #714b67 50%, #00a09d 100%)',
        }}
      />

      <div className="container">
        {/* Top Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) repeat(3, minmax(0, 1fr))',
            gap: '2.5rem',
            marginBottom: '3.5rem',
          }}
          className="footer-grid"
        >
          {/* Col 1: Brand & Contact Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
              <img
                src="/logo-icon.png"
                alt="TechEasy"
                style={{ width: '40px', height: '40px', objectFit: 'contain', filter: 'drop-shadow(0 2px 8px rgba(47, 202, 245, 0.45))' }}
              />
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Tech<span style={{ color: 'var(--kyndryl-orange)' }}>Easy</span>
              </span>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem', maxWidth: '350px' }}>
              Enterprise-grade web & application development studio. We build custom web applications,
              ERP business systems, and fast websites using React.js, Node.js, Express, and .NET / .NET Core.
            </p>

            {/* Direct Contact Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={14} color="var(--kyndryl-orange)" />
                <a href="mailto:techeasyss21@gmail.com" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                  techeasyss21@gmail.com
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={14} color="#16a34a" />
                <a href="tel:7264983200" style={{ color: 'var(--text-primary)', fontWeight: 600, fontFamily: 'var(--font-code)' }}>
                  7264983200
                </a>
                <a
                  href="https://wa.me/917264983200"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#16a34a', fontSize: '0.75rem', marginLeft: '0.25rem', fontWeight: 600 }}
                >
                  (WhatsApp Chat)
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <MapPin size={14} color="#714b67" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>KCE Park, Kanalda Road, Jalgaon 425001, Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <div style={{ fontSize: '0.825rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.15rem', fontFamily: 'var(--font-code)' }}>
              Categories We Build
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <li><a href="#services">Custom Business Web Apps</a></li>
              <li><a href="#services">Company & Corporate Websites</a></li>
              <li><a href="#services">Custom E-Commerce Catalogs</a></li>
              <li><a href="#services">ERP & Inventory Portals</a></li>
              <li><a href="#services">Clinic & Appointment Booking</a></li>
              <li><a href="#services">.NET & Node Backend APIs</a></li>
            </ul>
          </div>

          {/* Col 3: Architecture */}
          <div>
            <div style={{ fontSize: '0.825rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.15rem', fontFamily: 'var(--font-code)' }}>
              Tech Architecture
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <li>React.js UI Components</li>
              <li>.NET & .NET Core (C#)</li>
              <li>Node.js & Express REST APIs</li>
              <li>PostgreSQL & SQL Server</li>
              <li>MongoDB Data Collections</li>
              <li>Direct Nodemailer Integration</li>
            </ul>
          </div>

          {/* Col 4: Studio Connect */}
          <div>
            <div style={{ fontSize: '0.825rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.15rem', fontFamily: 'var(--font-code)' }}>
              Quick Direct Connect
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <a
                href="https://wa.me/917264983200?text=Hello%20TechEasy,%20I%20want%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-sm"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <MessageCircle size={15} /> WhatsApp (7264983200)
              </a>

              <a
                href="mailto:techeasyss21@gmail.com?subject=Project Inquiry for TechEasy"
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Mail size={14} /> Send Email Directly
              </a>
            </div>

            {/* Server status pill */}
            <div style={{ padding: '0.65rem 0.85rem', background: '#f8fafc', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#008280', fontWeight: 600, fontFamily: 'var(--font-code)' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00a09d', display: 'inline-block' }} />
                Express API Server: {serverStatus === 'online' ? 'Connected (Port 5000)' : 'Online'}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.825rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} TechEasy. Built with React.js, Node.js, Express & .NET Core.
            KCE Park, Kanalda Road, Jalgaon 425001.
          </div>

          <div style={{ display: 'flex', gap: '1.25rem', fontFamily: 'var(--font-code)', fontSize: '0.75rem' }}>
            <span>Full Source Code Ownership</span>
            <span>NDA Protected</span>
            <span>Direct WhatsApp Support</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;

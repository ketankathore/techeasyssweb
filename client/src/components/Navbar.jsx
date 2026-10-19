import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, MessageCircle, Phone, Layers, ExternalLink } from 'lucide-react';

const Navbar = ({ onOpenEstimator, onOpenContact, serverStatus }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#portfolio' },
    { name: 'Scope Planner', href: '#estimator' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.2s ease',
        background: isScrolled
          ? 'rgba(255, 255, 255, 0.96)'
          : 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(16px)',
        borderBottom: isScrolled
          ? '1px solid var(--border-subtle)'
          : '1px solid transparent',
        boxShadow: isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.05)' : 'none',
      }}
    >
      {/* Top modern cyan accent indicator */}
      <div style={{ height: '3px', background: 'linear-gradient(90deg, #2fcaf5 0%, #714b67 50%, #00a09d 100%)' }} />

      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
        {/* Brand Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <img
            src="/logo-icon.png"
            alt="TechEasy Logo"
            style={{ width: '42px', height: '42px', objectFit: 'contain', filter: 'drop-shadow(0 2px 8px rgba(47, 202, 245, 0.45))' }}
          />
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <span style={{ color: 'var(--text-primary)' }}>Tech</span>
              <span style={{ color: 'var(--kyndryl-orange)' }}>Easy</span>
            </div>
            <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
              Custom Web & Application Studio
            </div>
          </div>
        </a>

        {/* Desktop Nav Links (Clean Light Style) */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '1.75rem' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                fontSize: '0.88rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--kyndryl-orange)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons & Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Quick WhatsApp Button */}
          <a
            href="https://wa.me/917264983200?text=Hi%20TechEasy,%20I%20want%20to%20discuss%20a%20web%20development%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-sm"
            style={{ display: 'none', textDecoration: 'none' }}
            title="Chat directly on WhatsApp"
            id="nav-whatsapp-btn"
          >
            <MessageCircle size={14} /> WhatsApp
          </a>

          {/* Quick Call Link */}
          <a
            href="tel:7264983200"
            className="btn btn-secondary btn-sm"
            style={{ display: 'none' }}
            title="Call TechEasy directly"
            id="nav-phone-btn"
          >
            <Phone size={13} color="var(--kyndryl-orange)" /> 7264983200
          </a>

          {/* Project CTA */}
          <button
            onClick={onOpenContact}
            className="btn btn-primary btn-sm"
            style={{ padding: '0.5rem 1rem' }}
          >
            Inquire Brief <ArrowRight size={14} />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f1f5f9',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              padding: '0.4rem',
              cursor: 'pointer',
            }}
            className="mobile-toggle"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            background: '#ffffff',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                padding: '0.4rem 0',
                borderBottom: '1px solid #f1f5f9',
              }}
            >
              {link.name}
            </a>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
            <a
              href="https://wa.me/917264983200?text=Hi%20TechEasy,%20I%20want%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <MessageCircle size={15} /> Chat on WhatsApp (7264983200)
            </a>
            <a href="tel:7264983200" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
              <Phone size={14} color="var(--kyndryl-orange)" /> Call: 7264983200
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Start Project Brief
            </button>
          </div>
        </div>
      )}

      {/* CSS helper for responsive desktop nav */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          #nav-whatsapp-btn { display: inline-flex !important; }
          #nav-phone-btn { display: inline-flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;

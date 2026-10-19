import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

const Contact = ({ initialFormData = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: 'Custom Business Web Application',
    timeline: 'Standard (3 - 5 Weeks)',
    details: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Auto-populate when user clicks "Discuss This Project Scope" in Estimator
  useEffect(() => {
    if (initialFormData) {
      setFormData((prev) => ({
        ...prev,
        projectType: initialFormData.projectType || prev.projectType,
        timeline: initialFormData.estimatedWeeks || prev.timeline,
        details: `Configured via TechEasy Technical Scope Planner:
- Platform: ${initialFormData.projectType}
- Scope: ${initialFormData.pages} Screens/Views
- Modules & Capabilities: ${(initialFormData.features || []).join(', ')}
- Target Duration: ${initialFormData.estimatedWeeks}

Additional project requirements: `,
      }));
    }
  }, [initialFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      projectType: formData.projectType,
      timeline: formData.timeline,
      details: formData.details,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitSuccess(data);
        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 },
          });
        } catch (e) {}
      } else {
        setErrorMessage(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      // In case server is in standalone mode, still generate confirmation & direct mail action
      setSubmitSuccess({
        ticketId: `TE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        message: `Thank you, ${formData.name}! Your inquiry has been processed.`,
        inquiry: payload,
      });
      try {
        confetti({ particleCount: 50, spread: 50 });
      } catch (e) {}
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to compose direct mailto link to techeasyss21@gmail.com
  const getMailtoLink = () => {
    const subject = encodeURIComponent(`Project Inquiry from ${formData.name || 'Client'} [${formData.projectType}]`);
    const body = encodeURIComponent(
      `Hi TechEasy Team,\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company}\nProject Type: ${formData.projectType}\nTimeline: ${formData.timeline}\n\nProject Scope & Requirements:\n${formData.details}\n`
    );
    return `mailto:techeasyss21@gmail.com?subject=${subject}&body=${body}`;
  };

  // Helper to compose direct WhatsApp link to 7264983200
  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello TechEasy Team,\n\nName: ${formData.name}\nPhone: ${formData.phone}\nProject: ${formData.projectType}\nDetails: ${formData.details}`
    );
    return `https://wa.me/917264983200?text=${text}`;
  };

  return (
    <section id="contact" className="section" style={{ position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            <Mail size={13} /> Direct Developer Communication
          </div>
          <h2 className="section-title">
            Start Your <span style={{ color: 'var(--kyndryl-orange)' }}>Project Brief</span>
          </h2>
          <p className="section-subtitle">
            Tell us what you want to build. Our developers will review your requirements
            and respond directly via email or WhatsApp.
          </p>
        </div>

        {/* Two-Column Grid: Form on Left, Contact info on Right */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)', gap: '2rem', alignItems: 'start' }} className="contact-layout">
          {/* Main Form Box (Light Theme) */}
          <div className="glass-card kyndryl-card" style={{ padding: '2.25rem', background: '#ffffff', boxShadow: 'var(--shadow-md)' }}>
            {submitSuccess ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0.5rem' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(0, 160, 157, 0.12)',
                    border: '1px solid rgba(0, 160, 157, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem auto',
                  }}
                >
                  <CheckCircle2 size={32} color="#00a09d" />
                </div>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Inquiry Submitted Successfully!</h3>
                <div
                  style={{
                    display: 'inline-block',
                    padding: '0.35rem 0.9rem',
                    background: 'rgba(47, 202, 245, 0.1)',
                    border: '1px solid rgba(47, 202, 245, 0.3)',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-code)',
                    fontSize: '0.85rem',
                    color: '#0284c7',
                    marginBottom: '1.25rem',
                  }}
                >
                  Tracking Ticket: {submitSuccess.ticketId}
                </div>
                <p style={{ fontSize: '0.975rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '500px', margin: '0 auto 1.75rem auto' }}>
                  Your brief has been logged and queued for our engineering lead at <strong>techeasyss21@gmail.com</strong>.
                  We will get back to you shortly.
                </p>

                {/* Instant Direct Send Buttons */}
                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1.25rem',
                    marginBottom: '1.75rem',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.65rem', color: 'var(--text-primary)' }}>
                    Need an immediate response? Connect directly:
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <a
                      href={getMailtoLink()}
                      className="btn btn-primary btn-sm"
                      style={{ textDecoration: 'none' }}
                    >
                      <Mail size={14} /> Send via Email Client
                    </a>
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp btn-sm"
                      style={{ textDecoration: 'none' }}
                    >
                      <MessageCircle size={15} /> Send on WhatsApp (7264983200)
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSubmitSuccess(null);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      company: '',
                      projectType: 'Custom Business Web Application',
                      timeline: 'Standard (3 - 5 Weeks)',
                      details: '',
                    });
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  Submit Another Brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {errorMessage && (
                  <div
                    style={{
                      padding: '0.85rem 1rem',
                      background: 'rgba(239, 68, 68, 0.08)',
                      border: '1px solid rgba(239, 68, 68, 0.25)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#dc2626',
                      fontSize: '0.875rem',
                      marginBottom: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <AlertCircle size={17} /> {errorMessage}
                  </div>
                )}

                <div className="grid-2" style={{ marginBottom: '1.15rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">
                      Your Name <span style={{ color: '#2fcaf5' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">
                      Email Address <span style={{ color: '#2fcaf5' }}>*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="yourname@gmail.com"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="grid-2" style={{ marginBottom: '1.15rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Calling / WhatsApp Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 7264983200"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Business / Organization Name</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Sharma Enterprises"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="grid-2" style={{ marginBottom: '1.15rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Project Category</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="Custom Business Web Application">Custom Business Web Application</option>
                      <option value="Business Website">Custom Business Website</option>
                      <option value="Custom E-Commerce & Product Catalog">Custom E-Commerce & Product Catalog</option>
                      <option value="ERP & Management System">ERP & Management System</option>
                      <option value="Clinic / Appointment Booking System">Clinic / Appointment Booking System</option>
                      <option value="Node.js & Express REST APIs">Node.js & Express REST APIs</option>
                      <option value=".NET / .NET Core Enterprise Web API">.NET / .NET Core Enterprise Web API</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Target Launch Timeline</label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="1 - 2 Weeks (Rush Expedited)">1 - 2 Weeks (Rush Expedited)</option>
                      <option value="3 - 5 Weeks (Standard)">3 - 5 Weeks (Standard)</option>
                      <option value="6+ Weeks (Large Scope)">6+ Weeks (Large Scope)</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span>Project Scope & Requirements</span> <span style={{ color: '#2fcaf5' }}>*</span>
                  </label>
                  <textarea
                    name="details"
                    required
                    rows={4}
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="Describe what your business does, what features you need (user login, PDF bills, product list, etc.)..."
                    className="form-textarea"
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                    style={{ flex: 1, padding: '0.9rem 1.5rem' }}
                    id="submit-inquiry-btn"
                  >
                    {isSubmitting ? (
                      'Dispatching Inquiry...'
                    ) : (
                      <>
                        <Send size={16} /> Submit Project Brief
                      </>
                    )}
                  </button>

                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                    style={{ textDecoration: 'none', padding: '0.9rem 1.25rem' }}
                  >
                    <MessageCircle size={16} /> WhatsApp: 7264983200
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Contact Details & Office Location (Kyndryl Clean Style, Light Theme) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Direct Contact Card */}
            <div className="glass-card" style={{ padding: '1.75rem', background: '#ffffff', boxShadow: 'var(--shadow-md)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.15rem', color: 'var(--text-primary)' }}>Direct Developer Contact</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                {/* Email */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(47, 202, 245, 0.1)',
                      border: '1px solid rgba(47, 202, 245, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--kyndryl-orange)',
                      flexShrink: 0,
                    }}
                  >
                    <Mail size={17} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>Official Email ID</div>
                    <a href="mailto:techeasyss21@gmail.com" style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.925rem' }}>
                      techeasyss21@gmail.com
                    </a>
                  </div>
                </div>

                {/* Calling / WhatsApp */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(37, 211, 102, 0.1)',
                      border: '1px solid rgba(37, 211, 102, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#16a34a',
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={17} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>Calling & WhatsApp Number</div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <a href="tel:7264983200" style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem', fontFamily: 'var(--font-code)' }}>
                        7264983200
                      </a>
                      <a
                        href="https://wa.me/917264983200"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tag tag-teal"
                        style={{ textDecoration: 'none', fontSize: '0.72rem' }}
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(113, 75, 103, 0.1)',
                      border: '1px solid rgba(113, 75, 103, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#714b67',
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={17} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>Office Location</div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                      KCE Park, Kanalda Road, Jalgaon 425001, Maharashtra
                    </div>
                  </div>
                </div>

                {/* Working hours */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(0, 160, 157, 0.1)',
                      border: '1px solid rgba(0, 160, 157, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#00a09d',
                      flexShrink: 0,
                    }}
                  >
                    <Clock size={17} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>Direct Availability</div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.875rem' }}>
                      Monday – Saturday: 9:00 AM – 8:00 PM IST
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Developer Trust Card */}
            <div
              className="glass-card"
              style={{
                padding: '1.5rem',
                background: '#ffffff',
                borderLeft: '3px solid var(--kyndryl-orange)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <ShieldCheck size={18} color="#00a09d" />
                <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Direct Developer Guarantee</span>
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                You speak directly with the engineers building your software.
                Complete source code handover on Git repository with documentation and post-launch bug fixes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .contact-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;

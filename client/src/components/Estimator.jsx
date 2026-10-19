import React, { useState, useEffect } from 'react';
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Clock,
  Layers,
  Code2,
  Calendar,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import { apiUrl } from '../utils/api';

const projectTypes = [
  { id: 'web-app', label: 'Custom Web Application', desc: 'Custom business logic, portals, multi-user operations' },
  { id: 'business-website', label: 'Custom Business Website', desc: 'Mobile-responsive showcase, fast loading, local SEO' },
  { id: 'ecommerce', label: 'E-Commerce & Product Catalog', desc: 'Product filtering, cart, WhatsApp order dispatch' },
  { id: 'management-erp', label: 'ERP & Management Portal', desc: 'Inventory, student/patient records, PDF billing' },
  { id: 'booking-system', label: 'Clinic / Appointment Booking', desc: 'Slot scheduling, OPD queues, patient history' },
  { id: 'api-backend', label: 'Backend API (.NET Core or Node.js)', desc: 'Enterprise REST services, microservices & cloud deploy' },
];

const availableFeatures = [
  { id: 'auth', label: 'User Login & Role Permissions (Admin/Staff)' },
  { id: 'admin', label: 'Comprehensive Admin Dashboard' },
  { id: 'pdf', label: 'Printable PDF Receipts, Bills & Reports' },
  { id: 'whatsapp', label: 'Direct WhatsApp & Email Alerts' },
  { id: 'database', label: 'Custom Database (Postgres / SQL Server / Mongo)' },
  { id: 'dotnet-backend', label: '.NET / .NET Core Enterprise API Architecture' },
  { id: 'export', label: 'Excel / CSV Import & Export Capabilities' },
  { id: 'seo', label: 'Semantic SEO Structure & Google Indexing' },
  { id: 'api', label: 'Third-Party REST API Integrations' },
];

const Estimator = ({ preselectedCategory, onLockEstimate }) => {
  const [projectType, setProjectType] = useState('web-app');
  const [pages, setPages] = useState('4-8');
  const [selectedFeatures, setSelectedFeatures] = useState(['auth', 'admin', 'pdf', 'whatsapp']);
  const [timeline, setTimeline] = useState('standard');
  const [estimateResult, setEstimateResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (preselectedCategory) {
      if (preselectedCategory === 'custom-web-apps') setProjectType('web-app');
      else if (preselectedCategory === 'business-websites') setProjectType('business-website');
      else if (preselectedCategory === 'ecommerce-portals') setProjectType('ecommerce');
      else if (preselectedCategory === 'management-systems') setProjectType('management-erp');
      else if (preselectedCategory === 'api-backend') setProjectType('api-backend');
    }
  }, [preselectedCategory]);

  const toggleFeature = (id) => {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter((item) => item !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  useEffect(() => {
    const fetchEstimate = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(apiUrl('/api/estimate'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            projectType,
            pages,
            features: selectedFeatures,
            timeline,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setEstimateResult(data.summary);
        }
      } catch (err) {
        // Fallback local calculations
        setEstimateResult({
          projectType,
          estimatedWeeks: '3 - 5 Weeks',
          recommendedStack: ['React.js (Vite)', 'Node.js / .NET Core API', 'PostgreSQL / SQL Server', 'Vanilla CSS'],
          sprints: [
            { phase: 'Sprint 1: Technical Discovery & Schema Architecture', duration: 'Week 1' },
            { phase: 'Sprint 2: Responsive React UI & Design System', duration: 'Week 2' },
            { phase: 'Sprint 3: Express / .NET Core APIs & Database Sync', duration: 'Week 3' },
            { phase: 'Sprint 4: Testing, Speed Audit & Production Launch', duration: 'Final Week' },
          ],
          deliverables: [
            'Full Source Code Git Repository',
            'Production Server & Domain Deployment',
            'Database Schemas & Automated Backup Setup',
            'Post-Launch Technical Support Warranty',
          ],
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEstimate();
  }, [projectType, pages, selectedFeatures, timeline]);

  const handleLockIn = () => {
    if (onLockEstimate && estimateResult) {
      const selectedTypeLabel = projectTypes.find((p) => p.id === projectType)?.label || projectType;
      const selectedFeatureLabels = selectedFeatures.map(
        (id) => availableFeatures.find((f) => f.id === id)?.label || id
      );

      onLockEstimate({
        projectType: selectedTypeLabel,
        estimatedWeeks: estimateResult.estimatedWeeks,
        pages,
        features: selectedFeatureLabels,
        timeline,
      });
    }
  };

  return (
    <section id="estimator" className="section" style={{ position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            <Calendar size={13} /> Project Scope & Timeline Estimator
          </div>
          <h2 className="section-title">
            Interactive <span style={{ color: 'var(--kyndryl-orange)' }}>Technical Scope Planner</span>
          </h2>
          <p className="section-subtitle">
            Configure your technical requirements to generate a development roadmap, sprint schedule,
            and recommended architecture. Zero pricing figures — strictly engineering specifications.
          </p>
        </div>

        {/* Two-Column Grid: Configurator on Left, Roadmap on Right */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)', gap: '2rem', alignItems: 'start' }} className="estimator-layout">
          {/* Configurator Box (Light Theme) */}
          <div className="glass-card" style={{ padding: '2rem', background: '#ffffff' }}>
            {/* Step 1: Project Type */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label className="form-label" style={{ marginBottom: '0.75rem' }}>
                <span>1. Select Platform / Project Category</span>
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.65rem' }}>
                {projectTypes.map((pt) => {
                  const active = projectType === pt.id;
                  return (
                    <div
                      key={pt.id}
                      onClick={() => setProjectType(pt.id)}
                      style={{
                        padding: '0.9rem',
                        borderRadius: 'var(--radius-sm)',
                        background: active ? 'rgba(47, 202, 245, 0.1)' : '#ffffff',
                        border: `1.5px solid ${active ? 'var(--kyndryl-orange)' : 'var(--border-subtle)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: active ? '0 2px 8px rgba(47,202,245,0.2)' : 'var(--shadow-sm)',
                      }}
                    >
                      <div style={{ fontWeight: 600, fontSize: '0.925rem', color: active ? '#0284c7' : 'var(--text-primary)', marginBottom: '0.2rem' }}>
                        {pt.label}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                        {pt.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Scope & Screens */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label className="form-label" style={{ marginBottom: '0.75rem' }}>
                <span>2. Estimated Number of Views / Screens</span>
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.65rem' }}>
                {['1-3', '4-8', '9-15', '16+'].map((pg) => {
                  const active = pages === pg;
                  return (
                    <button
                      key={pg}
                      type="button"
                      onClick={() => setPages(pg)}
                      style={{
                        padding: '0.7rem 0.4rem',
                        borderRadius: 'var(--radius-sm)',
                        background: active ? 'var(--kyndryl-orange)' : '#ffffff',
                        border: `1px solid ${active ? 'var(--kyndryl-orange)' : 'var(--border-subtle)'}`,
                        color: active ? '#0b1528' : 'var(--text-secondary)',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'center',
                        fontSize: '0.85rem',
                        transition: 'all 0.15s ease',
                        boxShadow: 'var(--shadow-sm)',
                      }}
                    >
                      {pg} Screens
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Technical Capabilities (NO PRICE TAGS) */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label className="form-label" style={{ marginBottom: '0.75rem' }}>
                <span>3. Key Technical Capabilities & Modules</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>Select all needed</span>
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.6rem' }}>
                {availableFeatures.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <div
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      style={{
                        padding: '0.7rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        background: isChecked ? 'rgba(47, 202, 245, 0.08)' : '#ffffff',
                        border: `1px solid ${isChecked ? 'var(--kyndryl-orange)' : 'var(--border-subtle)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '3px',
                          border: `1.5px solid ${isChecked ? 'var(--kyndryl-orange)' : '#cbd5e1'}`,
                          background: isChecked ? 'var(--kyndryl-orange)' : '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {isChecked && <Check size={12} color="#0b1528" />}
                      </div>
                      <span style={{ fontSize: '0.825rem', fontWeight: 500, color: isChecked ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                        {feat.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Pace */}
            <div>
              <label className="form-label" style={{ marginBottom: '0.45rem' }}>4. Development Pace</label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="form-select"
              >
                <option value="standard">Standard Sprint Pace (Complete QA & testing coverage)</option>
                <option value="rush">Fast Track Expedited Sprints</option>
              </select>
            </div>
          </div>

          {/* Output Architecture & Sprints Card (Kyndryl Card Style, Light Theme) */}
          <div
            className="glass-card kyndryl-card"
            style={{
              padding: '2rem',
              background: '#ffffff',
              position: 'sticky',
              top: '90px',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <span className="tag tag-orange" style={{ fontSize: '0.78rem' }}>
                Technical Roadmap
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>
                {isLoading ? 'Recalculating...' : 'Custom Planned'}
              </span>
            </div>

            {/* Estimated Timeline */}
            <div style={{ marginBottom: '1.5rem', textAlign: 'center', padding: '1.25rem', background: 'rgba(47, 202, 245, 0.08)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(47, 202, 245, 0.25)' }}>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)', marginBottom: '0.35rem', fontWeight: 600, fontFamily: 'var(--font-code)' }}>
                Estimated Development Duration
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.1rem',
                  fontWeight: 700,
                  color: 'var(--kyndryl-orange)',
                }}
              >
                {estimateResult ? estimateResult.estimatedWeeks : '3 - 5 Weeks'}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                Structured into weekly milestone deliveries
              </div>
            </div>

            {/* Recommended Stack */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Code2 size={15} color="var(--kyndryl-orange)" /> Recommended Architecture
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {(estimateResult?.recommendedStack || ['React.js', 'Express.js / .NET Core', 'Node.js', 'PostgreSQL']).map((item) => (
                  <span key={item} className="tag tag-teal" style={{ fontSize: '0.75rem' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Sprint Schedule */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Layers size={15} color="#00a09d" /> Sprint Milestones
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {(estimateResult?.sprints || []).map((m, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.78rem',
                      color: 'var(--text-secondary)',
                      padding: '0.4rem 0.65rem',
                      background: '#f8fafc',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <span>{m.phase}</span>
                    <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-code)' }}>{m.duration}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Lock in CTA */}
            <button
              onClick={handleLockIn}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem 1rem', fontSize: '0.95rem', color: "#ffffff" }}
              id="lock-estimate-btn"
            >
              Discuss This Project Scope <ArrowRight size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '0.85rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={14} color="#00a09d" /> 100% Source Code Handover • Direct WhatsApp Developer Support
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .estimator-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Estimator;

import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiPhone, FiBriefcase, FiDollarSign, FiCalendar } from 'react-icons/fi';
import { generateMockLeads } from './mockLeads';

const allLeads = generateMockLeads(32);

export default function LeadDetail() {
  const { id } = useParams();

  const lead = useMemo(() => {
    return allLeads.find((item) => item.id === id) || allLeads[0];
  }, [id]);

  return (
    <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <Link to="/leads" className="nx-flex nx-items-center nx-gap-2 nx-text-secondary" style={{ fontSize: 'var(--fs-sm)' }}>
          <FiArrowLeft size={14} /> Back to leads
        </Link>

        <span className="nx-badge nx-badge--neutral">{lead.status}</span>
      </div>

      <div className="nx-card" style={{ padding: 'var(--space-5)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          <div>
            <div className="nx-text-muted" style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Lead profile
            </div>
            <h2 style={{ margin: 'var(--space-2) 0 0', fontSize: 'var(--fs-2xl)' }}>{lead.name}</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontWeight: 600 }}>
            <span className="nx-text-muted">Score</span>
            <span className="nx-badge nx-badge--primary">{lead.score}/100</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-5)' }}>
          <InfoItem icon={<FiMail size={15} />} label="Email" value={lead.email} />
          <InfoItem icon={<FiPhone size={15} />} label="Source" value={lead.source} />
          <InfoItem icon={<FiBriefcase size={15} />} label="Company" value={lead.company} />
          <InfoItem icon={<FiDollarSign size={15} />} label="Potential revenue" value={`$${Number(lead.revenue || 0).toLocaleString()}`} />
          <InfoItem icon={<FiCalendar size={15} />} label="Created" value={lead.createdAt} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
        <div className="nx-card" style={{ padding: 'var(--space-4)' }}>
          <div className="nx-text-muted" style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Summary
          </div>
          <p style={{ margin: 'var(--space-3) 0 0', lineHeight: 1.7 }}>
            {lead.name} is a {lead.status.toLowerCase()} lead from {lead.company}. They were sourced from {lead.source} and currently hold a sales score of {lead.score} out of 100.
          </p>
        </div>

        <div className="nx-card" style={{ padding: 'var(--space-4)' }}>
          <div className="nx-text-muted" style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Ownership
          </div>
          <div style={{ marginTop: 'var(--space-3)', display: 'grid', gap: 'var(--space-2)' }}>
            <div><strong>Owner:</strong> {lead.owner}</div>
            <div><strong>Lead ID:</strong> {lead.id}</div>
            <div><strong>Company:</strong> {lead.company}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="nx-card" style={{ padding: 'var(--space-3)', display: 'grid', gap: 'var(--space-2)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--text-secondary)' }}>
        {icon}
        <span className="nx-text-muted" style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
      </div>
      <div style={{ fontWeight: 600 }}>{value}</div>
    </div>
  );
}

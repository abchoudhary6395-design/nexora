import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiBriefcase, FiMapPin, FiUsers, FiDollarSign, FiGlobe } from 'react-icons/fi';
import { generateMockCompanies } from './mockCompanies';

const allCompanies = generateMockCompanies(14);

export default function CompanyDetail() {
  const { id } = useParams();

  const company = useMemo(() => {
    return allCompanies.find((item) => item.id === id) || allCompanies[0];
  }, [id]);

  return (
    <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <Link to="/companies" className="nx-flex nx-items-center nx-gap-2 nx-text-secondary" style={{ fontSize: 'var(--fs-sm)' }}>
          <FiArrowLeft size={14} /> Back to companies
        </Link>

        <span className="nx-badge nx-badge--neutral">{company.industry}</span>
      </div>

      <div className="nx-card" style={{ padding: 'var(--space-5)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          <div>
            <div className="nx-text-muted" style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Company profile
            </div>
            <h2 style={{ margin: 'var(--space-2) 0 0', fontSize: 'var(--fs-2xl)' }}>{company.name}</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontWeight: 600 }}>
            <span className="nx-text-muted">Owner</span>
            <span className="nx-badge nx-badge--primary">{company.owner}</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-5)' }}>
          <InfoItem icon={<FiBriefcase size={15} />} label="Industry" value={company.industry} />
          <InfoItem icon={<FiMapPin size={15} />} label="Location" value={`${company.city || 'Unknown'}, ${company.country || 'Unknown'}`} />
          <InfoItem icon={<FiUsers size={15} />} label="Employees" value={company.employees?.toLocaleString() || '0'} />
          <InfoItem icon={<FiDollarSign size={15} />} label="Annual Revenue" value={`$${Number(company.annualRevenue || 0).toLocaleString()}`} />
          <InfoItem icon={<FiGlobe size={15} />} label="Website" value={company.website || 'Not provided'} />
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

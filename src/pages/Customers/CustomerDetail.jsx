import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiPhone, FiBriefcase, FiDollarSign, FiCalendar } from 'react-icons/fi';
import { generateMockCustomers } from './mockCustomers';

const allCustomers = generateMockCustomers(26);

export default function CustomerDetail() {
  const { id } = useParams();

  const customer = useMemo(() => {
    return allCustomers.find((item) => item.id === id) || allCustomers[0];
  }, [id]);

  return (
    <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <Link to="/customers" className="nx-flex nx-items-center nx-gap-2 nx-text-secondary" style={{ fontSize: 'var(--fs-sm)' }}>
          <FiArrowLeft size={14} /> Back to customers
        </Link>

        <span className="nx-badge nx-badge--primary">{customer.tag || 'Customer'}</span>
      </div>

      <div className="nx-card" style={{ padding: 'var(--space-5)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          <div>
            <div className="nx-text-muted" style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Customer profile
            </div>
            <h2 style={{ margin: 'var(--space-2) 0 0', fontSize: 'var(--fs-2xl)' }}>{customer.name}</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontWeight: 600 }}>
            <span className="nx-text-muted">Lifetime value</span>
            <span className="nx-badge nx-badge--neutral">${Number(customer.lifetimeValue || 0).toLocaleString()}</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-5)' }}>
          <InfoItem icon={<FiMail size={15} />} label="Email" value={customer.email} />
          <InfoItem icon={<FiPhone size={15} />} label="Phone" value={customer.phone || 'Not shared'} />
          <InfoItem icon={<FiBriefcase size={15} />} label="Company" value={customer.company || 'Independent'} />
          <InfoItem icon={<FiDollarSign size={15} />} label="Open Invoices" value={String(customer.openInvoices || 0)} />
          <InfoItem icon={<FiCalendar size={15} />} label="Last Activity" value={customer.lastActivity} />
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

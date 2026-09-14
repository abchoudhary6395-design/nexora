import Badge from '../common/Badge';

export const LEAD_STATUS_TONE = {
  New: 'primary',
  Contacted: 'primary',
  Qualified: 'success',
  'Proposal Sent': 'warning',
  Negotiation: 'warning',
  Won: 'success',
  Lost: 'danger',
  Archived: 'neutral',
};

export function LeadStatusBadge({ status }) {
  return <Badge tone={LEAD_STATUS_TONE[status] || 'neutral'}>{status}</Badge>;
}

export function LeadScore({ score }) {
  const tier = score >= 75 ? 'hot' : score >= 45 ? 'warm' : 'cold';
  const label = tier === 'hot' ? 'Hot' : tier === 'warm' ? 'Warm' : 'Cold';
  return (
    <span className={`nx-score nx-score--${tier}`}>
      <span className="nx-score__dot" />
      {score} · {label}
    </span>
  );
}

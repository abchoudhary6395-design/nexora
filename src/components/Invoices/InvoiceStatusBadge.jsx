import Badge from '../common/Badge';

const TONE = {
  Paid: 'success',
  Pending: 'primary',
  Overdue: 'danger',
  Cancelled: 'neutral',
};

export default function InvoiceStatusBadge({ status }) {
  return <Badge tone={TONE[status] || 'neutral'}>{status}</Badge>;
}

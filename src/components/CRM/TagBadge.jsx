import Badge from '../common/Badge';

const TAG_TONE = {
  VIP: 'warning',
  Enterprise: 'primary',
  Startup: 'success',
  Returning: 'neutral',
  'High Value': 'danger',
  Urgent: 'danger',
  Important: 'warning',
};

export default function TagBadge({ tag }) {
  return <Badge tone={TAG_TONE[tag] || 'neutral'}>{tag}</Badge>;
}

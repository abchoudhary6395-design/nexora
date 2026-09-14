export const STAGES = [
  { key: 'lead', label: 'Lead', color: 'var(--nx-gray-400)' },
  { key: 'qualified', label: 'Qualified', color: 'var(--nx-indigo-500)' },
  { key: 'proposal', label: 'Proposal', color: 'var(--nx-amber-500)' },
  { key: 'negotiation', label: 'Negotiation', color: 'var(--nx-amber-600)' },
  { key: 'won', label: 'Won', color: 'var(--nx-emerald-500)' },
  { key: 'lost', label: 'Lost', color: 'var(--nx-rose-500)' },
];

const dealNames = [
  'Enterprise Rollout', 'Annual Renewal', 'Platform Migration', 'Starter Bundle',
  'Team Expansion', 'Onboarding Package', 'Custom Integration', 'Support Upgrade',
  'Multi-Year Contract', 'Pilot Program',
];
const companies = [
  'Northwind Traders', 'Kappa Industries', 'Bluepeak Systems', 'Vertex Retail',
  'Solace Media', 'Ironclad Logistics', 'Harbor & Co', 'Nimbus Cloud',
];

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function generateMockDeals(count = 24) {
  const rand = seededRandom(101);
  return Array.from({ length: count }, (_, i) => ({
    id: `DL-${4000 + i}`,
    title: `${dealNames[i % dealNames.length]} — ${companies[i % companies.length]}`,
    company: companies[i % companies.length],
    value: Math.floor(3000 + rand() * 85000),
    probability: [20, 40, 60, 75, 90][i % 5],
    stage: STAGES[i % STAGES.length].key,
    closeDate: new Date(Date.now() + (i % 10) * 5 * 86400000).toISOString().slice(0, 10),
  }));
}

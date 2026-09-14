/**
 * Placeholder dataset — same pattern as pages/Leads/mockLeads.js.
 * Swap for `customerService.list()` once the Laravel API is live.
 */
const names = [
  'Elena Torres', 'Marcus Chen', 'Amara Okonkwo', 'Ivan Petrov', 'Nadia Hassan',
  'Lucas Ferreira', 'Chloe Dubois', 'Kenji Watanabe', 'Zara Ahmed', 'Miguel Santos',
  'Hana Kobayashi', 'Ethan Brooks', 'Layla Karimi', 'Owen Murphy', 'Ingrid Larsen',
];
const companies = [
  'Northwind Traders', 'Kappa Industries', 'Bluepeak Systems', 'Vertex Retail',
  'Solace Media', 'Ironclad Logistics', 'Harbor & Co', 'Nimbus Cloud', 'Redwood Labs',
];
const tags = ['VIP', 'Enterprise', 'Startup', 'Returning', 'High Value'];
const industries = ['SaaS', 'Retail', 'Logistics', 'Healthcare', 'Manufacturing', 'Media'];

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function generateMockCustomers(count = 26) {
  const rand = seededRandom(7);
  return Array.from({ length: count }, (_, i) => ({
    id: `CU-${2000 + i}`,
    name: names[i % names.length],
    company: companies[i % companies.length],
    email: `${names[i % names.length].split(' ')[0].toLowerCase()}@${companies[i % companies.length].split(' ')[0].toLowerCase()}.com`,
    industry: industries[i % industries.length],
    lifetimeValue: Math.floor(5000 + rand() * 180000),
    openInvoices: Math.floor(rand() * 4),
    tag: tags[i % tags.length],
    lastActivity: new Date(Date.now() - i * 3 * 86400000).toISOString().slice(0, 10),
  }));
}

/**
 * Placeholder dataset so the Leads UI is fully demonstrable before
 * the Laravel backend (Part 2 spec) is running. Swap `useLeads`'s
 * fallback for a real `leadService.list()` call once the API exists —
 * the shape here already matches what that endpoint should return.
 */
const sources = ['Website', 'LinkedIn', 'Referral', 'Google Ads', 'Cold Call', 'Facebook'];
const statuses = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiation', 'Won', 'Lost'];
const names = [
  'Priya Sharma', 'Daniel Okafor', 'Mei Lin', 'Carlos Vega', 'Fatima Al-Sayed',
  'Jonas Weber', 'Aisha Bello', 'Tom Fitzgerald', 'Sofia Rossi', 'Ravi Patel',
  'Anna Kowalski', 'Liam O\'Connor', 'Yuki Tanaka', 'Grace Mensah', 'Omar Haddad',
];
const companies = [
  'Northwind Traders', 'Kappa Industries', 'Bluepeak Systems', 'Vertex Retail',
  'Solace Media', 'Ironclad Logistics', 'Harbor & Co', 'Nimbus Cloud', 'Redwood Labs',
];

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function generateMockLeads(count = 32) {
  const rand = seededRandom(42);
  return Array.from({ length: count }, (_, i) => {
    const score = Math.floor(rand() * 100);
    return {
      id: `LD-${1000 + i}`,
      name: names[i % names.length],
      company: companies[i % companies.length],
      email: `${names[i % names.length].split(' ')[0].toLowerCase()}@${companies[i % companies.length].split(' ')[0].toLowerCase()}.com`,
      source: sources[i % sources.length],
      status: statuses[i % statuses.length],
      score,
      revenue: Math.floor(2000 + rand() * 48000),
      owner: names[(i + 3) % names.length],
      createdAt: new Date(Date.now() - i * 86400000).toISOString().slice(0, 10),
    };
  });
}

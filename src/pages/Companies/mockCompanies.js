const companyNames = [
  'Northwind Traders', 'Kappa Industries', 'Bluepeak Systems', 'Vertex Retail',
  'Solace Media', 'Ironclad Logistics', 'Harbor & Co', 'Nimbus Cloud', 'Redwood Labs',
  'Alderly Group', 'Fenwick & Sons', 'Cascade Analytics', 'Orion Freight', 'Milltown Foods',
];
const industries = ['SaaS', 'Retail', 'Logistics', 'Healthcare', 'Manufacturing', 'Media', 'Finance'];
const countries = ['United States', 'United Kingdom', 'India', 'Germany', 'Canada', 'Australia'];

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function generateMockCompanies(count = 14) {
  const rand = seededRandom(19);
  return companyNames.slice(0, count).map((name, i) => ({
    id: `CO-${3000 + i}`,
    name,
    industry: industries[i % industries.length],
    country: countries[i % countries.length],
    employees: Math.floor(20 + rand() * 980),
    annualRevenue: Math.floor(200000 + rand() * 9000000),
    openDeals: Math.floor(rand() * 6),
    owner: ['Priya Sharma', 'Daniel Okafor', 'Mei Lin', 'Carlos Vega'][i % 4],
  }));
}

const projectNames = [
  'Website Redesign', 'Mobile App Launch', 'CRM Migration', 'Q3 Marketing Campaign',
  'Payment Gateway Integration', 'Customer Portal Revamp', 'Internal Tools Overhaul',
  'API v2 Rollout', 'Warehouse Automation', 'Brand Refresh',
];
const clients = [
  'Northwind Traders', 'Kappa Industries', 'Bluepeak Systems', 'Vertex Retail',
  'Solace Media', 'Ironclad Logistics', 'Internal', 'Harbor & Co',
];
const statuses = ['On Track', 'At Risk', 'Delayed', 'Completed'];

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function generateMockProjects(count = 8) {
  const rand = seededRandom(55);
  return projectNames.slice(0, count).map((name, i) => ({
    id: `PJ-${6000 + i}`,
    name,
    client: clients[i % clients.length],
    status: statuses[i % statuses.length],
    progress: Math.floor(10 + rand() * 90),
    budget: Math.floor(8000 + rand() * 120000),
    membersCount: Math.floor(2 + rand() * 6),
    dueDate: new Date(Date.now() + (i + 2) * 9 * 86400000).toISOString().slice(0, 10),
  }));
}

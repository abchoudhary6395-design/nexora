const customers = [
  'Northwind Traders', 'Kappa Industries', 'Bluepeak Systems', 'Vertex Retail',
  'Solace Media', 'Ironclad Logistics', 'Harbor & Co', 'Nimbus Cloud',
];
const statuses = ['Paid', 'Pending', 'Overdue', 'Cancelled'];
const items = [
  { name: 'Platform Subscription — Enterprise', price: 1200 },
  { name: 'Onboarding & Setup', price: 800 },
  { name: 'Custom Integration Hours', price: 150 },
  { name: 'Priority Support Add-on', price: 300 },
  { name: 'Training Session', price: 250 },
];

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function generateMockInvoices(count = 18) {
  const rand = seededRandom(707);
  return Array.from({ length: count }, (_, i) => {
    const lineItems = Array.from({ length: 1 + Math.floor(rand() * 3) }, () => {
      const base = items[Math.floor(rand() * items.length)];
      const qty = 1 + Math.floor(rand() * 3);
      return { ...base, qty, total: base.price * qty };
    });
    const subtotal = lineItems.reduce((s, li) => s + li.total, 0);
    const tax = Math.round(subtotal * 0.08);
    const total = subtotal + tax;

    return {
      id: `INV-${2040 + i}`,
      customer: customers[i % customers.length],
      issueDate: new Date(Date.now() - (i + 5) * 4 * 86400000).toISOString().slice(0, 10),
      dueDate: new Date(Date.now() + (10 - i) * 3 * 86400000).toISOString().slice(0, 10),
      status: statuses[i % statuses.length],
      lineItems,
      subtotal,
      tax,
      total,
    };
  });
}

export const folders = [
  { id: 'FD-1', name: 'Contracts', count: 14 },
  { id: 'FD-2', name: 'Invoices', count: 32 },
  { id: 'FD-3', name: 'Proposals', count: 9 },
  { id: 'FD-4', name: 'Onboarding', count: 6 },
];

const fileNames = [
  { name: 'MSA — Northwind Traders.pdf', type: 'pdf', size: '412 KB' },
  { name: 'Q3 Sales Report.xlsx', type: 'xlsx', size: '1.1 MB' },
  { name: 'Brand Guidelines.docx', type: 'docx', size: '2.4 MB' },
  { name: 'Product Roadmap.pptx', type: 'pptx', size: '3.8 MB' },
  { name: 'Team Photo.png', type: 'image', size: '820 KB' },
  { name: 'Vendor Agreement.pdf', type: 'pdf', size: '298 KB' },
  { name: 'Client Assets.zip', type: 'zip', size: '14.2 MB' },
  { name: 'Onboarding Checklist.docx', type: 'docx', size: '156 KB' },
];

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function generateMockDocuments(count = 8) {
  const rand = seededRandom(909);
  return fileNames.slice(0, count).map((f, i) => ({
    id: `DOC-${7000 + i}`,
    ...f,
    uploadedBy: ['Priya Sharma', 'Daniel Okafor', 'Mei Lin'][i % 3],
    uploadedAt: new Date(Date.now() - i * 2 * 86400000).toISOString().slice(0, 10),
    favorite: rand() > 0.7,
  }));
}

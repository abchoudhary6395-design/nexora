export const REPORTS = [
  {
    id: 'revenue',
    name: 'Revenue Report',
    category: 'Finance',
    status: 'Updated today',
    owner: 'Finance Team',
    description: 'Monthly and yearly revenue breakdown by source.',
    period: 'Q3 2026',
    summary: 'Revenue is pacing ahead of plan with stronger channel performance in SaaS and enterprise segments.',
    metrics: [
      { label: 'Monthly revenue', value: '$84.2K' },
      { label: 'YoY growth', value: '+18.4%' },
      { label: 'Outstanding', value: '$12.7K' },
    ],
  },
  {
    id: 'sales',
    name: 'Sales Report',
    category: 'Sales',
    status: 'Review required',
    owner: 'Sales Ops',
    description: 'Deals won, lost, and in progress by rep.',
    period: 'August 2026',
    summary: 'Pipeline quality is stable, though late-stage close rates are slightly below target.',
    metrics: [
      { label: 'Won deals', value: '24' },
      { label: 'Active pipeline', value: '61' },
      { label: 'Win rate', value: '31%' },
    ],
  },
  {
    id: 'lead',
    name: 'Lead Report',
    category: 'Marketing',
    status: 'Healthy',
    owner: 'Growth Team',
    description: 'Lead volume, sources, and conversion rates.',
    period: 'August 2026',
    summary: 'Inbound lead velocity improved from referrals and paid campaigns across the last 30 days.',
    metrics: [
      { label: 'New leads', value: '418' },
      { label: 'Qualified', value: '135' },
      { label: 'Conversion', value: '32%' },
    ],
  },
  {
    id: 'customer',
    name: 'Customer Report',
    category: 'Retention',
    status: 'Healthy',
    owner: 'Customer Success',
    description: 'Customer growth, retention, and lifetime value.',
    period: 'YTD',
    summary: 'Customer retention remains above target with healthy expansion revenue from enterprise accounts.',
    metrics: [
      { label: 'Active customers', value: '812' },
      { label: 'Churn', value: '2.3%' },
      { label: 'LTV', value: '$28.9K' },
    ],
  },
  {
    id: 'task',
    name: 'Task Report',
    category: 'Operations',
    status: 'On track',
    owner: 'Operations',
    description: 'Task completion rates by team member.',
    period: 'This week',
    summary: 'Execution is stable, with delivery teams closing most critical tasks before due dates.',
    metrics: [
      { label: 'Completed tasks', value: '138' },
      { label: 'On-time rate', value: '92%' },
      { label: 'Blocked items', value: '6' },
    ],
  },
  {
    id: 'project',
    name: 'Project Report',
    category: 'Delivery',
    status: 'At risk',
    owner: 'PMO',
    description: 'Project health, budget, and timeline status.',
    period: 'September 2026',
    summary: 'Critical projects remain within budget but two delivery programs need leadership intervention.',
    metrics: [
      { label: 'Active projects', value: '12' },
      { label: 'Budget variance', value: '+4.8%' },
      { label: 'On-time delivery', value: '76%' },
    ],
  },
  {
    id: 'invoice',
    name: 'Invoice Report',
    category: 'Billing',
    status: 'Needs follow-up',
    owner: 'Finance Ops',
    description: 'Outstanding, paid, and overdue invoices.',
    period: 'Current month',
    summary: 'Collections remain healthy, but three large invoices are aging beyond the usual turnaround range.',
    metrics: [
      { label: 'Paid', value: '$142K' },
      { label: 'Outstanding', value: '$29K' },
      { label: 'Overdue', value: '$8.4K' },
    ],
  },
  {
    id: 'employee',
    name: 'Employee Report',
    category: 'People',
    status: 'Balanced',
    owner: 'HR',
    description: 'Team performance and workload summary.',
    period: 'Q3 2026',
    summary: 'Team utilization is balanced, and performance remains consistent across departments.',
    metrics: [
      { label: 'Avg. utilization', value: '82%' },
      { label: 'Open roles', value: '4' },
      { label: 'Engagement', value: '90%' },
    ],
  },
];

export function getReportById(id) {
  return REPORTS.find((report) => report.id === id) || REPORTS[0];
}

export function buildExportBlob(report, format = 'pdf') {
  const extension = format.toLowerCase();
  const mimeType =
    extension === 'pdf'
      ? 'application/pdf'
      : extension === 'excel' || extension === 'xlsx'
        ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        : 'text/csv;charset=utf-8;';

  const rows = [
    `${report.name}`,
    `Category: ${report.category}`,
    `Period: ${report.period}`,
    `Owner: ${report.owner}`,
    `Status: ${report.status}`,
    '',
    'Summary:',
    report.summary,
    '',
    'Metrics:',
    ...report.metrics.map((item) => `${item.label}: ${item.value}`),
  ];

  return new Blob([rows.join('\n')], { type: mimeType });
}

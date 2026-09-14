export const TASK_STATUSES = [
  { key: 'todo', label: 'To Do', color: 'var(--nx-gray-400)' },
  { key: 'in_progress', label: 'In Progress', color: 'var(--nx-indigo-500)' },
  { key: 'review', label: 'In Review', color: 'var(--nx-amber-500)' },
  { key: 'done', label: 'Done', color: 'var(--nx-emerald-500)' },
];

export const PRIORITY_TONE = {
  Low: 'neutral',
  Medium: 'primary',
  High: 'warning',
  Urgent: 'danger',
};

const titles = [
  'Prepare Q3 proposal', 'Fix invoice PDF export bug', 'Design new dashboard widgets',
  'Onboard new sales hire', 'Review contract terms with legal', 'Update CRM field mappings',
  'Write release notes for v2.4', 'Follow up with Kappa Industries', 'Audit user permissions',
  'Migrate customer records', 'Plan Q4 roadmap workshop', 'Test payment gateway integration',
];
const assignees = ['Priya Sharma', 'Daniel Okafor', 'Mei Lin', 'Carlos Vega', 'Aisha Bello'];
const priorities = ['Low', 'Medium', 'High', 'Urgent'];

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function generateMockTasks(count = 20) {
  const rand = seededRandom(303);
  return Array.from({ length: count }, (_, i) => ({
    id: `TK-${5000 + i}`,
    title: titles[i % titles.length],
    assignee: assignees[i % assignees.length],
    priority: priorities[i % priorities.length],
    status: TASK_STATUSES[i % TASK_STATUSES.length].key,
    dueDate: new Date(Date.now() + (i % 12 - 4) * 86400000).toISOString().slice(0, 10),
  }));
}

import { FiTarget, FiCheckSquare, FiDollarSign, FiCalendar, FiUsers } from 'react-icons/fi';

export const NOTIFICATION_ICONS = {
  lead: { icon: FiTarget, color: 'var(--nx-indigo-500)' },
  task: { icon: FiCheckSquare, color: 'var(--nx-amber-500)' },
  invoice: { icon: FiDollarSign, color: 'var(--nx-emerald-500)' },
  meeting: { icon: FiCalendar, color: 'var(--nx-rose-500)' },
  team: { icon: FiUsers, color: 'var(--nx-slate-violet-500)' },
};

export function generateMockNotifications() {
  return [
    { id: 1, type: 'lead', title: 'New lead assigned: Sofia Rossi', time: '5 min ago', read: false },
    { id: 2, type: 'invoice', title: 'Invoice #INV-2041 was paid', time: '1 hr ago', read: false },
    { id: 3, type: 'task', title: 'Task "Prepare Q3 proposal" is due today', time: '2 hr ago', read: false },
    { id: 4, type: 'meeting', title: 'Meeting with Kappa Industries in 30 min', time: '3 hr ago', read: true },
    { id: 5, type: 'team', title: 'Daniel Okafor mentioned you in a comment', time: 'Yesterday', read: true },
    { id: 6, type: 'lead', title: 'Deal "Enterprise Rollout" moved to Won', time: 'Yesterday', read: true },
  ];
}

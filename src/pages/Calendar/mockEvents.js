const types = ['Meeting', 'Call', 'Deadline', 'Reminder'];
const titles = [
  'Kappa Industries Renewal Call', 'Product Demo — Vertex Retail', 'Q3 Roadmap Review',
  'Invoice Follow-up', 'Team Standup', 'Contract Signing — Harbor & Co',
  'Onboarding Session', 'Design Review', 'Client Check-in', 'Proposal Deadline',
];

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/** Generates events scattered across the given month. */
export function generateMockEvents(year, month, count = 16) {
  const rand = seededRandom(year * 100 + month);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return Array.from({ length: count }, (_, i) => {
    const day = 1 + Math.floor(rand() * daysInMonth);
    const hour = 9 + Math.floor(rand() * 8);
    return {
      id: `EV-${year}${month}-${i}`,
      title: titles[i % titles.length],
      type: types[i % types.length],
      date: new Date(year, month, day),
      time: `${hour}:00`,
    };
  }).sort((a, b) => a.date - b.date);
}

export const EVENT_TYPE_COLOR = {
  Meeting: 'var(--nx-indigo-500)',
  Call: 'var(--nx-emerald-500)',
  Deadline: 'var(--nx-rose-500)',
  Reminder: 'var(--nx-amber-500)',
};

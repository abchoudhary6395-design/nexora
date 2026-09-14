export const ROLES = ['Super Admin', 'Admin', 'Manager', 'Sales Executive', 'Support Executive', 'Accountant', 'HR', 'Employee', 'Viewer'];

const names = [
  'Priya Sharma', 'Daniel Okafor', 'Mei Lin', 'Carlos Vega', 'Fatima Al-Sayed',
  'Jonas Weber', 'Aisha Bello', 'Tom Fitzgerald',
];

export function generateMockUsers() {
  return names.map((name, i) => ({
    id: `USR-${100 + i}`,
    name,
    email: `${name.split(' ')[0].toLowerCase()}@nexora.com`,
    role: ROLES[i % ROLES.length],
    status: i % 5 === 0 ? 'Inactive' : 'Active',
    lastActive: i % 5 === 0 ? '14 days ago' : ['Just now', '2 hr ago', '1 day ago'][i % 3],
  }));
}

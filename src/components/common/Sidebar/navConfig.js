import {
  FiGrid, FiUsers, FiBriefcase, FiTarget, FiCheckSquare,
  FiFolder, FiCalendar, FiFileText, FiPieChart, FiBarChart2,
  FiFile, FiSettings, FiHardDrive,
} from 'react-icons/fi';

/**
 * Single source of truth for sidebar navigation.
 * Add a module here and it appears in the sidebar + can be
 * matched by the command palette.
 */
export const navSections = [
  {
    label: 'Overview',
    items: [{ label: 'Dashboard', to: '/dashboard', icon: FiGrid }],
  },
  {
    label: 'CRM',
    items: [
      { label: 'Leads', to: '/leads', icon: FiTarget },
      { label: 'Customers', to: '/customers', icon: FiUsers },
      { label: 'Companies', to: '/companies', icon: FiBriefcase },
      { label: 'Deals', to: '/deals', icon: FiPieChart },
    ],
  },
  {
    label: 'Work',
    items: [
      { label: 'Tasks', to: '/tasks', icon: FiCheckSquare },
      { label: 'Projects', to: '/projects', icon: FiFolder },
      { label: 'Calendar', to: '/calendar', icon: FiCalendar },
    ],
  },
  {
    label: 'Finance',
    items: [
      { label: 'Invoices', to: '/invoices', icon: FiFileText },
      { label: 'Documents', to: '/documents', icon: FiHardDrive },
    ],
  },
  {
    label: 'Insights',
    items: [
      { label: 'Analytics', to: '/analytics', icon: FiBarChart2 },
      { label: 'Reports', to: '/reports', icon: FiFile },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { label: 'Settings', to: '/settings', icon: FiSettings },
      { label: 'Administration', to: '/admin', icon: FiUsers },
    ],
  },
];

import { useState } from 'react';
import clsx from 'clsx';
import ProfileTab from './ProfileTab';
import SecurityTab from './SecurityTab';
import AppearanceTab from './AppearanceTab';
import NotificationsTab from './NotificationsTab';
import CompanyTab from './CompanyTab';

const TABS = [
  { key: 'profile', label: 'Profile', Component: ProfileTab },
  { key: 'security', label: 'Security', Component: SecurityTab },
  { key: 'appearance', label: 'Appearance', Component: AppearanceTab },
  { key: 'notifications', label: 'Notifications', Component: NotificationsTab },
  { key: 'company', label: 'Company', Component: CompanyTab },
];

export default function Settings() {
  const [active, setActive] = useState('profile');
  const ActivePanel = TABS.find((t) => t.key === active)?.Component;

  return (
    <div>
      <div className="nx-page-header">
        <h2>Settings</h2>
      </div>

      <div className="nx-settings">
        <nav className="nx-settings__tabs">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={clsx('nx-settings__tab', active === t.key && 'nx-settings__tab--active')}
              onClick={() => setActive(t.key)}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <div>
          <ActivePanel />
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import Switch from '../../components/common/Switch';

const CHANNELS = [
  { key: 'leadAssigned', label: 'Lead assigned to me', hint: 'When a new lead is assigned.' },
  { key: 'taskDue', label: 'Task due reminders', hint: 'Reminders before a task is due.' },
  { key: 'dealWon', label: 'Deal won or lost', hint: 'When a deal changes to Won or Lost.' },
  { key: 'invoicePaid', label: 'Invoice paid', hint: 'When a customer pays an invoice.' },
  { key: 'mentions', label: 'Mentions & comments', hint: 'When someone mentions you.' },
];

export default function NotificationsTab() {
  const [prefs, setPrefs] = useState(
    Object.fromEntries(CHANNELS.map((c) => [c.key, true]))
  );

  return (
    <div className="nx-settings__section">
      <div className="nx-panel">
        <div className="nx-panel__header"><h4>Email notifications</h4></div>
        {CHANNELS.map((c) => (
          <div className="nx-settings__row" key={c.key}>
            <div>
              <div className="nx-settings__row-label">{c.label}</div>
              <div className="nx-settings__row-hint">{c.hint}</div>
            </div>
            <Switch
              checked={prefs[c.key]}
              onChange={(v) => setPrefs((p) => ({ ...p, [c.key]: v }))}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

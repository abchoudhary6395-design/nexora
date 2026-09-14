import clsx from 'clsx';
import { useTheme } from '../../contexts/ThemeContext';

const THEME_OPTIONS = [
  { key: 'light', label: 'Light' },
  { key: 'dark', label: 'Dark' },
  { key: 'system', label: 'System' },
];

const ACCENTS = [
  { key: 'indigo', color: '#4F5EFF' },
  { key: 'emerald', color: '#1FAE6B' },
  { key: 'amber', color: '#F5A524' },
  { key: 'rose', color: '#E5484D' },
];

export default function AppearanceTab() {
  const { mode, setMode } = useTheme();

  return (
    <div className="nx-settings__section">
      <div className="nx-panel">
        <div className="nx-panel__header"><h4>Theme</h4></div>
        <div className="nx-flex nx-gap-3">
          {THEME_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setMode(opt.key)}
              className={clsx('nx-filter-chip', mode === opt.key && 'nx-filter-chip--active')}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="nx-panel">
        <div className="nx-panel__header"><h4>Accent color</h4></div>
        <div className="nx-flex nx-gap-3">
          {ACCENTS.map((a) => (
            <button
              key={a.key}
              aria-label={a.key}
              style={{
                width: 32, height: 32, borderRadius: '50%',
                background: a.color, border: '2px solid var(--color-border)',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
        <p style={{ marginTop: 'var(--space-3)', fontSize: 'var(--fs-xs)' }}>
          Custom accent colors update <code>--color-primary</code> across the whole app.
        </p>
      </div>
    </div>
  );
}

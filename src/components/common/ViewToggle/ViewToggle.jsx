import clsx from 'clsx';

/** Small segmented control for switching between List/Board/Calendar views. */
export default function ViewToggle({ views, active, onChange }) {
  return (
    <div
      className="nx-flex"
      style={{
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: 2,
        background: 'var(--color-surface)',
      }}
    >
      {views.map((v) => (
        <button
          key={v.key}
          onClick={() => onChange(v.key)}
          className={clsx('nx-btn nx-btn--sm', active === v.key ? 'nx-btn--secondary' : 'nx-btn--ghost')}
          style={{ borderRadius: 'var(--radius-sm)' }}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
}

import clsx from 'clsx';

/**
 * Loader — spinner for buttons/inline use, or a full-screen
 * splash for route-level auth checks and initial app boot.
 */
export default function Loader({ fullScreen = false, size = 28, label }) {
  const spinner = (
    <span
      className="nx-spin"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: '3px solid var(--color-border)',
        borderTopColor: 'var(--color-primary)',
        display: 'inline-block',
      }}
      role="status"
      aria-label={label || 'Loading'}
    />
  );

  if (!fullScreen) return spinner;

  return (
    <div
      className={clsx('nx-flex-col', 'nx-items-center', 'nx-justify-center')}
      style={{ height: '100vh', gap: 'var(--space-3)', background: 'var(--color-bg)' }}
    >
      {spinner}
      {label && <span className="nx-text-muted" style={{ fontSize: 'var(--fs-sm)' }}>{label}</span>}
    </div>
  );
}

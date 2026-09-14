import clsx from 'clsx';

/** Controlled on/off toggle switch. */
export default function Switch({ checked, onChange, label, disabled }) {
  return (
    <label className="nx-flex nx-items-center nx-gap-3" style={{ cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}>
      <span
        className={clsx('nx-switch', checked && 'nx-switch--on')}
        role="switch"
        aria-checked={checked}
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && onChange(!checked)}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onChange(!checked);
          }
        }}
      >
        <span className="nx-switch__thumb" />
      </span>
      {label && <span style={{ fontSize: 'var(--fs-sm)' }}>{label}</span>}
    </label>
  );
}

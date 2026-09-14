import { forwardRef } from 'react';
import clsx from 'clsx';

/**
 * Nexora Input — text input with label, hint, error and icon slots.
 * Designed to plug directly into React Hook Form via `ref`.
 */
const Input = forwardRef(function Input(
  {
    label,
    hint,
    error,
    iconLeft,
    iconRight,
    onIconRightClick,
    id,
    className,
    ...rest
  },
  ref
) {
  const inputId = id || rest.name;

  return (
    <div className="nx-field">
      {label && (
        <label className="nx-field__label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className="nx-input-wrap">
        {iconLeft && <span className="nx-input__icon nx-input__icon--left">{iconLeft}</span>}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            'nx-input',
            iconLeft && 'nx-input--with-icon-left',
            iconRight && 'nx-input--with-icon-right',
            error && 'nx-input--error',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...rest}
        />
        {iconRight && (
          <span
            className="nx-input__icon nx-input__icon--right"
            onClick={onIconRightClick}
            role={onIconRightClick ? 'button' : undefined}
            tabIndex={onIconRightClick ? 0 : undefined}
          >
            {iconRight}
          </span>
        )}
      </div>
      {error ? (
        <span className="nx-field__error" id={`${inputId}-error`} role="alert">
          {error}
        </span>
      ) : hint ? (
        <span className="nx-field__hint" id={`${inputId}-hint`}>
          {hint}
        </span>
      ) : null}
    </div>
  );
});

export default Input;

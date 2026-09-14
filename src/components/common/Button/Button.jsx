import { forwardRef } from 'react';
import clsx from 'clsx';

/**
 * Nexora Button — the single button implementation used app-wide.
 *
 * variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
 * size:    'sm' | 'md' | 'lg'
 */
const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    icon = false,
    fab = false,
    loading = false,
    leftIcon,
    rightIcon,
    className,
    disabled,
    type = 'button',
    ...rest
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={clsx(
        'nx-btn',
        `nx-btn--${variant}`,
        size !== 'md' && `nx-btn--${size}`,
        icon && 'nx-btn--icon',
        fab && 'nx-btn--fab',
        loading && 'nx-btn--loading',
        className
      )}
      {...rest}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
});

export default Button;

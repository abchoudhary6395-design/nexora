import clsx from 'clsx';

/** Small status/tag pill. tone: 'neutral' | 'primary' | 'success' | 'danger' | 'warning' */
export default function Badge({ children, tone = 'neutral', className, ...rest }) {
  return (
    <span className={clsx('nx-badge', `nx-badge--${tone}`, className)} {...rest}>
      {children}
    </span>
  );
}

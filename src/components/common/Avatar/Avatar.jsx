import clsx from 'clsx';

function initials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
}

/** size: 'sm' | 'md' | 'lg' */
export default function Avatar({ name, src, size = 'md', className }) {
  return (
    <span className={clsx('nx-avatar', `nx-avatar--${size}`, className)}>
      {src ? <img src={src} alt={name || 'avatar'} /> : initials(name)}
    </span>
  );
}

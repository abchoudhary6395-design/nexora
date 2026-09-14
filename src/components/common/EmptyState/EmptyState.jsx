import { motion } from 'framer-motion';
import Button from '../Button';

export default function EmptyState({ icon, title, description, actionLabel, onAction }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="nx-flex-col nx-items-center nx-justify-center"
      style={{ padding: 'var(--space-16) var(--space-4)', textAlign: 'center', gap: 'var(--space-3)' }}
    >
      {icon && (
        <div
          style={{
            width: 56, height: 56, borderRadius: 'var(--radius-lg)',
            background: 'var(--color-primary-soft)', color: 'var(--color-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {icon}
        </div>
      )}
      <h3>{title}</h3>
      {description && <p style={{ maxWidth: 380 }}>{description}</p>}
      {actionLabel && (
        <Button onClick={onAction} style={{ marginTop: 'var(--space-2)' }}>
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}

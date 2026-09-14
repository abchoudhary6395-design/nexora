import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

/**
 * KPIWidget — animated numeric counter with a delta chip.
 * value:  formatted string already (e.g. "$128,400")
 * delta:  number, positive or negative (percentage)
 */
export default function KPIWidget({ label, value, delta, icon, to }) {
  const navigate = useNavigate();
  const isUp = delta >= 0;

  const handleClick = () => {
    if (to) navigate(to);
  };

  return (
    <motion.div
      className="nx-kpi"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onClick={handleClick}
      onKeyDown={(event) => {
        if ((event.key === 'Enter' || event.key === ' ') && to) {
          event.preventDefault();
          navigate(to);
        }
      }}
      role={to ? 'button' : undefined}
      tabIndex={to ? 0 : undefined}
      style={to ? { cursor: 'pointer' } : undefined}
    >
      <div className="nx-flex nx-items-center nx-justify-between">
        <span className="nx-kpi__label">{label}</span>
        {icon && <span className="nx-text-muted">{icon}</span>}
      </div>
      <span className="nx-kpi__value">{value}</span>
      {typeof delta === 'number' && (
        <span className={`nx-kpi__delta ${isUp ? 'nx-kpi__delta--up' : 'nx-kpi__delta--down'}`}>
          {isUp ? <FiArrowUp size={12} /> : <FiArrowDown size={12} />}
          {Math.abs(delta)}%
        </span>
      )}
    </motion.div>
  );
}

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiSearch, FiPlus, FiMoon, FiSun } from 'react-icons/fi';
import { navSections } from '../Sidebar/navConfig';
import { useTheme } from '../../../contexts/ThemeContext';

const QUICK_ACTIONS = [
  { id: 'new-lead', label: 'Create new lead', to: '/leads' },
  { id: 'new-customer', label: 'Create new customer', to: '/customers' },
  { id: 'new-deal', label: 'Create new deal', to: '/deals' },
  { id: 'new-invoice', label: 'Create new invoice', to: '/invoices' },
  { id: 'new-task', label: 'Create new task', to: '/tasks' },
];

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const { toggle: toggleTheme } = useTheme();

  const navItems = useMemo(
    () => navSections.flatMap((s) => s.items.map((i) => ({ ...i, id: i.to, group: 'Navigate' }))),
    []
  );

  const actionItems = [
    ...QUICK_ACTIONS.map((a) => ({ ...a, group: 'Quick Create' })),
    { id: 'toggle-theme', label: 'Toggle dark / light theme', group: 'Actions', action: toggleTheme },
  ];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const all = [...navItems, ...actionItems];
    if (!q) return all;
    return all.filter((item) => item.label.toLowerCase().includes(q));
  }, [query, navItems]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === 'Enter' && results[activeIndex]) {
        e.preventDefault();
        runItem(results[activeIndex]);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, results, activeIndex]);

  const runItem = (item) => {
    if (item.action) item.action();
    if (item.to) navigate(item.to);
    onClose();
    setQuery('');
  };

  const grouped = results.reduce((acc, item) => {
    (acc[item.group] ??= []).push(item);
    return acc;
  }, {});

  let flatIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="nx-cmdk-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="nx-cmdk"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="nx-cmdk__input-row">
              <FiSearch size={16} className="nx-text-muted" />
              <input
                autoFocus
                className="nx-cmdk__input"
                placeholder="Search or jump to..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <span className="nx-navbar__kbd">Esc</span>
            </div>

            <div className="nx-cmdk__list">
              {results.length === 0 && <div className="nx-cmdk__empty">No matching pages or actions.</div>}
              {Object.entries(grouped).map(([group, items]) => (
                <div key={group}>
                  <div className="nx-cmdk__section-label">{group}</div>
                  {items.map((item) => {
                    flatIndex += 1;
                    const isActive = flatIndex === activeIndex;
                    const Icon = item.icon || (group === 'Quick Create' ? FiPlus : group === 'Actions' ? FiMoon : FiSearch);
                    return (
                      <div
                        key={item.id}
                        className={`nx-cmdk__item ${isActive ? 'nx-cmdk__item--active' : ''}`}
                        onClick={() => runItem(item)}
                        onMouseEnter={() => setActiveIndex(flatIndex)}
                      >
                        <Icon size={15} />
                        {item.label}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

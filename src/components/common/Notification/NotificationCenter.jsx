import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { NOTIFICATION_ICONS, generateMockNotifications } from './mockNotifications';
import EmptyState from '../EmptyState';

export default function NotificationCenter({ open, onClose }) {
  // Swap for `notificationService.list()` once the Laravel API is running —
  // GET /notifications already returns this exact { id, type, title, time, read } shape.
  const [notifications, setNotifications] = useState(generateMockNotifications);

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id) => setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <AnimatePresence>
      {open && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 'var(--z-dropdown)' }}
            onClick={onClose}
          />
          <motion.div
            className="nx-notif-panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            <div className="nx-notif-panel__header">
              <h5 style={{ margin: 0 }}>Notifications</h5>
              <button
                onClick={markAllRead}
                className="nx-flex nx-items-center nx-gap-1"
                style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-primary)', fontWeight: 500 }}
              >
                <FiCheck size={13} /> Mark all read
              </button>
            </div>

            <div className="nx-notif-panel__list">
              {notifications.length === 0 ? (
                <EmptyState title="You're all caught up" description="No notifications right now." />
              ) : (
                notifications.map((n) => {
                  const { icon: Icon, color } = NOTIFICATION_ICONS[n.type];
                  return (
                    <div
                      key={n.id}
                      className={`nx-notif-item ${!n.read ? 'nx-notif-item--unread' : ''}`}
                      onClick={() => markRead(n.id)}
                    >
                      <span className="nx-notif-item__icon" style={{ background: color }}>
                        <Icon size={15} />
                      </span>
                      <div>
                        <div className="nx-notif-item__title">{n.title}</div>
                        <div className="nx-notif-item__time">{n.time}</div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

import { useState } from 'react';
import { FiSearch, FiBell, FiMoon, FiSun, FiMenu } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import Avatar from '../Avatar';
import NotificationCenter from '../Notification';

export default function Navbar({ title, onOpenSearch, onToggleMobileSidebar }) {
  const { resolved, toggle } = useTheme();
  const { user } = useAuth();
  const [notifOpen, setNotifOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="nx-navbar" style={{ position: 'relative' }}>
      <div className="nx-navbar__left">
        <button
          className="nx-navbar__icon-btn nx-hide-desktop"
          onClick={onToggleMobileSidebar}
          aria-label="Toggle navigation"
        >
          <FiMenu size={18} />
        </button>
        <span className="nx-navbar__title">{title}</span>
      </div>

      <button className="nx-navbar__search nx-hide-mobile" onClick={onOpenSearch}>
        <FiSearch size={15} />
        <span>Search Nexora...</span>
        <span className="nx-navbar__kbd">Ctrl K</span>
      </button>

      <div className="nx-navbar__right">
        <button
          className="nx-navbar__icon-btn"
          onClick={toggle}
          aria-label="Toggle theme"
        >
          {resolved === 'dark' ? <FiSun size={17} /> : <FiMoon size={17} />}
        </button>
        <button
          className="nx-navbar__icon-btn"
          aria-label="Notifications"
          onClick={() => setNotifOpen((o) => !o)}
        >
          <FiBell size={17} />
          <span className="nx-navbar__badge" />
        </button>
        <NotificationCenter open={notifOpen} onClose={() => setNotifOpen(false)} />
        <button
          type="button"
          className="nx-navbar__profile"
          onClick={() => navigate('/admin')}
          aria-label="Open administration"
          style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
        >
          <Avatar name={user?.name || 'Guest User'} size="sm" />
          <span className="nx-hide-mobile nx-text-secondary" style={{ fontSize: 'var(--fs-sm)', fontWeight: 500 }}>
            {user?.name || 'Guest'}
          </span>
        </button>
      </div>
    </header>
  );
}

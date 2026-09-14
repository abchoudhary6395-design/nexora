import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { navSections } from './navConfig';

export default function Sidebar({ mobileOpen = false, onCloseMobile }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {mobileOpen && <div className="nx-sidebar__overlay" onClick={onCloseMobile} />}

      <aside
        className={clsx(
          'nx-sidebar',
          collapsed && 'nx-sidebar--collapsed',
          mobileOpen && 'nx-sidebar--drawer-open'
        )}
        aria-label="Main navigation"
      >
        <NavLink
          to="/dashboard"
          className="nx-sidebar__brand"
          onClick={onCloseMobile}
          aria-label="Go to dashboard"
        >
          <span className="nx-sidebar__mark">N</span>
          <span>Nexora</span>
          <button
            className="nx-sidebar__close-btn nx-hide-desktop"
            type="button"
            onClick={onCloseMobile}
            aria-label="Close navigation"
          >
            ×
          </button>
        </NavLink>

        <nav className="nx-sidebar__nav">
          {navSections.map((section) => (
            <div key={section.label}>
              <div className="nx-sidebar__section-label">{section.label}</div>
              {section.items.map(({ label, to, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    clsx('nx-sidebar__item', isActive && 'nx-sidebar__item--active')
                  }
                >
                  <span className="nx-sidebar__icon">
                    <Icon size={17} />
                  </span>
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="nx-sidebar__footer">
          <button
            className="nx-sidebar__collapse-btn"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <FiChevronsRight size={16} /> : <FiChevronsLeft size={16} />}
          </button>
        </div>
      </aside>
    </>
  );
}

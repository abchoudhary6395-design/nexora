import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import CommandPalette from '../components/common/CommandPalette';
import { navSections } from '../components/common/Sidebar/navConfig';

function currentPageTitle(pathname) {
  for (const section of navSections) {
    for (const item of section.items) {
      if (pathname.startsWith(item.to)) return item.label;
    }
  }
  return 'Nexora';
}

export default function MainLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen((prev) => !prev);
  };

  return (
    <div className="nx-app-shell">
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />
      <div className="nx-app-main">
        <Navbar
          title={currentPageTitle(location.pathname)}
          onToggleMobileSidebar={toggleMobileSidebar}
          onOpenSearch={() => setPaletteOpen(true)}
        />
        <main className="nx-app-content">
          <Outlet />
        </main>
      </div>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}

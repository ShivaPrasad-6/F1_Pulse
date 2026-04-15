import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import PageTransition, { TRANSITION_DURATION_MS } from './PageTransition.jsx';
import watermarkImage from './610ac52f1c6b83936ebe5aaaa5db6f8e.jpg';

const currentYear = new Date().getFullYear();

const navItems = [
  { to: '/', label: 'Highlights' },
  { to: `/current-season-${currentYear}`, label: `Current Season ${currentYear}` },
  { to: '/explorer', label: 'Explorer' },
  { to: '/information', label: 'Information' },
  { to: '/racers', label: 'Racers' },
  { to: '/constructors', label: 'Constructors' },
  { to: '/knowledge', label: 'Knowledge Base & Legends' },
  { to: '/news', label: 'News & Articles' },
];

export default function AppShell() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return undefined;
    }

    setIsTransitioning(true);
    const timeoutId = window.setTimeout(() => {
      setIsTransitioning(false);
    }, TRANSITION_DURATION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [location.pathname]);

  return (
    <div
      className="app-shell"
      style={{
        '--page-watermark': `url("${watermarkImage}")`,
      }}
    >
      {isTransitioning ? <PageTransition /> : null}
      <nav className="top-nav">
        <div className="brand-lockup">
          <span className="brand-mark">F1</span>
          <span>Pulse</span>
        </div>
        <div className="nav-links">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

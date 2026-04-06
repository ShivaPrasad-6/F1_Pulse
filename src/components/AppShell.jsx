import React from 'react';
import { NavLink } from 'react-router-dom';

const currentYear = new Date().getFullYear();

const navItems = [
  { to: '/', label: 'Highlights' },
  { to: `/current-season-${currentYear}`, label: `Current Season ${currentYear}` },
  { to: '/explorer', label: 'Explorer' },
  { to: '/racers', label: 'Racers' },
  { to: '/constructors', label: 'Constructors' },
  { to: '/knowledge', label: 'Knowledge Base & Legends' },
  { to: '/news', label: 'News & Articles' },
];

export default function AppShell({ children }) {
  return (
    <div className="app-shell">
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
      {children}
    </div>
  );
}

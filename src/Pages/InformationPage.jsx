import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const infoNavItems = [
  { to: 'tyres', label: 'Tyres' },
  { to: 'circuits', label: 'Circuits / Tracks' },
  { to: 'controls', label: 'Controls' },
  { to: 'flags', label: 'Flags' },
];

export default function InformationPage() {
  return (
    <>
      <header className="page-hero">
        <p className="eyebrow">Information</p>
        <h1>F1 Technical</h1>
        <p className="hero-copy">
          Use the sidebar to switch between tyre compounds, in-car controls, and race-control flags.
        </p>
      </header>

      <main className="info-layout">
        <aside className="info-sidebar">
          <div className="info-sidebar-links">
            {infoNavItems.map((item) => (
              <NavLink
                key={item.to}
                className={({ isActive }) => (isActive ? 'info-link active' : 'info-link')}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </aside>

        <section className="info-content panel">
          <Outlet />
        </section>
      </main>
    </>
  );
}

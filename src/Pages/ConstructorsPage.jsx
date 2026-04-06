import React from 'react';
import { useCurrentSeasonData } from '../hooks/useCurrentSeasonData.js';

export default function ConstructorsPage() {
  const { dashboard, loading } = useCurrentSeasonData();

  return (
    <>
      <header className="page-hero">
        <h1>Current team standings</h1>
        <p className="hero-copy">
          Review how teams compare in the current championship and how the constructor battle is evolving this season.
        </p>
      </header>
      <main className="content-grid">
        <section className="panel panel-wide">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Constructors</p>
              <h2>Team standings</h2>
            </div>
          </div>
          {loading ? (
            <p className="muted">Loading constructor standings...</p>
          ) : (
            <div className="compact-list">
              {dashboard.constructorStandings.slice(0, 10).map((team) => (
                <article className="compact-item" key={team.position}>
                  <span>{team.position}. {team.Constructor.name}</span>
                  <strong>{team.points} pts</strong>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useCurrentSeasonData } from '../hooks/useCurrentSeasonData.js';
import { formatDate } from '../utils/formatters.js';

const currentYear = new Date().getFullYear();

export default function HomePage() {
  const { dashboard, loading, errors } = useCurrentSeasonData();
  const completedRaces = dashboard.races.filter((race) => new Date(race.date) < new Date());
  const upcomingRaces = dashboard.races.filter((race) => new Date(race.date) >= new Date());
  const pointsTrend = dashboard.driverStandings.slice(0, 8).map((driver) => ({
    name: driver.Driver.familyName,
    points: Number(driver.points),
  }));
  const headlineRace = upcomingRaces[0] ?? completedRaces[completedRaces.length - 1];

  return (
    <>
      <header className="hero">
        <div>
          <p className="eyebrow">Season Highlights</p>
          <h1>Highlights of the {currentYear} Formula 1 season</h1>
          <p className="hero-copy">
            Start with the key title fight signals, the next headline race, and the most important current-season movements across the grid.
          </p>
        </div>
        <div className="hero-panel">
          <div className="metric-card">
            <span>Completed races</span>
            <strong>{completedRaces.length}</strong>
          </div>
          <div className="metric-card">
            <span>Upcoming races</span>
            <strong>{upcomingRaces.length}</strong>
          </div>
          <div className="metric-card">
            <span>Current leader points</span>
            <strong>{dashboard.driverStandings[0]?.points ?? '0'}</strong>
          </div>
        </div>
      </header>

      {errors.length > 0 && (
        <section className="status-strip">
          {errors.map((error) => (
            <span key={error}>{error}</span>
          ))}
        </section>
      )}

      <main className="content-grid">
        <section className="panel panel-wide">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Title race</p>
              <h2>Driver championship snapshot</h2>
            </div>
          </div>
          {loading ? (
            <p className="muted">Loading season highlights...</p>
          ) : (
            <div className="split-layout">
              <div className="standings-list">
                {dashboard.driverStandings.slice(0, 5).map((driver) => (
                  <article className="standings-row" key={driver.position}>
                    <div>
                      <span className="rank">{driver.position}</span>
                      <div>
                        <h3>{driver.Driver.givenName} {driver.Driver.familyName}</h3>
                        <p>{driver.Constructors?.[0]?.name}</p>
                      </div>
                    </div>
                    <strong>{driver.points} pts</strong>
                  </article>
                ))}
              </div>
              <div className="chart-panel">
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={pointsTrend}>
                    <defs>
                      <linearGradient id="highlightsFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ff4d4d" stopOpacity={0.75} />
                        <stop offset="95%" stopColor="#ff4d4d" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                    <XAxis dataKey="name" stroke="#d6d6d6" />
                    <YAxis stroke="#d6d6d6" />
                    <Tooltip />
                    <Area type="monotone" dataKey="points" stroke="#ff4d4d" fill="url(#highlightsFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Headline weekend</p>
              <h2>{headlineRace?.raceName ?? 'Season calendar'}</h2>
            </div>
          </div>
          {headlineRace ? (
            <div className="compact-list">
              <article className="compact-item tall">
                <div>
                  <strong>{headlineRace.Circuit.circuitName}</strong>
                  <p>{headlineRace.Circuit.Location.locality}, {headlineRace.Circuit.Location.country}</p>
                </div>
                <span>{formatDate(headlineRace.date)}</span>
              </article>
            </div>
          ) : (
            <p className="muted">No race information available.</p>
          )}
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Recent momentum</p>
              <h2>Top constructors</h2>
            </div>
          </div>
          <div className="compact-list">
            {dashboard.constructorStandings.slice(0, 5).map((team) => (
              <article className="compact-item" key={team.position}>
                <span>{team.position}. {team.Constructor.name}</span>
                <strong>{team.points} pts</strong>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

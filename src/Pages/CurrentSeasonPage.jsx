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

export default function CurrentSeasonPage() {
  const { dashboard, loading, errors } = useCurrentSeasonData();
  const completedRaces = dashboard.races.filter((race) => new Date(race.date) < new Date());
  const upcomingRaces = dashboard.races.filter((race) => new Date(race.date) >= new Date());
  const pointsTrend = dashboard.driverStandings.slice(0, 8).map((driver) => ({
    name: driver.Driver.familyName,
    points: Number(driver.points),
  }));

  return (
    <>
      <header className="hero">
        <div>
          <h1>Current season {currentYear} championship</h1>
          <p className="hero-copy">
            Track live championship standings, upcoming rounds, completed races, and the current driver title fight in a dedicated season view.
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
            <span>Championship seasons</span>
            <strong>{currentYear - 1949}</strong>
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
              <p className="eyebrow">Current championship</p>
              <h2>Driver standings</h2>
            </div>
          </div>
          {loading ? (
            <p className="muted">Loading current standings...</p>
          ) : (
            <div className="split-layout">
              <div className="standings-list">
                {dashboard.driverStandings.slice(0, 10).map((driver) => (
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
                      <linearGradient id="pointsFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ff4d4d" stopOpacity={0.75} />
                        <stop offset="95%" stopColor="#ff4d4d" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                    <XAxis dataKey="name" stroke="#d6d6d6" />
                    <YAxis stroke="#d6d6d6" />
                    <Tooltip />
                    <Area type="monotone" dataKey="points" stroke="#ff4d4d" fill="url(#pointsFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Calendar</p>
              <h2>Next rounds</h2>
            </div>
          </div>
          <div className="calendar-list">
            {dashboard.races.slice(0, 12).map((race) => (
              <article className="calendar-item" key={`${race.season}-${race.round}`}>
                <div>
                  <h3>{race.raceName}</h3>
                  <p>{race.Circuit.circuitName}</p>
                </div>
                <span>{formatDate(race.date)}</span>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

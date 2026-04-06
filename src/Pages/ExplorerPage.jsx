import React from 'react';
import { strategyPrinciples } from '../data/f1History.js';
import { useSeasonExplorer } from '../hooks/useSeasonExplorer.js';
import { formatDate } from '../utils/formatters.js';

const currentYear = new Date().getFullYear();
const seasonOptions = Array.from({ length: currentYear - 1949 }, (_, index) => String(currentYear - index));

export default function ExplorerPage() {
  const {
    season,
    setSeason,
    seasonData,
    selectedRound,
    setSelectedRound,
    raceWeekend,
    strategy,
    seasonLoading,
    weekendLoading,
    strategyLoading,
    selectedRace,
  } = useSeasonExplorer(String(currentYear));

  return (
    <>
      <header className="page-hero">
        <h1>Historic seasons</h1>
        <p className="hero-copy">
          Browse completed seasons, inspect race weekends, and review public stint data and tactical patterns where detailed telemetry exists.
        </p>
      </header>

      <main className="content-grid">
        <section className="panel panel-full">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Season explorer</p>
              <h2>Archive browser</h2>
            </div>
            <div className="filters">
              <label>
                Season
                <select value={season} onChange={(event) => setSeason(event.target.value)}>
                  {seasonOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label>
                Race
                <select value={selectedRound} onChange={(event) => setSelectedRound(event.target.value)}>
                  {seasonData.races.map((race) => (
                    <option key={race.round} value={race.round}>
                      {race.round}. {race.raceName}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          {seasonLoading ? (
            <p className="muted">Loading season archive...</p>
          ) : (
            <div className="season-layout">
              <div className="detail-stack">
                <article className="subpanel">
                  <h3>Season standings</h3>
                  <div className="compact-list">
                    {seasonData.driverStandings.slice(0, 8).map((entry) => (
                      <article className="compact-item" key={entry.position}>
                        <span>{entry.position}. {entry.Driver.givenName} {entry.Driver.familyName}</span>
                        <strong>{entry.points}</strong>
                      </article>
                    ))}
                  </div>
                </article>
                <article className="subpanel">
                  <h3>Selected race</h3>
                  {selectedRace ? (
                    <div className="race-meta">
                      <p><strong>{selectedRace.raceName}</strong></p>
                      <p>{selectedRace.Circuit.circuitName}, {selectedRace.Circuit.Location.locality}</p>
                      <p>{formatDate(selectedRace.date)}</p>
                    </div>
                  ) : (
                    <p className="muted">No race selected.</p>
                  )}
                </article>
                <article className="subpanel">
                  <h3>Circuits in season</h3>
                  <div className="compact-list">
                    {seasonData.races.slice(0, 10).map((race) => (
                      <article className="compact-item" key={race.round}>
                        <span>{race.Circuit.circuitName}</span>
                        <strong>{race.Circuit.Location.country}</strong>
                      </article>
                    ))}
                  </div>
                </article>
              </div>

              <div className="detail-stack">
                <article className="subpanel">
                  <h3>Race classification</h3>
                  {weekendLoading ? (
                    <p className="muted">Loading race results...</p>
                  ) : (
                    <div className="results-table">
                      {raceWeekend.results.slice(0, 10).map((result) => (
                        <div className="result-row" key={`${result.position}-${result.Driver.driverId}`}>
                          <span>{result.position}</span>
                          <span>{result.Driver.givenName} {result.Driver.familyName}</span>
                          <span>{result.Constructors?.[0]?.name}</span>
                          <strong>{result.points} pts</strong>
                        </div>
                      ))}
                    </div>
                  )}
                </article>
                <article className="subpanel">
                  <h3>Qualifying</h3>
                  <div className="results-table">
                    {raceWeekend.qualifying.slice(0, 8).map((result) => (
                      <div className="result-row" key={`${result.position}-${result.Driver.driverId}`}>
                        <span>P{result.position}</span>
                        <span>{result.Driver.givenName} {result.Driver.familyName}</span>
                        <span>{result.Q3 || result.Q2 || result.Q1 || 'No time'}</span>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </div>
          )}
        </section>

        <section className="panel panel-full">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Strategy and tactics</p>
              <h2>Driver strategies and team execution</h2>
            </div>
          </div>
          <div className="season-layout">
            <article className="subpanel">
              <h3>Core strategy principles</h3>
              <div className="insight-list">
                {strategyPrinciples.map((principle) => (
                  <p key={principle}>{principle}</p>
                ))}
              </div>
            </article>
            <article className="subpanel">
              <h3>Detailed strategy view</h3>
              {Number(season) < 2023 ? (
                <p className="muted">Detailed public stint telemetry is limited for older seasons. Use 2023 onward for richer strategy data.</p>
              ) : strategyLoading ? (
                <p className="muted">Loading strategy telemetry...</p>
              ) : strategy.length === 0 ? (
                <p className="muted">No detailed stint data found for this race.</p>
              ) : (
                <div className="results-table">
                  {strategy.slice(0, 12).map((entry) => (
                    <div className="result-row strategy-row" key={entry.driverNumber}>
                      <span>{entry.driverName}</span>
                      <span>{entry.teamName}</span>
                      <span>{entry.pitStops} stops</span>
                      <strong>{entry.compounds.join(' -> ')}</strong>
                    </div>
                  ))}
                </div>
              )}
            </article>
          </div>
        </section>

        <section className="panel panel-full">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Season depth</p>
              <h2>Full calendar and constructor table</h2>
            </div>
          </div>
          <div className="season-layout">
            <article className="subpanel">
              <h3>Season calendar</h3>
              <div className="results-table">
                {seasonData.races.map((race) => (
                  <div className="result-row" key={`${race.season}-${race.round}`}>
                    <span>Rnd {race.round}</span>
                    <span>{race.raceName}</span>
                    <span>{race.Circuit.circuitName}</span>
                    <strong>{formatDate(race.date)}</strong>
                  </div>
                ))}
              </div>
            </article>
            <article className="subpanel">
              <h3>Constructor standings</h3>
              <div className="results-table">
                {seasonData.constructorStandings.map((entry) => (
                  <div className="result-row" key={`${entry.position}-${entry.Constructor.constructorId}`}>
                    <span>P{entry.position}</span>
                    <span>{entry.Constructor.name}</span>
                    <span>{entry.wins} wins</span>
                    <strong>{entry.points} pts</strong>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}

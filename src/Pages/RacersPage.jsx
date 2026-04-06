import React from 'react';
import { useRacersData } from '../hooks/useRacersData.js';

function getDriverAge(dateOfBirth) {
  if (!dateOfBirth) {
    return 'Unknown';
  }

  const diff = Date.now() - new Date(dateOfBirth).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

export default function RacersPage() {
  const {
    drivers,
    selectedDriverId,
    setSelectedDriverId,
    selectedDriver,
    driverDetail,
    loading,
    detailLoading,
  } = useRacersData();

  return (
    <>
      <header className="page-hero">
        <h1>Driver profiles and career detail</h1>
        <p className="hero-copy">
          Explore the current grid and inspect each racer’s identity, nationality, team, current season position, and career summary including starts, wins, podiums, poles, titles, and latest result.
        </p>
      </header>

      <main className="content-grid">
        <section className="panel panel-wide">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Current grid</p>
              <h2>Racer directory</h2>
            </div>
          </div>
          {loading ? (
            <p className="muted">Loading racers...</p>
          ) : (
            <div className="racers-grid">
              {drivers.map((driver) => (
                <button
                  key={driver.driverId}
                  className={selectedDriverId === driver.driverId ? 'racer-card active' : 'racer-card'}
                  onClick={() => setSelectedDriverId(driver.driverId)}
                  type="button"
                >
                  <span className="eyebrow small">{driver.currentTeam}</span>
                  <h3>{driver.givenName} {driver.familyName}</h3>
                  <p>{driver.nationality}</p>
                  <div className="racer-stats-row">
                    <strong>P{driver.currentPosition}</strong>
                    <span>{driver.currentPoints} pts</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>{selectedDriver ? `${selectedDriver.givenName} ${selectedDriver.familyName}` : 'Driver details'}</h2>
            </div>
          </div>
          {!selectedDriver ? (
            <p className="muted">Select a racer to inspect details.</p>
          ) : (
            <div className="detail-stack">
              <article className="subpanel">
                {selectedDriver.headshotUrl ? (
                  <div className="driver-image-grid">
                    <div className="driver-image-card">
                      <img
                        className="driver-image-focus-top"
                        src={selectedDriver.headshotUrl}
                        alt={`${selectedDriver.givenName} ${selectedDriver.familyName}`}
                      />
                    </div>
                    <div
                      className="driver-image-card driver-image-card-meta"
                      style={{
                        '--driver-accent': selectedDriver.teamColor ? `#${selectedDriver.teamColor}` : '#ff4d4d',
                      }}
                    >
                      <strong>{selectedDriver.acronym || selectedDriver.code || 'F1'}</strong>
                      <span>{selectedDriver.currentTeam}</span>
                      <span>#{selectedDriver.permanentNumber ?? 'N/A'}</span>
                    </div>
                  </div>
                ) : (
                  <p className="muted">Driver image unavailable.</p>
                )}
              </article>

              <article className="subpanel">
                <h3>Profile</h3>
                <div className="profile-grid">
                  <p><strong>Full name</strong><span>{selectedDriver.givenName} {selectedDriver.familyName}</span></p>
                  <p><strong>Code</strong><span>{selectedDriver.code ?? 'N/A'}</span></p>
                  <p><strong>Permanent number</strong><span>{selectedDriver.permanentNumber ?? 'N/A'}</span></p>
                  <p><strong>Nationality</strong><span>{selectedDriver.nationality}</span></p>
                  <p><strong>Date of birth</strong><span>{selectedDriver.dateOfBirth}</span></p>
                  <p><strong>Age</strong><span>{getDriverAge(selectedDriver.dateOfBirth)}</span></p>
                  <p><strong>Current team</strong><span>{selectedDriver.currentTeam}</span></p>
                  <p><strong>Current standing</strong><span>P{selectedDriver.currentPosition}</span></p>
                </div>
              </article>

              <article className="subpanel">
                <h3>Career summary</h3>
                {detailLoading || !driverDetail ? (
                  <p className="muted">Loading racer history...</p>
                ) : (
                  <div className="profile-grid">
                    <p><strong>Starts</strong><span>{driverDetail.starts}</span></p>
                    <p><strong>Wins</strong><span>{driverDetail.wins}</span></p>
                    <p><strong>Podiums</strong><span>{driverDetail.podiums}</span></p>
                    <p><strong>Poles</strong><span>{driverDetail.poles}</span></p>
                    <p><strong>Titles</strong><span>{driverDetail.titles}</span></p>
                    <p><strong>Seasons</strong><span>{driverDetail.seasons}</span></p>
                    <p><strong>Total points</strong><span>{driverDetail.totalPoints}</span></p>
                    <p><strong>Best finish</strong><span>{driverDetail.bestFinish ? `P${driverDetail.bestFinish}` : 'N/A'}</span></p>
                  </div>
                )}
              </article>

              <article className="subpanel">
                <h3>Latest classified result</h3>
                {detailLoading || !driverDetail?.latestResult ? (
                  <p className="muted">Latest result unavailable.</p>
                ) : (
                  <div className="profile-grid">
                    <p><strong>Season</strong><span>{driverDetail.latestResult.season}</span></p>
                    <p><strong>Race</strong><span>{driverDetail.latestResult.raceName}</span></p>
                    <p><strong>Finish</strong><span>P{driverDetail.latestResult.position}</span></p>
                    <p><strong>Points</strong><span>{driverDetail.latestResult.points}</span></p>
                    <p><strong>Status</strong><span>{driverDetail.latestResult.status}</span></p>
                  </div>
                )}
              </article>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

import React from 'react';
import { useCurrentSeasonData } from '../hooks/useCurrentSeasonData.js';

function normalizeTeamKey(teamName) {
  return (teamName ?? '')
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

const TEAM_STYLES = {
  Ferrari: { primary: '#dc0000', secondary: '#ffcf6e' },
  Mercedes: { primary: '#27f4d2', secondary: '#b8bcc2' },
  McLaren: { primary: '#ff8000', secondary: '#47c7fc' },
  Red_Bull: { primary: '#1e5bc6', secondary: '#ffcc1b' },
  Williams: { primary: '#005aff', secondary: '#8fd3ff' },
  Alpine_F1_Team: { primary: '#ff87bc', secondary: '#00a1e8' },
  Haas_F1_Team: { primary: '#ffffff', secondary: '#e10600' },
  Aston_Martin: { primary: '#006f62', secondary: '#cedc00' },
  Audi: { primary: '#f50537', secondary: '#d9d9d9' },
  Cadillac_F1_Team: { primary: '#0d2b6b', secondary: '#d4af37' },
  RB_F1_Team: { primary: '#6692ff', secondary: '#ffffff' },
};

const TEAM_CAR_IMAGES = {
  Ferrari: 'https://media.formula1.com/image/upload/t_16by9North/c_lfill%2Cw_3392/q_auto/v1740000001/trackside-images/2025/Formula_1_Testing_in_Bahrain___Day_3/2202490999.webp',
  Mercedes: 'https://media.formula1.com/image/upload/t_16by9South/c_lfill%2Cw_3392/q_auto/v1740000001/trackside-images/2025/Formula_1_Testing_in_Bahrain___Day_3/2202532072.webp',
  McLaren: 'https://media.formula1.com/image/upload/t_16by9North/c_lfill%2Cw_3392/q_auto/v1740000001/trackside-images/2025/Formula_1_Testing_in_Bahrain___Day_3/2202523504.webp',
  Alpine_F1_Team: 'https://media.formula1.com/image/upload/t_16by9Centre/c_lfill%2Cw_3392/q_auto/v1740000001/trackside-images/2025/Formula_1_Testing_in_Bahrain___Day_2/2202231035.webp',
  Aston_Martin: 'https://media.formula1.com/image/upload/t_16by9North/c_lfill%2Cw_3392/q_auto/v1740000001/trackside-images/2025/Formula_1_Testing_in_Bahrain___Day_3/2202454622.webp',
  Audi: 'https://media.formula1.com/image/upload/t_16by9North/c_lfill%2Cw_3392/q_auto/v1740000001/trackside-images/2026/Formula_1_Testing_in_Bahrain___Day_1/2262310040.webp',
  Cadillac_F1_Team: 'https://media.formula1.com/image/upload/c_fill%2Cw_352/q_auto/v1740000001/fom-website/2026/Japan/16x9%20single%20image%20-%202026-04-01T162650.157.webp',
  Haas_F1_Team: 'https://media.formula1.com/image/upload/t_16by9North/c_lfill%2Cw_3392/q_auto/v1740000001/trackside-images/2025/Formula_1_Testing_in_Bahrain___Day_3/2202532059.webp',
  RB_F1_Team: 'https://media.formula1.com/image/upload/t_16by9South/c_fill%2Cw_128%2Ch_128/q_auto/v1740000001/trackside-images/2025/F1_Grand_Prix_Of_Australia___Qualifying/2205166400.webp',
  Red_Bull: 'https://media.formula1.com/image/upload/c_lfill%2Cw_3392/q_auto/v1740000001/content/dam/fom-website/manual/DriverAndTeamImages/2024/2053163352_16by9Centre.webp',
  Williams: 'https://media.formula1.com/image/upload/t_16by9South/c_lfill%2Cw_3392/q_auto/v1740000001/trackside-images/2025/Formula_1_Testing_in_Bahrain___Day_3/2202499870.webp',
};

function ConstructorCarVisual({ teamName, styleSet, imageUrl }) {
  if (imageUrl) {
    return (
      <div className="constructor-car-stage constructor-car-stage-image">
        <img className="constructor-car-photo" src={imageUrl} alt={`${teamName} current Formula 1 car`} />
        <div className="constructor-car-image-overlay" />
        <div className="constructor-car-label">{teamName}</div>
      </div>
    );
  }

  return (
    <div
      className="constructor-car-stage"
      style={{
        '--car-primary': styleSet.primary,
        '--car-secondary': styleSet.secondary,
      }}
    >
      <div className="constructor-car-glow" />
      <div className="constructor-car">
        <div className="constructor-car-wing front" />
        <div className="constructor-car-nose" />
        <div className="constructor-car-body">
          <div className="constructor-car-cockpit" />
          <div className="constructor-car-sidepod left" />
          <div className="constructor-car-sidepod right" />
        </div>
        <div className="constructor-car-wing rear" />
        <div className="constructor-car-wheel front-left" />
        <div className="constructor-car-wheel rear-left" />
        <div className="constructor-car-wheel front-right" />
        <div className="constructor-car-wheel rear-right" />
      </div>
      <div className="constructor-car-label">{teamName}</div>
    </div>
  );
}

export default function ConstructorsPage() {
  const { dashboard, loading } = useCurrentSeasonData();
  const [selectedConstructorId, setSelectedConstructorId] = React.useState('');

  React.useEffect(() => {
    if (!selectedConstructorId && dashboard.constructorStandings[0]?.Constructor?.constructorId) {
      setSelectedConstructorId(dashboard.constructorStandings[0].Constructor.constructorId);
    }
  }, [dashboard.constructorStandings, selectedConstructorId]);

  const selectedTeam =
    dashboard.constructorStandings.find(
      (team) => team.Constructor.constructorId === selectedConstructorId,
    ) ?? dashboard.constructorStandings[0];
  const teamKey = normalizeTeamKey(selectedTeam?.Constructor?.name);
  const styleSet = TEAM_STYLES[teamKey] ?? {
    primary: '#ff4d4d',
    secondary: '#d6d6d6',
  };
  const imageUrl = TEAM_CAR_IMAGES[teamKey] ?? '';

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
              <p className="eyebrow">Team standings</p>
            </div>
          </div>
          {loading ? (
            <p className="muted">Loading constructor standings...</p>
          ) : (
            <div className="compact-list">
              {dashboard.constructorStandings.map((team) => (
                <button
                  className={
                    selectedConstructorId === team.Constructor.constructorId
                      ? 'constructor-item active'
                      : 'constructor-item'
                  }
                  key={team.position}
                  onClick={() => setSelectedConstructorId(team.Constructor.constructorId)}
                  type="button"
                >
                  <span>{team.position}. {team.Constructor.name}</span>
                  <strong>{team.points} pts</strong>
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Selected constructor</p>
              <h2>{selectedTeam?.Constructor?.name ?? 'Current F1 car'}</h2>
            </div>
          </div>
          {loading || !selectedTeam ? (
            <p className="muted">Loading constructor details...</p>
          ) : (
            <div className="detail-stack">
              <ConstructorCarVisual teamName={selectedTeam.Constructor.name} styleSet={styleSet} imageUrl={imageUrl} />
              <div className="profile-grid">
                <p><strong>Current position</strong><span>P{selectedTeam.position}</span></p>
                <p><strong>Points</strong><span>{selectedTeam.points}</span></p>
                <p><strong>Wins</strong><span>{selectedTeam.wins}</span></p>
                <p><strong>Nationality</strong><span>{selectedTeam.Constructor.nationality ?? 'N/A'}</span></p>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

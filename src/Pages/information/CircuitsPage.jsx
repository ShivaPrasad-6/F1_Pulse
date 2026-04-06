import React from 'react';
import { getCircuitRecords, getCurrentSeasonCircuits } from '../../services/f1Api.js';
import { formatDate } from '../../utils/formatters.js';

function SectorMap({ circuit }) {
  return (
    <div className="sector-map">
      {circuit.imageUrl ? (
        <img className="circuit-image circuit-image-wide" src={circuit.imageUrl} alt={circuit.circuitName} />
      ) : (
        <div className="circuit-image circuit-image-fallback circuit-image-wide">
          <span>{circuit.circuitName}</span>
        </div>
      )}

      <div className="sector-bands">
        <div className="sector-band sector-one">
          <strong>Sector 1</strong>
          <span>Opening sequence and initial acceleration phase.</span>
        </div>
        <div className="sector-band sector-two">
          <strong>Sector 2</strong>
          <span>Middle sector focused on rhythm, traction, and balance changes.</span>
        </div>
        <div className="sector-band sector-three">
          <strong>Sector 3</strong>
          <span>Final run where exit speed and straight-line efficiency matter most.</span>
        </div>
      </div>
    </div>
  );
}

function RecordsContent({ records, loading }) {
  if (loading) {
    return <p className="muted">Loading circuit records...</p>;
  }

  if (!records) {
    return <p className="muted">Circuit records unavailable.</p>;
  }

  return (
    <div className="profile-grid">
      <p><strong>Total Grands Prix</strong><span>{records.totalGrandsPrix}</span></p>
      <p><strong>Fastest lap</strong><span>{records.fastestLap ? `${records.fastestLap.lapTime} by ${records.fastestLap.driver} (${records.fastestLap.season})` : 'N/A'}</span></p>
      <p><strong>Fastest pole</strong><span>{records.fastestPole ? `${records.fastestPole.lapTime} by ${records.fastestPole.driver} (${records.fastestPole.season})` : 'N/A'}</span></p>
      <p><strong>Most wins</strong><span>{records.mostWins ? `${records.mostWins.driver} (${records.mostWins.wins})` : 'N/A'}</span></p>
    </div>
  );
}

export default function CircuitsPage() {
  const [circuits, setCircuits] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [openCircuitId, setOpenCircuitId] = React.useState('');
  const [openDetailKey, setOpenDetailKey] = React.useState('');
  const [recordsByCircuit, setRecordsByCircuit] = React.useState({});
  const [recordLoadingId, setRecordLoadingId] = React.useState('');

  React.useEffect(() => {
    let active = true;

    async function loadCircuits() {
      try {
        setLoading(true);
        const data = await getCurrentSeasonCircuits();

        if (active) {
          setCircuits(data);
        }
      } catch {
        if (active) {
          setCircuits([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadCircuits();

    return () => {
      active = false;
    };
  }, []);

  async function toggleCircuit(circuitId) {
    const nextCircuitId = openCircuitId === circuitId ? '' : circuitId;
    setOpenCircuitId(nextCircuitId);
    setOpenDetailKey('');

    if (!recordsByCircuit[circuitId]) {
      try {
        setRecordLoadingId(circuitId);
        const records = await getCircuitRecords(circuitId);
        setRecordsByCircuit((previous) => ({ ...previous, [circuitId]: records }));
      } catch {
        setRecordsByCircuit((previous) => ({ ...previous, [circuitId]: null }));
      } finally {
        setRecordLoadingId('');
      }
    }
  }

  return (
    <section className="info-section">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Circuits / Tracks</p>
          <h2>Current season track information</h2>
        </div>
      </div>

      {loading ? (
        <p className="muted">Loading circuit information...</p>
      ) : (
        <div className="circuit-accordion-list">
          {circuits.map((circuit) => {
            const isOpen = openCircuitId === circuit.circuitId;
            const infoKey = `${circuit.circuitId}-info`;
            const recordsKey = `${circuit.circuitId}-records`;
            const infoOpen = openDetailKey === infoKey;
            const recordsOpen = openDetailKey === recordsKey;

            return (
              <article className="circuit-accordion" key={`${circuit.round}-${circuit.circuitId}`}>
                <button className={isOpen ? 'circuit-toggle active' : 'circuit-toggle'} onClick={() => toggleCircuit(circuit.circuitId)} type="button">
                  <div className="circuit-toggle-copy">
                    <strong>{circuit.circuitName}</strong>
                    <span>{circuit.raceName}</span>
                  </div>
                  <span className={isOpen ? 'accordion-arrow active' : 'accordion-arrow'}>⌄</span>
                </button>

                {isOpen ? (
                  <div className="circuit-accordion-body">
                    <SectorMap circuit={circuit} />

                    <div className="nested-accordion-list">
                      <article className="nested-accordion">
                        <button className={infoOpen ? 'nested-toggle active' : 'nested-toggle'} onClick={() => setOpenDetailKey(infoOpen ? '' : infoKey)} type="button">
                          <span>Details and Information</span>
                          <span className={infoOpen ? 'accordion-arrow active' : 'accordion-arrow'}>⌄</span>
                        </button>
                        {infoOpen ? (
                          <div className="nested-content">
                            <div className="profile-grid">
                              <p><strong>Location</strong><span>{circuit.locality}, {circuit.country}</span></p>
                              <p><strong>Date</strong><span>{formatDate(circuit.raceDate)}</span></p>
                              <p><strong>Latitude</strong><span>{circuit.latitude}</span></p>
                              <p><strong>Longitude</strong><span>{circuit.longitude}</span></p>
                              <p><strong>Distance</strong><span>{circuit.trackDistance}</span></p>
                            </div>
                            {circuit.description ? <p className="muted">{circuit.description}</p> : null}
                            {circuit.extract ? <p className="muted">{circuit.extract}</p> : null}
                          </div>
                        ) : null}
                      </article>

                      <article className="nested-accordion">
                        <button className={recordsOpen ? 'nested-toggle active' : 'nested-toggle'} onClick={() => setOpenDetailKey(recordsOpen ? '' : recordsKey)} type="button">
                          <span>Fastest Records on Circuit</span>
                          <span className={recordsOpen ? 'accordion-arrow active' : 'accordion-arrow'}>⌄</span>
                        </button>
                        {recordsOpen ? (
                          <div className="nested-content">
                            <RecordsContent records={recordsByCircuit[circuit.circuitId]} loading={recordLoadingId === circuit.circuitId} />
                          </div>
                        ) : null}
                      </article>
                    </div>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

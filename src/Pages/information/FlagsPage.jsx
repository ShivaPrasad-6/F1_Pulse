import React from 'react';
import { raceControlSignals } from '../../data/f1History.js';

export default function FlagsPage() {
  return (
    <section className="info-section">
      <div className="panel-heading">
        <div>
          <h2>Race control signals and interventions</h2>
        </div>
      </div>
      <div className="info-stack">
        {raceControlSignals.map((signal) => (
          <article className="info-row" key={signal}>
            <div>
              <p>{signal}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

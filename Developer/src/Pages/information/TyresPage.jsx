import React from 'react';
import { tyreCompounds } from '../../data/f1History.js';

export default function TyresPage() {
  return (
    <section className="info-section">
      <div className="panel-heading">
        <div>
          <h2>Pirelli compounds and wet-weather options</h2>
        </div>
      </div>
      <div className="info-card-grid">
        {tyreCompounds.map((tyre) => (
          <article className="info-card" key={tyre.name}>
            <span>{tyre.color}</span>
            <h3>{tyre.name}</h3>
            <p>{tyre.label}</p>
            <p>{tyre.use}</p>
            <div className="chip-row">
              {tyre.traits.map((trait) => (
                <span className="chip" key={trait}>{trait}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

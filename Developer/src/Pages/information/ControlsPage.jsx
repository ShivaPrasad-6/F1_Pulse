import React from 'react';
import { controlConcepts } from '../../data/f1History.js';

export default function ControlsPage() {
  return (
    <section className="info-section">
      <div className="panel-heading">
        <div>
          <h2>In-car tools drivers manage during races</h2>
        </div>
      </div>
      <div className="info-stack">
        {controlConcepts.map((item) => (
          <article className="info-row" key={item.title}>
            <div>
              <strong>{item.title}</strong>
              <p>{item.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

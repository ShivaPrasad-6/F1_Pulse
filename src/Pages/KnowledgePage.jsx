import React from 'react';
import { f1Timeline, legendaryChampions } from '../data/f1History.js';

export default function KnowledgePage() {
  return (
    <>
      <header className="page-hero">
        <h1>Formula 1 history and legendary champions</h1>
        <p className="hero-copy">
          A concise reference spanning the sport from 1950 to today, with key technical and competitive shifts plus benchmark champions.
        </p>
      </header>
      <main className="content-grid">
        <section className="panel panel-wide">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Knowledge base</p>
              <h2>Formula 1 from the beginning</h2>
            </div>
          </div>
          <div className="history-grid">
            {f1Timeline.map((entry) => (
              <article className="history-card" key={entry.era}>
                <span>{entry.era}</span>
                <h3>{entry.title}</h3>
                <p>{entry.summary}</p>
                <div className="chip-row">
                  {entry.highlights.map((highlight) => (
                    <span className="chip" key={highlight}>{highlight}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Legends</p>
              <h2>Champion reference</h2>
            </div>
          </div>
          <div className="compact-list">
            {legendaryChampions.map((champion) => (
              <article className="compact-item tall" key={champion.name}>
                <div>
                  <strong>{champion.name}</strong>
                  <p>{champion.note}</p>
                </div>
                <span>{champion.titles} titles</span>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

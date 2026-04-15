import React from 'react';
import { useCurrentSeasonData } from '../hooks/useCurrentSeasonData.js';
import { formatDate } from '../utils/formatters.js';

export default function NewsPage() {
  const { articles, loading, errors } = useCurrentSeasonData();
  const featuredArticle = articles[0];
  const remainingArticles = articles.slice(1);

  return (
    <>
      <header className="page-hero">
        <h1>Formula 1 News</h1>
        <p className="hero-copy">
          A separate news section for current F1 coverage, with fallback editorial content if the live feed is unavailable.
        </p>
      </header>
      {errors.length > 0 && (
        <section className="status-strip">
          {errors.map((error) => (
            <span key={error}>{error}</span>
          ))}
        </section>
      )}
      <main className="content-grid">
        <section className="panel panel-full">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">News and articles</p>
              <h2>Latest stories</h2>
            </div>
          </div>
          {loading ? (
            <p className="muted">Loading articles...</p>
          ) : (
            <div className="detail-stack">
              {featuredArticle ? (
                <a
                  className="article-card article-card-featured"
                  href={featuredArticle.link}
                  key={`${featuredArticle.link}-${featuredArticle.title}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{featuredArticle.source}</span>
                  <h3>{featuredArticle.title}</h3>
                  <p>{featuredArticle.description}</p>
                  <strong>{formatDate(featuredArticle.publishedAt)}</strong>
                </a>
              ) : null}
              <div className="article-grid">
                {remainingArticles.map((article) => (
                  <a className="article-card" href={article.link} key={`${article.link}-${article.title}`} target="_blank" rel="noreferrer">
                    <span>{article.source}</span>
                    <h3>{article.title}</h3>
                    <p>{article.description}</p>
                    <strong>{formatDate(article.publishedAt)}</strong>
                  </a>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

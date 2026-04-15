import React from 'react';
import { fallbackArticles } from '../data/f1History.js';
import { getCurrentSeasonSummary, getLatestArticles } from '../services/f1Api.js';

export function useCurrentSeasonData() {
  const [dashboard, setDashboard] = React.useState({
    races: [],
    driverStandings: [],
    constructorStandings: [],
  });
  const [articles, setArticles] = React.useState(fallbackArticles);
  const [loading, setLoading] = React.useState(true);
  const [errors, setErrors] = React.useState([]);

  React.useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        const [summary, news] = await Promise.allSettled([
          getCurrentSeasonSummary(),
          getLatestArticles(),
        ]);

        if (!active) {
          return;
        }

        const nextErrors = [];

        if (summary.status === 'fulfilled') {
          setDashboard(summary.value);
        } else {
          nextErrors.push('Current season data is temporarily unavailable.');
        }

        if (news.status === 'fulfilled' && news.value.length > 0) {
          setArticles(news.value);
        } else {
          nextErrors.push('Live news feed failed, fallback editorial articles are shown.');
        }

        setErrors(nextErrors);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  return { dashboard, articles, loading, errors };
}

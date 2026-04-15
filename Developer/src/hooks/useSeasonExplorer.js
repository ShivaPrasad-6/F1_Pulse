import React from 'react';
import { getDetailedStrategy, getRaceWeekend, getSeasonData } from '../services/f1Api.js';

export function useSeasonExplorer(initialSeason) {
  const [season, setSeason] = React.useState(initialSeason);
  const [seasonData, setSeasonData] = React.useState({ races: [], driverStandings: [], constructorStandings: [] });
  const [selectedRound, setSelectedRound] = React.useState('');
  const [raceWeekend, setRaceWeekend] = React.useState({ results: [], qualifying: [], sprint: [] });
  const [strategy, setStrategy] = React.useState([]);
  const [seasonLoading, setSeasonLoading] = React.useState(true);
  const [weekendLoading, setWeekendLoading] = React.useState(false);
  const [strategyLoading, setStrategyLoading] = React.useState(false);

  React.useEffect(() => {
    let active = true;

    async function loadSeason() {
      try {
        setSeasonLoading(true);
        const data = await getSeasonData(season);

        if (!active) {
          return;
        }

        setSeasonData(data);
        setSelectedRound(data.races?.[0]?.round ?? '');
      } catch {
        if (active) {
          setSeasonData({ races: [], driverStandings: [], constructorStandings: [] });
          setSelectedRound('');
        }
      } finally {
        if (active) {
          setSeasonLoading(false);
        }
      }
    }

    loadSeason();

    return () => {
      active = false;
    };
  }, [season]);

  React.useEffect(() => {
    if (!selectedRound) {
      return;
    }

    let active = true;

    async function loadWeekend() {
      try {
        setWeekendLoading(true);
        const data = await getRaceWeekend(season, selectedRound);

        if (active) {
          setRaceWeekend(data);
        }
      } catch {
        if (active) {
          setRaceWeekend({ results: [], qualifying: [], sprint: [] });
        }
      } finally {
        if (active) {
          setWeekendLoading(false);
        }
      }
    }

    loadWeekend();

    return () => {
      active = false;
    };
  }, [season, selectedRound]);

  React.useEffect(() => {
    const race = seasonData.races.find((item) => item.round === selectedRound);

    if (!race || Number(season) < 2023) {
      setStrategy([]);
      return;
    }

    let active = true;

    async function loadStrategy() {
      try {
        setStrategyLoading(true);
        const data = await getDetailedStrategy({ ...race, season });

        if (active) {
          setStrategy(data);
        }
      } catch {
        if (active) {
          setStrategy([]);
        }
      } finally {
        if (active) {
          setStrategyLoading(false);
        }
      }
    }

    loadStrategy();

    return () => {
      active = false;
    };
  }, [season, selectedRound, seasonData.races]);

  const selectedRace = React.useMemo(
    () => seasonData.races.find((race) => race.round === selectedRound),
    [seasonData.races, selectedRound],
  );

  return {
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
  };
}

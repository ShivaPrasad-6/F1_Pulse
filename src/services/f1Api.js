const JOLPICA_BASE = 'https://api.jolpi.ca/ergast/f1';
const OPEN_F1_BASE = 'https://api.openf1.org/v1';
const NEWS_FEED =
  'https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss/search?q=Formula%201';

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

function normalizeRaceName(raceName) {
  return raceName
    .toLowerCase()
    .replace('grand prix', '')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function getCurrentSeasonSummary() {
  const [scheduleData, driverStandingsData, constructorStandingsData] = await Promise.all([
    fetchJson(`${JOLPICA_BASE}/current.json`),
    fetchJson(`${JOLPICA_BASE}/current/driverStandings.json`),
    fetchJson(`${JOLPICA_BASE}/current/constructorStandings.json`),
  ]);

  const races = scheduleData.MRData.RaceTable.Races ?? [];
  const driverStandings =
    driverStandingsData.MRData.StandingsTable.StandingsLists?.[0]?.DriverStandings ?? [];
  const constructorStandings =
    constructorStandingsData.MRData.StandingsTable.StandingsLists?.[0]?.ConstructorStandings ?? [];

  return { races, driverStandings, constructorStandings };
}

export async function getSeasonData(season) {
  const [scheduleData, driverStandingsData, constructorStandingsData] = await Promise.all([
    fetchJson(`${JOLPICA_BASE}/${season}.json`),
    fetchJson(`${JOLPICA_BASE}/${season}/driverStandings.json`),
    fetchJson(`${JOLPICA_BASE}/${season}/constructorStandings.json`),
  ]);

  return {
    races: scheduleData.MRData.RaceTable.Races ?? [],
    driverStandings:
      driverStandingsData.MRData.StandingsTable.StandingsLists?.[0]?.DriverStandings ?? [],
    constructorStandings:
      constructorStandingsData.MRData.StandingsTable.StandingsLists?.[0]?.ConstructorStandings ?? [],
  };
}

function getWikipediaTitleFromUrl(url) {
  if (!url) {
    return '';
  }

  const marker = '/wiki/';
  const index = url.indexOf(marker);
  if (index === -1) {
    return '';
  }

  return decodeURIComponent(url.slice(index + marker.length));
}

async function getWikipediaSummary(title) {
  if (!title) {
    return null;
  }

  try {
    const summary = await fetchJson(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`);
    return {
      imageUrl: summary.thumbnail?.source ?? summary.originalimage?.source ?? '',
      extract: summary.extract ?? '',
      description: summary.description ?? '',
    };
  } catch {
    return null;
  }
}

export async function getCurrentSeasonCircuits() {
  const currentSeason = new Date().getFullYear();
  const seasonData = await getSeasonData(String(currentSeason));

  const circuits = await Promise.all(
    (seasonData.races ?? []).map(async (race) => {
      const wikipediaTitle = getWikipediaTitleFromUrl(race.Circuit?.url);
      const wikiSummary = await getWikipediaSummary(wikipediaTitle);

      return {
        raceName: race.raceName,
        round: race.round,
        circuitId: race.Circuit.circuitId,
        circuitName: race.Circuit.circuitName,
        locality: race.Circuit.Location.locality,
        country: race.Circuit.Location.country,
        latitude: race.Circuit.Location.lat,
        longitude: race.Circuit.Location.long,
        raceDate: race.date,
        imageUrl: wikiSummary?.imageUrl ?? '',
        description: wikiSummary?.description ?? '',
        extract: wikiSummary?.extract ?? '',
        trackDistance: 'Official lap distance not available from current source',
      };
    }),
  );

  return circuits;
}

function parseLapTimeToMilliseconds(lapTime) {
  if (!lapTime || !lapTime.includes(':')) {
    return Number.POSITIVE_INFINITY;
  }

  const [minutes, seconds] = lapTime.split(':');
  return (Number(minutes) * 60 + Number(seconds)) * 1000;
}

export async function getCircuitRecords(circuitId) {
  const [resultsData, qualifyingData] = await Promise.all([
    fetchJson(`${JOLPICA_BASE}/circuits/${circuitId}/results.json?limit=500`),
    fetchJson(`${JOLPICA_BASE}/circuits/${circuitId}/qualifying.json?limit=300`),
  ]);

  const races = resultsData.MRData.RaceTable.Races ?? [];
  const qualifyingRaces = qualifyingData.MRData.RaceTable.Races ?? [];

  let fastestLap = null;
  for (const race of races) {
    for (const result of race.Results ?? []) {
      const lapTime = result.FastestLap?.Time?.time;
      if (!lapTime) {
        continue;
      }

      const candidate = {
        lapTime,
        milliseconds: parseLapTimeToMilliseconds(lapTime),
        driver: `${result.Driver.givenName} ${result.Driver.familyName}`,
        constructor: result.Constructors?.[0]?.name ?? 'Unknown',
        season: race.season,
        raceName: race.raceName,
      };

      if (!fastestLap || candidate.milliseconds < fastestLap.milliseconds) {
        fastestLap = candidate;
      }
    }
  }

  let fastestPole = null;
  for (const race of qualifyingRaces) {
    const pole = (race.QualifyingResults ?? []).find((entry) => entry.position === '1');
    const poleTime = pole?.Q3 || pole?.Q2 || pole?.Q1;
    if (!pole || !poleTime) {
      continue;
    }

    const candidate = {
      lapTime: poleTime,
      milliseconds: parseLapTimeToMilliseconds(poleTime),
      driver: `${pole.Driver.givenName} ${pole.Driver.familyName}`,
      constructor: pole.Constructors?.[0]?.name ?? 'Unknown',
      season: race.season,
      raceName: race.raceName,
    };

    if (!fastestPole || candidate.milliseconds < fastestPole.milliseconds) {
      fastestPole = candidate;
    }
  }

  const winsMap = {};
  for (const race of races) {
    const winner = (race.Results ?? []).find((result) => result.position === '1');
    if (winner) {
      const driverName = `${winner.Driver.givenName} ${winner.Driver.familyName}`;
      winsMap[driverName] = (winsMap[driverName] ?? 0) + 1;
    }
  }

  const mostWins = Object.entries(winsMap)
    .map(([driver, wins]) => ({ driver, wins }))
    .sort((left, right) => right.wins - left.wins)[0] ?? null;

  return {
    totalGrandsPrix: races.length,
    fastestLap,
    fastestPole,
    mostWins,
  };
}

export async function getRaceWeekend(season, round) {
  const [resultsData, qualifyingData, sprintData] = await Promise.allSettled([
    fetchJson(`${JOLPICA_BASE}/${season}/${round}/results.json`),
    fetchJson(`${JOLPICA_BASE}/${season}/${round}/qualifying.json`),
    fetchJson(`${JOLPICA_BASE}/${season}/${round}/sprint.json`),
  ]);

  return {
    results:
      resultsData.status === 'fulfilled'
        ? resultsData.value.MRData.RaceTable.Races?.[0]?.Results ?? []
        : [],
    qualifying:
      qualifyingData.status === 'fulfilled'
        ? qualifyingData.value.MRData.RaceTable.Races?.[0]?.QualifyingResults ?? []
        : [],
    sprint:
      sprintData.status === 'fulfilled'
        ? sprintData.value.MRData.RaceTable.Races?.[0]?.SprintResults ?? []
        : [],
  };
}

export async function getDetailedStrategy(race) {
  if (!race?.season || !race?.raceName) {
    return [];
  }

  const meetings = await fetchJson(`${OPEN_F1_BASE}/meetings?year=${race.season}`);
  const normalizedRaceName = normalizeRaceName(race.raceName);
  const meeting = meetings.find((entry) =>
    normalizeRaceName(entry.meeting_name).includes(normalizedRaceName),
  );

  if (!meeting) {
    return [];
  }

  const sessions = await fetchJson(`${OPEN_F1_BASE}/sessions?meeting_key=${meeting.meeting_key}`);
  const raceSession = sessions.find((session) => session.session_name === 'Race');

  if (!raceSession) {
    return [];
  }

  const [stints, pitStops, drivers] = await Promise.all([
    fetchJson(`${OPEN_F1_BASE}/stints?session_key=${raceSession.session_key}`),
    fetchJson(`${OPEN_F1_BASE}/pit?session_key=${raceSession.session_key}`),
    fetchJson(`${OPEN_F1_BASE}/drivers?session_key=${raceSession.session_key}`),
  ]);

  const driverMap = new Map(drivers.map((driver) => [driver.driver_number, driver]));
  const pitCounts = pitStops.reduce((accumulator, stop) => {
    accumulator[stop.driver_number] = (accumulator[stop.driver_number] ?? 0) + 1;
    return accumulator;
  }, {});

  const grouped = stints.reduce((accumulator, stint) => {
    const key = stint.driver_number;
    if (!accumulator[key]) {
      accumulator[key] = [];
    }
    accumulator[key].push(stint);
    return accumulator;
  }, {});

  return Object.entries(grouped)
    .map(([driverNumber, driverStints]) => {
      const driver = driverMap.get(Number(driverNumber));
      const totalLaps = driverStints.reduce((sum, stint) => sum + (stint.lap_end - stint.lap_start + 1), 0);
      const compounds = driverStints.map((stint) => stint.compound);
      return {
        driverNumber,
        driverName: driver ? `${driver.first_name} ${driver.last_name}` : `#${driverNumber}`,
        teamName: driver?.team_name ?? 'Unknown',
        stintCount: driverStints.length,
        pitStops: pitCounts[driverNumber] ?? 0,
        totalLaps,
        openingCompound: compounds[0] ?? 'Unknown',
        compounds,
      };
    })
    .sort((left, right) => right.totalLaps - left.totalLaps);
}

export async function getLatestArticles() {
  const data = await fetchJson(NEWS_FEED);
  return (data.items ?? []).slice(0, 8).map((item) => ({
    title: item.title,
    source: item.author || item.source || 'Formula 1 News',
    publishedAt: item.pubDate,
    description: item.description?.replace(/<[^>]+>/g, '').trim() ?? '',
    link: item.link,
  }));
}

export async function getCurrentDrivers() {
  const data = await fetchJson(`${JOLPICA_BASE}/current/drivers.json`);
  return data.MRData.DriverTable.Drivers ?? [];
}

export async function getCurrentDriverMedia() {
  const drivers = await fetchJson(`${OPEN_F1_BASE}/drivers?session_key=latest`);

  return drivers.map((driver) => ({
    driverNumber: String(driver.driver_number),
    fullName: `${driver.first_name} ${driver.last_name}`,
    teamName: driver.team_name,
    teamColor: driver.team_colour,
    headshotUrl: driver.headshot_url,
    acronym: driver.name_acronym,
  }));
}

export async function getDriverCareerSummary(driverId) {
  const [resultsData, qualifyingData, standingsData] = await Promise.all([
    fetchJson(`${JOLPICA_BASE}/drivers/${driverId}/results.json?limit=1000`),
    fetchJson(`${JOLPICA_BASE}/drivers/${driverId}/qualifying.json?limit=1000`),
    fetchJson(`${JOLPICA_BASE}/drivers/${driverId}/driverStandings.json?limit=200`),
  ]);

  const resultsRaces = resultsData.MRData.RaceTable.Races ?? [];
  const qualifyingRaces = qualifyingData.MRData.RaceTable.Races ?? [];
  const standingsLists = standingsData.MRData.StandingsTable.StandingsLists ?? [];

  const resultEntries = resultsRaces.flatMap((race) =>
    (race.Results ?? []).map((result) => ({
      season: race.season,
      raceName: race.raceName,
      result,
    })),
  );

  const qualifyingEntries = qualifyingRaces.flatMap((race) =>
    (race.QualifyingResults ?? []).map((result) => ({
      season: race.season,
      raceName: race.raceName,
      result,
    })),
  );

  const starts = resultEntries.length;
  const wins = resultEntries.filter((entry) => entry.result.position === '1').length;
  const podiums = resultEntries.filter((entry) => Number(entry.result.position) <= 3).length;
  const poles = qualifyingEntries.filter((entry) => entry.result.position === '1').length;
  const totalPoints = resultEntries.reduce((sum, entry) => sum + Number(entry.result.points || 0), 0);
  const titles = standingsLists.filter((list) => list.DriverStandings?.[0]?.position === '1').length;
  const seasons = new Set(resultEntries.map((entry) => entry.season));
  const bestFinish = resultEntries.reduce((best, entry) => {
    const finish = Number(entry.result.position);
    if (!Number.isFinite(finish)) {
      return best;
    }
    return Math.min(best, finish);
  }, Number.POSITIVE_INFINITY);

  const latestResult = resultEntries[resultEntries.length - 1];

  return {
    starts,
    wins,
    podiums,
    poles,
    titles,
    seasons: seasons.size,
    totalPoints: Number(totalPoints.toFixed(1)),
    bestFinish: Number.isFinite(bestFinish) ? bestFinish : null,
    latestResult: latestResult
      ? {
          season: latestResult.season,
          raceName: latestResult.raceName,
          position: latestResult.result.position,
          points: latestResult.result.points,
          status: latestResult.result.status,
        }
      : null,
  };
}

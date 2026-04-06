import React from 'react';
import { getCurrentDrivers, getCurrentSeasonSummary, getDriverCareerSummary } from '../services/f1Api.js';

export function useRacersData() {
  const [drivers, setDrivers] = React.useState([]);
  const [selectedDriverId, setSelectedDriverId] = React.useState('');
  const [driverDetail, setDriverDetail] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [detailLoading, setDetailLoading] = React.useState(false);

  React.useEffect(() => {
    let active = true;

    async function loadDrivers() {
      try {
        setLoading(true);
        const [driversData, seasonSummary] = await Promise.all([
          getCurrentDrivers(),
          getCurrentSeasonSummary(),
        ]);

        if (!active) {
          return;
        }

        const standingsMap = new Map(
          (seasonSummary.driverStandings ?? []).map((entry) => [entry.Driver.driverId, entry]),
        );

        const enrichedDrivers = driversData.map((driver) => {
          const standing = standingsMap.get(driver.driverId);
          return {
            ...driver,
            currentTeam: standing?.Constructors?.[0]?.name ?? 'Unknown',
            currentPosition: standing?.position ?? '-',
            currentPoints: standing?.points ?? '0',
            currentWins: standing?.wins ?? '0',
          };
        });

        setDrivers(enrichedDrivers);
        setSelectedDriverId(enrichedDrivers[0]?.driverId ?? '');
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadDrivers();

    return () => {
      active = false;
    };
  }, []);

  React.useEffect(() => {
    if (!selectedDriverId) {
      return;
    }

    let active = true;

    async function loadDetail() {
      try {
        setDetailLoading(true);
        const summary = await getDriverCareerSummary(selectedDriverId);

        if (active) {
          setDriverDetail(summary);
        }
      } catch {
        if (active) {
          setDriverDetail(null);
        }
      } finally {
        if (active) {
          setDetailLoading(false);
        }
      }
    }

    loadDetail();

    return () => {
      active = false;
    };
  }, [selectedDriverId]);

  const selectedDriver = React.useMemo(
    () => drivers.find((driver) => driver.driverId === selectedDriverId) ?? null,
    [drivers, selectedDriverId],
  );

  return {
    drivers,
    selectedDriverId,
    setSelectedDriverId,
    selectedDriver,
    driverDetail,
    loading,
    detailLoading,
  };
}

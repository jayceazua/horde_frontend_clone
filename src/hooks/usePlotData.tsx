import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useTombFinance from './useTombFinance';
import config from '../config';

const usePlotData = (id: string) => {
  const [plots, setPlots] = useState();
  const tombFinance = useTombFinance();
  const isUnlocked = tombFinance?.isUnlocked;
  const fetchPlots = useCallback(async () => {
    setPlots(await tombFinance.getPlotData(id));
  }, [tombFinance.myAccount]);
  useEffect(() => {
    if (isUnlocked) {
      fetchPlots().catch((err) => console.error(`Failed to fetch Plots Data: ${err.stack}`));
      let refreshInterval = setInterval(fetchPlots, config.refreshInterval);
      return () => clearInterval(refreshInterval);
    }
  }, [isUnlocked, fetchPlots, tombFinance]);

  return plots;
};

export default usePlotData;

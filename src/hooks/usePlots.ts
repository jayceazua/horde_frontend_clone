import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useTombFinance from './useTombFinance';
import config from '../config';

const usePlots = () => {
  const [plots, setPlots] = useState();
  const [plotsLength, setPlotsLength] = useState(Number);
  const tombFinance = useTombFinance();
  const isUnlocked = tombFinance?.isUnlocked;
  const fetchPlots = useCallback(async () => {
    setPlots(await tombFinance.getPlotIds());
    setPlotsLength(await (await tombFinance.getPlotIds()).length);
  }, [tombFinance.myAccount]);
  useEffect(() => {
    if (isUnlocked) {
      fetchPlots().catch((err) => console.error(`Failed to fetch claimable amount: ${err.stack}`));
      let refreshInterval = setInterval(fetchPlots, config.refreshInterval);
      return () => clearInterval(refreshInterval);
    }
  }, [isUnlocked, fetchPlots, tombFinance]);

  return [plots, plotsLength];
};

export default usePlots;

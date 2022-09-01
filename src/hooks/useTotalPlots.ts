import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useTombFinance from './useTombFinance';
import config from '../config';

const useTotalPlots = () => {
  const [totalPlots, setTotalPlots] = useState(BigNumber.from(0));
  const tombFinance = useTombFinance();
  const isUnlocked = tombFinance?.isUnlocked;
  const fetchTotalPlotsAmount = useCallback(async () => {
    setTotalPlots(await tombFinance.getTotalPlotsAmount());
  }, [tombFinance.myAccount]);

  useEffect(() => {
    if (isUnlocked) {
      fetchTotalPlotsAmount().catch((err) => console.error(`Failed to fetch total Plots amount: ${err.stack}`));
      let refreshInterval = setInterval(fetchTotalPlotsAmount, config.refreshInterval);
      return () => clearInterval(refreshInterval);
    }
  }, [isUnlocked, fetchTotalPlotsAmount, tombFinance]);

  return totalPlots;
};

export default useTotalPlots;

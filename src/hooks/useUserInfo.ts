import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useTombFinance from './useTombFinance';
import config from '../config';

const useUserInfo = () => {
  const [claimableAmount, setClaimableAmount] = useState(BigNumber.from(0));
  const [level1PlotAmount, setLevel1PlotAmount] = useState(Number);
  const [level2PlotAmount, setLevel2PlotAmount] = useState(Number);
  const [level3PlotAmount, setLevel3PlotAmount] = useState(Number);
  const tombFinance = useTombFinance();
  const isUnlocked = tombFinance?.isUnlocked;
  const fetchClaimableAmount = useCallback(async () => {
    setClaimableAmount(await (await tombFinance.getUserPlotsInfo(tombFinance.myAccount)).claimableAmount);
    setLevel1PlotAmount(await (await tombFinance.getUserPlotsInfo(tombFinance.myAccount)).level1PlotAmount);
    setLevel2PlotAmount(await (await tombFinance.getUserPlotsInfo(tombFinance.myAccount)).level2PlotAmount);
    setLevel3PlotAmount(await (await tombFinance.getUserPlotsInfo(tombFinance.myAccount)).level3PlotAmount);
  }, [tombFinance.myAccount]);
  useEffect(() => {
    if (isUnlocked) {
      fetchClaimableAmount().catch((err) => console.error(`Failed to fetch claimable amount: ${err.stack}`));
      let refreshInterval = setInterval(fetchClaimableAmount, config.refreshInterval);
      return () => clearInterval(refreshInterval);
    }
  }, [isUnlocked, fetchClaimableAmount, tombFinance]);

  return [claimableAmount, level1PlotAmount, level2PlotAmount, level3PlotAmount];
};

export default useUserInfo;

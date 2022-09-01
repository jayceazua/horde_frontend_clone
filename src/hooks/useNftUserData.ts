import { useCallback, useEffect, useState } from 'react';
import { BigNumber, Contract } from 'ethers';
import useTombFinance from './useTombFinance';
import config from '../config';

const useNftUserData = (contract: Contract) => {
  const [nftUserData, setNftUserData] = useState();
  const tombFinance = useTombFinance();
  const isUnlocked = tombFinance?.isUnlocked;
  const fetchNftUserData = useCallback(async () => {
    setNftUserData(await tombFinance.getNftData(contract));
  }, [tombFinance.myAccount]);
  useEffect(() => {
    if (isUnlocked) {
        fetchNftUserData().catch((err) => console.error(`Failed to fetch user NFT Data: ${err.stack}`));
      let refreshInterval = setInterval(fetchNftUserData, config.refreshInterval);
      return () => clearInterval(refreshInterval);
    }
  }, [isUnlocked, fetchNftUserData, tombFinance]);

  return nftUserData;
};

export default useNftUserData;
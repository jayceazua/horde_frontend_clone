import { useCallback } from 'react';
import useTombFinance from './useTombFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useClaimReward = (id: string) => {
  const tombFinance = useTombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const handleClaimReward = useCallback(() => {
    handleTransactionReceipt(tombFinance.cashoutReward(id), `Claim reward`);
  }, [tombFinance, handleTransactionReceipt]);
  return { onClaimReward: handleClaimReward };
};

export default useClaimReward;

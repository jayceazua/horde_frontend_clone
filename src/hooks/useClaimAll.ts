import { useCallback } from 'react';
import useTombFinance from './useTombFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useClaimAll = () => {
  const tombFinance = useTombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const handleClaimAll = useCallback(() => {
    handleTransactionReceipt(tombFinance.claimAll(), `Claim all rewards`);
  }, [tombFinance, handleTransactionReceipt]);
  return { onClaimAll: handleClaimAll };
};

export default useClaimAll;

import { useCallback } from 'react';
import useTombFinance from './useTombFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';

const useSwap = (swapState: boolean) => {
  const tombFinance = useTombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const handleSwap = useCallback(
    (amount: string) => {
      const amountBn = parseUnits(amount, 18);
      handleTransactionReceipt(
        tombFinance.swap(amountBn, swapState),
        `Swap ${amount} ${swapState ? 'BUSD' : 'HORDE'} to ${swapState ? 'HORDE' : 'BUSD'}`,
      );
    },
    [swapState, tombFinance, handleTransactionReceipt],
  );
  return { onSwap: handleSwap };
};

export default useSwap;

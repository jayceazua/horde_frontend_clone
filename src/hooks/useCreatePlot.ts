import { useCallback } from 'react';
import useTombFinance from './useTombFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useCreatePlot = (level: string) => {
  let plotType: string;
  if (level === '0') {
    plotType = 'Souls Rune';
  } else if (level === '1') {
    plotType = 'Souls Stone';
  } else plotType = 'Plot';
  const tombFinance = useTombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const handleCreatePlot = useCallback(
    (name: string) => {
      handleTransactionReceipt(tombFinance.createPlot(level, name), `Create new ${plotType}`);
    },
    [handleTransactionReceipt, tombFinance, level, plotType],
  );
  return { onCreatePlot: handleCreatePlot };
};

export default useCreatePlot;

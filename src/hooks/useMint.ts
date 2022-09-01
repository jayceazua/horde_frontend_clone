import { useCallback } from 'react';
import useTombFinance from './useTombFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import ERC20 from '../horde/ERC20';

const useMint = (NFT: ERC20) => {
  const tombFinance = useTombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const handelMint = useCallback(
    () => {
      handleTransactionReceipt(
        tombFinance.mint(NFT),
        `Mint NFT`,
      );
    },
    [tombFinance, handleTransactionReceipt],
  );
  return { onMint: handelMint };
};

export default useMint;

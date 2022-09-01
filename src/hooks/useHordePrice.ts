import { useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import useRefresh from './useRefresh';

const useHordePrice = () => {
  const [hordePrice, setHordePrice] = useState(0);
  const { fastRefresh } = useRefresh();
  const tombFinance = useTombFinance();

  useEffect(() => {
    async function fetchHordePrice() {
      try {
        setHordePrice(await tombFinance.getHordePrice());
      } catch (err) {
        console.error(err);
      }
    }
    fetchHordePrice();
  }, [setHordePrice, tombFinance, fastRefresh]);

  return hordePrice;
};

export default useHordePrice;

import React from 'react';

//Graveyard ecosystem logos
import hordeLogo from '../../assets/img/horde.png';

const logosBySymbol: { [title: string]: string } = {
  //Real tokens
  //=====================
  HORDE: hordeLogo,
};

type LogoProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({ symbol, size = 52 }) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={size} height={size} />;
};

export default TokenSymbol;

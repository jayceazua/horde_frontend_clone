import { BigNumber } from '@ethersproject/bignumber';

export type ContractName = string;

export interface UserPlotState {
  plotName: String;
  id: BigNumber;
  claimable: number;
  decayDate: number;
  boost: number;
}

export type UserStats = {
  claimableAmount: BigNumber;
  level1PlotAmount: number;
  level2PlotAmount: number;
  level3PlotAmount: number;
};

export type PlotData = {
  PlotName: String;
  PlotID: number;
  ClaimableAmount: number;
  StartTime: number;
  EndTime: number;
  BoostPercent: number;
};

export type NftUserData = {
  NftName: string;
  MintingPrice: number;
  Held: number;
  AccountLimit: number;
  Left: number;
}

export type TokenStat = {
  tokenInFtm: string;
  priceInDollars: string;
  totalSupply: string;
  circulatingSupply: string;
};

export type PoolInfoStat = {
  _mintingFee: string;
};

export type PoolUserInfoStat = {
  xTokenBalance: string;
  yTokenBalance: string;
  ethBalance: string;
};

export type LPStat = {
  tokenAmount: string;
  ftmAmount: string;
  priceOfOne: string;
  totalLiquidity: string;
  totalSupply: string;
};

export type AllocationTime = {
  from: Date;
  to: Date;
};

import { Configuration } from './config';
import { BigNumber, Contract, ethers } from 'ethers';
import { TransactionResponse } from '@ethersproject/providers';
import ERC20 from './ERC20';
import { getDefaultProvider } from '../utils/provider';
import IUniswapV2PairABI from './IUniswapV2Pair.abi.json';
import { parseUnits } from 'ethers/lib/utils';
import { PlotData, UserStats, NftUserData } from './types';
/**
 * All contract-interacting domain logic should be defined in here.
 */
export class TombFinance {
  myAccount: string;
  provider: ethers.providers.Web3Provider;
  signer?: ethers.Signer;
  config: Configuration;
  contracts: { [name: string]: Contract };
  externalTokens: { [name: string]: ERC20 };

  HORDEBUSD_LP: Contract;
  HORDE: ERC20;
  LMS: ERC20;
  BUSD: ERC20;
  NODE: ERC20;
  NFT1: ERC20;
  NFT2: ERC20;
  NFT3: ERC20;

  constructor(cfg: Configuration) {
    const { deployments, externalTokens } = cfg;
    const provider = getDefaultProvider();

    // loads contracts from deployments
    this.contracts = {};
    for (const [name, deployment] of Object.entries(deployments)) {
      this.contracts[name] = new Contract(deployment.address, deployment.abi, provider);
    }

    this.externalTokens = {};
    for (const [symbol, [address, decimal]] of Object.entries(externalTokens)) {
      this.externalTokens[symbol] = new ERC20(address, provider, symbol, decimal);
    }

    this.BUSD = this.externalTokens['BUSD'];
    this.HORDE = this.externalTokens['HORDE'];
    this.LMS = this.externalTokens['LMS'];
    // Uniswap V2 Pair
    this.HORDEBUSD_LP = new Contract(externalTokens['HORDE-BUSD-LP'][0], IUniswapV2PairABI, provider);
    this.NODE = this.externalTokens['NODEMANAGER'];
    this.NFT1 = this.externalTokens['NFT1'];
    this.NFT2 = this.externalTokens['NFT2'];
    this.NFT3 = this.externalTokens['NFT3'];

    this.config = cfg;
    this.provider = provider;
  }

  /**
   * @param provider From an unlocked wallet. (e.g. Metamask)
   * @param account An address of unlocked wallet account.
   */
  unlockWallet(provider: any, account: string) {
    const newProvider = new ethers.providers.Web3Provider(provider, this.config.chainId);
    this.signer = newProvider.getSigner(0);
    this.myAccount = account;
    for (const [name, contract] of Object.entries(this.contracts)) {
      this.contracts[name] = contract.connect(this.signer);
    }
    const tokens = [this.BUSD, this.HORDE, ...Object.values(this.externalTokens)];
    for (const token of tokens) {
      token.connect(this.signer);
    }
    this.HORDEBUSD_LP = this.HORDEBUSD_LP.connect(this.signer);
    console.log(`🔓 Wallet is unlocked. Welcome, ${account}!`);
  }

  get isUnlocked(): boolean {
    return !!this.myAccount;
  }

  /**
   * Swap token.
   * @param amount Number of tokens with decimals applied. (e.g. 1.45 DAI * 10^18)
   * @returns {string} Transaction hash
   */
  async swap(amount: BigNumber, swapState: boolean): Promise<TransactionResponse> {
    console.log("swapstate", amount, swapState)
    if (swapState) {
      return await this.LMS.swapBusdToHorde(amount);
    } else {
      return await this.LMS.swapHordeToBusd(amount);
    }
  }

  async claimAll(): Promise<TransactionResponse> {
    return await this.NODE.cashoutAll();
  }

  async cashoutReward(id: string): Promise<TransactionResponse> {
    return await this.NODE.cashoutReward(id);
  }

  async createPlot(level: string, name: string): Promise<TransactionResponse> {
    return await this.NODE.createPlot(level, name);
  }

  async getHordePrice(): Promise<number> {
    const { _reserve0, _reserve1 } = await this.HORDEBUSD_LP.getReserves();
    const hordePrice = _reserve1 / _reserve0;
    return hordePrice;
  }

  async quoteFromPancake(tokenAmount: string, tokenName: string): Promise<string> {
    const { PancakeRouter } = this.contracts;
    const { _reserve0, _reserve1 } = await this.HORDEBUSD_LP.getReserves();
    let quote;
    if (tokenName === 'HORDE') {
      quote = await PancakeRouter.quote(parseUnits(tokenAmount), _reserve1, _reserve0);
    } else {
      quote = await PancakeRouter.quote(parseUnits(tokenAmount), _reserve0, _reserve1);
    }
    return (quote / 1e18).toString();
  }

  async getUserPlotsInfo(account: string): Promise<UserStats> {
    let userInfo;
    if (this.myAccount) {
      userInfo = await this.NODE.getUserPlotsInfo(account);
    }
    return {
      claimableAmount: userInfo[0],
      level1PlotAmount: Number(userInfo[1]),
      level2PlotAmount: Number(userInfo[2]),
      level3PlotAmount: Number(userInfo[3]),
    };
  }

  async getTotalPlotsAmount(): Promise<BigNumber> {
    const totalPlotsAmount = await this.NODE.totalPlots();
    return totalPlotsAmount;
  }

  async getPlotData(id: string): Promise<any> {
    let Plots;
    if (this.myAccount) {
      Plots = await this.NODE.getPlotData(id);
    }
    const ID = Number(Plots.id);
    const name = Plots.name;
    const claimableAmount = await this.NODE.getClaimableRewards(id);
    const startTime = Plots.startTime;
    const endTime = Plots.endTime;
    const boost = await this.NODE.getBoostedPercent(this.myAccount);
    return {
      PlotName: name,
      PlotID: ID,
      ClaimableAmount: Number(claimableAmount) / 10 ** 18,
      StartTime: Number(startTime),
      EndTime: Number(endTime),
      BoostPercent: Number(boost),
    };
  }

  async getPlotIds(): Promise<any> {
    let IDs;
    if (this.myAccount) {
      IDs = await this.NODE.getPlotIdsOf(this.myAccount);
    }
    return IDs;
  }

  async getNftData(NFT: Contract): Promise<any> {
    const TotalLimit = await NFT.totalLimit();
    const TotalNfts = await NFT.totalToken();
    const Name = await NFT.name();
    const Balance = await NFT.balanceOf(this.myAccount);
    const Price = await NFT.price();
    const AccountLimit = await NFT.acLimit();
    return {
      NftName: Name,
      MintingPrice: Number(Price) / 1e18,
      Held: Number(Balance),
      AccountLimit: Number(AccountLimit),
      Left: Number(TotalLimit) - Number(TotalNfts),
    };
  }

  async mint(NFT: ERC20): Promise<TransactionResponse> {
    return await NFT.mint();
  }
}

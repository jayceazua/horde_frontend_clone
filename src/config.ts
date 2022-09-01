import { ChainId } from '@pancakeswap/sdk';
import { Configuration } from './horde/config';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: ChainId.TESTNET,
    networkName: 'BSC Testnet',
    ftmscanUrl: 'https://testnet.bscscan.com',
    defaultProvider: 'https://rpc.testnet.bscscan.com/',
    deployments: require('./horde/deployments/deployments.testing.json'),
    externalTokens: {
      'HORDE-BUSD-LP': ['0x4A6e0b8dAFDAdBe519ba726F7fA8291B05100bB2', 18],
    },
    refreshInterval: 10000,
  },
  production: {
    chainId: ChainId.MAINNET,
    networkName: 'Smart Chain',
    ftmscanUrl: 'https://bscscan.com/',
    defaultProvider: 'https://bsc-dataseed.binance.org/',
    deployments: require('./horde/deployments/deployments.mainnet.json'),
    externalTokens: {
      HORDE: ['0x059aDcc878eE774f0C7971F5aa367730D503e29e', 18],
      BUSD: ['0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18],
      LMS: ['0x9Dc920DF2527A27Ac3B18Ff73c02803265dF9F81', 18],
      NODEMANAGER: ['0x24db360D50c9A8DafebCAFe19c3AC5FE48CFace0', 18],
      NFT1: ['0x14f8555C18ee4Ccf4928a84A295F03b7160CB615', 18],
      NFT2: ['0xea3e0BB96727Eb15bebfE0FB24b112DeF9516571', 18],
      NFT3: ['0x6f61f5c17f34306314A157d595794907B371cfF3', 18],
      'HORDE-BUSD-LP': ['0x3274245a7Edfb49fc6FD57D4910e3F534C2E4BB4', 18],
    },
    refreshInterval: 1000,
  },
};

export default configurations['production'];

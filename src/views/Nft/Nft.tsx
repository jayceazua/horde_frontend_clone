import { Grid } from '@material-ui/core';
import React from 'react';
import { createGlobalStyle } from 'styled-components';
import HomeImage from '../../assets/img/background.jpg';
import NftCard, { NftData } from '../../components/NftCard';
import Page from '../../components/Page';
import NftImg1 from '../../assets/img/HordeChurch.png';
import NftImg2 from '../../assets/img/HordeRescue.png';
import NftImg3 from '../../assets/img/HordeWastle.png';
import useTombFinance from '../../hooks/useTombFinance';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) no-repeat !important;
    background-size: cover !important;
  }
`;

const Nft = () => {
  const tombfinance = useTombFinance();

  const PLACEHOLDER_NFTS: NftData[] = [
    {
      NftId: '1',
      NftImageUrl: NftImg1,
      RewardsBoostPercentage: 15,
      Contract: tombfinance.contracts["Nft1"],
      ERC20: tombfinance.NFT1,
    },
    {
      NftId: '2',
      NftImageUrl: NftImg2,
      RewardsBoostPercentage: 10,
      Contract: tombfinance.contracts["Nft2"],
      ERC20: tombfinance.NFT2,
    },
    {
      NftId: '3',
      NftImageUrl: NftImg3,
      RewardsBoostPercentage: 5,
      Contract: tombfinance.contracts["Nft3"],
      ERC20: tombfinance.NFT3,
    },
  ];
  
  return (
    <Page>
      <BackgroundImage />
      <Grid container spacing={3}>
        {PLACEHOLDER_NFTS.map((nft) => (
          <NftCard  nft={nft} />
        ))}
      </Grid>
    </Page>
  );
};

export default Nft;

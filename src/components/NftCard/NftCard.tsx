import { Button, Grid } from '@material-ui/core';
import { Contract } from 'ethers';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import useNftUserData from '../../hooks/useNftUserData';
import useTombFinance from '../../hooks/useTombFinance';
import { NftUserData } from '../../horde/types';
import useApprove, { ApprovalState } from '../../hooks/useApprove';
import useMint from '../../hooks/useMint';
import useTokenBalance from '../../hooks/useTokenBalance';
import ERC20 from '../../horde/ERC20';

export interface NftData {
  NftId: string;
  NftImageUrl: string;
  RewardsBoostPercentage: number;
  Contract: Contract;
  ERC20: ERC20;
}

interface NftCardData {
  nft: NftData;
}



const NftCardElement = styled(Grid)`
  background: rgb(22, 25, 29);
  border-radius: 4px;
  padding: 10px;
`;
const NftImage = styled.img`
  border-radius: 4px;
  object-fit: cover;
  width: 100%;
  min-height: 100%;
  
  `;
const NftItem = styled.div`
  border-radius: 4px;
  object-fit: cover;
  width: 100%;
  min-height: 100%;
  display: flex;
  max-height: 270px;
  max-width: 490px;
  margin: auto;
  position: relative;
`;
const NftDetailsContainer = styled.div`
  background: rgba(45, 53, 60, 0.6);
  border-radius: 4px;
  border: 1px solid rgb(173, 181, 189);
  margin-bottom: 15px;
  margin-top: 0px;
  padding: 15px;
  text-align: center;
  font-family: 'Open Sans', sans-serif;
`;
const NftNameElement = styled.p`
  color: rgb(226, 226, 226);
  font-size: 24px;
  line-height: 36px;
  margin-bottom: 15px;
  text-decoration: underline;
`;
const NftMetaElement = styled.p`
  color: rgb(173, 181, 189);
  font-size: 15px;
  line-height: 22.5px;
`;
const BuyButton = styled(Button)`
  background: linear-gradient(to left top, #da0f12 0, #6c0eb6 65%, #6c0eb6);
  > span {
    font-size: 21px;
  }
`;
const AmountLeftOverlay = styled.span`
  position: absolute;
  bottom: 15px;
  right: 15px;
  background-color rgba(76, 10, 127, 0.6);
  border: 1px solid rgb(173, 181, 189);
  border-radius: 4px;
  color: rgb(226, 226, 226);
  display: inline-block;
  font-family: "Open Sans", sans-serif;
  font-size: 12px;
  line-height: 18px;
  overflow-wrap: break-word;
  padding: 7.5px;
  text-align: center;
  text-transform: uppercase;
`;

const NftCard: React.FC<NftCardData> = ({ nft }) => {
  const tombfinance = useTombFinance();
  const hordeBalance = useTokenBalance(tombfinance.HORDE);
  const { account } = useWallet();
  const nftData: NftUserData = useNftUserData(nft.Contract);

  const Horde = tombfinance.HORDE;
  const NftAddr = nft.Contract.address;
  const [approveStatus, approve] = useApprove(Horde, NftAddr);
  const { onMint } = useMint(nft.ERC20);


  return (

    <Grid item xs={12}>
      <NftCardElement container spacing={2}>
        <Grid item xs={12} sm={6} style={{ position: 'relative' }}>
          <NftItem>
            <NftImage src={nft.NftImageUrl} alt="" />
            <AmountLeftOverlay>{nftData ? nftData.Left : '-.--'} left</AmountLeftOverlay>
          </NftItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <NftDetailsContainer>
            <NftNameElement>
              <b>HORDE</b> {nftData ? nftData.NftName : null}
            </NftNameElement>
            <NftMetaElement>
              Minting price: {nftData ? nftData.MintingPrice : '-.--'} $HORDE
              <br />
              {nft.RewardsBoostPercentage}% rewards boost
              <br />
              <br />
              You hold{' '}
              <b>
                {nftData ? nftData.Held : '-.--'} / {nftData ? nftData.AccountLimit : '-.--'}
              </b>{' '}
              {nftData ? nftData.NftName : null}
            </NftMetaElement>
          </NftDetailsContainer>
          {nftData && nftData.Left === 0 ? (
            <BuyButton fullWidth disabled>
              Sold out
            </BuyButton>
          ) : (
            account ? (
              approveStatus !== ApprovalState.APPROVED ? (
                <Button
                  disabled={approveStatus === ApprovalState.PENDING || approveStatus === ApprovalState.UNKNOWN}
                  onClick={approve}
                  className="create-plots-button"
                >
                  Approve
                </Button>
              ) : (
                <Button
                  className="create-plots-button"
                  onClick={() => onMint()}
                  disabled={
                      nftData? nftData.MintingPrice > Number(hordeBalance) / 1e18 : null
                  }
                >
                  Mint
                </Button>
              )
            ) : (
              <Button
                className="create-plots-button"
                disabled
              >
                Mint
              </Button>
            )
          )}
        </Grid>
      </NftCardElement>
    </Grid>
  );
};

export default NftCard;

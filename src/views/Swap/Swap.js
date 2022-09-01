import React, { useState } from 'react';
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';
import HomeImage from '../../assets/img/background.jpg';
import { Box, Button, Grid, Container } from '@material-ui/core';
import TokenInput from '../../components/TokenInput';
import useTombFinance from '../../hooks/useTombFinance';
import { useWallet } from 'use-wallet';
import useTokenBalance from '../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../utils/formatBalance';
import useApprove, { ApprovalState } from '../../hooks/useApprove';
import hordeImg from '../../assets/img/horde.png';
import busdImg from '../../assets/img/busd.png';
import { white } from '../../theme/colors';
import { BigNumber } from 'ethers';
import WalletProviderModal from '../../components/WalletProviderModal';
import useHordePrice from '../../hooks/useHordePrice';
import { LMS_ADDR } from '../../utils/constants';
import useSwap from '../../hooks/useSwap';
import { FaArrowsAltV, FaCog } from 'react-icons/fa';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) no-repeat !important;
    background-size: cover !important;
  }
`;
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
const Swap = () => {
  const hordePrice = useHordePrice();
  const [hordeAmount, setHordeAmount] = useState();
  const [busdAmount, setBusdAmount] = useState();
  const [color1, setColor1] = useState(0);
  const { account } = useWallet();
  const tombFinance = useTombFinance();
  const busdBalance = useTokenBalance(tombFinance.BUSD);
  const hordeBalance = useTokenBalance(tombFinance.HORDE);
  const [swapState, setSwapState] = useState(true);
  const [inputToken, setInputToken] = useState(tombFinance.BUSD);
  const [approveStatus, approve] = useApprove(inputToken, LMS_ADDR);
  const { onSwap } = useSwap(swapState);

  const [isWalletProviderOpen, setWalletProviderOpen] = useState(false);
  // const [MintFeeStatus, MintFee] = useMintFee();

  const handleWalletProviderOpen = () => {
    setWalletProviderOpen(true);
  };
  const handleWalletProviderClose = () => {
    setWalletProviderOpen(false);
  };

  const handleHordeChange = async (e) => {
    setColor1(white);
    if (e.currentTarget.value === '' || e.currentTarget.value === 0) {
      setHordeAmount(e.currentTarget.value);
      setBusdAmount(e.currentTarget.value);
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setHordeAmount(e.currentTarget.value);
    const quoteFromPancake = await tombFinance.quoteFromPancake(e.currentTarget.value, 'BUSD');
    setBusdAmount(quoteFromPancake);
  };

  const handleBusdChange = async (e) => {
    setColor1(white);
    if (e.currentTarget.value === '' || e.currentTarget.value === 0) {
      setBusdAmount(e.currentTarget.value);
      setHordeAmount(e.currentTarget.value);
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setBusdAmount(e.currentTarget.value);
    const quoteFromPancake = await tombFinance.quoteFromPancake(e.currentTarget.value, 'HORDE');
    setHordeAmount(quoteFromPancake);
  };

  const handleHordeSelectMax = async () => {
    setColor1(white);
    setHordeAmount(Number(getDisplayBalance(BigNumber.from(hordeBalance), 18, 10)));
    const quoteFromPancake = await tombFinance.quoteFromPancake(getDisplayBalance(hordeBalance), 'BUSD');
    setBusdAmount(quoteFromPancake);
  };

  const handleBusdSelectMax = async () => {
    setColor1(white);
    setBusdAmount(Number(getDisplayBalance(BigNumber.from(busdBalance), 18, 10)));
    const quoteFromPancake = await tombFinance.quoteFromPancake(getDisplayBalance(busdBalance), 'HORDE');
    setHordeAmount(quoteFromPancake);
  };

  const inputSelectMax = !swapState ? handleHordeSelectMax : handleBusdSelectMax;
  const outputSelectMax = swapState ? handleHordeSelectMax : handleBusdSelectMax;

  const inputOnChange = !swapState ? handleHordeChange : handleBusdChange;
  const outputOnChange = swapState ? handleHordeChange : handleBusdChange;

  const inputValue = !swapState ? hordeAmount : busdAmount;
  const outputValue = swapState ? hordeAmount : busdAmount;

  const inputMax = !swapState ? (hordeBalance / 1e18).toFixed(2) : (busdBalance / 1e18).toFixed(3);
  const outputMax = swapState ? (hordeBalance / 1e18).toFixed(2) : (busdBalance / 1e18).toFixed(3);

  const [inputSymbol, setInputSymbol] = useState('BUSD');
  const [outputSymbol, setOutputSymbol] = useState('HORDE');

  const inputImg = !swapState ? hordeImg : busdImg;
  const outputImg = swapState ? hordeImg : busdImg;

  const handleArrowChange = () => {
    setHordeAmount('');
    setBusdAmount('');
    setInputSymbol(swapState ? 'HORDE' : 'BUSD');
    setOutputSymbol(swapState ? 'BUSD' : 'HORDE');
    setSwapState(!swapState);
    setInputToken(!swapState ? tombFinance.BUSD : tombFinance.HORDE);
  };

  return (
    <Page>
      <BackgroundImage />
      <Container maxWidth={'md'}>
        <Grid className="boxes" item xs={12} sm={12} style={{ borderRadius: 4 }}>
          <Box className="border-purple border" style={{ padding: '15px 15px 18px' }}>
            <Grid container className="redeem-content">
              <Grid item xs={12} sm={12} className="swapLogo">
                <img src="/swap.png" alt="" />
              </Grid>

              {/* <Grid container item xs={12} justify={'flex-end'}>
                <Button
                  color="default"
                  variant="outlined"
                  className="text-center icon-button"
                  onClick={() => {
                    handleArrowChange();
                  }}
                >
                  <FaCog />
                </Button>
              </Grid> */}

              <Grid className="inputbox border-purple border" item xs={12}>
                <TokenInput
                  swapState={true}
                  onSelectMax={inputSelectMax}
                  onChange={inputOnChange}
                  value={inputValue}
                  max={inputMax}
                  symbol={inputSymbol}
                  images={inputImg}
                  disabled={false}
                  style={{ color: color1 }}
                />
              </Grid>

              <Grid item xs={12} sm={12} style={{ textAlign: 'center' }}>
                <Button
                  color="default"
                  variant="outlined"
                  className="text-center icon-button"
                  onClick={() => {
                    handleArrowChange();
                  }}
                >
                  <FaArrowsAltV />
                </Button>
              </Grid>

              <Grid className="inputbox border-purple border" item xs={12}>
                <TokenInput
                  swapState={false}
                  onSelectMax={outputSelectMax}
                  onChange={outputOnChange}
                  value={outputValue}
                  max={outputMax}
                  symbol={outputSymbol}
                  images={outputImg}
                  disabled={false}
                />
              </Grid>

              <Grid item xs={6} sm={6} className="content">
                <p>Price</p>
              </Grid>
              <Grid item xs={6} sm={6} className="content">
                <p className="number">{hordePrice.toFixed(3)} BUSD : 1 HORDE</p>
              </Grid>
              <Grid item xs={6} sm={6} className="content">
                <p>{swapState ? 'Buy tax' : 'Sell tax'}</p>
              </Grid>
              <Grid item xs={6} sm={6} className="content">
                <p className="number">{swapState ? '0%' : '10%'}</p>
              </Grid>
              <Grid item xs={6} sm={6} className="content">
                <p>Slippage tolerance</p>
              </Grid>
              <Grid item xs={6} sm={6} className="content">
                <p className="number">{'2.00%'}</p>
              </Grid>

              <Grid item xs={12} style={{ textAlign: 'center', maxWidth: "50%", margin: "auto" }}>
                {account ? (
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
                      variant="contained"
                      onClick={() => onSwap(inputValue)}
                      disabled={
                        swapState
                          ? Number(busdAmount) > Number(busdBalance / 1e18) ||
                            Number(busdAmount) <= 0 ||
                            Number(busdAmount) === 0 ||
                            !busdAmount
                          : Number(hordeAmount) > Number(hordeBalance / 1e18) ||
                            Number(hordeAmount) <= 0 ||
                            Number(hordeAmount) === 0 ||
                            !hordeAmount
                      }
                      className="create-plots-button"
                    >
                      SWAP
                    </Button>
                  )
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleWalletProviderOpen}
                    color="primary"
                    className="wallectButton"
                    // disabled
                  >
                    Connect Wallet
                  </Button>
                )}
                <WalletProviderModal open={isWalletProviderOpen} handleClose={handleWalletProviderClose} />
              </Grid>
              <Grid>
                <div style={{ paddingTop: '20px', color: '#aaa', wordBreak: 'break-word' }}>
                  Horde contract: {tombFinance.HORDE.address}
                </div>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Container>
    </Page>
  );
};

export default Swap;

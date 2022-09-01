import React, { useState } from 'react';
import Page from '../../components/Page';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import HomeImage from '../../assets/img/background.jpg';
import { Box, Button, CardContent, Grid, Paper } from '@material-ui/core';
import useTombFinance from '../../hooks/useTombFinance';
import useTokenBalance from '../../hooks/useTokenBalance';
import Card from '../../components/Card';
import { getDisplayBalance } from '../../utils/formatBalance';
import { BigNumber } from 'ethers';
import useTotalPlots from '../../hooks/useTotalPlots';
import useUserInfo from '../../hooks/useUserInfo';
import useModal from '../../hooks/useModal';
import CreatePlotsModal from './CreatePlotsModal';
import useClaimAll from '../../hooks/useClaimAll';
import PlotCard from '../../components/PlotCard';
import usePlots from '../../hooks/usePlots';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) no-repeat !important;
    background-size: cover !important;
  }
`;

const CustomText2 = styled.div`
  font-weight: 600 !important;
  font-size: 1.3125rem !important;
  padding-top: 0.9375rem !important;
  color: white;
  font-family: 'Special Elite', serif !important;
`;

const Dashboard = () => {
  const tombFinance = useTombFinance();
  const hordeBalance = useTokenBalance(tombFinance.HORDE);
  const totalClaimableAmount = Number(getDisplayBalance(BigNumber.from(useUserInfo()[0]), 18, 3));
  const level1PlotsAmount = useUserInfo()[1];
  const level2PlotsAmount = useUserInfo()[2];
  const level3PlotsAmount = useUserInfo()[3];
  const totalPlots = Number(getDisplayBalance(BigNumber.from(useTotalPlots()), 0, 0));
  const { onClaimAll } = useClaimAll();
  const [onCreatePlotModal] = useModal(<CreatePlotsModal />);
  const plots = usePlots();
  let plotArray;
  if (plots && plots[0]) {
    plotArray = plots[0].map((plot) => <PlotCard value={plot._hex}></PlotCard>);
  }

  return (
    <Page>
      <BackgroundImage />

      <Grid container spacing={3} justify="center" style={{ marginBottom: '10px' }}>
        <Grid className="state-panel" item xs={12} sm={12} md={4}>
          <Card value={(hordeBalance / 1e18).toFixed(3)} name={'Your balance'}></Card>
        </Grid>
        <Grid className="state-panel" item xs={12} sm={12} md={4}>
          <Card value={totalClaimableAmount} name={'Claimable'}></Card>
        </Grid>
        <Grid className="state-panel" item xs={12} sm={12} md={4}>
          <Card value={totalPlots} name={'Total plots'}></Card>
        </Grid>
      </Grid>

      <Grid container justify="center" style={{ marginBottom: '20px' }}>
        <div className="card-state-panel">
          <Grid className="purple-border" container style={{ width: 'unset' }} justify="center">
            <Grid className="state-panel dashboard-panel " item xs={6} sm={6} md={4}>
              <div className="green-text-mid">**SECRET**</div>
              <div className="green-text-mid">Plots</div>
              <div className="green-text-mid">Souls Stone</div>
              <div className="green-text-mid">Souls Rune</div>
            </Grid>
            <Grid className="state-panel dashboard-panel" item xs={6} sm={6} md={4}>
              <CustomText2>** / **</CustomText2>
              <CustomText2>{level3PlotsAmount} / 100</CustomText2>
              <CustomText2>{level2PlotsAmount} / 2</CustomText2>
              <CustomText2>{level1PlotsAmount} / 10</CustomText2>
            </Grid>
            <Grid className="state-panel dashboard-panel" item xs={12} sm={12} md={4}>
              <Button style={{ marginTop: '20px' }} className="create-plots-button" onClick={onCreatePlotModal}>
                Create a plot
              </Button>
              <div
                style={{ display: 'inline-flex', width: '100%', justifyContent: 'space-between', marginTop: '20px' }}
              >
                <div className="green-text-mid">Claimable </div>
                <CustomText2>{totalClaimableAmount} $HORDE </CustomText2>
              </div>
              <Button style={{ marginTop: '5px' }} className="create-plots-button" onClick={onClaimAll}>
                CLAIM ALL
              </Button>
            </Grid>
          </Grid>
        </div>
      </Grid>

      <Grid container spacing={3} style={{ marginBottom: '20px' }} /* hidden={plots[1] === 0} */>
        {plotArray}
      </Grid>
    </Page>
  );
};

export default Dashboard;
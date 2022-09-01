import { Button, Grid } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React from 'react';
import plotImg from '../../assets/img/plot.png';
import useClaimReward from '../../hooks/useClaimReward';
import usePlotData from '../../hooks/usePlotData';
import { PlotData } from '../../horde/types';
interface PlotCardData {
  value: BigNumber;
}

const PlotCard: React.FC<PlotCardData> = ({ value }) => {
  const plot: PlotData = usePlotData(Number(value).toString());
  const currentTime = Math.floor(Date.now() / 1000);
  const { onClaimReward } = useClaimReward(Number(value).toString());

  return (
    plot ? <>
    <Grid item xs={12} md={6}>
      <div className="card-state-panel">
        <Grid container spacing={3} className="purple-border" style={{ position: 'relative', width: 'unset' }}>
          <Grid item xs={12} md={4} style={{ padding: 0 }}>
            <img width="100%" height="100%" style={{ objectFit: 'cover' }} src={plotImg} alt="" />
          </Grid>

          <Grid container item xs={12} md={8} spacing={1}>
            <Grid container item xs={12}>
              <Grid item xs={12} sm={6} className="plot-card-name">
                {plot.PlotName}
              </Grid>
              <Grid item xs={12} sm={6} className="progress-bar">
                {plot.EndTime > currentTime && (
                  <div
                    className="bg-green text-dark"
                    style={{ width: `${((plot.EndTime - currentTime) / (plot.EndTime - plot.StartTime)) * 100}%` }}
                  >
                    {((plot.EndTime - currentTime) / 86400).toFixed(0)} days
                  </div>
                )}
              </Grid>
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={5} className="plot-card-body">
                Id
              </Grid>
              <Grid item xs={5} className="plot-card-body" style={{ color: 'white' }}>
                {plot.PlotID}
              </Grid>
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={5} className="plot-card-body">
                Claimable
              </Grid>
              <Grid item xs={5} className="plot-card-body" style={{ color: 'white' }}>
                {plot.ClaimableAmount.toFixed(3)}
              </Grid>
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={5} className="plot-card-body">
                Decay date
              </Grid>
              <Grid item xs={5} className="plot-card-body" style={{ color: 'white' }}>
                {Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(
                  plot.EndTime * 1000,
                )}
              </Grid>
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={5} className="plot-card-body">
                Boost
              </Grid>
              <Grid item xs={5} className="plot-card-body" style={{ color: 'white' }}>
                {plot.BoostPercent}%
              </Grid>
            </Grid>
          </Grid>

          <div style={{ position: 'absolute', right: '10px', bottom: '10px' }}>
            <Button
              style={{ height: '30px' }}
              className="claim-button"
              onClick={onClaimReward}
            >
              CLAIM
            </Button>
          </div>
        </Grid>
      </div>
    </Grid>
    </> : null
  );
};

export default PlotCard;

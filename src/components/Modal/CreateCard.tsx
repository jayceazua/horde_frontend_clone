import React, { useState } from 'react';
// import { Button, Input } from '@material-ui/core';
import { Button, Grid } from '@material-ui/core';
import Input, { InputProps } from '../Input';
import styled from 'styled-components';
import useTokenBalance from '../../hooks/useTokenBalance';
import useTombFinance from '../../hooks/useTombFinance';
import { white } from '../../theme/colors';
import { getDisplayBalance } from '../../utils/formatBalance';

import Card from '../Card';
import CardContent from '../CardContent';
import Container from '../Container';
import useCreatePlot from '../../hooks/useCreatePlot';

interface CreateData {
  level: string;
  hordeAmount: number;
  rewardPercent?: string;
  lifeTime: string;
  hordeBalance: number;
  plotName: string;
}

export const CreateCard: React.FC<CreateData> = ({
  level,
  hordeAmount,
  rewardPercent,
  lifeTime,
  hordeBalance,
  plotName,
}) => {
  const { onCreatePlot } = useCreatePlot(level);

  return (
    <StyledGrid>
      <div>
        <StyledBlanceText>Cost: {hordeAmount.toString()} $HORDE</StyledBlanceText>
        <StyledBlanceText>Rewards: 1% per day</StyledBlanceText>
        <StyledBlanceText>Lifetime: {lifeTime} days</StyledBlanceText>
      </div>
      <div style={{ margin: 'auto 0' }}>
        {hordeBalance > hordeAmount ? (
          <Button className="create-plots-button" style={{width: '165px', fontSize: '0.75rem'}} onClick={() => onCreatePlot(plotName)} disabled={plotName==''}>
            Create a plot
          </Button>
        ) : (
          <Button className="not-enough-button">Not enough $HORDE</Button>
        )}
      </div>
    </StyledGrid>
  );
};

const StyledGrid = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;
const StyledBlanceText = styled.div`
  font-size: 0.75rem;
  margin-top: 3px;
  color: #ced4da;
`;

export default CreateCard;

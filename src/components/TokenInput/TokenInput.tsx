import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import { Button } from '@material-ui/core';
import Input, { InputProps } from '../Input';
import data from './data.json';

interface TokenInputProps extends InputProps {
  swapState?: boolean;
  max: number | string;
  symbol: string;
  onSelectMax?: () => void;
  images?: string;
  disabled?: boolean;
  style?: {};
  percent?: number;
}

const TokenInput: React.FC<TokenInputProps> = ({
  swapState,
  max,
  symbol,
  onChange,
  onSelectMax,
  value,
  images,
  disabled,
  style,
  percent,
}) => {
  const [data1, imageData] = useState([]);
  useEffect(() => {
    console.log(data.data);
    imageData(data.data);
  }, []);
  return (
    <StyledTokenInput>
      <StyleTitleText>
        {symbol}
        {percent ? `-${percent / 10000}%` : ``}
      </StyleTitleText>
      <StyledMaxText>
        Balance: <span style={{ fontWeight: 500 }}>{max.toLocaleString()}</span> {symbol}
      </StyledMaxText>

      <StyleImage>
        <img src={images} className="img-fluid" width="42px" style={{ paddingTop: '5px' }} />
      </StyleImage>
      <Input
        endAdornment={
          <StyledTokenAdornmentWrapper>
            {/* <StyledTokenSymbol>{symbol}</StyledTokenSymbol> */}
            <StyledSpacer />
            <div className="maxbutton">
              {swapState && (
                <Button size="small" color="primary" variant="outlined" className="max-button" onClick={onSelectMax}>
                  Max
                </Button>
              )}
            </div>
          </StyledTokenAdornmentWrapper>
        }
        onChange={onChange}
        placeholder="0.0"
        value={value}
        disabled={disabled}
        style={style}
      />
    </StyledTokenInput>
  );
};

/*
            <div>
              <Button size="sm" text="Max" />
            </div>
*/

const StyledTokenInput = styled.div`
  width: 100%;
`;

const StyledSpacer = styled.div`
  width: ${(props) => props.theme.spacing[3]}px;
`;

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`;

const StyledMaxText = styled.div`
  align-items: center;
  color: ${(props) => props.theme.color.grey[400]};
  display: flex;
  font-size: 14px;
  height: 44px;
  padding-right: 10px;
  justify-content: flex-end;
`;

const StyleImage = styled.div`
  float: left;
  padding-left: 5px;
`;
const StyleTitleText = styled.div`
  align-items: center;
  color: ${(props) => props.theme.color.grey[400]};
  display: flex;
  font-size: 16px;
  font-weight: 500;
  height: 44px;
  padding-right: 10px;
  position: absolute;
  padding-left: 12px;
  justify-content: start;
`;
export default TokenInput;

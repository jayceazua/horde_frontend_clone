import React, { useState } from 'react';
import Input from '../Input';
import styled from 'styled-components';
import useTokenBalance from '../../hooks/useTokenBalance';
import useTombFinance from '../../hooks/useTombFinance';

import Card from '../Card';
import CardContent from '../CardContent';
import Container from '../Container';
import CreateCard from './CreateCard';

export interface ModalProps {
  onDismiss?: () => void;
}

const Modal: React.FC = ({ children }) => {
  return (
    <Container size="sm">
      <StyledModal>
        <Card>
          <CardContent>{children}</CardContent>
        </Card>
      </StyledModal>
    </Container>
  );
};

export const CreateAPlotModal: React.FC = ({}) => {
  const tombFinance = useTombFinance();
  const hordeBalance = useTokenBalance(tombFinance.HORDE);
  const hordeBalanceInNumber = Number(hordeBalance) / 10 ** 18;
  const [plotName, setPlotName] = useState(String);
  const handlePlotName = async (e: any) => {
    const value = e.target.value ? e.target.value.replace(/[^0-9a-zA-Z]+/gi, '') : '';
    if (e.currentTarget.value !== value) {
      e.target.value = value;
      setPlotName(e.currentTarget.value);
    }
    setPlotName(e.currentTarget.value);
  };

  console.log('inputname', plotName);

  return (
    <Container size="sm">
      <StyledModal>
        <StyledHead>
          <h4 style={{ color: '#ced4da' }}>Create a plot </h4>
          <StyledBlanceText>Your balance: {hordeBalanceInNumber.toFixed(3)} $HORDE</StyledBlanceText>
        </StyledHead>
        <hr />
        <div style={{ padding: '0px 10px' }}>
          <div style={{ marginTop: '20px', color: '#ced4da', marginBottom: '3px' }}>Plot name</div>
          <div className="input-plot-name" style={{border: !plotName? "1px solid #ff5b57" : "1px solid #6c0eb6"}}>
            <Input placeholder="Ex: Cool Name" onChange={handlePlotName} value={plotName} />
          </div>
          {!plotName && <text className="input-warning">The plot name field is required</text>}
          <StyledText>Plot</StyledText>
          <CreateCard
            level={'2'}
            hordeAmount={10}
            lifeTime={'300'}
            hordeBalance={hordeBalanceInNumber}
            plotName={plotName}
          ></CreateCard>
          <StyledText>Souls Stone</StyledText>
          <CreateCard
            level={'1'}
            hordeAmount={5}
            lifeTime={'250'}
            hordeBalance={hordeBalanceInNumber}
            plotName={plotName}
          ></CreateCard>
          <StyledText>Souls Rune</StyledText>
          <CreateCard
            level={'0'}
            hordeAmount={1}
            lifeTime={'200'}
            hordeBalance={hordeBalanceInNumber}
            plotName={plotName}
          ></CreateCard>
        </div>
      </StyledModal>
    </Container>
  );
};

const StyledHead = styled.div`
  margin: 20px;
  line-height: 1.5;
  justify-content: space-between;
  display: flex;
`;
const StyledModal = styled.div`
  height: 100%;
  background: #20252a !important;
  color: white;
  padding-top: 1px;
  padding-bottom: 1px;
  z-index: 99 !important;
  border-radius: 8px;
  border-color: #9299a1;
  border-style: ridge;
`;
const StyledBlanceText = styled.div`
  font-size: 0.75rem;
  margin-top: 3px;
  color: #ced4da;
`;
const StyledText = styled.h4`
  color: #ced4da;
  margin: 15px 0px;
`;
export default Modal;

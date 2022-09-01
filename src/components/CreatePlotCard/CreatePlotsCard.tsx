import React from 'react';
import styled from 'styled-components';

interface CardData {
  value?: number;
  name?: string;
}

const Card: React.FC<CardData> = ({ value, name }) => {
  return (
    <div className="card-state-panel">
      <div className="purple-border">
        <p className="card-value"> {value}</p>
        <p className="card-name"> {name}</p>
      </div>
    </div>
  );
};

const StyledCard = styled.div`
  background-color: #16191d !important;
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;

export default Card;

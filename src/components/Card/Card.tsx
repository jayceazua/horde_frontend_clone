import React from 'react';

interface CardData {
  value?: number | string;
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

export default Card;

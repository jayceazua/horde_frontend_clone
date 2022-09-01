import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useWallet } from 'use-wallet';
import WalletProviderModal from '../WalletProviderModal';
interface AccountButtonProps {
  text?: string;
}

const AccountButton: React.FC<AccountButtonProps> = ({ text }) => {
  const { account } = useWallet();

  const [isWalletProviderOpen, setWalletProviderOpen] = useState(false);

  const handleWalletProviderOpen = () => {
    setWalletProviderOpen(true);
  };

  const handleWalletProviderClose = () => {
    setWalletProviderOpen(false);
  };
  const buttonText = text ? text : 'Unlock';

  return (
    <div>
      {!account ? (
        <Button onClick={handleWalletProviderOpen} className="buy-button" variant="contained">
          {buttonText}
        </Button>
      ) : (
        <Button variant="contained" onClick={handleWalletProviderClose} className="mywallet-button" color="primary">
          {`${account.substring(0, 5)}...${account.substring(account.length - 4)}`}
        </Button>
      )}

      <WalletProviderModal open={isWalletProviderOpen} handleClose={handleWalletProviderClose} />
    </div>
  );
};

export default AccountButton;

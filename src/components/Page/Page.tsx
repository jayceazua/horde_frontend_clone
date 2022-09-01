import { Container } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import useEagerConnect from '../../hooks/useEagerConnect';
import Footer from '../Footer';
import Nav from '../Nav';

const TopNav = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const Page: React.FC = ({ children }) => {
  useEagerConnect();
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Nav />
      <Container maxWidth="lg" style={{ paddingBottom: '5rem' }}>
        {children}
      </Container>
      <Footer />
    </div>
  );
};

export default Page;

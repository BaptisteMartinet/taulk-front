import React, { FunctionComponent } from 'react';
import { styled } from '@mui/material';
import { DashboardContextProvider } from './DashboardContext';
import LobbiesBar from './lobbies-bar';
import ChannelsBar from './channels-bar';

const Container = styled('main')({
  width: '100%',
  height: '100vh',
  display: 'flex',
});

const Dashboard: FunctionComponent = () => {
  return (
    <Container>
      <LobbiesBar />
      <ChannelsBar />
    </Container>
  );
};

const DashboardWrapper: FunctionComponent = () => (
  <DashboardContextProvider>
    <Dashboard />
  </DashboardContextProvider>
);

export default DashboardWrapper;

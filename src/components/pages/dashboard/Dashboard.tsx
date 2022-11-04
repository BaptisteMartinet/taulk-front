import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';
import { styled } from '@mui/material';
import store from 'store/pages/dashboard';
import LobbiesBar from './lobbies-bar';
import ChannelsBar from './channels-bar';
import Chat from './chat';

const Container = styled('main')({
  width: '100%',
  height: '100vh',
  display: 'flex',
});

const Dashboard: FunctionComponent = () => {
  React.useEffect(() => {
    store.init();
  }, []);
  return (
    <Container>
      <LobbiesBar />
      <ChannelsBar />
      <Chat />
    </Container>
  );
};

export default observer(Dashboard);

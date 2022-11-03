import React, { FunctionComponent } from 'react';
import { useQuery } from '@apollo/client';
import { styled } from '@mui/material';
import { Lobby } from 'core/api/types';
import { GetMyLobbies } from 'core/api/queries';
import LobbiesBar from './lobbies-bar/LobbiesBar';
import ChannelsBar from './channels-bar';

const Container = styled('main')({
  width: '100%',
  height: '100vh',
  display: 'flex',
});

const Dashboard: FunctionComponent = () => {
  const { data, loading, error } = useQuery(GetMyLobbies);
  if (loading || error != null) return null;
  const lobbies: Lobby[] = data.authenticated.myLobbies;
  return (
    <Container>
      <LobbiesBar lobbies={lobbies} />
      <ChannelsBar channels={[]} />
    </Container>
  );
};

export default Dashboard;

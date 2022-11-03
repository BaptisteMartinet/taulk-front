import React, { FunctionComponent } from 'react';
import { styled } from '@mui/material/styles';
import MuiStack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Scrollable } from 'components/common';
import DashboardContext from '../DashboardContext';

const Container = styled('div')({
  position: 'relative',
  width: '240px',
  height: '100%',
  backgroundColor: 'var(--discord2)',
});

const LobbyTitleContainer = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '60px',
  padding: '1em',
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid rgba(240, 240, 240, 0.6)',
});

const LobbyTitle = styled('h1')({
  margin: 0,
  fontSize: '1rem',
  color: 'white',
});

const Stack = styled(MuiStack)({
  marginTop: '60px',
  padding: '1em',
});

const ChannelsBar: FunctionComponent = () => {
  const ctx = React.useContext(DashboardContext);
  return (
    <Container>
      <LobbyTitleContainer>
        <LobbyTitle>Lobby title</LobbyTitle>
      </LobbyTitleContainer>
      <Scrollable>
        <Stack direction="column" spacing={1}>
          {ctx.currentLobby?.channels.map((channel) => {
            const color = channel.id === ctx.currentChannel?.id ? 'white' : 'rgba(255, 255, 255, 0.6)';
            return (
              <Button
                key={channel.id}
                sx={{ color }}
                onClick={() => { ctx.handleCurrentChannel(channel.id); }}
              >
                {channel.title}
              </Button>
            );
          })}
        </Stack>
      </Scrollable>
    </Container>
  );
};

export default ChannelsBar;

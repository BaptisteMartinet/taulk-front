import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';
import { styled } from '@mui/material/styles';
import MuiStack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import store from 'store/pages/dashboard';
import { Scrollable } from 'components/common';
import CreateChannelModal from './CreateChannelModal';

const Container = styled('div')({
  position: 'relative',
  flex: '0 0 240px',
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
  const [createChannelModalState, setCreateChannelModalState] = React.useState(false);
  const closeChannelModal = (): void => {
    setCreateChannelModalState(false);
  };
  return (
    <Container>
      <LobbyTitleContainer>
        <LobbyTitle>{store.currentLobby?.title ?? 'Lobby'}</LobbyTitle>
      </LobbyTitleContainer>
      <Scrollable>
        <Stack direction="column" spacing={1}>
          {store.currentLobby?.channels.map((channel) => {
            const color = channel.id === store.currentChannel?.id ? 'white' : 'rgba(255, 255, 255, 0.6)';
            return (
              <Button
                key={channel.id}
                sx={{ color }}
                onClick={() => { store.setCurrentChannel(channel.id); }}
              >
                {channel.title}
              </Button>
            );
          })}
          <Divider />
          <Button
            onClick={() => { setCreateChannelModalState(true); }}
            variant="contained"
          >
            Create Channel
          </Button>
        </Stack>
      </Scrollable>
      <CreateChannelModal open={createChannelModalState} handleClose={closeChannelModal} />
    </Container>
  );
};

export default observer(ChannelsBar);

import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';
import { styled } from '@mui/material/styles';
import MuiStack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import store from 'store/pages/dashboard';
import LobbyAvatar from './LobbyAvatar';
import { Scrollable } from 'components/common';
import CreateLobbyModal from './CreateLobbyModal';

const Container = styled('div')({
  flex: '0 0 80px',
  height: '100%',
  padding: '1em .5em',
  backgroundColor: 'var(--discord1)',
});

const Separator = styled('div')({
  width: '50%',
  height: '2px',
  borderRadius: '1px',
  backgroundColor: 'var(--discord3)',
});

const LobbiesBar: FunctionComponent = () => {
  const [createLobbyModalState, setCreateLobbyModalState] = React.useState(false);
  const closeLobbyModal = (): void => {
    setCreateLobbyModalState(false);
  };
  return (
    <Container>
      <Scrollable>
        <MuiStack direction="column" alignItems="center" spacing={1}>
          <IconButton href="/dashboard">
            <img src="/assets/logos/logo_small_white.png" alt="Logo" style={{ width: '90%' }} />
          </IconButton>
          <Separator />
          {store.lobbies?.map((lobby) => (
            <LobbyAvatar key={lobby.id} lobby={lobby} isCurrentLobby={lobby.id === store.currentLobby?.id} />
          ))}
          <IconButton onClick={() => { setCreateLobbyModalState(true); }}>
            <Avatar sx={{ width: '48px', height: '48px', bgcolor: 'var(--discord3)', color: 'green' }}>
              <AddIcon />
            </Avatar>
          </IconButton>
        </MuiStack>
      </Scrollable>
      <CreateLobbyModal open={createLobbyModalState} handleClose={closeLobbyModal} />
    </Container>
  );
};

export default observer(LobbiesBar);

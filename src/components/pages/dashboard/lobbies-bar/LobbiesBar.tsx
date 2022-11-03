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

const Container = styled('div')({
  width: '80px',
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
  return (
    <Container>
      <Scrollable>
        <MuiStack direction="column" alignItems="center" spacing={1}>
          <img src="/assets/logos/logo_small_white.png" alt="Logo" style={{ width: '75%' }} />
          <Separator />
          {store.lobbies.map((lobby) => (
            <LobbyAvatar key={lobby.id} lobby={lobby}/>
          ))}
          <IconButton onClick={() => { console.info('Create lobby dialog'); }}>
            <Avatar sx={{ width: '48px', height: '48px', bgcolor: 'var(--discord3)', color: 'green' }}>
              <AddIcon />
            </Avatar>
          </IconButton>
        </MuiStack>
      </Scrollable>
    </Container>
  );
};

export default observer(LobbiesBar);

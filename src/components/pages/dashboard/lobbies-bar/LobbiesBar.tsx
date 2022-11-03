import React, { FunctionComponent } from 'react';
import { styled } from '@mui/material/styles';
import MuiStack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { Lobby } from 'core/api/types';
import LobbyAvatar from './LobbyAvatar';

const Container = styled('div')({
  width: '80px',
  height: '100%',
  padding: '1em .5em',
  backgroundColor: 'var(--discord1)',
  overflow: 'hidden',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none',
    width: 0,
    background: 'transparent',
  },
});

const Separator = styled('div')({
  width: '50%',
  height: '2px',
  borderRadius: '1px',
  backgroundColor: 'var(--discord3)',
});

export interface LobbiesBarProps {
  lobbies: Lobby[]
}

const LobbiesBar: FunctionComponent<LobbiesBarProps> = (props) => {
  const { lobbies } = props;
  return (
    <Container>
      <MuiStack direction="column" alignItems="center" spacing={1}>
        <img src="/assets/logos/logo_small_white.png" alt="Logo" style={{ width: '75%' }} />
        <Separator />
        {lobbies.map((lobby) => (
          <LobbyAvatar key={lobby.id} lobby={lobby} />
        ))}
        <IconButton onClick={() => { console.info('Create lobby dialog'); }}>
          <Avatar sx={{ width: '48px', height: '48px', bgcolor: 'var(--discord3)', color: 'green' }}>
            <AddIcon />
          </Avatar>
        </IconButton>
      </MuiStack>
    </Container>
  );
};

export default LobbiesBar;

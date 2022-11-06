import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';
import MuiAvatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { IconButton, styled } from '@mui/material';
import { generateAcronym } from 'lib/string';
import store from 'store/pages/dashboard';
import { Lobby } from 'core/api/types';

const Avatar = styled(MuiAvatar)({
  width: '48px',
  height: '48px',
  transition: '500ms',
  '&:hover': {
    backgroundColor: 'blue',
  },
});

export interface LobbyAvatarProps {
  lobby: Lobby
  isCurrentLobby: boolean
}

const LobbyAvatar: FunctionComponent<LobbyAvatarProps> = (props) => {
  const { lobby, isCurrentLobby } = props;
  const lobbyAcronym = generateAcronym(lobby.title);
  const bgcolor = isCurrentLobby ? 'blue' : 'var(--discord3)';
  return (
    <IconButton onClick={() => { store.setCurrentLobby(lobby.id); }}>
      <Badge badgeContent={0} color="primary" overlap="circular">
        <Avatar sx={{ bgcolor }}>{lobbyAcronym}</Avatar>
      </Badge>
    </IconButton>
  );
};

export default observer(LobbyAvatar);

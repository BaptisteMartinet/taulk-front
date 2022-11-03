import React, { FunctionComponent } from 'react';
import MuiAvatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { IconButton, styled } from '@mui/material';
import { generateAcronym } from 'lib/string';
import { Lobby } from 'core/api/types';
import DashboardContext from '../DashboardContext';

const Avatar = styled(MuiAvatar)({
  width: '48px',
  height: '48px',
  transition: '500ms',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 255, .5)',
  },
});

export interface LobbyAvatarProps {
  lobby: Lobby
}

const LobbyAvatar: FunctionComponent<LobbyAvatarProps> = ({ lobby }) => {
  const ctx = React.useContext(DashboardContext);
  const lobbyAcronym = generateAcronym(lobby.title);
  const bgcolor = lobby.id === ctx.currentLobby?.id ? 'blue !important' : 'var(--discord3)';
  return (
    <IconButton onClick={() => { ctx.handleCurrentLobby(lobby.id); }}>
      <Badge badgeContent={0} color="primary" overlap="circular">
        <Avatar sx={{ bgcolor }}>{lobbyAcronym}</Avatar>
      </Badge>
    </IconButton>
  );
};

export default LobbyAvatar;

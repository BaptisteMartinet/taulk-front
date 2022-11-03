import React, { FunctionComponent } from 'react';
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import { generateAcronym } from 'lib/string';
import { Lobby } from 'core/api/types';

export interface LobbyAvatarProps {
  lobby: Lobby
}

const LobbyAvatar: FunctionComponent<LobbyAvatarProps> = ({ lobby }) => {
  const lobbyAcronym = generateAcronym(lobby.title);
  return (
    <IconButton onClick={() => { console.log(`Lobby#${lobby.id}`); }}>
      <Avatar sx={{ width: '48px', height: '48px' }}>{lobbyAcronym}</Avatar>
    </IconButton>
  );
};

export default LobbyAvatar;

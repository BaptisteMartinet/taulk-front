import React, { FunctionComponent } from 'react';
import { styled } from '@mui/material/styles';
import MuiList from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

const List = styled(MuiList)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column-reverse',
  padding: '1em',
  backgroundColor: 'var(--discord3)',
  color: 'white',
});

const Chat: FunctionComponent = () => {
  return (
    <List>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar>B</Avatar>
        </ListItemAvatar>
        <ListItemText
          sx={{ '& .MuiListItemText-secondary': { color: 'rgba(255, 255, 255, 0.6)' } }}
          primary="Baptiste#54613"
          secondary="Message 2"
        />
      </ListItem>
      <li>
        <Divider role="presentation">
          <Chip label="Wed. 12 Oct. 3:15pm" sx={{ color: 'white' }} />
        </Divider>
      </li>

      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar>B</Avatar>
        </ListItemAvatar>
        <ListItemText
          sx={{ '& .MuiListItemText-secondary': { color: 'rgba(255, 255, 255, 0.6)' } }}
          primary="Baptiste#54613"
          secondary="Salut à tous les amis"
        />
      </ListItem>
      <li>
        <Divider>
          <Chip label="Wed. 12 Oct. 3:15pm" sx={{ color: 'white' }} />
        </Divider>
      </li>
    </List>
  );
};

export default Chat;

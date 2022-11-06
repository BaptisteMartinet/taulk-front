import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';
import { styled } from '@mui/material/styles';
import MuiList from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import generateAcronym from 'lib/string';
import store from 'store/pages/dashboard';

const List = styled(MuiList)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column-reverse',
  color: 'white',
  overflowY: 'auto',
});

const MessagesList: FunctionComponent = () => {
  return (
    <List>
      {store.currentChannel?.messages.map(message => (
        <React.Fragment key={message.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar>{generateAcronym(message.owner.username)}</Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{ '& .MuiListItemText-secondary': { color: 'rgba(255, 255, 255, 0.6)' } }}
              primary={message.owner.username}
              secondary={message.text}
            />
          </ListItem>
          <li>
            <Divider role="presentation">
              <Chip label={new Date(message.createdAt).toDateString()} sx={{ color: 'white' }} />
            </Divider>
          </li>
        </React.Fragment>
      ))}
    </List>
  );
};

export default observer(MessagesList);

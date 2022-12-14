import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import * as datefns from 'date-fns';
import { styled } from '@mui/material/styles';
import MuiList from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import generateAcronym from 'lib/string';
import { stringToColor } from 'lib/colors';
import store from 'store/pages/dashboard';

const List = styled(MuiList)({
  flex: 1,
  paddingBlock: '1em',
  display: 'flex',
  flexDirection: 'column-reverse',
  color: 'white',
  overflowY: 'auto',
});

const ListItem = styled(MuiListItem)({
  borderRadius: '16px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, .1)',
  },
});

const MessagesList: FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <List>
      {store.currentChannel?.messages.slice().reverse().map(message => {
        const { owner, text, createdAt } = message;
        const { username } = owner;
        return (
          <React.Fragment key={message.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: stringToColor(username) }}>{generateAcronym(username)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={{ '& .MuiListItemText-secondary': { color: 'rgba(255, 255, 255, 0.6)' } }}
                primary={username}
                secondary={text}
              />
            </ListItem>
            <li>
              <Divider role="presentation">
                <Chip label={datefns.format(createdAt, t('misc.date-hour-format'))} sx={{ color: 'white' }} />
              </Divider>
            </li>
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default observer(MessagesList);

import React, { FunctionComponent } from 'react';
import { styled } from '@mui/material/styles';
import MessagesList from './MessageList';
import MessageForm from './MessageForm';

const Container = styled('div')({
  flex: 1,
  padding: '1em',
  display: 'flex',
  flexDirection: 'column-reverse',
  backgroundColor: 'var(--discord3)',
});

const Chat: FunctionComponent = () => {
  return (
    <Container>
      <MessageForm />
      <MessagesList />
    </Container>
  );
};

export default Chat;

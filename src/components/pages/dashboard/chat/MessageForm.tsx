import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Button as MuiButton,
  TextareaAutosize,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useFormik } from 'formik';
import store from 'store/pages/dashboard';

const Container = styled('form')({
  display: 'flex',
  alignItems: 'flex-end',
});

const TextArea = styled(TextareaAutosize)({
  flex: 1,
  maxHeight: '15em',
  padding: '1em',
  fontSize: 'var(--fs-400)',
  color: 'white',
  borderRadius: '24px',
  backgroundColor: 'var(--discord4)',
  border: 'none',
  outline: 'none',
  resize: 'none',
});

const Button = styled(MuiButton)({
  marginInline: '1em',
  width: '64px',
  height: '100%',
});

const MessageForm = (): JSX.Element => {
  const form = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: ({ message }) => {
      store.createMessage(message);
      form.resetForm();
    },
  });
  return (
    <Container onChange={form.handleChange} onSubmit={form.handleSubmit}>
      <TextArea name="message" id="message" cols={30} placeholder="Send a message within Channel1" value={form.values.message} />
      <Button type="submit" variant="contained"><SendIcon /></Button>
    </Container>
  );
};

export default MessageForm;

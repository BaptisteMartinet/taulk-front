import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import store from 'store/pages/dashboard';

export interface CreateLobbyModalProps {
  open: boolean
  handleClose: () => void
}

const CreateLobbyModal = (props: CreateLobbyModalProps): JSX.Element => {
  const { open, handleClose } = props;
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      isPrivate: false,
    },
    onSubmit: (values) => {
      store.createLobby(values).catch(() => { });
      handleClose();
    },
  });
  return (
    <Dialog open={open}>
      <form onChange={formik.handleChange} onSubmit={formik.handleSubmit}>
        <DialogTitle>Create a new Lobby</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            value={formik.values.title}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            value={formik.values.description}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Send</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateLobbyModal;

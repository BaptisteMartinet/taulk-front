import React from 'react';
import { useTranslation } from 'react-i18next';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import store from 'store/pages/dashboard';

export interface CreateChannelModalProps {
  open: boolean
  handleClose: () => void
}

const CreateChannelModal = (props: CreateChannelModalProps): JSX.Element => {
  const { open, handleClose } = props;
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      title: '',
    },
    onSubmit: (values) => {
      store.createChannel(values.title).catch(() => { });
      handleClose();
    },
  });
  return (
    <Dialog open={open} onClose={handleClose}>
      <form onChange={formik.handleChange} onSubmit={formik.handleSubmit}>
        <DialogTitle>{t('pages.dashboard.create-channel')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            value={formik.values.title}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('misc.cancel')}</Button>
          <Button type="submit">{t('misc.confirm')}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateChannelModal;

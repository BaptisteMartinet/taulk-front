import React from 'react';
import { useTranslation } from 'react-i18next';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import store from 'store/pages/dashboard';

const validationSchema = yup.object({
  title: yup
    .string()
    .min(1)
    .max(30)
    .required(),
  description: yup
    .string()
    .min(1)
    .max(256)
    .required(),
});

export interface CreateLobbyModalProps {
  open: boolean
  handleClose: () => void
}

const CreateLobbyModal = (props: CreateLobbyModalProps): JSX.Element => {
  const { open, handleClose } = props;
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      isPrivate: false,
    },
    validationSchema,
    onSubmit: (values) => {
      store.createLobby(values).catch(() => { });
      handleClose();
    },
  });
  return (
    <Dialog open={open} onClose={handleClose}>
      <form onChange={formik.handleChange} onSubmit={formik.handleSubmit}>
        <DialogTitle>{t('pages.dashboard.create-lobby')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            value={formik.values.title}
            error={formik.touched.title != null && Boolean(formik.errors.title)}
            helperText={formik.touched.title != null && formik.errors.title}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            value={formik.values.description}
            error={formik.touched.description != null && Boolean(formik.errors.description)}
            helperText={formik.touched.description != null && formik.errors.description}
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

export default CreateLobbyModal;

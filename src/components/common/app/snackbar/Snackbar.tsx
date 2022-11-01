import React, { FunctionComponent } from 'react';
import { Snackbar as SnackbarMUI, Alert } from '@mui/material';
import type { SnackbarCloseReason } from '@mui/material';
import SnackbarContext from './SnackbarContext';

const AutoHideDuration = 6000;

const Snackbar: FunctionComponent = () => {
  const { message, open, closeSnack } = React.useContext(SnackbarContext);
  const handleSnackbarClose = (event: any, reason: SnackbarCloseReason): void => {
    if (reason === 'clickaway') return;
    closeSnack();
  };
  return (
    <SnackbarMUI open={open} autoHideDuration={AutoHideDuration} onClose={handleSnackbarClose}>
      <Alert onClose={closeSnack} severity={message.severity} sx={{ width: '100%' }}>{message.text}</Alert>
    </SnackbarMUI>
  );
};

export default Snackbar;

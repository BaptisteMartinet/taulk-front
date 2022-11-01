import { AlertColor } from '@mui/material';
import React, { FunctionComponent, PropsWithChildren } from 'react';

interface SnackbarMessage {
  text: string
  severity?: AlertColor
}

interface SnackbarContextType {
  message: SnackbarMessage
  open: boolean
  showSnack: (message: SnackbarMessage) => void
  closeSnack: () => void
}

const SnackbarContext = React.createContext<SnackbarContextType>({
  message: {
    text: '',
    severity: 'success',
  },
  open: false,
  showSnack: () => { },
  closeSnack: () => { },
});

export const SnackbarContextProvider: FunctionComponent<PropsWithChildren<{}>> = ({ children }) => {
  const [message, setMessage] = React.useState<SnackbarMessage>({
    text: '',
    severity: 'success',
  });
  const [open, setOpen] = React.useState(false);
  const showSnack = (_message: SnackbarMessage): void => {
    setMessage(_message);
    setOpen(true);
  };
  const closeSnack = (): void => {
    setOpen(false);
  };
  return (
    <SnackbarContext.Provider value={{ message, open, showSnack, closeSnack }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContext;

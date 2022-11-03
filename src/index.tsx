import React from 'react';
import ReactDOM from 'react-dom/client';
import 'core/i18n';
import { ApolloProvider } from '@apollo/client';
import { HelmetProvider } from 'react-helmet-async';
import { SnackbarContextProvider } from 'core/contexts/SnackbarContext';
import { AuthContextProvider } from 'core/contexts/AuthContext';
import { Snackbar } from 'components/common/app';
import App from 'components/App';
import client from './apollo';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ApolloProvider client={client}>
    <HelmetProvider>
      <AuthContextProvider>
        <SnackbarContextProvider>
          <App />
          <Snackbar />
        </SnackbarContextProvider>
      </AuthContextProvider>
    </HelmetProvider>
  </ApolloProvider>,
);

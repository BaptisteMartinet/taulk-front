import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { HelmetProvider } from 'react-helmet-async';
import { SnackbarContextProvider } from 'components/common/app/snackbar/SnackbarContext';
import { Snackbar } from 'components/common/app';
import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // TODO handle env var
  cache: new InMemoryCache(),
  name: 'desktop',
  version: '1.0',
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ApolloProvider client={client}>
    <HelmetProvider>
      <SnackbarContextProvider>
        <React.StrictMode>
          <App />
          <Snackbar />
        </React.StrictMode>
      </SnackbarContextProvider>
    </HelmetProvider>
  </ApolloProvider>,
);

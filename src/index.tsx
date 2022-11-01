import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { HelmetProvider } from 'react-helmet-async';
import { SnackbarContextProvider } from 'components/common/app/snackbar/SnackbarContext';
import { Snackbar } from 'components/common/app';
import App from './App';

// TODO refactor move this to a separated file

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', // TODO handle uri in env
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token != null ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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

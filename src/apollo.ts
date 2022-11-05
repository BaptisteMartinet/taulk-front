import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { setContext } from '@apollo/client/link/context';
import { createClient } from 'graphql-ws';
import { REACT_APP_API_URI, REACT_APP_SUBSCRIPTION_API_URI } from 'core/env';

const httpLink = createHttpLink({
  uri: REACT_APP_API_URI,
});

const wsLink = new GraphQLWsLink(createClient({
  url: REACT_APP_SUBSCRIPTION_API_URI ?? '',
  connectionParams: {
    Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
  },
}));

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token != null ? `Bearer ${token}` : '',
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (definition.kind === 'OperationDefinition' && definition.operation === 'subscription');
  },
  wsLink,
  authLink.concat(httpLink),
);

export default new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query_Public: {
        merge(existing, incoming, { mergeObjects }) {
          return mergeObjects(existing, incoming);
        },
      },
      Query_Authenticated: {
        merge(existing, incoming, { mergeObjects }) {
          return mergeObjects(existing, incoming);
        },
      },
      Mutation_Public: {
        merge(existing, incoming, { mergeObjects }) {
          return mergeObjects(existing, incoming);
        },
      },
      Mutation_Authenticated: {
        merge(existing, incoming, { mergeObjects }) {
          return mergeObjects(existing, incoming);
        },
      },
    },
  }),
  name: 'desktop',
  version: '1.0',
});

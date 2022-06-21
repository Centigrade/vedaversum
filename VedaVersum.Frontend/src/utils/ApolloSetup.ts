import { ApolloClient, ApolloLink, concat, from, HttpLink, InMemoryCache, split } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { readAuthContextFromLocalStorage } from '../authentication/AutContext';

// TODO: Use environment variable
const backendLink = new HttpLink({ uri: 'http://localhost:5000/graphql/' });

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:5000/graphql',
    connectionParams: {
      authToken: readAuthContextFromLocalStorage()?.authToken,
    },
  }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  backendLink,
);

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: readAuthContextFromLocalStorage()?.authToken
        ? `Bearer ${readAuthContextFromLocalStorage()?.authToken}`
        : '',
    },
  }));

  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    );

  if (networkError) console.error(`[Network error]: ${networkError}`);
});

export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, from([errorLink, splitLink])),
  cache: new InMemoryCache(),
});

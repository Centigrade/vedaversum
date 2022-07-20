import { ApolloClient, ApolloLink, concat, from, HttpLink, InMemoryCache, split } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { readAuthContextFromLocalStorage } from '../authentication/AutContext';
const backendLink = new HttpLink({ uri: 'http://localhost:5000/graphql/' });

// .Net server uses an old subscriptions-transport-ws, so making the wsLing the old way.
// More info: https://www.apollographql.com/docs/react/data/subscriptions#the-older-subscriptions-transport-ws-library
const wsLink = new WebSocketLink(
  new SubscriptionClient('ws://localhost:5000/graphql', {
    connectionParams: { reconnect: true },
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

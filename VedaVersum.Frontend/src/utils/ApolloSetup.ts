import {
  ApolloClient,
  ApolloLink,
  concat,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { readAuthContextFromLocalStorage } from "../authentication/AutContext";

// TODO: Use environment variable
const backendLink = new HttpLink({ uri: "http://localhost:5000/graphql/" });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: readAuthContextFromLocalStorage()?.authToken
        ? `Bearer ${readAuthContextFromLocalStorage()?.authToken}`
        : "",
    },
  }));

  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.error(`[Network error]: ${networkError}`);
});

export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, from([errorLink, backendLink])),
  cache: new InMemoryCache(),
});

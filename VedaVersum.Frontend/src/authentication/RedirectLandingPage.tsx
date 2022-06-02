import { useMutation } from '@apollo/client';
import queryString from 'query-string';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { AUTHENTICATE_MUTATION } from '../api/authentication';
import {
  AuthenticateMutation,
  AuthenticationMutationResponse,
  AuthenticationMutationVariables,
} from '../model/response-types';
import { AuthContextType, setAuthContextToLocalStorage } from './AutContext';
import { AuthContext } from './RequreAuth';

// This mechanism prevents to call AuthMutation second time
interface MutationWaitStatus {
  isStarted: boolean;
}

const mutationStatus = React.createContext<MutationWaitStatus>({
  isStarted: false,
});

export function RedirectLandingPage() {
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const code = parsed.code;
  //   const state = parsed.state;
  const authContext = React.useContext(AuthContext);

  const [authenticate] = useMutation<AuthenticateMutation>(AUTHENTICATE_MUTATION, {
    errorPolicy: 'all',
    onCompleted: data => authMutationCompleted(data.gitLabAuthenticate, authContext),
  });

  // Getting the mutation execution status
  const callStatus = React.useContext(mutationStatus);
  if (code && !callStatus.isStarted) {
    // Got code from address string. Now we will use this code as param in GraphQL authentication mutation
    const codeParameter: AuthenticationMutationVariables = {
      oAuthCode: code.toString(),
    };
    console.log(codeParameter);

    authenticate({ variables: codeParameter });
    callStatus.isStarted = true;
  }

  return <p>Authenticating...</p>;
}

function authMutationCompleted(response: AuthenticationMutationResponse, authContext: AuthContextType) {
  console.log('onCompleted', response);
  authContext.authToken = response.authenticationToken;
  authContext.user = response.authenticatedUser ?? undefined;
  authContext.isAuthenticated = response.authenticatedUser ? true : false;
  setAuthContextToLocalStorage(authContext);

  window.location.replace('/');
}

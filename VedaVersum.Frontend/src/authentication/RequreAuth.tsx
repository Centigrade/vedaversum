import React from 'react';
import { AuthContextType, initAuthContext } from './AutContext';
import { GITLAB_BASE_ADDRESS, GITLAB_CLIENT_ID, REDIRECT_URL } from './GitLabAuth';

// TODO: To access to the real GitLab Auth provider, please create the `GitLabAuth.ts` file and add into this file followed:
/*
export const GITLAB_BASE_ADDRESS = '';
export const GITLAB_CLIENT_ID = '';
export const REDIRECT_URL = '';
// And fill the values with real data
*/

export const AuthContext = React.createContext<AuthContextType>(initAuthContext());
const Provider = AuthContext.Provider;

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = React.useContext(AuthContext);

  if (!auth.isAuthenticated) {
    const url = `https://${GITLAB_BASE_ADDRESS}/oauth/authorize?client_id=${GITLAB_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code&state=ff6fffa6-dd38-49a5-a27b-04f14c91328b&scope=read_user`;
    window.location.replace(url);
    return <p>Unauthorized</p>;
  }

  return <Provider value={auth}>{children}</Provider>;
}

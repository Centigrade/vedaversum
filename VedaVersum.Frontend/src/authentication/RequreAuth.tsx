import React from 'react';
import { AuthContextType, initAuthContext } from './AutContext';

// TODO: Use environment variables
const GITLAB_BASE_ADDRESS = '';
const GITLAB_CLIENT_ID = '';
const REDIRECT_URL = '';

export const AuthContext = React.createContext<AuthContextType>(
  initAuthContext()
);
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

import { User } from '../model/user';

const AUTH_CONTEXT_KEY = 'veda-versum-auth';

export interface AuthContextType {
  user?: User;
  isAuthenticated: boolean;
  authToken?: string;
}

export function readAuthContextFromLocalStorage() {
  const stringContext = localStorage.getItem(AUTH_CONTEXT_KEY) || null;

  if (!stringContext) return null;

  return JSON.parse(stringContext) as AuthContextType;
}

export function initAuthContext() {
  const existingContext = readAuthContextFromLocalStorage();
  if (existingContext) {
    return existingContext;
  }
  return { isAuthenticated: false } as AuthContextType;
}

export function setAuthContextToLocalStorage(context?: AuthContextType) {
  let stringContext: string = '';
  if (context) {
    stringContext = JSON.stringify(context);
  }
  localStorage.setItem(AUTH_CONTEXT_KEY, stringContext);
}

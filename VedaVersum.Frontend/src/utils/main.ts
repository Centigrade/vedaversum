import { readAuthContextFromLocalStorage } from 'authentication/AutContext';

export interface LoggedInUserData {
  userName: string;
  userEmail: string;
  visualUserName: string;
}
export function getLoggedInUserData(): LoggedInUserData {
  const loginData = readAuthContextFromLocalStorage();
  return {
    userName: loginData?.user?.name || '',
    userEmail: loginData?.user?.email || '',
    visualUserName: loginData?.user?.name.split('.')[0] || '',
  };
}

import placeholderAvatarImage from 'assets/images/placeholderUserAvatar.png';
import { readAuthContextFromLocalStorage } from 'authentication/AutContext';

export interface LoggedInUserData {
  userName: string;
  userEmail: string;
  visualUserName: string;
}

/**
 * reads the user's login data (name and email) from the local storage
 * @returns an object with the user's name, email and username for visual display
 */
export function getLoggedInUserData(): LoggedInUserData {
  const loginData = readAuthContextFromLocalStorage();
  return {
    userName: loginData?.user?.name || '',
    userEmail: loginData?.user?.email || '',
    visualUserName: loginData?.user?.name.split('.')[0] || '',
  };
}

/**
 * gets the URL of the pixel avatar of the user currently logged in
 * @param userName the user's name according to whom the URL is searched for
 * @returns the URL of the pixel avatar of the user currently logged in
 */
export function getAvatarUrl(userName: string): string {
  if (userName) {
    return `https://www.centigrade.de/basic/resources/images/team/pixel-avatar-portraits/${userName}.png`;
  } else {
    return placeholderAvatarImage;
  }
}

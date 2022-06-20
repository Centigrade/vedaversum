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

/**
 * formats a given date to a readable version
 * @param date given date as string that has to be formatted
 * @returns formatted date as string
 */
export function formatDate(date: string): string {
  const givenDate = new Date(date);
  const options: object = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
  };
  const formattedDate = givenDate.toLocaleDateString('en-GB', options);
  return ' – ' + formattedDate;
}

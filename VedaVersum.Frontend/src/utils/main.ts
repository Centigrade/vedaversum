import smiley from 'assets/images/Smiley.png';
import { readAuthContextFromLocalStorage } from 'authentication/AutContext';
import { VedaVersumArticle } from 'model/veda-versum-article';

//#region types
/**
 * type for the prepared user data of the user currently logged in
 */
export interface LoggedInUserData {
  userName: string;
  userEmail: string;
  visualUserName: string;
}

/**
 * type for sorting the articles -> these are the only valid options:
 */
type SortingOption = 'latest' | 'trending' | 'lastModified';
//#endregion

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
    return smiley;
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

/**
 * sorts all articles by a given sorting option and sets the active articles to the sorted articles
 * @param sortBy a sorting option selected by the user
 */
export function sortArticlesBy(sortBy: SortingOption, articles: VedaVersumArticle[]): VedaVersumArticle[] {
  if (articles) {
    let sortedArticles: VedaVersumArticle[] = [...articles];
    switch (sortBy) {
      case 'latest':
        sortedArticles.sort((a: VedaVersumArticle, b: VedaVersumArticle) => b.created.localeCompare(a.created));
        break;
      case 'trending':
        sortedArticles.sort((a: VedaVersumArticle, b: VedaVersumArticle) => b.accessCounter - a.accessCounter);
        break;
      case 'lastModified':
        sortedArticles.sort((a: VedaVersumArticle, b: VedaVersumArticle) => {
          if (b.updatedAt && a.updatedAt) {
            return b.updatedAt.localeCompare(a.updatedAt);
          } else if (b.updatedAt && !a.updatedAt) {
            return b.updatedAt.localeCompare(a.created);
          } else if (!b.updatedAt && a.updatedAt) {
            return b.created.localeCompare(a.updatedAt);
          } else {
            return b.created.localeCompare(a.created);
          }
        });
        break;
      default:
        sortedArticles = [];
    }
    return sortedArticles;
  } else {
    return [];
  }
}

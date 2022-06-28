import burningCar from 'assets/images/BurningCar.png';
import burningCarPreview from 'assets/images/BurningCarPreview.png';
import campus from 'assets/images/Campus.png';
import campusPreview from 'assets/images/CampusPreview.png';
import partyFloor from 'assets/images/PartyFloor.png';
import partyFloorPreview from 'assets/images/PartyFloorPreview.png';
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

//#region working variables
/**
 * max value of the access counter
 */
let accessCounterMaxValue = 0;
/**
 * defines after passing a value dependent on the accessCounterMaxValue the image of an article is chosen
 */
const articleImageChoiceSteps = 1 / 3;
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
 * chooses an article image (preview or detailed view) for an article according to its access counter value
 * @param articleAccessValue access counter value of the article
 * @param preview states if the preview or the detailed image is needed
 * @returns path to an image
 */
export function getImagePath(articleAccessValue: number, preview: boolean): string {
  if (articleAccessValue >= accessCounterMaxValue * 2 * articleImageChoiceSteps) {
    if (preview) {
      return burningCarPreview;
    } else {
      return burningCar;
    }
  } else if (articleAccessValue >= accessCounterMaxValue * articleImageChoiceSteps) {
    if (preview) {
      return partyFloorPreview;
    } else {
      return partyFloor;
    }
  } else {
    if (preview) {
      return campusPreview;
    } else {
      return campus;
    }
  }
}

/**
 * calculates the maximum value of the articles' access counter
 * @param articles : articles providing the access counter values
 */
export function calculateAccessCounterMaxValue(articles: VedaVersumArticle[] | undefined) {
  if (articles) {
    let tempMaxValue = 0;
    articles.forEach(article => {
      if (article.accessCounter > tempMaxValue) {
        console.log('old temp = ' + tempMaxValue);
        tempMaxValue = article.accessCounter;
        console.log('new temp = ' + tempMaxValue);
      }
    });
    accessCounterMaxValue = tempMaxValue;
  }
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

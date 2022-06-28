import burningCar from 'assets/images/BurningCar.png';
import burningCarPreview from 'assets/images/BurningCarPreview.png';
import imageNotFound from 'assets/images/ImageNotFound.png';
import partyFloor from 'assets/images/PartyFloor.png';
import partyFloorPreview from 'assets/images/PartyFloorPreview.png';
import smiley from 'assets/images/Smiley.png';
import tent from 'assets/images/Tent.png';
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
 * type for the article image paths (preview and article image)
 */
export interface ArticleImagePaths {
  previewImage: string;
  articleImage: string;
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
    userEmail: loginData?.user?.email || '', // FOR TESTING: 'xyz@centigrade.de'
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
 * reads article image paths from the local storage
 * @param articleId the id of the article
 * @returns an object with the preview image path and the article image path
 */
export function getArticleImagePathsFromLocalStorage(articleId: string | undefined): ArticleImagePaths {
  let previewImage = imageNotFound;
  let articleImage = imageNotFound;
  if (articleId) {
    const localStoragePreviewImage = localStorage.getItem(`${articleId}_previewImage`);
    const localStorageArticleImage = localStorage.getItem(`${articleId}_articleImage`);
    if (localStoragePreviewImage && localStorageArticleImage) {
      previewImage = localStoragePreviewImage;
      articleImage = localStorageArticleImage;
      return {
        previewImage: previewImage,
        articleImage: articleImage,
      };
    } else {
      return getRandomArticleImagePath(articleId);
    }
  } else {
    return {
      previewImage: imageNotFound,
      articleImage: imageNotFound,
    };
  }
}

/**
 * selects randomly an image for the given article and stores it in the local storage
 * @param articleId the id of the article
 * @returns an object with the preview image path and the article image path
 */
export function getRandomArticleImagePath(articleId: string): ArticleImagePaths {
  const previewImages = [tent, partyFloorPreview, smiley, burningCarPreview];
  const articleImages = [tent, partyFloor, smiley, burningCar];
  const randomImageIndex = Math.floor(Math.random() * previewImages.length);
  const imagePaths: ArticleImagePaths = {
    previewImage: previewImages[randomImageIndex],
    articleImage: articleImages[randomImageIndex],
  };
  localStorage.setItem(`${articleId}_previewImage`, imagePaths.previewImage);
  localStorage.setItem(`${articleId}_articleImage`, imagePaths.articleImage);
  return imagePaths;
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

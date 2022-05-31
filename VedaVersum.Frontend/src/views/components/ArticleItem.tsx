import placeholderArticleImage from 'assets/PlaceholderArticleImage.png';
import { VedaVersumArticle } from 'model';
import 'reactjs-popup/dist/index.css';
import { getLoggedInUserData, LoggedInUserData } from 'utils/main';
import ConfirmDeleteArticle from 'views/components/ConfirmDeleteArticle';
import EditArticle from 'views/components/EditArticle';
import PopUpModal from 'views/components/PopUpModal';
import UserName from './UserName';

//#region type definitions
/**
 * property type for an article item
 */
export interface ArticleItemProps {
  // data from the article that should be displayed
  articleData: VedaVersumArticle;
  // boolean to distinguish if only a preview of the article should be shown, i.e. in a list of articles
  preview: boolean;
}
//#endregion

function ArticleItem(props: ArticleItemProps) {
  const article = props.articleData;

  // get login data for author validation
  const loginUserData: LoggedInUserData = getLoggedInUserData();

  // number of characters after which the article content is truncated
  const numberOfCharacters = 220;

  //#region render component
  return (
    <div className="mb-5 text-gray-800 ">
      <div className="flex items-center text-article-info">
        <UserName email={article.userCreated} />
        <span>{formatDate(article.created)}</span>
      </div>
      <div className="flex items-between">
        <div className="w-3/4">
          <h4 className="text-article-heading mb-3 font-medium">{article.title} </h4>
          <p className="text-article-text">
            {props.preview ? truncateText(article.content, numberOfCharacters) : article.content}
          </p>
        </div>
        <div className="w-1/4 ml-8">
          <img src={placeholderArticleImage} alt="some pic" />
        </div>
      </div>

      {!props.preview && (
        <div className="flex justify-end items-center mt-3">
          {/* edit article */}
          <PopUpModal show={EditArticle} openModalText="Edit article" />
          {/* delete article - only accessible if logged in user === author */}
          {loginUserData.userEmail === article.userCreated && (
            <PopUpModal show={ConfirmDeleteArticle} openModalText="Delete article" />
          )}
        </div>
      )}
    </div>
  );
}
//#endregion

//#region helper functions
/**
 * truncates a given string after a given number of characters
 * @param content string to be truncated
 * @param numberOfCharacters number of characters after which the string is truncated
 * @returns truncated string with '...' at the end
 */
function truncateText(content: string, numberOfCharacters: number): string {
  let contentPreview = content;
  return contentPreview.slice(0, numberOfCharacters) + '...';
}

/**
 * formats a given date to a readable version
 * @param date given date as string that has to be formatted
 * @returns formatted date as string
 */
function formatDate(date: string): string {
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
//#endregion
export default ArticleItem;

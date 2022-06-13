import placeholderArticleImage from 'assets/PlaceholderArticleImage.png';
import { VedaVersumArticle } from 'model/veda-versum-article';
import 'reactjs-popup/dist/index.css';
import { getLoggedInUserData, LoggedInUserData } from 'utils/main';
import ArticleEditor from 'views/components/ArticleEditor';
import ConfirmDeleteArticle from 'views/components/ConfirmDeleteArticle';
import PopUpModal from 'views/components/PopUpModal';
import UserName from './UserName';

//#region type definitions
/**
 * property type for an article item
 */
export interface ArticleItemProps {
  /**
   * data from the article that should be displayed
   * */
  articleData: VedaVersumArticle;
  /**
   * boolean to distinguish if only a preview of the article should be shown, i.e. in a list of articles, or the entire article
   * */
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
    <div className="mb-12">
      <div className="flex items-center text-article-info">
        <UserName email={article.userCreated} />
        <span>{formatDate(article.created)}</span>
      </div>
      <div className="flex items-between">
        <div className="w-3/4">
          <h4 className="text-article-heading mb-3 font-medium">{article.title} </h4>
          <p className="text-article-text text-gray-800">
            {props.preview && article.content.length > numberOfCharacters
              ? truncateText(article.content, numberOfCharacters)
              : article.content}
          </p>
        </div>
        <div className="w-1/4 ml-8">
          <img src={placeholderArticleImage} alt="some pic" />
        </div>
      </div>
      {article.updatedAt && article.userUpdated && (
        <div className="flex mt-4">
          <span className="mr-4">Last modified by </span>
          <UserName email={article.userUpdated} />
          <span>{formatDate(article.updatedAt)}</span>
        </div>
      )}

      {!props.preview && (
        <div className="flex justify-end items-center mt-6">
          {/* edit article */}
          <PopUpModal show={ArticleEditor} openModalText="Edit" dataContext={article} />
          {/* delete article - only accessible if logged in user === author */}
          {loginUserData.userEmail === article.userCreated && (
            <div className="ml-2">
              <PopUpModal show={ConfirmDeleteArticle} openModalText="Delete" dataContext={article} />
            </div>
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

import { VedaVersumArticle } from 'model/veda-versum-article';
import 'reactjs-popup/dist/index.css';
import { formatDate, getArticleImagePathsFromLocalStorage } from 'utils/main';
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
}
//#endregion

function ArticleItem(props: ArticleItemProps) {
  const article = props.articleData;

  // number of characters after which the article content is truncated
  const numberOfCharacters = 220;

  //#region render component
  return (
    <div className="mb-12">
      <div className="flex items-between">
        <div className="w-3/4 flex flex-col">
          <div className="flex items-center text-article-info my-auto">
            <UserName email={article.userCreated} />
            <span>{formatDate(article.created)}</span>
          </div>
          <h4 className="text-article-heading my-auto font-medium text-left">{article.title} </h4>
          <p className="text-article-text text-gray-800 my-auto">
            {article.content.length > numberOfCharacters
              ? truncateText(article.content, numberOfCharacters)
              : article.content}
          </p>

          <div className="flex mt-5">
            {article.updatedAt && article.userUpdated && (
              <>
                <span className="mr-4">Last modified by </span>
                <UserName email={article.userUpdated} />
                <span>{formatDate(article.updatedAt)}</span>
              </>
            )}
          </div>
        </div>
        <div className="w-1/4 ml-8">
          <img src={getArticleImagePathsFromLocalStorage(article.id).previewImage} alt="some pic" />
        </div>
      </div>
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
//#endregion
export default ArticleItem;

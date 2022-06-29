import { VedaVersumArticle } from 'model/veda-versum-article';
import 'reactjs-popup/dist/index.css';
import { formatDate, getImagePath } from 'utils/main';
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
          <p className="text-article-text text-gray-800 mb-auto mt-4 line-clamp-3">{article.content}</p>

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
          <img src={getImagePath(article.accessCounter, true)} alt="some pic" />
        </div>
      </div>
    </div>
  );
}
//#endregion

export default ArticleItem;

import MDEditor from '@uiw/react-md-editor';
import { VedaVersumArticle } from 'model/veda-versum-article';
import 'reactjs-popup/dist/index.css';
import { formatDate } from 'utils/main';
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
  const article: VedaVersumArticle = props.articleData;

  //#region render component
  return (
    <div className="mb-12 rounded-lg border border-gray-600-opacity-50 shadow-md p-5" data-color-mode="light">
      <div className="flex items-between">
        <div className="w-full flex flex-col" id="article-list-item">
          <div className="flex items-center text-article-info mb-5">
            <UserName email={article.userCreated} />
            <span>{formatDate(article.created)}</span>
          </div>
          <h4 className="text-article-heading font-medium text-left mb-2">{article.title} </h4>
          <MDEditor
            className="shadow-none border-none pl-0"
            value={article.content}
            preview="preview"
            height={140}
            hideToolbar={true}
            autoFocus={false}
            visiableDragbar={false}
            overflow={false}
          />
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
      </div>
    </div>
  );
}
//#endregion

export default ArticleItem;

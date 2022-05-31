import { PopupHostedView } from 'views/components/PopUpModal';
import 'views/components/styles/confirmDelete.scss';

import { useQuery } from '@apollo/client';
import { ARTICLE_BY_ID_QUERY } from '../../api/articles-queries';
import { GetArticle } from '../../model/get-article-by-id-response';

function ConfirmDeleteArticle(props: PopupHostedView) {
  /* get article data from the database */
  const { error, data, loading } = useQuery<GetArticle>(ARTICLE_BY_ID_QUERY, {
    errorPolicy: 'all',
    variables: { articleId: props.articleId },
  });

  //#region state - article variables
  const title = data ? data.article.title : 'Title';
  const confirmText = data
    ? `Are you sure you want to delete the article "${title}"?`
    : loading
    ? 'Loading...'
    : error
    ? error.message
    : 'Something went wrong, please try again.';

  function deleteArticle() {
    // TODO: call delete query
    props.closePopup();
  }

  //#region render component
  return (
    <div>
      {/* header */}
      <div className="w-full flex justify-between bg-primary text-white p-3 rounded-t-lg">
        <h1>Confirm delete</h1>
        <button
          className="hover:cursor-pointer outline outline-4 outline-transparent text-base font-bold text-center py-0 px-1 active:text-primary-dark hover:text-primary-dark"
          onClick={props.closePopup}
        >
          x
        </button>
      </div>
      <div className="my-4 p-4 text-subhead">
        <p>{confirmText}</p>
        {title && <p>This action cannot be undone!</p>}
      </div>
      {/* actions */}
      <div className="m-4 px-2 flex justify-end">
        <button
          className="hover:cursor-pointer outline outline-4 outline-transparent text-white text-base text-center rounded-lg font-white bg-red py-2 px-3 mr-4 hover:outline-gray-400 active:bg-gray-600"
          onClick={() => {
            deleteArticle();
          }}
        >
          Delete article
        </button>
        <button
          className="hover:cursor-pointer outline outline-4 outline-transparent text-white text-base text-center rounded-lg font-white bg-gray-800 py-2 px-3 hover:outline-gray-400 active:bg-gray-600"
          onClick={() => {
            props.closePopup();
          }}
        >
          Keep article
        </button>
      </div>
    </div>
  );
}
//#endregion
export default ConfirmDeleteArticle;

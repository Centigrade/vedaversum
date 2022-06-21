import { useMutation } from '@apollo/client';
import { DELETE_ARTICLE_MUTATION } from 'api/article-mutations';
import { VedaVersumArticle } from 'model/veda-versum-article';

/**
 * type for editor props
 */
interface DeleteArticleProps {
  closePopup: () => void;
  dataContext: VedaVersumArticle;
}

function ConfirmDeleteArticle(props: DeleteArticleProps) {
  //#region state - article variables
  const title = props.dataContext.title;
  const confirmText = `Are you sure you want to delete the article "${title}"?`;

  /**
   * calls database mutation to update an existing article in the database
   */
  const [deleteArticle, { data: deleteArticleData, loading: loadingDeleteArticle, error: errorDeleteArticle }] =
    useMutation(DELETE_ARTICLE_MUTATION, {
      variables: { articleId: props.dataContext.id, articleTitle: title, articleContent: props.dataContext.content },
    });

  function confirmDeleteArticle() {
    deleteArticle();
    if (!errorDeleteArticle) {
      props.closePopup();
    }
  }

  //#region render component
  return (
    <div>
      {/* header */}
      <div className="w-full flex justify-between bg-primary text-white p-3 rounded-t-lg">
        <p className="text-article-text">Confirm delete</p>
        <button
          className="hover:cursor-pointer outline outline-4 outline-transparent text-base font-bold text-center py-0 px-1 active:text-primary-dark hover:text-primary-dark"
          onClick={props.closePopup}
        >
          x
        </button>
      </div>
      <div className="my-4 p-4 text-article-heading">
        <p>{confirmText}</p>
        {title && <p>This action cannot be undone!</p>}
      </div>
      {/* actions */}
      <div className="m-4 px-2 flex justify-end">
        {errorDeleteArticle && (
          <div className="mr-8 font-bold text-red text-article-heading">Error: {errorDeleteArticle.message}</div>
        )}
        <button
          className="hover:cursor-pointer outline outline-4 outline-transparent text-white text-base text-center rounded-lg font-white bg-red py-2 px-3 mr-4 hover:outline-gray-400 active:bg-gray-600"
          onClick={() => {
            confirmDeleteArticle();
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

import { ApolloError, useMutation } from '@apollo/client';
import { DELETE_ARTICLE_MUTATION } from 'api/article-mutations';
import { ArticleActionResponse } from 'model/response-types';
import { VedaVersumArticle } from 'model/veda-versum-article';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetAllViewSettings } from 'utils/main';

/**
 * type for editor props
 */
interface DeleteArticleProps {
  closePopup: () => void;
  dataContext: VedaVersumArticle;
}

function ConfirmDeleteArticle(props: DeleteArticleProps) {
  const dispatch = useDispatch();
  //#region state - article variables
  const title = props.dataContext.title;
  const confirmText = `Are you sure you want to delete the article "${title}"?`;
  // error to show if delete article failed
  const [databaseError, setDatabaseError] = useState<ApolloError | undefined>(undefined);

  // variable needed for router navigation
  let navigateTo = useNavigate();

  /**
   * calls database mutation to delete an existing article in the database
   */
  const [deleteArticle] = useMutation<ArticleActionResponse>(DELETE_ARTICLE_MUTATION, {
    variables: { articleId: props.dataContext.id, articleTitle: title, articleContent: props.dataContext.content },
    onError: error => {
      setDatabaseError(error);
    },
    onCompleted: data => {
      props.closePopup();
      resetAllViewSettings(dispatch, navigateTo);
    },
  });
  //#endregion

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
      {databaseError && (
        <div className="ml-6 my-6 font-bold text-red text-article-heading">Error - {databaseError.message}</div>
      )}
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

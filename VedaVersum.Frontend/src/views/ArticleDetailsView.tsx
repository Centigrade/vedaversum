import { useMutation, useQuery } from '@apollo/client';
import MDEditor from '@uiw/react-md-editor';
import { UPDATE_ARTICLE_ACCESS_COUNTER_MUTATION } from 'api/article-mutations';
import goBackArrow from 'assets/icons/go-back-arrow.svg';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatDate, getLoggedInUserData, LoggedInUserData } from 'utils/main';
import ArticleEditor from 'views/components/ArticleEditor';
import ConfirmDeleteArticle from 'views/components/ConfirmDeleteArticle';
import PopUpModal from 'views/components/PopUpModal';
import { ARTICLE_BY_ID_QUERY } from '../api/article-queries';
import { GetArticleResponse, UpdateArticleAccessCounterResponse } from '../model/response-types';
import UserName from './components/UserName';

function ArticleDetailsView() {
  //#region get article data
  // read article id from the url parameters
  const { id: articleId } = useParams();

  // get article data from the database
  const { error, data, loading } = useQuery<GetArticleResponse>(ARTICLE_BY_ID_QUERY, {
    errorPolicy: 'all',
    variables: { articleId: articleId },
  });
  const currentArticle = data?.article;
  //#endregion

  // get login data for author validation
  const loginUserData: LoggedInUserData = getLoggedInUserData();

  // mutation to increase access counter
  const [updateArticleAccessCounter] = useMutation<UpdateArticleAccessCounterResponse>(
    UPDATE_ARTICLE_ACCESS_COUNTER_MUTATION,
    {
      variables: { articleId: articleId },
    },
  );

  useEffect(() => {
    // in develop mode this gets called twice because in develop mode onMount (useEffect) gets called twice
    // increase article access counter on mount
    updateArticleAccessCounter();
  }, [updateArticleAccessCounter]);

  //#region render view
  return (
    <>
      <div className="flex items-start w-full">
        <div className="p-8 w-1/6">
          <Link to={'/'}>
            <img src={goBackArrow} alt="arrow pointing to the left" className="w-1/6" />
          </Link>
        </div>
        <div className="pt-5 px-10 text-gray-600 flex items-start w-2/3">
          <div className="w-full">
            {loading && <p className="text-head">Loading...</p>}
            {error && <p className="text-head">{error.message} :(</p>}
            {!data && !loading && !error && <p className="text-head">No data available</p>}
            {currentArticle && (
              <div className="pt-11" data-color-mode="light">
                <div className="w-full flex items-center text-article-info mb-6">
                  <UserName email={currentArticle.userCreated} />
                  <span>{formatDate(currentArticle.created)}</span>
                </div>
                <div className="mb-10" id="article-details">
                  <h1 className="text-head my-auto font-medium text-left font-bold mb-3">{currentArticle.title} </h1>
                  <MDEditor
                    className="shadow-none border-none pl-0 w-full"
                    value={currentArticle.content}
                    preview="preview"
                    minHeight={230}
                    height={230}
                    hideToolbar={true}
                    autoFocus={false}
                    visiableDragbar={true}
                    overflow={false}
                  />
                </div>
                <div className="flex">
                  {currentArticle.updatedAt && currentArticle.userUpdated && (
                    <>
                      <span className="mr-4">Last modified by </span>
                      <UserName email={currentArticle.userUpdated} />
                      <span>{formatDate(currentArticle.updatedAt)}</span>
                    </>
                  )}
                </div>
                <div className="flex justify-end items-center pt-8 mb-8">
                  {/* edit article */}
                  <PopUpModal show={ArticleEditor} openModalText="Edit" dataContext={currentArticle} />
                  {/* delete article - only accessible if logged in user === author */}
                  {loginUserData.userEmail === currentArticle.userCreated && (
                    <div className="ml-2">
                      <PopUpModal show={ConfirmDeleteArticle} openModalText="Delete" dataContext={currentArticle} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/6"></div>
      </div>
    </>
  );
  //#endregion
}

export default ArticleDetailsView;

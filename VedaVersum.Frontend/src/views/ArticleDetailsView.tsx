import { useQuery } from '@apollo/client';
import goBackArrow from 'assets/icons/go-back-arrow.svg';
import { Link, useParams } from 'react-router-dom';
import {
  ArticleImagePaths,
  formatDate,
  getArticleImagePathsFromLocalStorage,
  getLoggedInUserData,
  LoggedInUserData,
} from 'utils/main';
import ArticleEditor from 'views/components/ArticleEditor';
import ConfirmDeleteArticle from 'views/components/ConfirmDeleteArticle';
import PopUpModal from 'views/components/PopUpModal';
import { ARTICLE_BY_ID_QUERY } from '../api/article-queries';
import { GetArticleResponse } from '../model/response-types';
import Header from './components/Header';
import UserList from './components/UserList';
import UserName from './components/UserName';
function ArticleDetailsView() {
  //#region get article data
  // header
  const { render: renderHeader } = Header();

  // read article id from the url parameters
  const { id: articleId } = useParams();

  // get article data from the database
  const { error, data, loading } = useQuery<GetArticleResponse>(ARTICLE_BY_ID_QUERY, {
    errorPolicy: 'all',
    variables: { articleId: articleId },
  });
  const currentArticle = data?.article;

  // get login data for author validation
  const loginUserData: LoggedInUserData = getLoggedInUserData();

  // get image paths from local storage
  const articleImagePaths: ArticleImagePaths = getArticleImagePathsFromLocalStorage(currentArticle?.id);

  // increase access counter
  // TODO: this should work only on mount!!
  /* const test = useMutation<UpdateArticleAccessCounterResponse>(UPDATE_ARTICLE_ACCESS_COUNTER_MUTATION, {
    variables: { articleId: articleId },
  });
  useEffect(() => {
    console.log('mounted');
  }, []); */
  //#endregion

  //#region render view
  return (
    <>
      {renderHeader}
      <div className="flex items-start w-full">
        <div className="p-8 w-1/6">
          <Link to={'/'}>
            <img src={goBackArrow} alt="arrow pointing to the left" className="w-1/6" />
          </Link>
        </div>
        <div className="p-10 text-gray-600 flex items-start w-2/3">
          <div className="w-3/4">
            {loading && <p className="text-head">Loading...</p>}
            {error && <p className="text-head">{error.message} :(</p>}
            {!data && !loading && !error && <p className="text-head">No data available</p>}
            {currentArticle && (
              <div className="py-11">
                <div className="w-full flex mb-10">
                  <img src={articleImagePaths.articleImage} alt="some pic" className="mx-auto h-96" />
                </div>
                <div className="flex items-center text-article-info mb-6">
                  <UserName email={currentArticle.userCreated} />
                  <span>{formatDate(currentArticle.created)}</span>
                </div>
                <div>
                  <h1 className="text-head my-auto font-medium text-left font-bold mb-6">{currentArticle.title} </h1>
                  <p className="text-article-text text-gray-800 my-auto">{currentArticle.content}</p>
                </div>
                <div className="flex mb-8">
                  {currentArticle.updatedAt && currentArticle.userUpdated && (
                    <>
                      <span className="mr-4">Last modified by </span>
                      <UserName email={currentArticle.userUpdated} />
                      <span>{formatDate(currentArticle.updatedAt)}</span>
                    </>
                  )}
                </div>
                <div className="flex justify-end items-center pt-8">
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
          <div className="w-1/4 pl-24">
            <UserList />
          </div>
        </div>
        <div className="w-1/6"></div>
      </div>
    </>
  );
  //#endregion
}

export default ArticleDetailsView;

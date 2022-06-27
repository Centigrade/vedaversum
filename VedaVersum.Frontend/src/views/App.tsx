import { useQuery } from '@apollo/client';
import { ALL_ARTICLES_QUERY, CREATED_ARTICLES_QUERY } from 'api/article-queries';
import goBackArrow from 'assets/icons/go-back-arrow.svg';
import { GetAllArticlesResponse, GetUserCreatedArticlesResponse } from 'model/response-types';
import { useDispatch, useSelector } from 'react-redux';
import { setNotificationsClicked } from 'store/notificationsClicked.reducer';
import { RootState } from 'store/store';
import { getLoggedInUserData, LoggedInUserData } from 'utils/main';
import ArticleList from 'views/components/ArticleList';
import UserList from 'views/components/UserList';
import RenderedArticles from './components/RenderedArticles';

function App() {
  // login data from user need for "my articles" filter
  const loginUserData: LoggedInUserData = getLoggedInUserData();

  //#region get data from the database
  // load all articles
  const {
    error: errorAllArticles,
    data: allArticlesData,
    loading: loadingAllArticles,
  } = useQuery<GetAllArticlesResponse>(ALL_ARTICLES_QUERY, {
    errorPolicy: 'all',
  });

  // load all articles created by the user
  const {
    error: errorArticlesCreatedByUser,
    data: articlesCreatedByUserData,
    loading: loadingArticlesCreatedByUser,
  } = useQuery<GetUserCreatedArticlesResponse>(CREATED_ARTICLES_QUERY, {
    errorPolicy: 'all',
    variables: { userEmail: loginUserData.userEmail },
  });

  // TODO: fix this with Mikhail
  /* const {
    error: errorSearchArticles,
    data: SearchArticlesData,
    loading: loadingSearchArticles,
  } = useQuery<SearchArticlesResponse>(SEARCH_ARTICLES_QUERY, {
    errorPolicy: 'all',
    variables: { searchTerm: searchTerm },
  }); */
  //#endregion

  // get variables from global store
  const notificationsClicked = useSelector((state: RootState) => state.notificationsClicked.value);
  const searchTerm = useSelector((state: RootState) => state.searchTerm.value);
  const dispatch = useDispatch();

  return (
    <>
      {/* {renderHeader} */}
      <div className="w-full flex items-start mt-8">
        <div className="p-8 w-1/6">
          {(notificationsClicked || searchTerm) && (
            <button onClick={() => dispatch(setNotificationsClicked(false))}>
              <img src={goBackArrow} alt="arrow pointing to the left" />
            </button>
          )}
        </div>
        {allArticlesData && articlesCreatedByUserData ? (
          // all data properly loaded
          <div className="w-3/4">
            {notificationsClicked && (
              <>
                <h1 className="mt-3 mb-6 text-head font-semibold">Last updated</h1>
                <RenderedArticles articles={allArticlesData.allArticles}></RenderedArticles>
              </>
            )}
            {searchTerm && (
              <>
                <h1 className="mt-3 mb-6 text-head font-semibold">Search results</h1>
                <RenderedArticles articles={allArticlesData.allArticles}></RenderedArticles>
              </>
            )}
            {!notificationsClicked && (
              <>
                <ArticleList
                  allArticles={allArticlesData.allArticles}
                  articlesCreatedByUser={articlesCreatedByUserData.allArticlesCreatedByUser}
                />
              </>
            )}
          </div>
        ) : (
          <div className="w-3/4">
            <p className="text-subhead">
              {loadingAllArticles || loadingArticlesCreatedByUser
                ? // data is loading
                  'Loading...'
                : errorAllArticles
                ? // error loading data
                  errorAllArticles.message
                : errorArticlesCreatedByUser
                ? errorArticlesCreatedByUser.message
                : 'Unknown error, please try again.'}
            </p>
          </div>
        )}
        <div className="w-1/4 pl-12">
          <UserList />
          {/* <p>{!loadingArticleUpdates && articleUpdatesData}</p> */}
        </div>
      </div>
    </>
  );
}

export default App;

import { useQuery } from '@apollo/client';
import { ALL_ARTICLES_QUERY, CREATED_ARTICLES_QUERY } from 'api/article-queries';
import goBackArrow from 'assets/icons/go-back-arrow.svg';
import { GetAllArticlesResponse, GetUserCreatedArticlesResponse } from 'model/response-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetLastModifiedArticles } from 'store/lastModifiedArticles.reducer';
import { setNotificationsClicked } from 'store/notificationsClicked.reducer';
import { setSearchTerm } from 'store/searchTerm.reducer';
import { RootState } from 'store/store';
import { calculateAccessCounterMaxValue, getLoggedInUserData, LoggedInUserData } from 'utils/main';
import ArticleList from 'views/components/ArticleList';
import UserList from 'views/components/UserList';
import RenderedArticles from './components/RenderedArticles';

function App() {
  //#region component data
  // login data from user need for "my articles" filter
  const loginUserData: LoggedInUserData = getLoggedInUserData();

  const notificationsClickedHeadingText = 'Last updated';
  const searchResultsHeadingText = 'Search results';
  //#endregion

  //#region get data from the database
  // load all articles
  const {
    error: errorAllArticles,
    data: allArticlesData,
    loading: loadingAllArticles,
  } = useQuery<GetAllArticlesResponse>(ALL_ARTICLES_QUERY, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache', // 'cache-and-network' - if this is wished, a custom merge function must be written
  });

  // load all articles created by the user
  const {
    error: errorArticlesCreatedByUser,
    data: articlesCreatedByUserData,
    loading: loadingArticlesCreatedByUser,
  } = useQuery<GetUserCreatedArticlesResponse>(CREATED_ARTICLES_QUERY, {
    errorPolicy: 'all',
    variables: { userEmail: loginUserData.userEmail },
    fetchPolicy: 'no-cache', // 'cache-and-network' - if this is wished, a custom merge function must be written
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

  //#region database data dependencies
  calculateAccessCounterMaxValue(allArticlesData?.allArticles);

  useEffect(() => {
    calculateAccessCounterMaxValue(allArticlesData?.allArticles);
  }, [allArticlesData]);
  //#endregion

  //#region get variables from global store
  const notificationsClicked = useSelector((state: RootState) => state.notificationsClicked.value);
  const searchTerm = useSelector((state: RootState) => state.searchTerm.value);
  const lastModifiedArticles = useSelector((state: RootState) => state.lastModifiedArticles.value);
  const dispatch = useDispatch();
  //#endregion

  //#region helper functions
  /**
   * handles back click actions according to the current view (notifications vs. search term)
   */
  function handleBackClick(): void {
    if (notificationsClicked) {
      // reset notifications clicked and clear last modified articles list
      dispatch(setNotificationsClicked(false));
      dispatch(resetLastModifiedArticles);
    } else if (searchTerm) {
      // reset search term
      dispatch(setSearchTerm(''));
    }
  }
  //#endregion

  return (
    <>
      <div className="w-full flex items-start mt-8">
        {allArticlesData && articlesCreatedByUserData ? (
          // all data properly loaded
          <>
            <div className="p-8 w-1/6">
              {(notificationsClicked || searchTerm) && (
                <button onClick={() => handleBackClick()}>
                  <img src={goBackArrow} alt="arrow pointing to the left" />
                </button>
              )}
            </div>
            <div className="w-3/4">
              {(notificationsClicked || searchTerm) && (
                <>
                  <h1 className="mt-3 mb-6 text-head font-semibold">
                    {notificationsClicked ? notificationsClickedHeadingText : searchResultsHeadingText}
                  </h1>
                  <RenderedArticles
                    articles={notificationsClicked ? lastModifiedArticles : allArticlesData.allArticles}
                  ></RenderedArticles>
                </>
              )}
              {!notificationsClicked && !searchTerm && (
                <>
                  <ArticleList
                    allArticles={allArticlesData.allArticles}
                    articlesCreatedByUser={articlesCreatedByUserData.allArticlesCreatedByUser}
                  />
                </>
              )}
            </div>
          </>
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
        </div>
      </div>
    </>
  );
}

export default App;

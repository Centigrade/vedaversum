import { useQuery } from '@apollo/client';
import { ALL_ARTICLES_QUERY, CREATED_ARTICLES_QUERY } from 'api/article-queries';
import goBackArrow from 'assets/icons/go-back-arrow.svg';
import { GetAllArticlesResponse, GetUserCreatedArticlesResponse } from 'model/response-types';
import { useDispatch, useSelector } from 'react-redux';
import { resetLastModifiedArticles } from 'store/lastModifiedArticles.reducer';
import { setNotificationsClicked } from 'store/notificationsClicked.reducer';
import { RootState } from 'store/store';
import { getLoggedInUserData, LoggedInUserData } from 'utils/main';
import ArticleList from 'views/components/ArticleList';
import RenderedArticles from './components/RenderedArticles';

function App() {
  //#region component data
  // login data from user need for "my articles" filter
  const loginUserData: LoggedInUserData = getLoggedInUserData();

  const notificationsClickedHeadingText = 'Last updated';

  const loadingText = 'Loading...';
  const unknownErrorText = 'Unknown error loading data from the database, please try again.';
  //#endregion

  //#region get variables from global store
  const notificationsClicked = useSelector((state: RootState) => state.notificationsClicked.value);
  const lastModifiedArticles = useSelector((state: RootState) => state.lastModifiedArticles.value);
  const dispatch = useDispatch();
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
  //#endregion

  //#region helper functions
  /**
   * handles back click actions according to the current view (notifications)
   */
  function handleBackClick(): void {
    if (notificationsClicked) {
      // reset notifications clicked and clear last modified articles list
      dispatch(setNotificationsClicked(false));
      dispatch(resetLastModifiedArticles);
    }
  }
  //#endregion

  //#region render view
  return (
    <div className="w-full flex items-start mt-8">
      {allArticlesData && articlesCreatedByUserData ? (
        // data properly loaded from database
        <>
          {/* go back arrow only on last modified view */}
          <div className="p-8 w-1/6">
            {notificationsClicked && (
              <button onClick={() => handleBackClick()}>
                <img src={goBackArrow} alt="arrow pointing to the left" />
              </button>
            )}
          </div>
          {/* show articles depending on view variables */}
          <div className="w-2/3">
            {notificationsClicked ? (
              // show last modified articles from global store
              lastModifiedArticles ? (
                <>
                  <h1 className="mt-3 mb-6 text-head font-semibold">{notificationsClickedHeadingText}</h1>
                  <RenderedArticles articles={lastModifiedArticles}></RenderedArticles>
                </>
              ) : (
                // last modified articles empty
                'This should never happen: Last modified articles are empty! Please try again.'
              )
            ) : (
              // show main page with articles list
              <ArticleList
                allArticles={allArticlesData.allArticles}
                articlesCreatedByUser={articlesCreatedByUserData.allArticlesCreatedByUser}
              />
            )}
          </div>
          <div className="w-1/6"></div>
        </>
      ) : (
        // general data (= all articles) not loaded yet or error accessing the database
        <p className="text-subhead m-12">
          {loadingAllArticles || loadingArticlesCreatedByUser
            ? // data is loading
              loadingText
            : errorAllArticles
            ? // error loading data
              errorAllArticles.message
            : errorArticlesCreatedByUser
            ? errorArticlesCreatedByUser.message
            : unknownErrorText}
        </p>
      )}
    </div>
  );
  //#endregion
}

export default App;

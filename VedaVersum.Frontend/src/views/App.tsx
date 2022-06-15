import { useQuery } from '@apollo/client';
import { ALL_ARTICLES_QUERY, CREATED_ARTICLES_QUERY } from 'api/article-queries';
import { GetAllArticlesResponse, GetUserCreatedArticlesResponse } from 'model/response-types';
import { getLoggedInUserData, LoggedInUserData } from 'utils/main';
import ArticleList from 'views/components/ArticleList';
import UserList from 'views/components/UserList';
import Header from './components/Header';

function App() {
  // login data from user need for "my articles" filter
  const loginUserData: LoggedInUserData = getLoggedInUserData();

  // search term if exists
  const { render: renderHeader, searchTerm } = Header();

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

  //#region subscriptions to get updates from the database  TODO: fix this with Mikhail
  // const { articleUpdatesData, loadingArticleUpdates } = useSubscription(ARTICLE_CHANGED_SUBSCRIPTION);

  //#endregion

  // useEffect(() => {}, [searchTerm]);

  return (
    <>
      {renderHeader}
      <div className="w-full flex items-start">
        <div className="w-1/6"></div>
        {allArticlesData && articlesCreatedByUserData ? (
          // all data properly loaded
          <div className="w-3/4">
            <h1 className="mb-3 text-head font-semibold">Start reading</h1>
            <ArticleList
              allArticles={allArticlesData.allArticles}
              articlesCreatedByUser={articlesCreatedByUserData.allArticlesCreatedByUser}
            />
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
          <h2 className="mt-8 text-subhead font-semibold">People online</h2>
          <UserList />
          {/* <p>{!loadingArticleUpdates && articleUpdatesData}</p> */}
        </div>
      </div>
    </>
  );
}

export default App;

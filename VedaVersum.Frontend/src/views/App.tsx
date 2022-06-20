import { useQuery } from '@apollo/client';
import { ALL_ARTICLES_QUERY, CREATED_ARTICLES_QUERY } from 'api/article-queries';
import { GetAllArticlesResponse, GetUserCreatedArticlesResponse } from 'model/response-types';
import { useEffect, useState } from 'react';
import { getLoggedInUserData, LoggedInUserData } from 'utils/main';
import ArticleList from 'views/components/ArticleList';
import UserList from 'views/components/UserList';
import Header from './components/Header';

function App() {
  // login data from user need for "my articles" filter
  const loginUserData: LoggedInUserData = getLoggedInUserData();

  // search term if exists
  const { render: renderHeader, searchTerm: propsSearchTerm, clearedAll } = Header();

  //#region state
  const [actualSearchTerm, setActualSearchTerm] = useState(propsSearchTerm ? propsSearchTerm : '');
  //#endregion

  // on mount: read search term from local store
  useEffect(() => {
    const localStorageSearchTerm = localStorage.getItem('searchTerm');
    if (localStorageSearchTerm) {
      setActualSearchTerm(localStorageSearchTerm);
    } else {
      setActualSearchTerm('');
    }
  }, []);

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

  //#endregion

  useEffect(() => {
    setActualSearchTerm(propsSearchTerm);
  }, [propsSearchTerm]);

  return (
    <>
      {renderHeader}
      <div className="w-full flex items-start mt-8">
        <div className="w-1/6"></div>
        {allArticlesData && articlesCreatedByUserData ? (
          // all data properly loaded
          <div className="w-3/4">
            <h1 className="my-3 text-head font-semibold">Start reading</h1>
            <ArticleList
              allArticles={allArticlesData.allArticles}
              articlesCreatedByUser={articlesCreatedByUserData.allArticlesCreatedByUser}
              clearedLocalStorage={clearedAll}
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

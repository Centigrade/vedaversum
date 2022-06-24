import { useQuery } from '@apollo/client';
import { ALL_ARTICLES_QUERY, CREATED_ARTICLES_QUERY } from 'api/article-queries';
import { GetAllArticlesResponse, GetUserCreatedArticlesResponse } from 'model/response-types';
import { useState } from 'react';
import { getLoggedInUserData, LoggedInUserData } from 'utils/main';
import ArticleList from 'views/components/ArticleList';
import UserList from 'views/components/UserList';

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

  //#region state and child components
  const [notificationsRead, setNotificationsRead] = useState(false);

  // header and search term if exists
  /* const {
    render: renderHeader,
    searchTerm: propsSearchTerm,
    notificationsClicked,
  } = Header({ resetNotificationsClickedState: notificationsRead }); 

  const [actualSearchTerm, setActualSearchTerm] = useState(propsSearchTerm ? propsSearchTerm : '');*/

  // on mount: read search term from local store
  /*  useEffect(() => {
    const localStorageSearchTerm = localStorage.getItem('searchTerm');
    if (localStorageSearchTerm) {
      setActualSearchTerm(localStorageSearchTerm);
    } else {
      setActualSearchTerm('');
    }
  }, []); */
  //#endregion

  /*  useEffect(() => {
    setActualSearchTerm(propsSearchTerm);
  }, [propsSearchTerm]); */

  return (
    <>
      {/* {renderHeader} */}
      <div className="w-full flex items-start mt-8">
        <div className="p-8 w-1/6">
          {/* {notificationsClicked && (
            <button onClick={() => setNotificationsRead(true)}>
              <img src={goBackArrow} alt="arrow pointing to the left" />
            </button>
          )} */}
        </div>{' '}
        {allArticlesData && articlesCreatedByUserData ? (
          // all data properly loaded
          <div className="w-3/4">
            {/* {notificationsClicked && <LastUpdatedArticles articles={allArticlesData.allArticles}></LastUpdatedArticles>} */}
            {/* {!notificationsClicked && ( */}
            <>
              <h1 className="my-3 text-head font-semibold">Start reading</h1>
              <ArticleList
                allArticles={allArticlesData.allArticles}
                articlesCreatedByUser={articlesCreatedByUserData.allArticlesCreatedByUser}
              />
            </>
            {/* )} */}
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

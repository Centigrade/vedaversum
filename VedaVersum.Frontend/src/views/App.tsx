import { useQuery } from '@apollo/client';
import { ALL_ARTICLES_QUERY, CREATED_ARTICLES_QUERY } from 'api/article-queries';
import { GetAllArticlesResponse } from 'model/get-all-articles-response';
import { GetUserCreatedArticlesResponse } from 'model/get-user-created-articles-response';
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
  //#endregion

  return (
    <div className="md:p-6 sm:p-4 xl:mx-40 lg:mx-32 md:mx-10 text-gray-600 flex items-start">
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
      </div>
    </div>
  );
}

export default App;

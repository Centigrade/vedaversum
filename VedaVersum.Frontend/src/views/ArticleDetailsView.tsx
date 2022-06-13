import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_ARTICLE_ACCESS_COUNTER_MUTATION } from 'api/article-mutations';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ARTICLE_BY_ID_QUERY } from '../api/article-queries';
import { GetArticleResponse, UpdateArticleAccessCounterResponse } from '../model/response-types';
import ArticleItem from './components/ArticleItem';
import Header from './components/Header';
import UserList from './components/UserList';

function ArticleDetailsView() {
  //#region get article data
  // header
  const { render } = Header();

  // read article id from the url parameters
  const { id: articleId } = useParams();

  // get article data from the database
  const { error, data, loading } = useQuery<GetArticleResponse>(ARTICLE_BY_ID_QUERY, {
    errorPolicy: 'all',
    variables: { articleId: articleId },
  });
  const currentArticle = data?.article;

  // increase access counter
  const test = useMutation<UpdateArticleAccessCounterResponse>(UPDATE_ARTICLE_ACCESS_COUNTER_MUTATION, {
    variables: { articleId: articleId },
  });

  console.log(test);

  useEffect(() => {
    console.log('mounted');
  }, []);
  //#endregion

  //#region render view
  return (
    <>
      {render}
      <div className="md:p-6 sm:p-4 xl:mx-40 lg:mx-32 md:mx-10 text-gray-600 flex items-start">
        <div className="w-3/4">
          {loading && <p className="text-head">Loading...</p>}
          {error && <p className="text-head">{error.message} :(</p>}
          {!data && !loading && !error && <p className="text-head">No data available</p>}
          {currentArticle && (
            <div className="py-16">
              <ArticleItem articleData={currentArticle} preview={false} />
            </div>
          )}
        </div>
        <div className="w-1/4 pl-12">
          <h2 className="mt-8 text-subhead font-semibold">People online</h2>
          <UserList />
        </div>
      </div>
    </>
  );
  //#endregion
}

export default ArticleDetailsView;

import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { ARTICLE_BY_ID_QUERY } from '../api/article-queries';
import { GetArticle } from '../model/get-article-by-id-response';
import ArticleItem from './components/ArticleItem';
import UserList from './components/UserList';

function ArticleDetailsView() {
  //#region get article data
  // article id from the properties
  const { id } = useParams();

  // get article data from the database
  const { error, data, loading } = useQuery<GetArticle>(ARTICLE_BY_ID_QUERY, {
    errorPolicy: 'all',
    variables: { articleId: id },
  });
  const currentArticle = data?.article;
  //#endregion

  //#region render view
  return (
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
  );
  //#endregion
}

export default ArticleDetailsView;

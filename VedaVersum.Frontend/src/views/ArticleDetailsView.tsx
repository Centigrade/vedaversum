import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { ARTICLE_BY_ID_QUERY } from "../api/articles-queries";
import { RequireAuth } from "../authentication/RequreAuth";
import { GetArticleById } from "../model/get-article-by-id-response";
import ArticlesItem from "./components/ArticleItem";
import UsersList from "./components/UsersList";

function ArticleDetailsView() {
  const { id } = useParams();

  /* get article data from the database */
  const { error, data, loading } = useQuery<GetArticleById>(
    ARTICLE_BY_ID_QUERY,
    {
      errorPolicy: "all",
      variables: { articleId: id },
    }
  );
  const currentArticle = data?.articleById;

  return (
    <RequireAuth>
      <div className="d-flex">
        {/* article details */}
        <div className="px-4 py-3 w-75">
          {loading && <p>Loading...</p>}
          {error && <p>{error.message} :(</p>}
          {!data && <p>No data available</p>}
          {currentArticle && (
            <div className="">
              <ArticlesItem articleData={currentArticle} preview={false} />
            </div>
          )}
        </div>
        {/* users list */}
        <UsersList />
      </div>
    </RequireAuth>
  );
}

export default ArticleDetailsView;
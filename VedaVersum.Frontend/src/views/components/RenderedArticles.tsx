import { VedaVersumArticle } from 'model/veda-versum-article';
import { Link } from 'react-router-dom';
import ArticleListItem from './ArticleListItem';

//#region type definitions
/**
 * type for the component props
 */
interface RenderedArticlesProps {
  articles: VedaVersumArticle[] | undefined;
}
//#endregion
function RenderedArticles(props: RenderedArticlesProps) {
  const activeArticles: VedaVersumArticle[] = props.articles ?? [];

  return (
    <div>
      {/* data available */}
      {activeArticles &&
        activeArticles.map((article, index) => (
          <Link to={`/${article.id}`} key={index}>
            <ArticleListItem articleData={article} />
          </Link>
        ))}
      {!activeArticles && <div>Some error occurred, please try again later</div>}
    </div>
  );
}

export default RenderedArticles;

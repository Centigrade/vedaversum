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
  const activeArticles = props.articles;

  return (
    <div>
      {/* data available */}
      {activeArticles &&
        activeArticles.map((article, index) => (
          // TODO: pretty url
          // const articleURL = article.title.replace(" ", "-"); /${replaceSpaces(article.title)}
          <Link to={`/${article.id}`} key={index}>
            {/* <Link
                to={{
                  pathname: `/${article.title}`,
                  state: { id: article.id },
                }}
                key={index}
              > */}
            <ArticleListItem articleData={article} />
          </Link>
        ))}
      {!activeArticles && <div>Some error occurred, please try again later</div>}
    </div>
  );
}

export default RenderedArticles;

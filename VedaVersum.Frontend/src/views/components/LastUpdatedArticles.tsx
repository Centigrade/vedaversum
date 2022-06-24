import { VedaVersumArticle } from 'model/veda-versum-article';
import { useEffect } from 'react';
import RenderedArticles from './RenderedArticles';
//#region type definitions
/**
 * type for the component props
 */
interface LastUpdatedArticlesProps {
  articles: VedaVersumArticle[] | undefined;
}
//#endregion

function LastUpdatedArticles(props: LastUpdatedArticlesProps) {
  useEffect(() => {
    console.log('mounted last updated');
  }, []);

  return (
    <>
      <h1 className="mt-3 mb-6 text-head font-semibold">Last updated</h1>
      <RenderedArticles articles={props.articles}></RenderedArticles>
    </>
  );
}

export default LastUpdatedArticles;

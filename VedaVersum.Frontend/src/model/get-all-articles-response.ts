import { VedaVersumArticle } from './veda-versum-article';

export interface GetAllArticlesResponse {
  /**
   * Returns all articles in the base
   */
  allArticles: VedaVersumArticle[];
}

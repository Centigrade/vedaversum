import { VedaVersumArticle } from './veda-versum-article';

export interface SearchArticlesResponse {
  /**
   * Returns all articles created by user
   */
  SearchArticles: VedaVersumArticle[];
}

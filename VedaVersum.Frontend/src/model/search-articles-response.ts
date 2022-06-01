import { VedaVersumArticle } from './veda-versum-article';

export interface SearchArticlesResponse {
  /**
   * Returns all articles that contain the given search term
   */
  SearchArticles: VedaVersumArticle[];
}

import { VedaVersumArticle } from './veda-versum-article';

export interface GetUserCreatedArticlesResponse {
  /**
   * Returns all articles created by the given user
   */
  allArticlesCreatedByUser: VedaVersumArticle[];
}

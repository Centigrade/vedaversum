import { VedaVersumArticle } from './veda-versum-article';

export interface GetUserAssignedArticlesResponse {
  /**
   * Returns all cards in the base
   */
  allArticlesAssignedToUser: VedaVersumArticle[];
}

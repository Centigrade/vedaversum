import { VedaVersumArticle } from './veda-versum-article';

export interface GetArticle {
  /**
   * Returns article with the given id from the database
   */
  article: VedaVersumArticle;
}

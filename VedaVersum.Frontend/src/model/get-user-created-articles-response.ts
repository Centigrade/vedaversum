import { VedaVersumArticle } from "./veda-versum-article";

export interface GetUserCreatedArticlesResponse {
  /**
   * Returns all articles created by user
   */
  allArticlesCreatedByUser: VedaVersumArticle[];
}

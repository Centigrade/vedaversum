import { VedaVersumArticle } from "./veda-versum-article";

export interface GetArticleById {
  /**
   * Returns specific article from the database
   */
  articleById: VedaVersumArticle;
}

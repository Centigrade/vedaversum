import { VedaVersumCard } from "./veda-versum-card";

export interface GetUserCreatedArticlesResponse {
  /**
   * Returns all articles in the base
   */
  allArticlesCreatedByUser: VedaVersumCard[];
}

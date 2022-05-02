import { VedaVersumCard } from './veda-versum-card';

export interface GetUserCardsResponse {
  /**
   * Returns all cards in the base
   */
   allCardsCreatedByUser: VedaVersumCard[];
}

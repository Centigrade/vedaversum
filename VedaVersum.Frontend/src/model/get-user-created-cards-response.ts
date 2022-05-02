import { VedaVersumCard } from './veda-versum-card';

export interface GetUserCreatedCardsResponse {
  /**
   * Returns all cards in the base
   */
   allCardsCreatedByUser: VedaVersumCard[];
}

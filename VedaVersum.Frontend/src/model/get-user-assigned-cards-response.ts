import { VedaVersumCard } from './veda-versum-card';

export interface GetUserAssignedCardsResponse {
  /**
   * Returns all cards in the base
   */
   allCardsAssignedToUser: VedaVersumCard[];
}

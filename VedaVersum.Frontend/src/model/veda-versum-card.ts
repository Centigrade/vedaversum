import { User } from "./user";

export interface VedaVersumCard {
  __typename: "VedaVersumCard";
  /**
   * Card ID
   */
  id: string;
  /**
   * Card title
   */
  title: string;
  /**
   * Content of the card
   */
  content: string;
  /**
   * Time when card was created
   */
  created: string;
  /**
   * User ID which created the card
   */
  userCreated: string;
  /**
   * Users this card assigned
   */
  assignedUsers: User[] | null;
  /**
   * Related cards Ids
   */
  relatedCardIds: string[] | null;
}

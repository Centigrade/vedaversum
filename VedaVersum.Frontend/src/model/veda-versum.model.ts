/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllCards
// ====================================================

export interface GetAllCards_allCards_assignedUsers {
  __typename: "User";
  /**
   * User ID
   */
  id: any;
  /**
   * User friendly name
   */
  name: string;
  /**
   * User name
   */
  userName: string;
  /**
   * User e-mail
   */
  email: string;
  /**
   * Link to the user's web profile
   */
  webProfileUrl: string;
  /**
   * User image
   */
  avatarUrl: string;
}

export interface GetAllCards_allCards {
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
  created: any | null;
  /**
   * User ID which created the card
   */
  userCreated: string;
  /**
   * Users this card assigned
   */
  assignedUsers: GetAllCards_allCards_assignedUsers[] | null;
  /**
   * Related cards Ids
   */
  relatedCardIds: string[] | null;
}

export interface GetAllCards {
  /**
   * Returns all cards in the base
   */
  allCards: GetAllCards_allCards[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================

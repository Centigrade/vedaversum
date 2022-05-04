import { gql } from "@apollo/client";

export const ALL_CARDS_QUERY = gql`
  query GetAllCards {
    allCards {
      id
      title
      content
      created
      userCreated
      assignedUsers {
        id
        name
        userName
        email
        webProfileUrl
        avatarUrl
      }
      relatedCardIds
    }
  }
`;

// query to get all articles that are created by the user
export const CREATED_CARDS_QUERY = gql`
  query GetAllCardsCreatedByUser($userEmail: String!) {
    allCardsCreatedByUser(userEmail: $userEmail) {
      id
      title
      content
      created
      userCreated
      assignedUsers {
        id
        name
        userName
        email
        webProfileUrl
        avatarUrl
      }
      relatedCardIds
    }
  }
`;

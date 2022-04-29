import { gql } from '@apollo/client';

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

// query to get all articles that are assigned to the user
// TODO: user email must be given as props
export const ASSIGNED_CARDS_QUERY = gql`
  query GetAllCardsAssignedToUser {
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

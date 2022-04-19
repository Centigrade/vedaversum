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

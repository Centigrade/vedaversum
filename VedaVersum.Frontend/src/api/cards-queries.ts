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

// query to get all articles that are created by the user
export const CREATED_CARDS_QUERY = gql`
  query GetAllCardsCreatedByUser($userEmail: String!) {
    allCardsCreatedByUser(userEmail: $userEmail){
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
export const ASSIGNED_CARDS_QUERY = gql`
  query GetAllCardsAssignedToUser($userEmail: String!) {
    allCardsAssignedToUser (userEmail: $userEmail){
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

// TODO
// query to get all articles that are bookmarked by the user
/* export const BOOKMARKED_CARDS_QUERY = gql`
  query GetAllCardsBookmarkedByUser($user: User) {
    allCards (assignedUsers: $user){
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
`; */

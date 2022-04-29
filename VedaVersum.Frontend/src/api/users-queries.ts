import { gql } from '@apollo/client';

// I don't know if we need this query but I think it could be useful, e.g. for admins
export const ALL_USERS_QUERY = gql`
  query GetAllUsers {
    allUsers {
      id
      name
      userName
      email
      webProfileUrl
      avatarUrl
    }   
  }
`;

/* query to get all active (= online) users */
export const ACTIVE_USERS_QUERY = gql`
  query GetActiveUsers {
    activeUsers {
      id
      name
      userName
      email
      webProfileUrl
      avatarUrl
    }
  }
`;
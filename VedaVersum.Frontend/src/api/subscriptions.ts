import { gql } from '@apollo/client';
/**
 * TODO:
 */
export const ARTICLE_CHANGED_SUBSCRIPTION = gql`
  subscription OnArticleChanged {
    ArticleChanged {
      id
      title
      content
      created
      userCreated
      relatedArticleIds
      userUpdated
      updatedAt
      accessCounter
    }
  }
`;

/**
 * TODO:
 */
export const USER_ENTERS_SUBSCRIPTION = gql`
  subscription OnUserEnters {
    UserArrived {
      id
      name
      userName
      email
      webProfileUrl
      avatarUrl
    }
  }
`;

/**
 * TODO:
 */
export const USER_LEAVES_SUBSCRIPTION = gql`
  subscription OnUserLeaves {
    UserLeft {
      id
      name
      userName
      email
      webProfileUrl
      avatarUrl
    }
  }
`;

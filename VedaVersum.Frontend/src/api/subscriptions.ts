import { gql } from '@apollo/client';
/**
 * get updates from the database when an article was edited or created
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
 * get updates from the database when an user comes online
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
 * get updates from the database when an user leaves
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

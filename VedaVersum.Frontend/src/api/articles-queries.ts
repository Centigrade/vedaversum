import { gql } from '@apollo/client';

export const ALL_ARTICLES_QUERY = gql`
  query GetAllArticles {
    allArticles {
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
      relatedArticleIds
    }
  }
`;

// query to get all articles that are created by the user
export const CREATED_ARTICLES_QUERY = gql`
  query GetAllArticlesCreatedByUser($userEmail: String!) {
    allArticlesCreatedByUser(userEmail: $userEmail) {
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
      relatedArticleIds
    }
  }
`;

// query to get articles by id
// TODO why can't "articleById" be replaced with "articleData"? -> error "not defined on VedaVersumQuery"
export const ARTICLE_BY_ID_QUERY = gql`
  query GetArticle($articleId: String!) {
    article(articleId: $articleId) {
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
      relatedArticleIds
    }
  }
`;

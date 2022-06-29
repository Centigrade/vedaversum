import { gql } from '@apollo/client';

/**
 * query to get all articles in the database
 */
export const ALL_ARTICLES_QUERY = gql`
  query GetAllArticles {
    allArticles {
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
 * query to get all articles that are created by the user
 */
export const CREATED_ARTICLES_QUERY = gql`
  query GetAllArticlesCreatedByUser($userEmail: String!) {
    allArticlesCreatedByUser(userEmail: $userEmail) {
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
 * query to get articles by id
 */
export const ARTICLE_BY_ID_QUERY = gql`
  query GetArticle($articleId: String!) {
    article(articleId: $articleId) {
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
 * query to get articles related to a given search term
 *  */
export const SEARCH_ARTICLES_QUERY = gql`
  query SearchArticles($searchTerm: String!) {
    searchArticles(searchTerm: $searchTerm) {
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

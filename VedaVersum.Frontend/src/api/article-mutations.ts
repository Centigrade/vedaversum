import { gql } from '@apollo/client';
// TODO: see VedaVersumMutation.cs
export const CREATE_ARTICLE_MUTATION = gql`
  mutation ArticleAction($action: VedaVersumArticleAction,
  $articleId: String!) {
    
  }
`;

export const UPDATE_ARTICLE_MUTATION = gql`
  mutation ArticleAction($action: VedaVersumArticleAction,
  $articleId: String!) {
    
  }
`;

export const DELETE_ARTICLE_MUTATION = gql`
  mutation ArticleAction($action: VedaVersumArticleAction,
  $articleId: String!) {
    
  }
`;

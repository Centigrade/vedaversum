import { gql } from '@apollo/client';
import { User } from 'model/user';
import { VedaVersumArticle } from 'model/veda-versum-article';

export interface ArticleInput {
  articleTitle: string;
  articleContent: string;
  relatedArticles: VedaVersumArticle[];
  articleId: string;
  user: User;
}
export const CREATE_ARTICLE_MUTATION = gql`
  mutation CreateArticle($articleTitle: String!, $articleContent: String!) {
    articleAction(action: CREATE, title: $articleTitle, content: $articleContent) {
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

//#region update mutations
export const UPDATE_ARTICLE_MUTATION = gql`
  mutation UpdateArticle($articleTitle: String!, $articleContent: String!, $articleId: String!) {
    articleAction(action: UPDATE, title: $articleTitle, content: $articleContent, articleId: $articleId) {
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

export const UPDATE_ARTICLE_ACCESS_COUNTER_MUTATION = gql`
  mutation UpdateArticleAccessCounter($articleId: String!) {
    articleAction(action: Update, articleId: $articleId) {
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
//#endregion

export const DELETE_ARTICLE_MUTATION = gql`
  mutation DeleteArticle($articleId: String!, $articleContent: String!, $articleTitle: String!) {
    articleAction(action: DELETE, articleId: $articleId, title: $articleTitle, content: $articleContent) {
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

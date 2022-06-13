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
  mutation CreateArticle($articleTitle: String, $articleContent: String) {
    articleAction(action: Create, title: $articleTitle, content: $articleContent) {
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

export const UPDATE_ARTICLE_MUTATION = gql`
  mutation UpdateArticle($articleTitle: String, $articleContent: String, $articleId: String!) {
    articleAction(action: Update, title: $articleTitle, content: $articleContent, articleId: $articleId) {
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
/* 
export const DELETE_ARTICLE_MUTATION = gql`
  mutation DeleteArticle(
    $articleTitle: String,
    $articleContent: String,
    $relatedArticles: VedaVersumArticle[],
    $articleId: String!,
    $user: User
  )
  {
    articleAction(
      action: Delete,
      title: $articleTitle,
      content: $articleContent,
      relatedArticles: $relatedArticles,
      articleId: $articleId,
      user: $user
    )
    {
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
`; */

import { gql } from '@apollo/client';

export const CREATE_ARTICLE_MUTATION = gql`
  mutation CreateArticle(
    $articleTitle: String,
    $articleContent: String,
    $relatedArticles: VedaVersumArticle[],
    $articleId: String!,
    $user: User
  )
  {
    ArticleAction(
      action: Create,
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
    
  }
`;

export const UPDATE_ARTICLE_MUTATION = gql`
  mutation UpdateArticle(
    $articleTitle: String,
    $articleContent: String,
    $relatedArticles: VedaVersumArticle[],
    $articleId: String!,
    $user: User
  )
  {
    ArticleAction(
      action: Update,
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
`;

export const DELETE_ARTICLE_MUTATION = gql`
  mutation DeleteArticle(
    $articleTitle: String,
    $articleContent: String,
    $relatedArticles: VedaVersumArticle[],
    $articleId: String!,
    $user: User
  )
  {
    ArticleAction(
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
`;

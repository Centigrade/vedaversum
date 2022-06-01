import { gql } from '@apollo/client';
// TODO: see VedaVersumMutation.cs
export const CREATE_ARTICLE_MUTATION = gql`
  mutation createArticle(
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
  mutation updateArticle(
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
  mutation deleteArticle(
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

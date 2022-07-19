import { articleAction } from 'utils/main';
import { User } from './user';
import { VedaVersumArticle } from './veda-versum-article';

// hint: "methods" refer to the corresponding methods in
// VedaVersumQuery.cs, VedaVersumMutation.cs and OAuthMutation.cs

//#region create - update - delete response types
/**
 * "ArticleAction" method returns created, updated or deleted article
 */
export interface ArticleActionResponse {
  articleAction: VedaVersumArticle;
}

/**
 * "UpdateArticleAccessCounter" method returns the article which was updated
 */
export interface UpdateArticleAccessCounterResponse {
  updateArticleAccessCounter: VedaVersumArticle;
}
//#endregion

//#region get response types
/**
 * "article" refers to "getArticle" method that returns article with the given id from the database
 */
export interface GetArticleResponse {
  article: VedaVersumArticle;
}

/**
 * "allArticles" refers to "getAllArticles" method that returns all articles in the base
 */
export interface GetAllArticlesResponse {
  allArticles: VedaVersumArticle[];
}

/**
 * "activeUsers" refers to "ActiveUsers" method that returns all users that are currently active
 */
export interface GetActiveUsers {
  activeUsers: User[];
}

/**
 * "allArticlesCreatedByUser" refers to "GetAllArticlesCreatedByUser" method that returns all articles created by the given user
 */
export interface GetUserCreatedArticlesResponse {
  allArticlesCreatedByUser: VedaVersumArticle[];
}
//#endregion

//#region authentication response types
/**
 * "gitLabAuthenticate" method accepts GitLab oauth code, and returns JWT token with GutLab user as claim
 */
export interface AuthenticateMutation {
  gitLabAuthenticate: AuthenticationMutationResponse;
}

export interface AuthenticationMutationResponse {
  __typename: 'AuthResponse';
  /**
   * JWT token
   */
  authenticationToken: string;
  /**
   * Authenticated user
   */
  authenticatedUser: User | null;
}

export interface AuthenticationMutationVariables {
  oAuthCode: string;
}
//#endregion

//#region subscription response types
/**
 * properties of the article that was changed via an article action
 */
export interface ChangedArticleProps {
  action: articleAction;
  vedaVersumArticle: VedaVersumArticle;
}
/**
 * "ArticleChanged" subscription returns the article that was changed and the action which was done
 */
export interface ArticleChangedSubscriptionResponse {
  articleChanged: ChangedArticleProps;
}

//#endregion

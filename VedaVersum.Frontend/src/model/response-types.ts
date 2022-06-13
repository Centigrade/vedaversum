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
  UpdateArticleAccessCounter: VedaVersumArticle;
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
 * "searchArticles" refers to "SearchArticles" method that returns all articles that contain the given search term
 */
export interface SearchArticlesResponse {
  searchArticles: VedaVersumArticle[];
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

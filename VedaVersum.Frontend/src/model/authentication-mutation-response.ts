import { User } from './user';

export interface AuthenticateMutation {
  /**
   * This method accepts GitLab oauth code, and returns JWT token with GutLab user as claim
   */
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

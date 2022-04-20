import { gql } from '@apollo/client';

export const AUTHENTICATE_MUTATION = gql`
  mutation authenticate($oAuthCode: String!) {
    gitLabAuthenticate(oauthCode: $oAuthCode) {
      authenticationToken
      authenticatedUser {
        id
        name
        userName
        email
        webProfileUrl
        avatarUrl
      }
    }
  }
`;

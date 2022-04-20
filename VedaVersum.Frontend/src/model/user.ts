export interface User {
  __typename: 'User';
  /**
   * User ID
   */
  id: any;
  /**
   * User friendly name
   */
  name: string;
  /**
   * User name
   */
  userName: string;
  /**
   * User e-mail
   */
  email: string;
  /**
   * Link to the user's web profile
   */
  webProfileUrl: string;
  /**
   * User image
   */
  avatarUrl: string;
}

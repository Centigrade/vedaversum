import { User } from './user';

export interface GetActiveUsers {
  /**
   * Returns all users in the base that are currently active
   */
  activeUsers: User[];
}


import { User } from './user';

export interface GetActiveUsers {
  /**
   * Returns all users that are currently active
   */
  activeUsers: User[];
}

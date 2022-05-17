import { User } from './user';

export interface VedaVersumArticle {
  __typename: 'VedaVersumArticle';
  /**
   * Article ID
   */
  id: string;
  /**
   * Article title
   */
  title: string;
  /**
   * Content of the article
   */
  content: string;
  /**
   * Time when article was created
   */
  created: string;
  /**
   * User ID which created the article
   */
  userCreated: string;
  /**
   * Users this article assigned
   */
  assignedUsers: User[] | null;
  /**
   * Related articles Ids
   */
  relatedArticleIds: string[] | null;
}

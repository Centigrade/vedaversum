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
   * Related articles Ids
   */
  relatedArticleIds: string[] | null;

  /**
   * User ID which updated the article
   */
  userUpdated?: string;

  /**
   * Time when article was updated
   */
  updatedAt?: string;

  /**
   * Article access counter
   */
  accessCounter: number;
}

using System.Collections.Generic;
using System.Threading.Tasks;
using Centigrade.VedaVersum.Model;

namespace VedaVersum.Backend.DataAccess
{
    public interface IVedaVersumDataAccess
    {
        /* ******************* */
        /* *** GET queries *** */
        /* ******************* */
        /// <summary>
        /// Returns all existing knowledge articles
        /// </summary>
        /// <returns>List of Veda Versum articles</returns>
        Task<IEnumerable<VedaVersumArticle>> GetAll();

        /// <summary>
        /// Returns all articles created by user
        /// </summary>
        /// <param name="userEmail">User to filter</param>
        /// <returns>List of Veda Versum articles created by the user</returns>
        Task<IEnumerable<VedaVersumArticle>> GetArticlesCreatedBy(string userEmail);

        /// <summary>
        /// Returns article with requested id
        /// </summary>
        /// <param name="articleId">article identifier to filter.</param>
        /// <returns>Veda Versum article object or null if article with requested id does not exist</returns>
        Task<VedaVersumArticle?> GetArticleById(string articleId);

        /// <summary>
        /// Return a list of articles by their Ids
        /// </summary>
        /// <param name="articleIds">A list of article Ids to filter</param>
        /// <returns>Articles list</returns>
        Task<IEnumerable<VedaVersumArticle>> GetArticlesById(IEnumerable<string>? articleIds);

        /* ********************** */
        /* *** INSERT queries *** */
        /* ********************** */
        /// <summary>
        /// Inserts new article into list
        /// </summary>
        /// <param name="title">Article title</param>
        /// <param name="content">Article content</param>
        /// <param name="relatedArticles">List of related Articles</param>
        /// <param name="user">Assigned user</param>
        /// <returns>Created VedaVersum article</returns>
        Task<VedaVersumArticle> InsertNewArticle(
            string title,
            string content,
            ICollection<string>? relatedArticles,
            User user
        );

        /* ********************** */
        /* *** UPDATE queries *** */
        /* ********************** */
        /// <summary>
        /// Updates existing article in the list
        /// </summary>
        Task UpdateArticle(VedaVersumArticle article);

        /* ********************** */
        /* *** DELETE queries *** */
        /* ********************** */
        /// <summary>
        /// Deletes article from list
        /// </summary>
        /// <param name="articleId">Article identifier</param>
        Task DeleteArticle(string articleId);


    }
}
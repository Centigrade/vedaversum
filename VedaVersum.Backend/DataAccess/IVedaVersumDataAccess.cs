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
        Task<IEnumerable<VedaVersumCard>> GetAll();

        /// <summary>
        /// Returns all articles created by user
        /// </summary>
        /// <param name="userEmail">User to filter</param>
        /// <returns>List of Veda Versum articles created by the user</returns>
        Task<IEnumerable<VedaVersumCard>> GetArticlesCreatedBy(string userEmail);

        /// <summary>
        /// Returns article with requested id
        /// </summary>
        /// <param name="articleId">Article identifier to filter.</param>
        /// <returns>Veda Versum article object or null if article with requested id does not exist</returns>
        Task<VedaVersumCard?> GetArticleById(string articleId);

        /// <summary>
        /// Return a list of articles by their Ids
        /// </summary>
        /// <param name="articleIds">A list of article Ids to filter</param>
        /// <returns>Articles list</returns>
        Task<IEnumerable<VedaVersumCard>> GetArticlesById(IEnumerable<string>? articleIds);

        /* ********************** */
        /* *** INSERT queries *** */
        /* ********************** */
        /// <summary>
        /// Inserts new card into list
        /// </summary>
        /// <param name="title">Card title</param>
        /// <param name="content">Card content</param>
        /// <param name="relatedCards">List of related cards</param>
        /// <param name="user">Assigned user</param>
        /// <returns>Created VedaVersum card</returns>
        Task<VedaVersumCard> InsertNewCard(
            string title,
            string content,
            ICollection<string>? relatedCards,
            User user
        );

        /* ********************** */
        /* *** UPDATE queries *** */
        /* ********************** */
        /// <summary>
        /// Updates existing card in the list
        /// </summary>
        Task UpdateCard(VedaVersumCard card);

        /* ********************** */
        /* *** DELETE queries *** */
        /* ********************** */
        /// <summary>
        /// Deletes card from list
        /// </summary>
        /// <param name="cardId">Card identifier</param>
        Task DeleteCard(string cardId);


    }
}
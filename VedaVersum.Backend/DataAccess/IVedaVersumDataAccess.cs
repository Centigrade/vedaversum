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
        /// Returns all existing knowledge cards
        /// </summary>
        /// <returns>List of Veda Versum cards</returns>
        Task<IEnumerable<VedaVersumCard>> GetAll();

        /// <summary>
        /// Returns all cards assigned to user
        /// </summary>
        /// <param name="userEmail">User to filter</param>
        /// <returns>List of Veda Versum cards assigned to the user</returns>
        Task<IEnumerable<VedaVersumCard>> GetCardsAssignedTo(string userEmail);

        /// <summary>
        /// Returns all cards created by user
        /// </summary>
        /// <param name="userEmail">User to filter</param>
        /// <returns>List of Veda Versum cards created by the user</returns>
        Task<IEnumerable<VedaVersumCard>> GetCardsCreatedBy(string userEmail);

        /// <summary>
        /// Returns card with requested id
        /// </summary>
        /// <param name="cardId">Card identifier to filter.</param>
        /// <returns>Veda Versum card object or null if card with requested id does not exist</returns>
        Task<VedaVersumCard?> GetCardById(string cardId);

        /// <summary>
        /// Return a list of cards by their Ids
        /// </summary>
        /// <param name="cardIds">A list of card Ids to filter</param>
        /// <returns>Cards list</returns>
        Task<IEnumerable<VedaVersumCard>> GetCardsById(IEnumerable<string>? cardIds);

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
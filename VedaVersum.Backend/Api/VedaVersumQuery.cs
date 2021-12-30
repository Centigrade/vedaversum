using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Centigrade.VedaVersum.Model;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using VedaVersum.Backend.DataAccess;

namespace VedaVersum.Backend.Api
{
    [Authorize]
    public class VedaVersumQuery
    {

        private readonly IVedaVersumDataAccess _dataAccess;

        public VedaVersumQuery(IVedaVersumDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        /// <summary>
        /// Returns all cards in the base
        /// </summary>
        public Task<IEnumerable<VedaVersumCard>> GetAllCards()
        {
            return _dataAccess.GetAll();
        }

        /// <summary>
        /// Returns card by ID
        /// </summary>
        public Task<VedaVersumCard?> GetCard(string cardId)
        {
            return _dataAccess.GetCardById(cardId);
        }

        /// <summary>
        /// Returns all cards assigned to user
        /// </summary>
        public Task<IEnumerable<VedaVersumCard>> GetAllCardsAssignedToUser([GlobalState("GitLabUser")] User user)
        {
            return _dataAccess.GetCardsAssignedTo(user.Email);
        }

        /// <summary>
        /// Returns a list of users which are online
        /// </summary>
        public Task<IEnumerable<User>> ActiveUsers()
        {
            // TODO: Use https://docs.microsoft.com/en-us/aspnet/core/performance/caching/memory?view=aspnetcore-6.0
            throw new NotImplementedException();
        }

    }
}
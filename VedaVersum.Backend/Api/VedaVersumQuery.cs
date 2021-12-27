using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Centigrade.VedaVersum.Model;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;

namespace VedaVersum.Backend.Api
{
    [Authorize]
    public class VedaVersumQuery
    {
        /// <summary>
        /// Returns all cards in the base
        /// </summary>
        public Task<IEnumerable<VedaVersumCard>> GetAllCards()
        {
            return Task.FromResult<IEnumerable<VedaVersumCard>>(new[] {new VedaVersumCard
            {
                Id = Guid.NewGuid().ToString(),
                Title = "Very First Card.",
                Created = DateTimeOffset.Now,
                Content =
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                UserCreated = Guid.NewGuid().ToString()
            }});
        }

        /// <summary>
        /// Returns card by ID
        /// </summary>
        public Task<VedaVersumCard> GetCard(string cardId)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Returns all cards assigned to user
        /// </summary>
        /// <returns></returns>
        public Task<IEnumerable<VedaVersumCard>> GetAllCardsAssignedToUser([GlobalState("GitLabUser")] User user)
        {
            throw new NotImplementedException();
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
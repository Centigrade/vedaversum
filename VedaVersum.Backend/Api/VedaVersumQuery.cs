using System;
using System.Collections.Generic;
using System.Threading;
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
        // list of users with dummy data
        IEnumerable<User> dummyUserList = new List<User> {
            new User() {
                Id= 0,
                Name="Gandalf",
                UserName="Gandalf",
                Email="gandalf@middle-earth.de",
                AvatarUrl="https://en.wikipedia.org/wiki/File:Gandalf600ppx.jpg",
                WebProfileUrl="https://en.wikipedia.org/wiki/Gandalf"
            },
            new User() {
                Id= 1,
                Name="Aragorn",
                UserName="Aragorn",
                Email="aragorn@middle-earth.de",
                AvatarUrl="https://en.wikipedia.org/wiki/File:Aragorn300ppx.png",
                WebProfileUrl="https://en.wikipedia.org/wiki/Aragorn"
            },
            new User() {
                Id= 2,
                Name="Legolas",
                UserName="Legolas",
                Email="legolas@middle-earth.de",
                AvatarUrl="https://en.wikipedia.org/wiki/File:Legolas600ppx.jpg",
                WebProfileUrl="https://en.wikipedia.org/wiki/Legolas"
            },
        };


        private readonly IVedaVersumDataAccess _dataAccess;

        public VedaVersumQuery(IVedaVersumDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        /* *************************************** */
        /* *** queries without user logged in *** */
        /* ************************************** */
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
        public async Task<VedaVersumCard?> GetCard(string cardId, VedaVersumCardDataLoader dataLoader)
        {
            return await dataLoader.LoadAsync(cardId, CancellationToken.None);
        }

        /// <summary>
        /// Returns user by email
        /// </summary>
        public async Task<VedaVersumCard?> GetUser(string cardId, VedaVersumCardDataLoader dataLoader)
        {
            return await dataLoader.LoadAsync(cardId, CancellationToken.None);
        }


        /* ********************************************* */
        /* *** queries related to the user logged in *** */
        /* ********************************************* */
        /// <summary>
        /// Returns all cards created by the user
        /// </summary>
        public Task<IEnumerable<VedaVersumCard>> GetAllCardsCreatedByUser(String userEmail)
        {
            return _dataAccess.GetCardsCreatedBy(userEmail);
        }

        /// <summary>
        /// Returns all cards assigned to user
        /// </summary>
        public Task<IEnumerable<VedaVersumCard>> GetAllCardsAssignedToUser(String userEmail)
        {
            return _dataAccess.GetCardsAssignedTo(userEmail);
        }

        /// <summary>
        /// Returns a list of users which are online
        /// </summary>
        public Task<IEnumerable<User>> ActiveUsers()
        {
            // TODO: Use https://docs.microsoft.com/en-us/aspnet/core/performance/caching/memory?view=aspnetcore-6.0
            // throw new NotImplementedException();

            // return mock data
            return Task.FromResult<IEnumerable<User>>(dummyUserList);
        }

    }
}
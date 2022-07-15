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
    public class VedaVersumQuery
    {
        // list of users with dummy data
        IEnumerable<User> dummyUserList = new List<User> {
            new User() {
                Id= 0,
                Name="Alexander Keller",
                UserName="alexander.keller",
                Email="alexander.keller@centigrade.de",
                AvatarUrl="",
                WebProfileUrl=""
            },
            new User() {
                Id= 1,
                Name="Julian Lang",
                UserName="julian.lang",
                Email="julian.lang@centigrade.de",
                AvatarUrl="",
                WebProfileUrl=""
            },
            new User() {
                Id= 2,
                Name="Matthias Frauer",
                UserName="matthias.frauer",
                Email="matthias.frauer@centigrade.de",
                AvatarUrl="",
                WebProfileUrl=""
            },
            new User() {
                Id= 3,
                Name="Mikhail Shabanov",
                UserName="mikhail.shabanov",
                Email="mikhail.shabanov@centigrade.de",
                AvatarUrl="",
                WebProfileUrl=""
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
        /// Returns all articles in the base
        /// </summary>
        [Authorize]
        public Task<IEnumerable<VedaVersumArticle>> GetAllArticles()
        {
            return _dataAccess.GetAll();
        }

        /// <summary>
        /// Returns article by ID
        /// </summary>
        [Authorize]
        public async Task<VedaVersumArticle?> GetArticle(string articleId, VedaVersumArticleDataLoader dataLoader)
        {
            return await dataLoader.LoadAsync(articleId, CancellationToken.None);
        }

        /// <summary>
        /// Returns user by email
        /// </summary>
        [Authorize]
        public async Task<VedaVersumArticle?> GetUser(string articleId, VedaVersumArticleDataLoader dataLoader)
        {
            return await dataLoader.LoadAsync(articleId, CancellationToken.None);
        }


        /* ********************************************* */
        /* *** queries related to the user logged in *** */
        /* ********************************************* */
        /// <summary>
        /// Returns all articles created by the user
        /// </summary>
        [Authorize]
        public Task<IEnumerable<VedaVersumArticle>> GetAllArticlesCreatedByUser(String userEmail)
        {
            return _dataAccess.GetArticlesCreatedBy(userEmail);
        }

        /// <summary>
        /// Returns a list of users which are online
        /// </summary>
        [Authorize]
        public Task<IEnumerable<User>> ActiveUsers()
        {
            // TODO: Use https://docs.microsoft.com/en-us/aspnet/core/performance/caching/memory?view=aspnetcore-6.0
            // throw new NotImplementedException();

            // return mock data
            return Task.FromResult<IEnumerable<User>>(dummyUserList);
        }

    }
}
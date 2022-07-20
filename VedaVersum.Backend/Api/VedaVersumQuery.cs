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

    }
}
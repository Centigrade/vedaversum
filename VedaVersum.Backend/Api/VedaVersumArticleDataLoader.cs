using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Centigrade.VedaVersum.Model;
using GreenDonut;
using VedaVersum.Backend.DataAccess;

namespace VedaVersum.Backend.Api
{
    public class VedaVersumArticleDataLoader : BatchDataLoader<string, VedaVersumArticle>
    {
        private readonly IVedaVersumDataAccess _vedaVersumDataAccess;

        public VedaVersumArticleDataLoader(
            IVedaVersumDataAccess vedaVersumDataAccess,
            IBatchScheduler batchScheduler,
            DataLoaderOptions options) : base(batchScheduler, options)
        {
            _vedaVersumDataAccess = vedaVersumDataAccess;
        }

        // This method collects all ArticleIds during the single GraphQL query and executes database query once far all ArticleIds
        protected override async Task<IReadOnlyDictionary<string, VedaVersumArticle>> LoadBatchAsync(
            IReadOnlyList<string> keys, CancellationToken cancellationToken)
        {
            var allArticlesByIds = await _vedaVersumDataAccess.GetArticlesById(keys);
            return allArticlesByIds.ToDictionary(c => c.Id);
        }
    }
}
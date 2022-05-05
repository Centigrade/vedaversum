using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Centigrade.VedaVersum.Model;
using GreenDonut;
using HotChocolate.DataLoader;
using VedaVersum.Backend.DataAccess;

namespace VedaVersum.Backend.Api
{
    public class VedaVersumCardDataLoader : BatchDataLoader<string, VedaVersumCard>
    {
        private readonly IVedaVersumDataAccess _vedaVersumDataAccess;

        public VedaVersumCardDataLoader(
            IVedaVersumDataAccess vedaVersumDataAccess,
            IBatchScheduler batchScheduler,
            DataLoaderOptions<string>? options = null) : base(batchScheduler, options)
        {
            _vedaVersumDataAccess = vedaVersumDataAccess;
        }

        // This method collects all CardIds during the single GraphQL query and executes database query once far all CardIds
        protected override async Task<IReadOnlyDictionary<string, VedaVersumCard>> LoadBatchAsync(
            IReadOnlyList<string> keys, CancellationToken cancellationToken)
        {
            var allCardsByIds = await _vedaVersumDataAccess.GetArticlesById(keys);
            return allCardsByIds.ToDictionary(c => c.Id);
        }
    }
}
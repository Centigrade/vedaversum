using System.Collections.Generic;
using System.Threading;
using Centigrade.VedaVersum.Model;
using HotChocolate.Types;
using VedaVersum.Backend.DataAccess;

namespace VedaVersum.Backend.Api
{
    public class VedaVersumCardObjectType : ObjectType<VedaVersumCard>
    {
        protected override void Configure(IObjectTypeDescriptor<VedaVersumCard> descriptor)
        {
            descriptor
            .Field("relatedCards") // Name of the additional field
            .Type<ListType<VedaVersumCardObjectType>>()
            .Resolve(async context =>
            {
                var parent = context.Parent<VedaVersumCard>();

                if (parent.RelatedCardIds == null || parent.RelatedCardIds.Count == 0)
                {
                    return new List<VedaVersumCard>();
                }

                var dataAccess = context.Service<IVedaVersumDataAccess>();
                return await dataAccess.GetArticlesById(parent.RelatedCardIds);
            });
        }
    }
}
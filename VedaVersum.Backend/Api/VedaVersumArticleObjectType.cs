using System.Collections.Generic;
using System.Threading;
using Centigrade.VedaVersum.Model;
using HotChocolate.Types;
using VedaVersum.Backend.DataAccess;

namespace VedaVersum.Backend.Api
{
    public class VedaVersumArticleObjectType: ObjectType<VedaVersumArticle>
    {
        protected override void Configure(IObjectTypeDescriptor<VedaVersumArticle> descriptor)
        {
            descriptor
            .Field("relatedArticles") // Name of the additional field
            .Type<ListType<VedaVersumArticleObjectType>>()
            .Resolve(async context =>
            {
                var parent = context.Parent<VedaVersumArticle>();

                if(parent.RelatedArticleIds == null || parent.RelatedArticleIds.Count == 0)
                {
                    return new List<VedaVersumArticle>();
                }

                var dataAccess = context.Service<IVedaVersumDataAccess>();
                return await dataAccess.GetArticlesById(parent.RelatedArticleIds);
            });
        }
    }
}
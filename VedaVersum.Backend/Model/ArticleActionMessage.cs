namespace Centigrade.VedaVersum.Model
{
    /// <summary>
    /// Represents the data for Article changed action
    /// </summary>
    public class ArticleActionMessage
    {
        /// <summary>
        /// Changed Article
        /// </summary>
        public VedaVersumArticle? VedaVersumArticle { get; set; }

        /// <summary>
        /// Article action
        /// </summary>
        public VedaVersumArticleAction Action { get; set; }
    }
}
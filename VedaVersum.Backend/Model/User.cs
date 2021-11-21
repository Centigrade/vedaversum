namespace Centigrade.VedaVersum.Model
{
    /// <summary>
    /// User information
    /// </summary>
    public class User
    {
        /// <summary>
        /// User ID
        /// </summary>
        public string Id { get; set; } = string.Empty;

        /// <summary>
        /// User name
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// User image
        /// </summary>
        public string UserImage { get; set; } = string.Empty;
    }
}
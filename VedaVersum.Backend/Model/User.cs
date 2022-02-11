using System.Text.Json.Serialization;

namespace Centigrade.VedaVersum.Model
{
    /// <summary>
    /// GitLab User information
    /// </summary>
    public class User
    {
        /// <summary>
        /// User ID
        /// </summary>
        [JsonPropertyName("id")]
        public long Id { get; set; }

        /// <summary>
        /// User friendly name
        /// </summary>
        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// User name
        /// </summary>
        [JsonPropertyName("username")]
        public string UserName { get; set; } = string.Empty;

        /// <summary>
        /// User e-mail
        /// </summary>
        [JsonPropertyName("email")]
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// User image
        /// </summary>
        [JsonPropertyName("avatar_url")]
        public string AvatarUrl { get; set; } = string.Empty;

        /// <summary>
        /// Link to the user's web profile
        /// </summary>
        [JsonPropertyName("web_url")]
        public string WebProfileUrl { get; set; } = string.Empty;
       
    }
}
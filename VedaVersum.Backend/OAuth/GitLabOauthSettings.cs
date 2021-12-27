namespace VedaVersum.Backend.OAuth
{
    public class GitLabOauthSettings
    {
        public string BaseAddress { get; set; } = string.Empty;
        public string ClientId { get; set; } = string.Empty;
        public string Secret { get; set; } = string.Empty;
        public string JwtSecret { get; set; } = string.Empty;
    }
}
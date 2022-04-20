using Centigrade.VedaVersum.Model;

namespace VedaVersum.Backend.Model
{
    /// <summary>
    /// Authentication information
    /// </summary>
    public class AuthResponse
    {
        /// <summary>
        /// JWT token
        /// </summary>
        public string AuthenticationToken { get; set; } = string.Empty;

        /// <summary>
        /// Authenticated user
        /// </summary>
        public User? AuthenticatedUser { get; set; }
    }
}
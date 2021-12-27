using System.Threading.Tasks;
using Centigrade.VedaVersum.Model;

namespace VedaVersum.Backend.OAuth
{
    public interface IGitLabOauthService
    {
        /// <summary>
        /// Retrieves user information from GitLab API
        /// </summary>
        /// <param name="oAuthCode">GitLab authentication code</param>
        /// <returns>GitLab user information</returns>
        /// <remarks>
        /// This method implements the last part of GitLab authorization flow. 
        /// OAuth code should come from Frontend after user authorization redirection.
        /// Then this method gets Auth token from GitLab OAuth API. And then retrieves user information from GitLab user API
        /// The information about the flow is here https://docs.gitlab.com/ee/api/oauth2.html
        /// </remarks>
        Task<User?> GetUser(string oAuthCode);

        /// <summary>
        /// Generates JWT token with user information
        /// </summary>
        /// <param name="user">GitLan User information</param>
        /// <returns>Encoded JWT token</returns>
        /// <remarks>
        /// More info about JWT https://jwt.io/
        /// </remarks>
        string GenerateToken(User user);
    }
}
using System;
using System.Threading.Tasks;
using HotChocolate.Types;
using Microsoft.Extensions.Logging;
using VedaVersum.Backend.Model;
using VedaVersum.Backend.OAuth;

namespace VedaVersum.Backend.Api
{
    [ExtendObjectType(Name = "Mutation")]
    public class OAuthMutation
    {
        private readonly IGitLabOauthService _oauthService;
        private readonly ILogger<OAuthMutation> _logger;

        public OAuthMutation(IGitLabOauthService oauthService, ILogger<OAuthMutation> logger)
        {
            _oauthService = oauthService;
            _logger = logger;
        }
        
        /// <summary>
        /// This method accepts GitLab oauth code, and returns JWT token with GutLab user as claim
        /// </summary>
        /// <param name="oauthCode">OAuth code can be generated by this URL https://gitlab.example.com/oauth/authorize</param>
        /// <remarks>
        /// More info about GitLab OAuth https://docs.gitlab.com/ee/api/oauth2.html
        /// </remarks>
        public async Task<AuthResponse> GitLabAuthenticate(string oauthCode)
        {
            _logger.LogDebug($"Authenticating '{oauthCode}'");

            try
            {
                var user = await _oauthService.GetUser(oauthCode);
                if (user == null)
                {
                    throw new ApplicationException($"Can not find GitLab user by code {oauthCode}");
                }
                var token = _oauthService.GenerateToken(user);
                _logger.LogDebug($"{user.Name} was authenticated");
                return new AuthResponse { AuthenticationToken = token, AuthenticatedUser = user };
            }
            catch (Exception e)
            {
                _logger.LogError(e,"Authentication fails");
                throw;
            }
        }
    }
}
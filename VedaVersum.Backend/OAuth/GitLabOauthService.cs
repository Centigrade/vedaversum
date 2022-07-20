using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Centigrade.VedaVersum.Model;
using Microsoft.IdentityModel.Tokens;

namespace VedaVersum.Backend.OAuth
{
    /// <inheritdoc />
    public class GitLabOauthService : IGitLabOauthService
    {
        public const string GitLabHttpClientName = "GitLab";
        public const string JwtIssuer = "https://vedaversum.de";


        private readonly IHttpClientFactory _httpClientFactory;
        private readonly GitLabOauthSettings _settings;
    
        public GitLabOauthService(
            IHttpClientFactory httpClientFactory,
            GitLabOauthSettings settings)
        {
            _httpClientFactory = httpClientFactory;
            _settings = settings;
        }

        /// <inheritdoc />
        public string GenerateToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.JwtSecret));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var serializedUser = JsonSerializer.Serialize(user);

            // generate jwt token
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Name?? "unknown"),
                new Claim(ClaimTypes.Email, user.Email?? "unknown"),
                new Claim(ClaimTypes.UserData, serializedUser)
            };

            var token = new JwtSecurityToken(
                issuer: JwtIssuer,
                audience: JwtIssuer,
                claims: claims,
                expires: DateTime.Now.AddDays(30), // Token is valid for 1 month. Don't use this parameter in production!
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        /// <inheritdoc />
        public async Task<User?> GetUser(string oAuthCode)
        {
            var token = await GetAccessToken(oAuthCode);
            return await GetGitLabUser(token);
        }

        private async Task<string> GetAccessToken(string oAuthCode)
        {
            var parameters = new Dictionary<string, string>
            {
                { "client_id", _settings.ClientId }, 
                { "client_secret", _settings.Secret },
                { "code", oAuthCode },
                { "grant_type", "authorization_code" },
                { "redirect_uri", "http://localhost:3000/login" } 
            };
            var encodedContent = new FormUrlEncodedContent(parameters!);

            var client = _httpClientFactory.CreateClient(GitLabHttpClientName);

            var url = $"{_settings.BaseAddress}/oauth/token";

            var response = await client.PostAsync(url, encodedContent).ConfigureAwait(false);
            if(!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                throw new ApplicationException($"Authentication server returned code {((int)response.StatusCode)} ({response.StatusCode}). Error: '{error}'");
            }

            await using var responseStream = await response.Content.ReadAsStreamAsync();
            var authTokenResponse = await JsonSerializer.DeserializeAsync<OAuthTokenResponse?>(responseStream);

            if(string.IsNullOrEmpty(authTokenResponse?.AccessToken))
            {
                throw new ApplicationException($"Can not get access_token from url '{_settings.BaseAddress}' and Auth code '{oAuthCode}'");
            }
            return authTokenResponse.AccessToken;
        }

        private async Task<User?> GetGitLabUser(string token)
        {
            string url = $"{_settings.BaseAddress}/api/v4/user";

            var client = _httpClientFactory.CreateClient(GitLabHttpClientName);
            client.DefaultRequestHeaders.Authorization
                = new AuthenticationHeaderValue("Bearer", token);
            client.DefaultRequestHeaders.Add("User-Agent", "VedaVersum");

            var response = await client.GetAsync(url);

            response.EnsureSuccessStatusCode();
            
            await using var responseStream = await response.Content.ReadAsStreamAsync();
            return await JsonSerializer.DeserializeAsync<User?>(responseStream);
        }

    }
}
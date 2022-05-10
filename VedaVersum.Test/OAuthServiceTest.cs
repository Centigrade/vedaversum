using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Centigrade.VedaVersum.Model;
using Moq;
using Moq.Protected;
using NUnit.Framework;
using VedaVersum.Backend.OAuth;

namespace VedaVersum.Test
{
    public class OAuthServiceTest
    {
        private const string JwtSecret = "5e2005b7-2d94-4ce4-8f10-e894ad15b29e";

        //Mock the httpclientfactory
        private Mock<HttpMessageHandler>? _httpMessageHandler;
        private Mock<IHttpClientFactory>? _mockHttpFactory;

        private GitLabOauthSettings? _settings;

        private User? _gitLabUser;

        private GitLabOauthService? _service;

        [SetUp]
        public void Setup()
        {
            _settings = new GitLabOauthSettings {
                BaseAddress = "http://fake.gitlab.com",
                ClientId = Guid.NewGuid().ToString(),
                Secret = Guid.NewGuid().ToString(),
                JwtSecret = JwtSecret
            };

            _gitLabUser = new User 
            {
                Id = 42,
                AvatarUrl = Guid.NewGuid().ToString(),
                Email = Guid.NewGuid().ToString(),
                Name = Guid.NewGuid().ToString()
            };

            _httpMessageHandler = new Mock<HttpMessageHandler>();
            _mockHttpFactory = new Mock<IHttpClientFactory>(); 

            _service = new GitLabOauthService(_mockHttpFactory.Object, _settings);
        }

        [Test]
        public void ShouldGenerateJWTTokenProperly()
        {
            // Act
            var jwt = _service!.GenerateToken(_gitLabUser!);

            // Assert
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(jwt);
            var parsedToken = jsonToken as JwtSecurityToken;
            Assert.NotNull(parsedToken, "token should not be null");
            var userData = parsedToken!.Claims.Where(c => c.Type == ClaimTypes.UserData)
                            .Select(c => c.Value).SingleOrDefault();
            Assert.NotNull(userData, "User data from jwtToken should not be null");
            var serializedExpectedUser = JsonSerializer.Serialize(_gitLabUser!);
            Assert.AreEqual(serializedExpectedUser, userData, "User info should match");
        }

        [Test]
        public async Task ShouldCallOauthAndGetUserWebApiMethodsOnGetAccessToken()
        {
            var _httpMessageHandler = new Mock<HttpMessageHandler>();
            // Arrange getToken Gitlab Api request check
            string expectedOAuthCode = Guid.NewGuid().ToString();
            string expectedGitHubOAuthToken = Guid.NewGuid().ToString();
            string resultGitHubOauthUri = string.Empty;
            string expectedGitHubOauthUri = "/oauth/token";
            string resultGitHubOauthParameters = string.Empty;
            string expectedGitHubOauthParameters = $"client_id={_settings!.ClientId}&client_secret={_settings!.Secret}&code={expectedOAuthCode}&grant_type=authorization_code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin";
            var gitLabOauthTokenResponse = new OAuthTokenResponse {AccessToken = expectedGitHubOAuthToken};
            var gilLabOauthTokenHttpResponse = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(JsonSerializer.Serialize(gitLabOauthTokenResponse))
            };

            _httpMessageHandler.Protected()
                .Setup<Task<HttpResponseMessage>>("SendAsync",
                    ItExpr.Is<HttpRequestMessage>(req => req.Method == HttpMethod.Post),
                    ItExpr.IsAny<CancellationToken>())
                .ReturnsAsync(gilLabOauthTokenHttpResponse)
                .Callback(async (HttpRequestMessage msg, CancellationToken t) => 
                { 
                    resultGitHubOauthUri = msg!.RequestUri!.AbsolutePath;
                    resultGitHubOauthParameters = await msg!.Content!.ReadAsStringAsync();
                });

            // Arrange GetUser Gitlab Api request check
            string resultGitHubUserUri = string.Empty;
            string expectedGitHubUserUri = "/api/v4/user";
            string resultGitHubAuthenticationBearer = string.Empty;
            string expectedGitHubAuthenticationBearer = $"Bearer {expectedGitHubOAuthToken}";

            var gilLabUserHttpResponse = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(JsonSerializer.Serialize(_gitLabUser))
            };
            _httpMessageHandler.Protected()
                .Setup<Task<HttpResponseMessage>>("SendAsync",
                    ItExpr.Is<HttpRequestMessage>(req => req.Method == HttpMethod.Get),
                    ItExpr.IsAny<CancellationToken>())
                .ReturnsAsync(gilLabUserHttpResponse)
                .Callback((HttpRequestMessage msg, CancellationToken t) => 
                { 
                    resultGitHubUserUri = msg!.RequestUri!.AbsolutePath;
                    resultGitHubAuthenticationBearer = msg!.Headers.GetValues("Authorization").FirstOrDefault() ?? string.Empty;
                });
            var httpClient = new HttpClient(_httpMessageHandler.Object);
            httpClient.BaseAddress = new Uri(_settings!.BaseAddress);
            _mockHttpFactory!.Setup(_ => _.CreateClient(It.IsAny<string>())).Returns(httpClient);

            // Act
            var authenticatedUser = await _service!.GetUser(expectedOAuthCode);

            // Assert
            Assert.NotNull(authenticatedUser, "Authenticated user should not be null");
            Assert.AreEqual(JsonSerializer.Serialize(_gitLabUser), JsonSerializer.Serialize(authenticatedUser), "GitLab users should match");
            // Assert getToken Gitlab Api request
            Assert.AreEqual(expectedGitHubOauthUri, resultGitHubOauthUri, "GitLab authentication API Uri should match");
            Assert.AreEqual(expectedGitHubOauthParameters, resultGitHubOauthParameters, "GitLab authentication API request parameters should match");
            // Assert GetUser Gitlab Api request check
            Assert.AreEqual(expectedGitHubUserUri, resultGitHubUserUri, "GitLab GetUser API Uri should match");
            Assert.AreEqual(expectedGitHubAuthenticationBearer, resultGitHubAuthenticationBearer, "GitLab GetUser API authorization bearers should match");
        }
    }
}
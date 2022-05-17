using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Centigrade.VedaVersum.Model;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using VedaVersum.Backend.Api;
using VedaVersum.Backend.DataAccess;
using VedaVersum.Backend.OAuth;

namespace Centigrade.VedaVersum
{
    public class Startup
    {
        const string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
                {
                    options.AddPolicy(name: MyAllowSpecificOrigins,
                        policy =>
                        {
                            policy.WithOrigins("http://localhost:3000/", "http://localhost:3000", "http://localhost:4200/", "http://localhost:4200")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                        });
                });

            // GitLab authorization configuration
            var gitLabOauthConfig = new GitLabOauthSettings();
            Configuration.GetSection("GitLabOauth").Bind(gitLabOauthConfig);
            services.AddSingleton(gitLabOauthConfig);

            // GitLab authorization
            services.AddHttpClient(GitLabOauthService.GitLabHttpClientName);
            services.AddTransient<IGitLabOauthService, GitLabOauthService>();

            // Token validation
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = GitLabOauthService.JwtIssuer,
                        ValidAudience = GitLabOauthService.JwtIssuer,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(gitLabOauthConfig.JwtSecret))
                    };
                });

            services.AddAuthorization();

            // DataAccess
            var connectionString = Configuration.GetConnectionString("mongo");
            services.AddTransient<IVedaVersumDataAccess, VedaVersumDataAccess>((p) => new VedaVersumDataAccess(
                connectionString,
                p.GetService<ILogger<VedaVersumDataAccess>>()!));

        services
            .AddGraphQLServer()
            .AddAuthorization()
            .AddInMemorySubscriptions()
            .AddQueryType<VedaVersumQuery>()
                .AddType<VedaVersumArticleObjectType>()
            .AddMutationType(d => d.Name("Mutation"))
                .AddType<OAuthMutation>()
                .AddType<VedaVersumMutation>()
            .AddSubscriptionType<VedaVersumSubscription>()
            .AddHttpRequestInterceptor(
                (context, executor, builder, ct) =>
                {
                    
                        // Deserializing GitLab user from JWT token data
                        if (context.User != null)
                        {
                            var serializedUser = context.User.Claims.Where(c => c.Type == ClaimTypes.UserData)
                                .Select(c => c.Value).SingleOrDefault();
                            if (!string.IsNullOrEmpty(serializedUser))
                            {
                                var user = JsonSerializer.Deserialize<User>(serializedUser);
                                builder.SetProperty("GitLabUser", user);
                            }
                        }
                        return ValueTask.CompletedTask;
                    })
                .ModifyRequestOptions(opt => opt.IncludeExceptionDetails = true);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app
                .UseWebSockets()
                .UseRouting()
                .UseCors(MyAllowSpecificOrigins)
                .UseAuthentication()
                .UseAuthorization()
                .UseEndpoints(endpoints =>
                {
                    endpoints.MapGraphQL();
                });
        }
    }
}


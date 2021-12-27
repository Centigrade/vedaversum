using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using VedaVersum.Backend.Api;
using VedaVersum.Backend.OAuth;

namespace Centigrade.VedaVersum
{
    public class Startup
    {
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            // GitLab authorization configuration
            var gitLabOauthConfig = new GitLabOauthSettings();
            Configuration.GetSection("GitLabOauth").Bind(gitLabOauthConfig);
            services.AddSingleton(gitLabOauthConfig);

            // GitLab authorization
            services.AddHttpClient(GitLabOauthService.GitLabHttpClientName);
            services.AddTransient<IGitLabOauthService, GitLabOauthService>();
            
            services
                .AddGraphQLServer()
                .AddInMemorySubscriptions()
                .AddQueryType<VedaVersumQuery>()
                .AddMutationType(d => d.Name("Mutation"))
                    .AddType<OAuthMutation>()
                    .AddType<VedaVersumMutation>()
                .AddSubscriptionType<VedaVersumSubscription>();
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
                .UseEndpoints(endpoints =>
                {
                    endpoints.MapGraphQL();
                });
        }
    }
}

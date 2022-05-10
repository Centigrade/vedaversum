using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Centigrade.VedaVersum.Model;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Core.Events;

namespace VedaVersum.Backend.DataAccess
{
    public class VedaVersumDataAccess : IVedaVersumDataAccess
    {
        private const string DatabaseName = "VedaVersum";
        private const string VedaVersumArticlesCollectionName = "Articles";
        private const string UsersCollectionName = "Users";
        private readonly IMongoDatabase _database;
        public VedaVersumDataAccess(string mongoDbConnectionString, ILogger<VedaVersumDataAccess> logger)
        {
            var mongoConnectionUrl = new MongoUrl(mongoDbConnectionString);
            var mongoClientSettings = MongoClientSettings.FromUrl(mongoConnectionUrl);
            mongoClientSettings.ClusterConfigurator = cb =>
            {
                cb.Subscribe<CommandStartedEvent>(e =>
                {
                    logger.LogDebug($"{e.CommandName} - {e.Command.ToJson()}");
                });
            };
            var client = new MongoClient(mongoClientSettings);
            _database = client.GetDatabase(DatabaseName);
        }

        /* ******************* */
        /* *** GET queries *** */
        /* ******************* */
        /// <inheritdoc />
        public async Task<IEnumerable<VedaVersumArticle>> GetAll()
        {
            var articlesCollection = _database.GetCollection<VedaVersumArticle>(VedaVersumArticlesCollectionName);
            var allArticles = await articlesCollection.FindAsync(Builders<VedaVersumArticle>.Filter.Empty);
            return allArticles.ToList();
        }

        /// <inheritdoc />
        public async Task<IEnumerable<VedaVersumArticle>> GetArticlesById(IEnumerable<string>? articleIds)
        {
            if (articleIds == null)
            {
                return new List<VedaVersumArticle>();
            }
            var articles = await _database.GetCollection<VedaVersumArticle>(VedaVersumArticlesCollectionName)
                    .FindAsync(Builders<VedaVersumArticle>.Filter.In(c => c.Id, articleIds));
            return articles.ToList();
        }

        /// <inheritdoc />
        public async Task<VedaVersumArticle?> GetArticleById(string articleId)
        {
            var articlesCollection = _database.GetCollection<VedaVersumArticle>(VedaVersumArticlesCollectionName);
            var article = await articlesCollection.FindAsync(Builders<VedaVersumArticle>.Filter.Where(c => c.Id == articleId));
            return article.FirstOrDefault();
        }

        /// <inheritdoc />
        public async Task<IEnumerable<VedaVersumArticle>> GetArticlesAssignedTo(string userEmail)
        {
            var articlesCollection = _database.GetCollection<VedaVersumArticle>(VedaVersumArticlesCollectionName);
            var articles = await articlesCollection.FindAsync(Builders<VedaVersumArticle>.Filter.Where(c => c.AssignedUsers != null && c.AssignedUsers.Count > 0));
            var filteredArticles = articles.ToList().Where(c => c.AssignedUsers != null && c.AssignedUsers.Any(u => u.Email == userEmail)).ToList();
            return filteredArticles;
        }

        public async Task<IEnumerable<VedaVersumArticle>> GetArticlesCreatedBy(string userEmail)
        {
            var articlesCollection = _database.GetCollection<VedaVersumArticle>(VedaVersumArticlesCollectionName);
            var articles = await articlesCollection.FindAsync(Builders<VedaVersumArticle>.Filter.Where(c => c.UserCreated == userEmail));
            var filteredArticles = articles.ToList();
            return filteredArticles;
        }

        /* ********************** */
        /* *** INSERT queries *** */
        /* ********************** */
        /// <inheritdoc />
        public async Task<VedaVersumArticle> InsertNewArticle(string title, string content, ICollection<string>? relatedArticles, User user)
        {
            var article = new VedaVersumArticle
            {
                Id = Guid.NewGuid().ToString(),
                Title = title,
                Content = content,
                RelatedArticleIds = relatedArticles,
                Created = DateTime.Now,
                AssignedUsers = new[] { user },
                UserCreated = user.Email
            };

            await _database.GetCollection<VedaVersumArticle>(VedaVersumArticlesCollectionName)
                .InsertOneAsync(article);
            return article;
        }

        /* ********************** */
        /* *** UPDATE queries *** */
        /* ********************** */
        /// <inheritdoc />
        public Task UpdateArticle(VedaVersumArticle article)
        {
            return _database.GetCollection<VedaVersumArticle>(VedaVersumArticlesCollectionName)
                .ReplaceOneAsync(
                    Builders<VedaVersumArticle>.Filter.Where(c => c.Id == article.Id),
                    article,
                    new ReplaceOptions { IsUpsert = true }
                );
        }

        /* ********************** */
        /* *** DELETE queries *** */
        /* ********************** */
        /// <inheritdoc />
        public async Task DeleteArticle(string articleId)
        {
            var articlesCollection = _database.GetCollection<VedaVersumArticle>(VedaVersumArticlesCollectionName);
            await articlesCollection.DeleteOneAsync(Builders<VedaVersumArticle>.Filter.Where(c => c.Id == articleId));
        }
    }
}
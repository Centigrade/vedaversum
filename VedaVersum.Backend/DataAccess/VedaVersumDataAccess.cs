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
        private const string VedaVersumCardsCollectionName = "Cards";
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
        public async Task<IEnumerable<VedaVersumCard>> GetAll()
        {
            var cardsCollection = _database.GetCollection<VedaVersumCard>(VedaVersumCardsCollectionName);
            var allCards = await cardsCollection.FindAsync(Builders<VedaVersumCard>.Filter.Empty);
            return allCards.ToList();
        }

        /// <inheritdoc />
        public async Task<IEnumerable<VedaVersumCard>> GetArticlesById(IEnumerable<string>? articleIds)
        {
            if (articleIds == null)
            {
                return new List<VedaVersumCard>();
            }
            var articles = await _database.GetCollection<VedaVersumCard>(VedaVersumCardsCollectionName)
                    .FindAsync(Builders<VedaVersumCard>.Filter.In(a => a.Id, articleIds));
            return articles.ToList();
        }

        /// <inheritdoc />
        public async Task<VedaVersumCard?> GetArticleById(string articleId)
        {
            var articlesCollection = _database.GetCollection<VedaVersumCard>(VedaVersumCardsCollectionName);
            var article = await articlesCollection.FindAsync(Builders<VedaVersumCard>.Filter.Where(a => a.Id == articleId));
            return article.FirstOrDefault();
        }

        public async Task<IEnumerable<VedaVersumCard>> GetArticlesCreatedBy(string userEmail)
        {
            var articlesCollection = _database.GetCollection<VedaVersumCard>(VedaVersumCardsCollectionName);
            var articles = await articlesCollection.FindAsync(Builders<VedaVersumCard>.Filter.Where(a => a.UserCreated == userEmail));
            var filteredArticles = articles.ToList();
            return filteredArticles;
        }

        /* ********************** */
        /* *** INSERT queries *** */
        /* ********************** */
        /// <inheritdoc />
        public async Task<VedaVersumCard> InsertNewCard(string title, string content, ICollection<string>? relatedCards, User user)
        {
            var card = new VedaVersumCard
            {
                Id = Guid.NewGuid().ToString(),
                Title = title,
                Content = content,
                RelatedCardIds = relatedCards,
                Created = DateTime.Now,
                AssignedUsers = new[] { user },
                UserCreated = user.Email
            };

            await _database.GetCollection<VedaVersumCard>(VedaVersumCardsCollectionName)
                .InsertOneAsync(card);
            return card;
        }

        /* ********************** */
        /* *** UPDATE queries *** */
        /* ********************** */
        /// <inheritdoc />
        public Task UpdateCard(VedaVersumCard card)
        {
            return _database.GetCollection<VedaVersumCard>(VedaVersumCardsCollectionName)
                .ReplaceOneAsync(
                    Builders<VedaVersumCard>.Filter.Where(c => c.Id == card.Id),
                    card,
                    new ReplaceOptions { IsUpsert = true }
                );
        }

        /* ********************** */
        /* *** DELETE queries *** */
        /* ********************** */
        /// <inheritdoc />
        public async Task DeleteCard(string cardId)
        {
            var cardsCollection = _database.GetCollection<VedaVersumCard>(VedaVersumCardsCollectionName);
            await cardsCollection.DeleteOneAsync(Builders<VedaVersumCard>.Filter.Where(c => c.Id == cardId));
        }
    }
}
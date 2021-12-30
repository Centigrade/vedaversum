using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Centigrade.VedaVersum.Model;
using MongoDB.Driver;

namespace VedaVersum.Backend.DataAccess
{
    public class VedaVersumDataAccess : IVedaVersumDataAccess
    {
        private const string DatabaseName = "VedaVersum";
        private const string VedaVersumCardsCollectionName = "Cards";
        private readonly IMongoDatabase _database;

        public VedaVersumDataAccess(string mongoDbConnectionString)
        {
            var client = new MongoClient(mongoDbConnectionString);
            _database = client.GetDatabase(DatabaseName);
        }

        /// <inheritdoc />
        public async Task DeleteCard(string cardId)
        {
            var cardsCollection = _database.GetCollection<VedaVersumCard>(VedaVersumCardsCollectionName);
            await cardsCollection.DeleteOneAsync(Builders<VedaVersumCard>.Filter.Where(c => c.Id == cardId));
        }

        /// <inheritdoc />
        public async Task<IEnumerable<VedaVersumCard>> GetAll()
        {
            var cardsCollection = _database.GetCollection<VedaVersumCard>(VedaVersumCardsCollectionName);
            var allCards = await cardsCollection.FindAsync(Builders<VedaVersumCard>.Filter.Empty);
            return allCards.ToList();
        }

        /// <inheritdoc />
        public async Task<VedaVersumCard?> GetCardById(string cardId)
        {
            var cardsCollection = _database.GetCollection<VedaVersumCard>(VedaVersumCardsCollectionName);
            var card = await cardsCollection.FindAsync(Builders<VedaVersumCard>.Filter.Where(c => c.Id == cardId));
            return card.FirstOrDefault();
        }

        /// <inheritdoc />
        public async Task<IEnumerable<VedaVersumCard>> GetCardsAssignedTo(string userEmail)
        {
            var cardsCollection = _database.GetCollection<VedaVersumCard>(VedaVersumCardsCollectionName);
            var cards = await cardsCollection.FindAsync(Builders<VedaVersumCard>.Filter.Where(c => c.AssignedUsers != null && c.AssignedUsers.Count > 0));
            var filteredCards = cards.ToList().Where(c => c.AssignedUsers != null && c.AssignedUsers.Any(u => u.Email == userEmail)).ToList();
            return filteredCards;
        }

        /// <inheritdoc />
        public async Task<IEnumerable<VedaVersumCard>> GetCardsById(IEnumerable<string>? cardIds)
        {
            if(cardIds == null)
            {
                return new List<VedaVersumCard>();
            }
            var cards = await _database.GetCollection<VedaVersumCard>(VedaVersumCardsCollectionName)
                    .FindAsync(Builders<VedaVersumCard>.Filter.In(c => c.Id, cardIds));
            return cards.ToList();
        }

        /// <inheritdoc />
        public async Task<VedaVersumCard> InsertNewCard(string title, string content, ICollection<string>? relatedCards, User user)
        {
            var card = new VedaVersumCard {
                Id = Guid.NewGuid().ToString(),
                Title = title,
                Content = content,
                RelatedCards = (await GetCardsById(relatedCards)).ToList(),
                Created = DateTime.Now,
                AssignedUsers = new [] {user},
                UserCreated = user.Email
            };

            await _database.GetCollection<VedaVersumCard>(VedaVersumCardsCollectionName)
                .InsertOneAsync(card);
            return card;
        }

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
    }
}
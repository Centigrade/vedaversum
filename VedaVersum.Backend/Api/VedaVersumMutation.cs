using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Centigrade.VedaVersum.Model;
using HotChocolate.Subscriptions;

namespace Centigrade.VedaVersum.Api
{
    public class VedaVersumMutation
    {
        private readonly ITopicEventSender _eventSender;

        public VedaVersumMutation(ITopicEventSender eventSender)
        {
            _eventSender = eventSender;
        }

        /// <summary>
        /// Notification about user enter
        /// </summary>
        public async Task<User> UserEnters(string userId)
        {
            // ToDo: Mock implementation.
            var user = new User
            {
                Id = userId,
                Name = "Anakin Skywalker",
                UserImage = "https://static.wikia.nocookie.net/starwars/images/6/6f/Anakin_Skywalker_RotS.png"
            };

            await _eventSender.SendAsync(
                nameof(VedaVersumSubscription.UserArrived),
                user);
            return user;
        }
        
        /// <summary>
        /// Notification about user going offline
        /// </summary>
        public async Task<User> UserLeaves(string userId)
        {
            // ToDo: Mock implementation.
            var user = new User
            {
                Id = userId,
                Name = "Anakin Skywalker",
                UserImage = "https://static.wikia.nocookie.net/starwars/images/6/6f/Anakin_Skywalker_RotS.png"
            };

            await _eventSender.SendAsync(
                nameof(VedaVersumSubscription.UserLeaved),
                user);
            return user;
        }

        public async Task<VedaVersumCard> CardAction(
            VedaVersumCardAction action,
            string title,
            string content,
            ICollection<string>? relatedCards)
        {
            // ToDo: Mock implementation
            var card = new VedaVersumCard
            {
                Id = Guid.NewGuid().ToString(),
                Title = title,
                Content = content,
                Created = DateTimeOffset.Now,
                UserCreated = Guid.NewGuid().ToString() // Take from authentication
            };

            await _eventSender.SendAsync(nameof(VedaVersumSubscription.CardChanged),
                new CardActionMessage {VedaVersumCard = card, Action = action});

            return card;
        }
    }
}
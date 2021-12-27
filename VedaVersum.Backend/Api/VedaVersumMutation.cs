using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Centigrade.VedaVersum.Model;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Subscriptions;
using HotChocolate.Types;

namespace VedaVersum.Backend.Api
{
    [ExtendObjectType(Name = "Mutation")]
    [Authorize]
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
        public async Task<User?> UserEnters([GlobalState("GitLabUser")] User user)
        {
            if(user == null)
            {
                throw new ApplicationException("User can not be found");
            }

            await _eventSender.SendAsync(
                nameof(VedaVersumSubscription.UserArrived),
                user);
            return user;
        }
        
        /// <summary>
        /// Notification about user going offline
        /// </summary>
        public async Task<User> UserLeaves([GlobalState("GitLabUser")] User user)
        {
            if(user == null)
            {
                throw new ApplicationException("User can not be found");
            }

            await _eventSender.SendAsync(
                nameof(VedaVersumSubscription.UserLeft),
                user);
            return user;
        }

        public async Task<VedaVersumCard> CardAction(
            VedaVersumCardAction action,
            string title,
            string content,
            ICollection<string>? relatedCards,
            [GlobalState("GitLabUser")] User user)
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
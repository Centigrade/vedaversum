using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Centigrade.VedaVersum.Model;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Subscriptions;
using HotChocolate.Types;
using VedaVersum.Backend.DataAccess;

namespace VedaVersum.Backend.Api
{
    [ExtendObjectType(Name = "Mutation")]
    public class VedaVersumMutation
    {
        private readonly ITopicEventSender _eventSender;
        private readonly IVedaVersumDataAccess _dataAccess;


        public VedaVersumMutation(ITopicEventSender eventSender, IVedaVersumDataAccess dataAccess)
        {
            _eventSender = eventSender;
            _dataAccess = dataAccess;
        }

        /// <summary>
        /// Notification about user enter
        /// </summary>
        [Authorize]
        public async Task<User?> UserEnters([GlobalState("GitLabUser")] User user)
        {
            if (user == null)
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
        [Authorize]
        public async Task<User> UserLeaves([GlobalState("GitLabUser")] User user)
        {
            if (user == null)
            {
                throw new ApplicationException("User can not be found");
            }

            await _eventSender.SendAsync(
                nameof(VedaVersumSubscription.UserLeft),
                user);
            return user;
        }

        [Authorize]
        public async Task<VedaVersumCard> CardAction(
            VedaVersumCardAction action,
            string title,
            string content,
            ICollection<string>? relatedCards,
            string? cardId,
            [GlobalState("GitLabUser")] User user)
        {
            VedaVersumCard? card = null;
            if (action != VedaVersumCardAction.Create)
            {
                if (string.IsNullOrEmpty(cardId))
                {
                    throw new ArgumentNullException(nameof(cardId));
                }
                card = await _dataAccess.GetArticleById(cardId);
                if (card == null)
                {
                    throw new ArgumentException($"Can not find card by id '{cardId}'");
                }
            }
            switch (action)
            {
                case VedaVersumCardAction.Create:
                    card = await _dataAccess.InsertNewCard(title, content, relatedCards, user);
                    break;
                case VedaVersumCardAction.Update:
                    if (card != null)
                    {
                        card.Title = title;
                        card.Content = title;
                        card.RelatedCardIds = relatedCards;
                        // TODO: Assigned users logic will be implemented later
                        await _dataAccess.UpdateCard(card);
                    }
                    break;
                case VedaVersumCardAction.Delete:
                    if (!string.IsNullOrEmpty(cardId))
                    {
                        await _dataAccess.DeleteCard(cardId);
                    }
                    break;
                default:
                    throw new ArgumentException($"Unknown action: {action}");
            }

            await _eventSender.SendAsync(nameof(VedaVersumSubscription.CardChanged),
                new CardActionMessage { VedaVersumCard = card, Action = action });

            return card!;
        }
    }
}
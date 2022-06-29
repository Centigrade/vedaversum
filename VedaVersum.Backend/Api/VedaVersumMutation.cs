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

        /// <summary>
        /// Handle article actions: create, update or delete
        /// </summary>
        [Authorize]
        public async Task<VedaVersumArticle> ArticleAction(
            VedaVersumArticleAction action,
            string title,
            string content,
            ICollection<string>? relatedArticles,
            string? articleId,
            [GlobalState("GitLabUser")] User user)
        {
            VedaVersumArticle? article = null;
            if(action != VedaVersumArticleAction.Create)
            {
                if(string.IsNullOrEmpty(articleId))
                {
                    throw new ArgumentNullException(nameof(articleId));
                }
                article = await _dataAccess.GetArticleById(articleId);
                if(article == null)
                {
                    throw new ArgumentException($"Can not find article by id '{articleId}'");
                }
            }
            switch (action)
            {
                case VedaVersumArticleAction.Create:
                    article = await _dataAccess.InsertNewArticle(title, content, relatedArticles, user);
                    break;
                case VedaVersumArticleAction.Update:
                    if(article != null)
                    {
                        article.Title = title;
                        article.Content = content;
                        article.RelatedArticleIds = relatedArticles;
                        article.UpdatedAt = DateTime.Now;
                        article.UserUpdated = user.Email;
                        await _dataAccess.UpdateArticle(article);
                    }
                    break;
                case VedaVersumArticleAction.Delete:
                    if(! string.IsNullOrEmpty(articleId))
                    {
                        await _dataAccess.DeleteArticle(articleId);
                    }
                    break;
                default:
                    throw new ArgumentException($"Unknown action: {action}");
            }

            await _eventSender.SendAsync(nameof(VedaVersumSubscription.ArticleChanged),
                new ArticleActionMessage {VedaVersumArticle = article, Action = action});

            return article!;
        }

        
        /// <summary>
        /// Increase article access counter by 1
        /// </summary>
        [Authorize]
        public async Task<VedaVersumArticle> UpdateArticleAccessCounter(
            string articleId
        ) {
            VedaVersumArticle? article = null;
            if(string.IsNullOrEmpty(articleId))
            {
            throw new ArgumentNullException(nameof(articleId));
            }
            article = await _dataAccess.GetArticleById(articleId);
            if(article == null)
            {
                throw new ArgumentException($"Can not find article by id '{articleId}'");
            }

            if(article != null)
            {
                article.AccessCounter = article.AccessCounter + 1;
                await _dataAccess.UpdateArticle(article);
            }
            return article!;
        }
    }
}
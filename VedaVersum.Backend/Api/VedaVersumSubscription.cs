using System;
using Centigrade.VedaVersum.Model;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;

namespace VedaVersum.Backend.Api
{
    [Authorize]
    public class VedaVersumSubscription
    {
        /// <summary>
        /// Subscription event fires when new user arrives online
        /// </summary>
        /// <returns></returns>
        [Subscribe]
        [Topic]
        public User UserArrived([EventMessage] User user)
        {
            return user;
        }

        /// <summary>
        /// Subscription event fires when new user goes offline
        /// </summary>
        /// <returns></returns>
        [Subscribe]
        [Topic]
        public User UserLeft([EventMessage] User user)
        {
            return user;
        }

        [Subscribe]
        [Topic] 
        public ArticleActionMessage ArticleChanged ([EventMessage] ArticleActionMessage message) => message;
    }
}
﻿using System;
using Centigrade.VedaVersum.Model;
using HotChocolate;
using HotChocolate.Types;

namespace Centigrade.VedaVersum.Api
{
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
        public User UserLeaved([EventMessage] User user)
        {
            return user;
        }

        [Subscribe]
        [Topic] 
        public CardActionMessage CardChanged ([EventMessage] CardActionMessage message) => message;
    }
}
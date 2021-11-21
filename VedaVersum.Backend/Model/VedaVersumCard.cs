using System;
using System.Collections.Generic;

namespace Centigrade.VedaVersum.Model
{
    /// <summary>
    /// Represents Knowledge Base card data
    /// </summary>
    public class VedaVersumCard
    {
        /// <summary>
        /// Card ID
        /// </summary>
        public string Id { get; set; } = string.Empty;

        /// <summary>
        /// Card title
        /// </summary>
        public string Title { get; set; } = string.Empty;

        /// <summary>
        /// Content of the card
        /// </summary>
        public string Content { get; set; } = string.Empty;

        /// <summary>
        /// User ID which created the card
        /// </summary>
        public string UserCreated { get; set; } = string.Empty;

        /// <summary>
        /// Time when card was created
        /// </summary>
        public DateTimeOffset? Created { get; set; }

        /// <summary>
        /// Users this card assigned
        /// </summary>
        public ICollection<User>? AssignedUsers { get; set; }

        /// <summary>
        /// Related cards
        /// </summary>
        public ICollection<VedaVersumCard>? RelatedCards { get; set; }
    }
}
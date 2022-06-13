﻿using System;
using System.Collections.Generic;

namespace Centigrade.VedaVersum.Model
{
    /// <summary>
    /// Represents Knowledge Base card article data
    /// </summary>
    public class VedaVersumArticle
    {
        /// <summary>
        /// Article ID
        /// </summary>
        public string Id { get; set; } = string.Empty;

        /// <summary>
        /// Article title
        /// </summary>
        public string Title { get; set; } = string.Empty;

        /// <summary>
        /// Content of the article
        /// </summary>
        public string Content { get; set; } = string.Empty;

        /// <summary>
        /// User ID which created the article
        /// </summary>
        public string UserCreated { get; set; } = string.Empty;

        /// <summary>
        /// Time when article was created
        /// </summary>
        public DateTimeOffset? Created { get; set; }

        /// <summary>
        /// Related articles Ids
        /// </summary>
        public ICollection<string>? RelatedArticleIds { get; set; }

        /// <summary>
        /// User ID which updated the article
        /// </summary>
        public string? UserUpdated { get; set; } = string.Empty;

        /// <summary>
        /// Time when article was updated
        /// </summary>
        public DateTimeOffset? UpdatedAt { get; set; }

        /// <summary>
        /// Article access counter
        /// </summary>
        public int AccessCounter { get; set; }

    }
}
using System;
using System.Collections;
using System.Threading;
using System.Threading.Tasks;
using Centigrade.VedaVersum.Model;
using HotChocolate.Subscriptions;
using Moq;
using NUnit.Framework;
using VedaVersum.Backend.Api;
using VedaVersum.Backend.DataAccess;

namespace VedaVersum.Test
{
    public class VedaVersumMutationTests
    {
        /// <summary>
        /// Event sender mock object
        /// </summary>
        private Mock<ITopicEventSender> _eventsSenderMock = new Mock<ITopicEventSender>();
        /// <summary>
        /// DataAccess mock object
        /// </summary>
        private Mock<IVedaVersumDataAccess> _dataAccessMock = new Mock<IVedaVersumDataAccess>();
        private VedaVersumMutation MutationClassToTest;

        private VedaVersumArticle ExpectedCardData = new VedaVersumArticle 
        {
            Id = Guid.NewGuid().ToString(),
            Title = "Test title",
            Content = "Test content",
        };

        private User TestUser = new User 
        {
            Id = 42,
            Email = "fake@mail.com"
        };

        [SetUp]
        public void Setup()
        {
            MutationClassToTest = new VedaVersumMutation(_eventsSenderMock.Object, _dataAccessMock.Object);
        }

        [Test]
        public async Task ShouldCallInsertNewCardDataAccessMethodOnCardCreate()
        {
            // Arrange. Mocking dataAccess behavior
            _dataAccessMock.Setup(d=> d.InsertNewArticle(It.IsAny<string>(), It.IsAny<string>(), null, It.IsAny<User>()))
                .ReturnsAsync(ExpectedCardData);

            // Action
            var resultCard = await MutationClassToTest.ArticleAction(
                VedaVersumArticleAction.Create, 
                ExpectedCardData.Title,
                ExpectedCardData.Content,
                relatedArticles: null,
                articleId: null,
                TestUser);

            // Assert
            Assert.NotNull(resultCard);
            Assert.IsNotEmpty(resultCard.Id);
            Assert.AreEqual(ExpectedCardData.Title, resultCard.Title);
            // Check if data accessor's InsertNewCard method has been called only once and with appropriate parameters
            _dataAccessMock.Verify(d => d.InsertNewArticle(
                ExpectedCardData.Title, 
                ExpectedCardData.Content,
                null,
                It.IsAny<User>()
                ), Times.Once);
            // Check if EventSender's method SendAsync has been called only once
            _eventsSenderMock.Verify(s => s.SendAsync<string, ArticleActionMessage>(
                nameof(VedaVersumSubscription.ArticleChanged), 
                It.Is<ArticleActionMessage>(m => m.Action == VedaVersumArticleAction.Create),
                It.IsAny<CancellationToken>()),
                Times.Once);
        }

        [TestCase(VedaVersumArticleAction.Update)]
        [TestCase(VedaVersumArticleAction.Delete)]
        public void ShouldThrowExceptionIfActionIsNotCreateAndCardIdIsNull(VedaVersumArticleAction action)
        {
            Assert.ThrowsAsync<ArgumentNullException>(() => MutationClassToTest.ArticleAction(
                action, 
                ExpectedCardData.Title,
                ExpectedCardData.Content,
                relatedArticles: null,
                articleId: null,
                TestUser));
        }

    }
}
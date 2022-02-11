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

        private VedaVersumCard ExpectedCardData = new VedaVersumCard 
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
            _dataAccessMock.Setup(d=> d.InsertNewCard(It.IsAny<string>(), It.IsAny<string>(), null, It.IsAny<User>()))
                .ReturnsAsync(ExpectedCardData);

            // Action
            var resultCard = await MutationClassToTest.CardAction(
                VedaVersumCardAction.Create, 
                ExpectedCardData.Title,
                ExpectedCardData.Content,
                relatedCards: null,
                cardId: null,
                TestUser);

            // Assert
            Assert.NotNull(resultCard);
            Assert.IsNotEmpty(resultCard.Id);
            Assert.AreEqual(ExpectedCardData.Title, resultCard.Title);
            // Check if data accessor's InsertNewCard method has been called only once and with appropriate parameters
            _dataAccessMock.Verify(d => d.InsertNewCard(
                ExpectedCardData.Title, 
                ExpectedCardData.Content,
                null,
                It.IsAny<User>()
                ), Times.Once);
            // Check if EventSender's method SendAsync has been called only once
            _eventsSenderMock.Verify(s => s.SendAsync<string, CardActionMessage>(
                nameof(VedaVersumSubscription.CardChanged), 
                It.Is<CardActionMessage>(m => m.Action == VedaVersumCardAction.Create),
                It.IsAny<CancellationToken>()),
                Times.Once);
        }

        [TestCase(VedaVersumCardAction.Update)]
        [TestCase(VedaVersumCardAction.Delete)]
        public void ShouldThrowExceptionIfActionIsNotCreateAndCardIdIsNull(VedaVersumCardAction action)
        {
            Assert.ThrowsAsync<ArgumentNullException>(() => MutationClassToTest.CardAction(
                action, 
                ExpectedCardData.Title,
                ExpectedCardData.Content,
                relatedCards: null,
                cardId: null,
                TestUser));
        }

        // TODO: Check if UpdateCard or DeleteCard method were called if "Update" or "Delete" actions were passed
    }
}
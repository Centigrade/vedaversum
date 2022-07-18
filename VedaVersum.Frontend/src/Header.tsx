import { useApolloClient } from '@apollo/client';
import { ARTICLE_CHANGED_SUBSCRIPTION } from 'api/subscriptions';
import logoWithName from 'assets/logo-with-name.svg';
import { VedaVersumArticle } from 'model/veda-versum-article';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addArticleToLastModified } from 'store/lastModifiedArticles.reducer';
import { increaseNotificationsCounter } from 'store/notificationsCounter.reducer';
import { articleAction, getLoggedInUserData, resetAllViewSettings } from 'utils/main';
import ArticleEditor from 'views/components/ArticleEditor';
import PopUpModal from 'views/components/PopUpModal';
import { Subscription } from 'zen-observable-ts';
import UserFlyoutMenu from './views/components/UserFlyoutMenu';

function Header() {
  //#region state
  const dispatch = useDispatch();

  // needed to filter changes that the user made by her/himself
  const userData = getLoggedInUserData();

  // variable needed for router navigation
  const navigateTo = useNavigate();

  // subscription
  const [subscription, setSubscription] = useState<Subscription>();
  //#endregion

  //#region subscription to article changes
  // React prevents apollo client from using subscriptions - therefore here is a workaround:
  // we are getting the Apollo client and subscribing to new events manually.
  // When events from server arrive, the new value pushes to the state
  const client = useApolloClient(); // Apollo client instance
  React.useEffect(() => {
    // Subscribing to GraphQL subscription:
    if (!subscription) {
      setSubscription(
        client.subscribe({ query: ARTICLE_CHANGED_SUBSCRIPTION }).subscribe((result: any) => {
          const articleAction: articleAction = result.data?.articleChanged?.action;
          const updatedArticle: VedaVersumArticle = result.data?.articleChanged?.vedaVersumArticle;

          // This executes each time when GraphQL pushes subscription notification
          if (articleAction === 'DELETE') {
            dispatch(addArticleToLastModified({ updatedArticle: updatedArticle, deleted: true }));
          } else if (
            updatedArticle.userUpdated !== userData.userEmail &&
            updatedArticle.userCreated !== userData.userEmail
          ) {
            dispatch(addArticleToLastModified({ updatedArticle: updatedArticle, deleted: false }));
            dispatch(increaseNotificationsCounter());
          }
        }),
      );
    }
  }, [client, userData, dispatch, subscription]);

  useEffect(() => {
    return () => {
      subscription?.unsubscribe();
    };
  }, [subscription]);
  //#endregion

  //#region helper functions
  /**
   * handles click on logo = reset all view settings
   */
  function handleLogoClick(): void {
    resetAllViewSettings(dispatch, navigateTo);
  }
  //#endregion

  //#region render component
  return (
    <nav className="bg-gray-800 header flex">
      <div className="w-full px-6 py-5 flex justify-between items-center">
        <div className="w-1/2 flex">
          <button onClick={() => handleLogoClick()}>
            <img src={logoWithName} alt="VedaVersum Logo" />
          </button>
        </div>
        <div className="w-1/2 flex items-center justify-end">
          {/* create new article button */}
          <PopUpModal show={ArticleEditor} openModalText="Start writing" dataContext="" />
          {/* avatar image */}
          <UserFlyoutMenu></UserFlyoutMenu>
        </div>
      </div>
    </nav>
  );
  // };
}
//#endregion
export default Header;

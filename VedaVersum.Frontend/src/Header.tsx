import { useApolloClient } from '@apollo/client';
import { ARTICLE_CHANGED_SUBSCRIPTION } from 'api/subscriptions';
import searchIcon from 'assets/icons/search-icon.svg';
import logoWithName from 'assets/logo-with-name.svg';
import { useDebounce } from 'customHooks/useDebounce.hook';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setActiveTab } from 'store/activeTab.reducer';
import { addArticleToLastModified } from 'store/lastModifiedArticles.reducer';
import { setNotificationsClicked } from 'store/notificationsClicked.reducer';
import { increaseNotificationsCounter } from 'store/notificationsCounter.reducer';
import { setSearchTerm } from 'store/searchTerm.reducer';
import { getLoggedInUserData } from 'utils/main';
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

  // variables for debouncing when the user enters a search term -
  // fires API call only when the user stops typing
  const [componentSearchTerm, setComponentSearchTerm] = useState('');
  const debounceDelay = 500;
  const debouncedSearchTerm = useDebounce(componentSearchTerm, debounceDelay);
  //#endregion

  //#region search input handling
  useEffect(() => {
    if (debouncedSearchTerm) {
      // if debounced search term changes, update search term in store, reset  and
      dispatch(setSearchTerm(debouncedSearchTerm));
      // reset search term in header
      setComponentSearchTerm('');
      // potentially reset view
      dispatch(setNotificationsClicked(false));
      // navigate to search results view
      navigateTo('/');
    }
  }, [debouncedSearchTerm, dispatch, navigateTo]);
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
          const updatedArticle = result.data?.articleChanged?.vedaVersumArticle;
          // This executes each time when GraphQL pushes subscription notification
          if (
            updatedArticle.userUpdated !== userData.userEmail &&
            updatedArticle.vedaVersumArticle.userCreated !== userData.userEmail
          ) {
            dispatch(addArticleToLastModified(updatedArticle));
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
   * handles click on logo = resets all view settings from the user, i.e.
   * the active tab (sorting) and the search term (filtering),
   * and navigates back to the landing page
   */
  function handleLogoClick(): void {
    dispatch(setSearchTerm(''));
    dispatch(setActiveTab('allArticles'));
    dispatch(setNotificationsClicked(false));
    navigateTo('/');
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
          {/* search bar */}
          <div className="p-1 flex mr-4 bg-white rounded">
            <input
              name="searchInput"
              value={componentSearchTerm}
              type="text"
              placeholder="Search"
              className="shrink grow basis-0 py-2 px-2 focus-visible:outline-none"
              onChange={e => setComponentSearchTerm(e.target.value)}
            />
            <img
              src={searchIcon}
              alt="magnifying glass"
              className="shrink-0 grow-0 basis-auto pointer-events-none mr-2"
            />
          </div>
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

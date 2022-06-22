import { useApolloClient } from '@apollo/client';
import { ARTICLE_CHANGED_SUBSCRIPTION } from 'api/subscriptions';
import searchIcon from 'assets/icons/search-icon.svg';
import logoWithName from 'assets/logo-with-name.svg';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUserData } from 'utils/main';
import ArticleEditor from 'views/components/ArticleEditor';
import PopUpModal from 'views/components/PopUpModal';
import UserFlyoutMenu from './UserFlyoutMenu';

function Header() {
  //#region state
  const [searchTerm, setSearchTerm] = useState('');
  const [numberOfNotifications, setNumberOfNotifications] = useState(0);

  // needed to filter changes that the user made by her/himself
  const userData = getLoggedInUserData();

  // variable needed for router navigation
  const navigateTo = useNavigate();

  //#endregion

  //#region subscriptions to get updates from the database  TODO: fix this with Mikhail
  // possible solution: upgrade apollo client (https://github.com/apollographql/apollo-client/issues/7608)
  /*  const {
    data: articleUpdatesData,
    loading: loadingArticleUpdates,
    error,
  } = useSubscription(ARTICLE_CHANGED_SUBSCRIPTION); */

  /* !!! this creates infinite loop !!! TODO: fix this
  if (articleUpdatesData?.userCreated !== userData.userEmail) {
    setNumberOfNotifications(numberOfNotifications + 1);
  } */

  // TODO: Apollo hook does not work because of the issue below :)
  // Here is a workaround - we are getting the Apollo client and subscribing to new events manually.
  // When events from server arrive, the new value pushes to the state
  const client = useApolloClient(); // Apollo client instance
  React.useEffect(() => {
    // Subscribing to GraphQL subscription:
    client.subscribe({ query: ARTICLE_CHANGED_SUBSCRIPTION }).subscribe((result: any) => {
      // This executes each time when GraphQL pushes subscription notification
      console.log(result.data?.articleChanged?.vedaVersumArticle);

      // if (result.data?.articleChanged?.vedaVersumArticle.userUpdated !== userData.userEmail) {
      setNumberOfNotifications(numberOfNotifications + 1);
      // }
    });
  }, [client, userData, numberOfNotifications]);

  //#region helper functions
  // TODO:
  /**
   * this function should manage the search input that the api is not triggered after each letter but only when the user stopped typing
   * @param func
   * @param delay
   * @returns
   */
  function debounce<T extends unknown[]>(func: (...args: T) => void, delay: number): (...args: T) => void {
    let timer: any | null = null;
    return (...args: T) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func.call(null, ...args);
      }, delay);
    };
  }

  /**
   * clears temporary user data, i.e. the active tab (sorting) and the search term (filtering).
   * notifies the parent component to transfer this information down to other child components
   */
  function resetToLandingPage(): void {
    setSearchTerm('');
    localStorage.setItem('activeTab', 'allArticles');
    localStorage.setItem('searchTerm', '');
    navigateTo('/');
  }

  // send search term to App.tsx to trigger the api and set local storage
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    localStorage.setItem('searchTerm', e.target.value);
    navigateTo('/');
    // }, 200);
  };
  //#endregion

  //#region render component
  return {
    searchTerm,
    render: (
      <nav className="bg-gray-800 header flex">
        <div className="w-full px-6 py-5 flex justify-between items-center">
          <div className="w-1/2 flex">
            <button onClick={() => resetToLandingPage()}>
              <img src={logoWithName} alt="VedaVersum Logo" />
            </button>
            {<div className="text-red ml-6">subscription data: {numberOfNotifications}</div>}
          </div>
          <div className="w-1/2 flex items-center justify-end">
            {/* search bar */}
            <label className="relative block mr-4">
              <img
                src={searchIcon}
                alt="magnifying glass"
                className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-1 mr-2"
              />
              <input
                name="searchInput"
                value={searchTerm}
                type="text"
                placeholder="Search"
                className="w-full rounded py-2 px-2 mr-28 outline-4 focus-visible:outline-primary"
                onChange={handleInput}
              />
            </label>
            {/* create new article button */}
            <PopUpModal show={ArticleEditor} openModalText="Start writing" dataContext="" />
            {/* avatar image */}
            <UserFlyoutMenu numberOfNotifications={numberOfNotifications}></UserFlyoutMenu>
          </div>
        </div>
      </nav>
    ),
  };
}
//#endregion
export default Header;

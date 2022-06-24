import { useApolloClient } from '@apollo/client';
import { ARTICLE_CHANGED_SUBSCRIPTION } from 'api/subscriptions';
import searchIcon from 'assets/icons/search-icon.svg';
import logoWithName from 'assets/logo-with-name.svg';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUserData } from 'utils/main';
import ArticleEditor from 'views/components/ArticleEditor';
import PopUpModal from 'views/components/PopUpModal';
import UserFlyoutMenu from './UserFlyoutMenu';

interface HeaderProps {
  resetNotificationsClickedState: boolean;
}

function Header(props?: HeaderProps) {
  //#region state
  const [searchTerm, setSearchTerm] = useState('');
  const [numberOfNotifications, setNumberOfNotifications] = useState(1);
  const [resetNotificationsClickedState, setResetNotificationsClicked] = useState(false);

  // needed to filter changes that the user made by her/himself
  const userData = getLoggedInUserData();

  // variable needed for router navigation
  const navigateTo = useNavigate();

  // user fly out menu and notifications clicked
  const { render: renderFlyOutMenu, notificationsClicked } = UserFlyoutMenu({
    numberOfNotifications: numberOfNotifications,
    resetNotificationsClickedState: resetNotificationsClickedState,
  });
  //#endregion

  //reset notifications when the user clicked them
  useEffect(() => {
    if (notificationsClicked) {
      setNumberOfNotifications(0);
    }
  }, [notificationsClicked]);

  // change article view when user leaves the notification view
  useEffect(() => {
    if (props?.resetNotificationsClickedState) {
      setResetNotificationsClicked(true);
    }
  }, [props?.resetNotificationsClickedState]);

  // React prevents apollo client from using subscriptions - therefore here is a workaround:
  // we are getting the Apollo client and subscribing to new events manually.
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
    notificationsClicked,
    render: (
      <nav className="bg-gray-800 header flex">
        <div className="w-full px-6 py-5 flex justify-between items-center">
          <div className="w-1/2 flex">
            <button onClick={() => resetToLandingPage()}>
              <img src={logoWithName} alt="VedaVersum Logo" />
            </button>
            <button className="bg-red mx-6 " onClick={() => setNumberOfNotifications(numberOfNotifications + 1)}>
              notif++
            </button>
            <div className="text-red ml-6">subscription data: {numberOfNotifications}</div>
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
            {renderFlyOutMenu}
          </div>
        </div>
      </nav>
    ),
  };
}
//#endregion
export default Header;

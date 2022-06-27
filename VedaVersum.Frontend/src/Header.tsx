import { useApolloClient } from '@apollo/client';
import { ARTICLE_CHANGED_SUBSCRIPTION } from 'api/subscriptions';
import searchIcon from 'assets/icons/search-icon.svg';
import logoWithName from 'assets/logo-with-name.svg';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setActiveTab } from 'store/activeTab.reducer';
import { setNotificationsClicked } from 'store/notificationsClicked.reducer';
import { increaseNotificationsCounter } from 'store/notificationsCounter.reducer';
import { setSearchTerm } from 'store/searchTerm.reducer';
import { RootState } from 'store/store';
import { getLoggedInUserData } from 'utils/main';
import ArticleEditor from 'views/components/ArticleEditor';
import PopUpModal from 'views/components/PopUpModal';
import UserFlyoutMenu from './views/components/UserFlyoutMenu';

function Header() {
  //#region state

  const notificationsCounter = useSelector((state: RootState) => state.notificationsCounter.value);
  const searchTerm = useSelector((state: RootState) => state.searchTerm.value);
  const dispatch = useDispatch();

  // needed to filter changes that the user made by her/himself
  const userData = getLoggedInUserData();

  // variable needed for router navigation
  const navigateTo = useNavigate();

  //#endregion

  //#region subscription to article changes
  // React prevents apollo client from using subscriptions - therefore here is a workaround:
  // we are getting the Apollo client and subscribing to new events manually.
  // When events from server arrive, the new value pushes to the state
  const client = useApolloClient(); // Apollo client instance
  React.useEffect(() => {
    // Subscribing to GraphQL subscription:
    client.subscribe({ query: ARTICLE_CHANGED_SUBSCRIPTION }).subscribe((result: any) => {
      // This executes each time when GraphQL pushes subscription notification
      console.log(result.data?.articleChanged?.vedaVersumArticle.title);

      if (result.data?.articleChanged?.vedaVersumArticle.userUpdated !== userData.userEmail) {
        dispatch(increaseNotificationsCounter());
      }
    });
  }, [client, userData, dispatch]);
  //#endregion

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

  // send search term to App.tsx to trigger the api and set local storage
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
    dispatch(setNotificationsClicked(false));
    navigateTo('/');
    // }, 200);
  };
  //#endregion

  //#region render component
  return (
    <nav className="bg-gray-800 header flex">
      <div className="w-full px-6 py-5 flex justify-between items-center">
        <div className="w-1/2 flex">
          <button onClick={() => handleLogoClick()}>
            <img src={logoWithName} alt="VedaVersum Logo" />
          </button>
          <button className="bg-red mx-6 " onClick={() => dispatch(increaseNotificationsCounter())}>
            notif++
          </button>
          <div className="text-red ml-6">subscription data: {notificationsCounter}</div>
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
          <UserFlyoutMenu></UserFlyoutMenu>
        </div>
      </div>
    </nav>
  );
  // };
}
//#endregion
export default Header;

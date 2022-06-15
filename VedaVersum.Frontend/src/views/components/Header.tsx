import searchIcon from 'assets/icons/search-icon.svg';
import logoWithName from 'assets/logo-with-name.svg';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ArticleEditor from 'views/components/ArticleEditor';
import PopUpModal from 'views/components/PopUpModal';
import UserFlyoutMenu from './UserFlyoutMenu';

function Header() {
  //#region state
  const [searchTerm, setSearchTerm] = useState('');
  const [clearedAll, setClearedAll] = useState(false);
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
   * clears temporary user data, i.e. the active tab (sorting) and the search term (filtering).
   * notifies the parent component to transfer this information down to other child components
   */
  function clearTemporaryData(): void {
    setSearchTerm('');
    localStorage.removeItem('activeTab');
    localStorage.removeItem('searchTerm');
    setClearedAll(!clearedAll);
  }

  // send search term to App.tsx to trigger the api and set local storage
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    localStorage.setItem('searchTerm', e.target.value);
    // }, 200);
  };

  //#region render component
  return {
    searchTerm,
    clearedAll,
    render: (
      <nav className="bg-gray-800 header flex">
        <div className="w-full px-6 py-5 flex justify-between items-center">
          <div className="w-1/2 flex">
            <button onClick={() => clearTemporaryData()}>
              <Link to="/">
                <img src={logoWithName} alt="VedaVersum Logo" />
              </Link>
            </button>
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
    ),
  };
}
//#endregion
export default Header;

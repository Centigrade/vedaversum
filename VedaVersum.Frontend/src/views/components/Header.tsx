import searchIcon from 'assets/icons/search-icon.svg';
import logoWithName from 'assets/logo-with-name.svg';
import { Link } from 'react-router-dom';
import ArticleEditor from 'views/components/ArticleEditor';
import PopUpModal from 'views/components/PopUpModal';
import UserFlyoutMenu from './UserFlyoutMenu';

function Header() {
  //#region render component
  return (
    <nav className="bg-gray-800 header flex">
      <div className="w-full px-6 py-5 flex justify-between items-center">
        <div className="w-1/2">
          <Link to="/">
            <img src={logoWithName} alt="VedaVersum Logo" />
          </Link>
        </div>
        <div className="w-1/2 flex items-center justify-end">
          {/* search bar */}
          <label className="relative block mr-2">
            <img
              src={searchIcon}
              alt="magnifying glass"
              className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-1 mr-2"
            />
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded py-2 px-2 mr-28 outline-4 focus-visible:outline-primary"
            />
          </label>
          {/* create new article button */}
          <PopUpModal show={ArticleEditor} openModalText="Start writing" type="create" />
          {/* avatar image */}
          <UserFlyoutMenu></UserFlyoutMenu>
        </div>
      </div>
    </nav>
  );
}
//#endregion
export default Header;

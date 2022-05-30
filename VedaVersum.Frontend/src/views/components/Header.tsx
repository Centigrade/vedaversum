import searchIcon from 'assets/icons/search-icon.svg';
import placeholderAvatarImage from 'assets/images/placeholderUserAvatar.png';
import logoWithName from 'assets/logo-with-name.svg';
import { Link } from 'react-router-dom';
import CreateArticle from 'views/components/CreateArticle';
import PopUpModal from 'views/components/PopUpModal';
import { readAuthContextFromLocalStorage } from '../../authentication/AutContext';

function Header() {
  //#region get user data from user logged in
  const loginData = readAuthContextFromLocalStorage();
  const loginUser = loginData?.user;
  const loginUserEmail = loginUser?.email!;
  const loginUserName = loginUserEmail.split('@')[0];

  // prepare avatar image path
  const avatarUrl = loginUserName
    ? `https://www.centigrade.de/basic/resources/images/team/pixel-avatar-portraits/${loginUserName}.png`
    : placeholderAvatarImage;
  //#endregion

  //#region render component
  return (
    <nav className="bg-gray-800 header flex">
      <div className="w-full px-4 py-4 flex justify-between items-center">
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
            <input type="text" placeholder="Search" className="w-full rounded py-2 px-2 mr-48" />
          </label>
          {/* create new article button */}
          <PopUpModal show={CreateArticle} openModalText="Start writing" />
          {/* avatar image */}
          <button>
            <img className="ml-3 w-8 rounded-full hover:cursor-pointer" src={avatarUrl} alt="some pic" />
          </button>
        </div>
      </div>
    </nav>
  );
}
//#endregion
export default Header;

import placeholderAvatarImage from 'assets/images/placeholderUserAvatar.png';
import logoWithName from 'assets/logoWithName.svg';
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
        <Link to="/">
          <img src={logoWithName} alt="VedaVersum Logo" />
        </Link>
        <div className="flex items-center justify-end">
          {/* search bar */}
          <input type="text" placeholder="Search.." className="rounded py-2 px-2 mr-3" />
          {/* create new article button */}
          <PopUpModal show={CreateArticle} openModalText="Start writing" />
          {/* avatar image */}
          <img className="ml-3 w-1/12 rounded-full" src={avatarUrl} alt="some pic" />
        </div>
      </div>
    </nav>
  );
}
//#endregion
export default Header;

import placeholderAvatarImage from 'assets/images/placeholderUserAvatar.png';
import 'views/styles/UserFlyoutMenu.scss';
import { readAuthContextFromLocalStorage } from '../../authentication/AutContext';

function PopUpModal() {
  //#region get user data from user logged in
  const loginData = readAuthContextFromLocalStorage();
  const loginUser = loginData?.user;
  const loginUserEmail = loginUser?.email!;
  const loginUserName = loginUserEmail.split('.')[0];
  const menuOpen = true;

  // prepare avatar image path
  const avatarUrl = loginUserName
    ? `https://www.centigrade.de/basic/resources/images/team/pixel-avatar-portraits/${loginUserName}.png`
    : placeholderAvatarImage;
  //#endregion

  //#region render component
  return (
    <div>
      <button>
        <img className="ml-3 w-8 rounded-full hover:cursor-pointer" src={avatarUrl} alt="some pic" />
      </button>
      {menuOpen && (
        <div className="z-10 rounded-lg absolute top-14 right-2 w-64 h-72 bg-white p-6 border border-primary">test</div>
      )}
    </div>
  );
}
//#endregion
export default PopUpModal;

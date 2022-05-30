import logOutIcon from 'assets/icons/log-out-icon.svg';
import notificationIcon from 'assets/icons/notification-icon.svg';
import placeholderAvatarImage from 'assets/images/placeholderUserAvatar.png';
import { useState } from 'react';
import { readAuthContextFromLocalStorage } from '../../authentication/AutContext';

function PopUpModal() {
  //#region get user data from user logged in
  const loginData = readAuthContextFromLocalStorage();
  const loginUser = loginData?.user;
  const loginUserEmail = loginUser?.email!;
  const loginUserName = loginUserEmail.split('@')[0];
  const preparedLoginUserName = loginUserName.split('.')[0];

  const [menuOpen, setMenuOpen] = useState(false);
  const numberOfNotifications = 178;

  // prepare avatar image path
  const avatarUrl = loginUserName
    ? `https://www.centigrade.de/basic/resources/images/team/pixel-avatar-portraits/${loginUserName}.png`
    : placeholderAvatarImage;
  //#endregion

  //#region render component
  return (
    <div>
      <button
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <img
          className="ml-3 w-8 rounded-full hover:cursor-pointer border border-primary"
          src={avatarUrl}
          alt="some pic"
        />
      </button>
      {menuOpen && (
        <div className="z-10 rounded-lg fixed top-14 right-5 w-60 h-72 shadow-lg bg-white p-6 text-center">
          <div className="flex justify-center">
            <img className="w-24 rounded-full border border-primary" src={avatarUrl} alt="some pic" />
          </div>
          <p className="text-primary mt-3">{preparedLoginUserName}</p>
          <div className="mt-8 flex align-center hover:cursor-pointer">
            <img src={notificationIcon} alt="a bell" className="mr-5" />
            <span>Notifications</span>
            <span className="text-primary ml-4">{numberOfNotifications}</span>
          </div>
          <div className="mt-4 flex align-center hover:cursor-pointer">
            <img src={logOutIcon} alt="a bell" className="mr-5" />
            <span>Log out</span>
          </div>
        </div>
      )}
    </div>
  );
}
//#endregion
export default PopUpModal;

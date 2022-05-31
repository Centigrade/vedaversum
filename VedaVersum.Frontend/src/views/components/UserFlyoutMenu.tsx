import logOutIcon from 'assets/icons/log-out-icon.svg';
import notificationIcon from 'assets/icons/notification-icon.svg';
import placeholderAvatarImage from 'assets/images/placeholderUserAvatar.png';
import { useState } from 'react';
import { getLoggedInUserData, LoggedInUserData } from 'utils/main';
import 'views/styles/flyoutMenu.scss';

function PopUpModal() {
  //#region get user data from user logged in
  const loginUserData: LoggedInUserData = getLoggedInUserData();
  // prepare avatar image path
  const avatarUrl = loginUserData.userName
    ? `https://www.centigrade.de/basic/resources/images/team/pixel-avatar-portraits/${loginUserData.userName}.png`
    : placeholderAvatarImage;

  // store
  const [menuOpen, setMenuOpen] = useState(false);
  const numberOfNotifications = 178;
  //#endregion

  //#region render component
  return (
    <div className="flex items-center">
      <button
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
        className="ml-2 fly-out-menu hover:cursor-pointer"
      >
        {numberOfNotifications > 0 && (
          <div
            className={
              'z-10 fixed w-3 h-3 rounded-full bg-red outline outline-2 top-6 right-6 ' +
              (menuOpen ? 'outline-primary-light' : 'outline-transparent')
            }
          ></div>
        )}
        <img
          className={
            'w-10 rounded-full outline outline-4 ' +
            (menuOpen ? 'outline-primary-light border-0' : 'border border-primary outline-transparent')
          }
          src={avatarUrl}
          alt="some pic"
        />
      </button>
      {menuOpen && (
        <div className="z-10 rounded-lg fixed top-14 right-5 w-60 h-72 shadow-lg bg-white p-6 text-center">
          <div className="flex justify-center">
            <img className="w-24 rounded-full border border-primary" src={avatarUrl} alt="some pic" />
          </div>
          <p className="text-primary mt-3">{loginUserData.visualUserName}</p>
          <div className="mt-8 flex align-center hover:cursor-pointer">
            <img src={notificationIcon} alt="a bell" className="mr-5" />
            <span>Notifications</span>
            {numberOfNotifications > 0 && <span className="text-primary ml-4">{numberOfNotifications}</span>}
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

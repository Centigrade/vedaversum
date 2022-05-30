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
    <div className="flex items-center">
      <button
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
        className="ml-2 rounded-full"
      >
        {/* notification dot TODO: fix hover outline*/}
        <div
          className={
            'z-10 fixed w-3 h-3 rounded-full bg-red outline outline-2 top-6 right-6 hover:outline-primary-light hover:cursor-pointer active:outline-primary-light' +
            (menuOpen ? 'outline outline-2 outline-primary-light' : 'outline outline-2 outline-transparent')
          }
        ></div>
        <img
          className={
            'w-10 rounded-full border border-primary outline outline-4 hover:outline-primary-light active:outline-primary-light' +
            (menuOpen ? 'outline outline-4 outline-primary-light' : 'outline outline-4 outline-transparent')
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

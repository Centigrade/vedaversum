import { AnyAction } from '@reduxjs/toolkit';
import notificationIcon from 'assets/icons/notification-icon.svg';
import { Dispatch, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { setNotificationsClicked } from 'store/notificationsClicked.reducer';
import { resetNotificationsCounter } from 'store/notificationsCounter.reducer';
import { RootState } from 'store/store';
import { getAvatarUrl, getLoggedInUserData, LoggedInUserData } from 'utils/main';

function UserFlyoutMenu() {
  //#region variables
  // get user data from user logged in
  const loginUserData: LoggedInUserData = getLoggedInUserData();
  // prepare avatar image path
  const avatarUrl = getAvatarUrl(loginUserData.userName);

  // variable needed for router navigation
  let navigateTo: NavigateFunction = useNavigate();

  // get variables from global store
  const numberOfNotifications = useSelector((state: RootState) => state.notificationsCounter.value);
  const dispatch: Dispatch<AnyAction> = useDispatch();

  // component state
  const [menuOpen, setMenuOpen] = useState(false);
  //#endregion

  function handleNotificationsClick(): void {
    dispatch(setNotificationsClicked(true));
    dispatch(resetNotificationsCounter());
    navigateTo('/');
    setMenuOpen(false);
  }

  //#region render component
  return (
    <div className="flex items-center ml-4">
      {/* user avatar button */}
      <button
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
        className="fly-out-menu relative hover:cursor-pointer"
      >
        {numberOfNotifications > 0 && (
          <div
            className={
              'z-10 absolute w-3 h-3 rounded-full bg-red outline outline-2 bottom-7 left-7 ' +
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
        <div className="z-10 rounded-lg fixed top-14 right-5 w-60 h-64 shadow-lg bg-white p-6 text-center">
          {/* user data */}
          <>
            <div className="flex justify-center">
              <img className="w-24 rounded-full border border-primary" src={avatarUrl} alt="some pic" />
            </div>

            <p className="text-primary mt-3">{loginUserData.visualUserName}</p>
          </>
          {/* notifications */}
          <button
            className={
              'mt-8 flex align-center ' + (numberOfNotifications > 0 ? 'hover:cursor-pointer' : 'hover:cursor-auto')
            }
            disabled={numberOfNotifications === 0}
            onClick={() => handleNotificationsClick()}
          >
            <img src={notificationIcon} alt="a bell" className="mr-5" />
            <span>Notifications</span>
            {numberOfNotifications > 0 && <span className="text-primary ml-4">{numberOfNotifications}</span>}
          </button>
        </div>
      )}
    </div>
  );
}
//#endregion
export default UserFlyoutMenu;

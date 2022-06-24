import logOutIcon from 'assets/icons/log-out-icon.svg';
import notificationIcon from 'assets/icons/notification-icon.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAvatarUrl, getLoggedInUserData, LoggedInUserData } from 'utils/main';
import 'views/components/styles/flyoutMenu.scss';

interface UserFlyoutMenuProps {
  numberOfNotifications: number;
  resetNotificationsClickedState: boolean;
}

function UserFlyoutMenu(props: UserFlyoutMenuProps) {
  //#region variables
  // get user data from user logged in
  const loginUserData: LoggedInUserData = getLoggedInUserData();
  // prepare avatar image path
  const avatarUrl = getAvatarUrl(loginUserData.userName);

  // variable needed for router navigation
  let navigateTo = useNavigate();

  // state
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsClicked, setNotificationsClicked] = useState(false);
  //#endregion

  function handleNotificationsClick(): void {
    setNotificationsClicked(true);
    setMenuOpen(false);
    navigateTo('/');
  }

  useEffect(() => {
    if (props.resetNotificationsClickedState) {
      setNotificationsClicked(false);
    }
  }, [props.resetNotificationsClickedState]);

  //#region render component
  return {
    notificationsClicked,
    render: (
      <div className="flex items-center ml-4">
        {/* user avatar button */}
        <button
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
          className="fly-out-menu relative hover:cursor-pointer"
        >
          {props.numberOfNotifications > 0 && (
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
          <div className="z-10 rounded-lg fixed top-14 right-5 w-60 h-72 shadow-lg bg-white p-6 text-center">
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
                'mt-8 flex align-center ' +
                (props.numberOfNotifications > 0 ? 'hover:cursor-pointer' : 'hover:cursor-auto')
              }
              disabled={props.numberOfNotifications === 0}
              onClick={() => handleNotificationsClick()}
            >
              <img src={notificationIcon} alt="a bell" className="mr-5" />
              <span>Notifications</span>
              {props.numberOfNotifications > 0 && (
                <span className="text-primary ml-4">{props.numberOfNotifications}</span>
              )}
            </button>
            <div className="mt-4 flex align-center hover:cursor-pointer">
              <img src={logOutIcon} alt="a bell" className="mr-5" />
              <span>Log out</span>
            </div>
          </div>
        )}
      </div>
    ),
  };
}
//#endregion
export default UserFlyoutMenu;

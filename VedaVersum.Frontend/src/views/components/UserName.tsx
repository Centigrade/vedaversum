import placeholderAvatarImage from 'assets/images/placeholderUserAvatar.png';

//#region user name properties
export interface UsernameProps {
  email: string;
}
//#endregion

function UserName(props: UsernameProps) {
  // get user name from the user e-mail
  const preparedName = props.email.split('@')[0];

  /**
   * gets the URL of the pixel avatar of the user currently logged in
   * @param userName the user's name according to whom the URL is searched for
   * @returns the URL of the pixel avatar of the user currently logged in
   */
  function getAvatarUrl(userName: string): string {
    if (userName) {
      return `https://www.centigrade.de/basic/resources/images/team/pixel-avatar-portraits/${userName}.png`;
    } else {
      return placeholderAvatarImage;
    }
  }

  //#region render component
  return (
    <div className="flex items-center">
      <img className="w-6 rounded-full mr-2" src={getAvatarUrl(preparedName)} alt="some pic" />
      <span className="text-primary mr-2">{preparedName}</span>
    </div>
  );
  //#endregion
}

export default UserName;

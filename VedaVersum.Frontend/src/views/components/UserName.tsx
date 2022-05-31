import { getAvatarUrl } from 'utils/main';

//#region user name properties
export interface UsernameProps {
  email: string;
}
//#endregion

function UserName(props: UsernameProps) {
  // get user name from the user e-mail
  const userName = props.email.split('@')[0];
  const preparedName = userName.split('.')[0];

  //#region render component
  return (
    <div className="flex items-center">
      <img className="w-6 rounded-full mr-2 border border-primary" src={getAvatarUrl(userName)} alt="some pic" />
      <span className="text-primary mr-2">{preparedName}</span>
    </div>
  );
  //#endregion
}

export default UserName;

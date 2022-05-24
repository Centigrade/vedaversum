import placeholderAvatarImage from "assets/dummy.png";

export interface UsernameProps {
  email: string;
}

function UserName(props: UsernameProps) {
  const preparedName = props.email.split("@")[0];

  return (
    <div className="flex items-center">
      <img
        className="w-6 rounded-full mr-2"
        src={getAvatarUrl(preparedName)}
        alt="some pic"
      />
      <span className="text-primary mr-2">{preparedName}</span>
    </div>
  );
}

function getAvatarUrl(userName: string) {
  if (userName) {
    return `https://www.centigrade.de/basic/resources/images/team/pixel-avatar-portraits/${userName}.png`;
  } else {
    return placeholderAvatarImage;
  }
}

export default UserName;

export interface UsernameProps {
  email: string;
  profile: string;
}

function UserName(props: UsernameProps) {
  const prepareName = props.email.split("@");
  const name = prepareName[0];
  const firstLetter = name[0].toUpperCase();

  return (
    <div className="user-name p-2 bg-white mx-1">
      <a href={props.profile} className="d-flex align-items-center">
        <span className="user-name-circle px-2 py-1">{firstLetter}</span>
        <span className="mx-2">{name}</span>
      </a>
    </div>
  );
}

export default UserName;

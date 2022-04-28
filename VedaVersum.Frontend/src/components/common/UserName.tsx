import React from "react";

export interface UsernameProps {
  name: string;
  profile: string;
}

function UserName(props: UsernameProps) {
  return (
    <div className="user-name p-2 bg-white mx-1">
      <a href={props.profile} className="d-flex align-items-center">
        <span className="user-name-circle px-2 py-1">{props.name[0].toUpperCase()}</span>
        <span className="mx-2">{props.name}</span>
      </a>
    </div>
  );
}

export default UserName;

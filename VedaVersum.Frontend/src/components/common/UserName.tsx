import React from "react";

export interface UsernameProps {
  name: string;
  profile: string;
}

function UserName(props: UsernameProps) {
  return (
    <div className="user-name p-2 w-25">
      <a href={props.profile} className="d-flex justify-content-between">
        <span className="user-name-circle px-2 py-1">{props.name[0].toUpperCase()}</span>
        <span className="">{props.name}</span>
      </a>
    </div>
  );
}

export default UserName;

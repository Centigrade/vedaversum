import React from "react";
import UserName from "./UserName";
import dummyIcon from "../../assets/dummy.png";
import { readAuthContextFromLocalStorage } from "../../authentication/AutContext";

function Header() {
  const loginData = readAuthContextFromLocalStorage();

  console.log(loginData);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark header">
      <div className="container-fluid px-4 py-3 d-flex justify-space-between">
        <h1 className="text-white">Veda Versum</h1>
        <input type="text" placeholder="Search.." />
        <div className="d-flex align-items-center">
          {/* notification icon for new assignments */}
          <img className="notification-icon" src={dummyIcon} alt="some pic" />
          {/* number of new assignments */}
          <h5 className="mr-2">2</h5>
          {/* show logged in as + username */}
          {loginData && loginData.user && (
            <UserName
              name={loginData.user.userName}
              profile={loginData.user.webProfileUrl}
            />
          )}
          <button className="veda-versum-button mx-2">Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Header;

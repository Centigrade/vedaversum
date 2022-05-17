import dummyIcon from "assets/dummy.png";
import logoWithName from "assets/logoWithName.svg";
import { Link } from "react-router-dom";
// import { readAuthContextFromLocalStorage } from "../../authentication/AutContext";
import CreateArticle from "views/components/CreateArticle";
import PopUpModal from "views/components/PopUpModal";

function Header() {
  // const loginData = readAuthContextFromLocalStorage();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark header">
      <div className="container-fluid px-4 py-3 d-flex justify-space-between">
        <Link to="/">
          {/* <h1 className="text-white">Veda Versum</h1> */}
          <img src={logoWithName} alt="VedaVersum Logo" />
        </Link>
        <div className="d-flex align-items-center">
          {/* search bar */}
          <input type="text" placeholder="Search.." />
          {/* create new article button */}
          <PopUpModal show={CreateArticle} openModalText="Start writing" />
          {/* avatar image */}
          <img className="notification-icon" src={dummyIcon} alt="some pic" />

          {/* show logged in as + username */}
          {/* {loginData && loginData.user && (
            <UserName
              email={loginData.user.email}
              profile={loginData.user.webProfileUrl}
            />
          )} */}
        </div>
      </div>
    </nav>
  );
}

export default Header;

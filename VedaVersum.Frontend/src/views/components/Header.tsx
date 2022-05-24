import dummyIcon from "assets/dummy.png";
import logoWithName from "assets/logoWithName.svg";
import { Link } from "react-router-dom";
// import { readAuthContextFromLocalStorage } from "../../authentication/AutContext";
import CreateArticle from "views/components/CreateArticle";
import PopUpModal from "views/components/PopUpModal";

function Header() {
  // const loginData = readAuthContextFromLocalStorage();

  return (
    <nav className="bg-gray-800 header flex">
      <div className="w-full px-4 py-4 flex justify-between items-center">
        <Link to="/">
          {/* <h1 className="text-white">Veda Versum</h1> */}
          <img src={logoWithName} alt="VedaVersum Logo" />
        </Link>
        <div className="flex items-center justify-end">
          {/* search bar */}
          <input
            type="text"
            placeholder="Search.."
            className="rounded py-2 px-2 mr-3"
          />
          {/* create new article button */}
          <PopUpModal show={CreateArticle} openModalText="Start writing" />
          {/* avatar image */}
          <img
            className="ml-3 w-1/12 rounded-full"
            src={dummyIcon}
            alt="some pic"
          />

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

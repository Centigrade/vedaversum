import React from "react";
import dummyUsersList from "../../assets/dummyUsersList";
import UserName from "./UserName";
// not yet implemented in the backend => see VedaVersumQuery.cs
/* import { useQuery } from "@apollo/client";
import { PERSONAL_USER_DATA } from '../../api/users-queries';
import { GetPersonalUserData } from '../../model/get-personal-user-data'; */

function Header() {
  /* const { error, data, loading } = useQuery<GetPersonalUserData>(
    PERSONAL_USER_DATA,
    {
      errorPolicy: "all",
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message} :(</p>;

  if (!data) return <p>Data is empty</p>;

  console.log(data.personalUser); */

  const mockData = {
    personalUser: dummyUsersList[0]
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid px-4 py-3 d-flex justify-space-between">
        <h1 className="text-white">Veda Versum</h1>
        <input type="text" placeholder="Search.." />
        <div className="d-flex">
          <UserName
            name={mockData.personalUser.userName}
            profile={mockData.personalUser.webProfileUrl}
          />
          <button className="veda-versum-button mx-2">Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Header;

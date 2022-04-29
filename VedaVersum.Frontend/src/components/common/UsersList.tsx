import React from "react";
import { useQuery } from "@apollo/client";
import { ACTIVE_USERS_QUERY } from "../../api/users-queries";
import { GetActiveUsers } from "../../model/get-active-users-response";
import UserName from "./UserName";

function UsersList() {
   const { error, data, loading } = useQuery<GetActiveUsers>(
    ACTIVE_USERS_QUERY,
    {
      errorPolicy: "all",
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message} :(</p>;

  if (!data) return <p>Data is empty</p>;

  console.log(data);

  return (
    <div className="p-4 w-25">
      <h6 className="mb-3">Users currently online:</h6>
      <div>
        {data.activeUsers.map((user) => (
          <div className="mt-2" key={user.id}>
            <UserName name={user.userName} profile={user.webProfileUrl} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersList;

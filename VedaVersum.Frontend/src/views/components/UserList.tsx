import { useQuery } from '@apollo/client';
import { ACTIVE_USERS_QUERY } from 'api/user-queries';
import { GetActiveUsers } from 'model/response-types';
import UserName from 'views/components/UserName';

function UsersList() {
  // get data from server
  const { error, data, loading } = useQuery<GetActiveUsers>(ACTIVE_USERS_QUERY, {
    errorPolicy: 'all',
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message} :</p>;
  if (!data) return <p>Data is empty</p>;

  //#region render component
  return (
    <div>
      <h2 className="mt-8 text-subhead font-semibold">People online</h2>
      <div>
        {data.activeUsers.map(user => (
          <div className="mt-2" key={user.id}>
            <UserName email={user.email} />
          </div>
        ))}
      </div>
    </div>
  );
}
//#endregion
export default UsersList;

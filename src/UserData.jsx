import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserName from "./UserName";

function UserData() {
  useNavigate();

  const [users, setUsers] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(true);

  const getData = async () => {
    try {
      const userdata = await axios.get(
        "https://664af140a300e8795d438505.mockapi.io/data/users"
      );
      return userdata.data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    async function getAllUsers() {
      try {
        const allUsers = await getData();
        setUsers(allUsers);
        setLoadingStatus(false);
      } catch (error) {
        console.log(`Failed to fetch users ${error} `);
        setLoadingStatus(false);
      }
    }
    getAllUsers();
  }, []);

  if (loadingStatus) {
    return <div>loading...</div>;
  }
  return (
    <>
      <div className="container">
        <div className="row mx-auto" style={{ width: 500 }}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">User Name</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return <UserName key={user.id} user={user} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default UserData;

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function User({ setEditUser }) {
  const [users, setUsers] = useState({});
  const { userId } = useParams();
  const parsedUserId = parseInt(userId, 10);
  const [loading, setLoading] = useState(true);
  const navigateToUsers = useNavigate();
  const navigateToEditUser = useNavigate();

  const handleUserDelete = async (userId) => {
    try {
      const response = await axios.delete(
        `https://664af140a300e8795d438505.mockapi.io/data/users/${userId}`
      );

      setTimeout(() => {
        alert(response.data.message);
      }, 100);
      navigateToUsers("/userdata");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserEdit = (userData) => {
    setEditUser(userData);

    navigateToEditUser(`/user/edit/${userData.id}`);
  };

  if (isNaN(parsedUserId)) {
    return <div>Invalid user ID: {userId}</div>;
  }

  const getData = async (userId) => {
    try {
      const userdata = await axios.get(
        `https://664af140a300e8795d438505.mockapi.io/data/users/${userId}`
      );
      return userdata.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getData(parsedUserId);
        console.log(userData);
        setUsers(userData);
        setLoading(false);
      } catch (error) {
        console.log(`Failed to fetch user ${error}`);
        setLoading(false);
      }
    }
    fetchData();
  }, [parsedUserId]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="containter-md-12 container-sm-6">
      <div className="row justify-content-center mt-4">
        <div className="col-md-8">
          <div className="table-responsive">
            <table className="table  align-middle table-striped caption-top">
              <thead>
                <tr>
                  <th scope="col" colSpan={2}>
                    <h4>User Information</h4>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Fullname</td>
                  <td>{users.name}</td>
                </tr>
                <tr>
                  <td>User ID</td>
                  <td>{users.id}</td>
                </tr>

                <tr>
                  <td>Username</td>
                  <td>{users.username}</td>
                </tr>

                <tr>
                  <td>Email</td>
                  <td>{users.email}</td>
                </tr>

                <tr>
                  <td>Address</td>
                  <td>{users.address.street}</td>
                </tr>
                <tr>
                  <td></td>
                  <td>{users.address.suite}</td>
                </tr>

                <tr>
                  <td></td>
                  <td>{users.address.city}</td>
                </tr>

                <tr>
                  <td></td>
                  <td>{users.address.zipcode}</td>
                </tr>

                <tr>
                  <td></td>
                  <td>
                    Lat:{users.address.geo.lat} , Lng:{users.address.geo.lng}
                  </td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>{users.phone}</td>
                </tr>

                <tr>
                  <td>Website</td>
                  <td>{users.website}</td>
                </tr>

                <tr>
                  <td>Company Name</td>
                  <td>{users.company.name}</td>
                </tr>

                <tr>
                  <td>Company Catch Phrase</td>
                  <td>{users.company.catchPhrase}</td>
                </tr>

                <tr>
                  <td>Company Bussiness Strategy (BS)</td>
                  <td>{users.company.bs}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2}>
                    <div className="d-flex gap-2 justify-content-center">
                      <button
                        onClick={() => {
                          handleUserEdit(users);
                        }}
                        className="btn btn-primary"
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleUserDelete(userId);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;

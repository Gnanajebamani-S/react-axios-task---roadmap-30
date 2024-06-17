// import { Link } from "react-router-dom";

import { Link } from "react-router-dom";

function UserName({ user }) {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>
        <button className="btn btn-info">
          <Link to={`/user/${user.id}`}>Click here</Link>
        </button>
      </td>
    </tr>
  );
}

export default UserName;

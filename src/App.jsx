import "bootstrap/dist/css/bootstrap.css";
import Home from "./Home";
import UserData from "./UserData";
import { Routes, Route, useLocation } from "react-router-dom";
import User from "./User";
import CreateUser from "./CreateUser";
import { useEffect, useState } from "react";
function App() {
  const userInfo = {
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suit: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: "",
    company: {
      name: "",
      companyphrase: "",
      bs: "",
    },
  };

  const [edituser, setEditUser] = useState(userInfo);
  const location = useLocation();

  useEffect(() => {
    console.log("current Path : ", location.pathname);
    if (["/userdata", "/CreateUser", "/"].includes(location.pathname))
      setEditUser(userInfo);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/userdata" element={<UserData />} />
      <Route path="/CreateUser" element={<CreateUser editUser={edituser} />} />
      <Route
        path="/user/:userId"
        element={<User setEditUser={setEditUser} />}
      />
      <Route
        path="/user/edit/:userId"
        element={
          <CreateUser
            editUser={edituser}
            userInfo={userInfo}
            setEditUser={setEditUser}
          />
        }
      />
    </Routes>
  );
}

export default App;

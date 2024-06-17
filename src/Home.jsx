import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div
        className="cover-container"
        style={{ width: "100vw", height: "100vh" }}
      >
        <div className="text-white bg-dark cover-container d-flex h-100 p-3 mx-auto flex-column">
          <div className="inner cover text-center mt-5">
            <h1 className="cover-heading ">USER DATA</h1>
            <p className="lead">
              Welcome to our Axios user data fetching application! We are
              excited to have you on board. With our app, you can effortlessly
              retrieve user information from an external API and display it
              right on your screen.
            </p>
            <p className="lead">
              <Link to={"/userdata"} className="btn btn-lg btn-secondary">
                Get Data
              </Link>
            </p>
            <p className="lead">
              <Link to={"/CreateUser"} className="btn btn-lg btn-secondary">
                Create New User
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

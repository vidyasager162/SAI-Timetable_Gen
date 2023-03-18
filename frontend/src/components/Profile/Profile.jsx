import React from "react";

function Profile(props) {
  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 3,
        width: "100%",
      }}
    />
  );

  return (
    <div className="container-fluid p-0">
      <div className="row main-container">
        <div className="col">
          <div
            className="d-flex flex-column flex-shrink-0 p-3 bg-light align-items-center rounded profile-sidebar"
            style={{ width: "40%" }}
          >
            <div className="card text-center">
              <img
                src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{props.User.name}</h5>
              </div>
              <ul className="list-group list-group-flush">
                <li>{props.User.department}</li>
              </ul>
            </div>
          </div>
          <div className="row py-2 mybtn text-center profile-button">
            <button className="btn btn-outline-primary">Edit User</button>
          </div>
          <div className="row py-2 mybtn text-center profile-button">
            <button className="btn btn-outline-danger">Delete User</button>
          </div>
        </div>
        <div className="col my-col profile-info-container">
          <div
            className="d-flex flex-column flex-shrink-0 p-3 bg-light rounded profile-info-inner"
            style={{ width: "100%" }}
          >
            <div className="text-center mt-3">
              <h3>Profile</h3>
            </div>
            <div className="profile-info-inner m-5">
              {" "}
              <h5>
                Username: <span>{props.User.username}</span>
              </h5>
              <ColoredLine color="gray" />
              <h5>
                Password: <span>{props.User.password}</span>
              </h5>
              <ColoredLine color="gray" />
              <h5>
                Email: <span>{props.User.email}</span>
              </h5>
              <ColoredLine color="gray" />
              {props.User.usertype === 2 ? (
                <>
                  <h5>
                    Course: <span>{props.User.course}</span>
                  </h5>
                </>
              ) : (
                <>
                  <h5>
                    Courses Taught: <span>{props.User.coursesTaught + ""}</span>
                  </h5>
                </>
              )}
              <ColoredLine color="gray" />
              {props.User.usertype === 2 ? (
                <>
                  <h5>
                    Subjects: <span>{props.User.subjects}</span>
                  </h5>
                </>
              ) : (
                <>
                  <h5>
                    Courses Taught:{" "}
                    <span>{props.User.subjectsTaught + ""}</span>
                  </h5>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

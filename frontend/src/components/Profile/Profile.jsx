import React from "react";

function Profile() {
  return (
    <div className="container-fluid p-0">
      <div className="row main-container">
        <div className="col">
          <div className="row">
            <div className="card profile-card-container">
              <img
                src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Name</h5>
              </div>
              <ul className="list-group list-group-flush">
                <li>Department</li>
                <li>Qualifications</li>
              </ul>
            </div>
            <div className="row">
              <h3>Edit User</h3>
            </div>
            <div className="row">
              <h3>Delete User</h3>
            </div>
          </div>
        </div>
        <div className="col my-col">
          <div>
            <h3>Email</h3>
            <h4>Phone</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

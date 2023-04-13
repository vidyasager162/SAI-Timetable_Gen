import React, { useEffect, useState } from "react";
import UserCard from "../Templates/UserCard";
import UserModal from "../Templates/UserModal";
import FormActions from "../Templates/FormActions";
import DefaultInput from "../Templates/DefaultInput";

function Profile(props) {
  const [isEdit, setIsEdit] = useState(false);
  //eslint-disable-next-line
  const [message, setMessage] = useState("");
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

  useEffect(() => {}, [message]);

  function editUser(user_id, event) {
    event.preventDefault();
    const payload = new FormData(event.currentTarget);
    const reqPayload = {
      username: user_id,
      new_password: payload.get("new_password"),
    };
    fetch("http://192.168.34.129:8000/edit-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(reqPayload),
    })
      .then((res) => res.json())
      .then((payload) => {
        if (payload.message === "success") {
          setMessage(payload.message);
          setIsEdit(false);
        }
      });
  }

  function editDetails(user_id, event) {
    event.preventDefault();
    const payload = new FormData(event.currentTarget);
    const reqPayload = {
      old_username: user_id,
      new_username: payload.get("username"),
      new_password: payload.get("password"),
      new_email: payload.get("emailid"),
      new_course: payload.get("course"),
      new_subject: payload.get("subjects"),
    };
    fetch("http://192.168.34.129:8000/edit-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(reqPayload),
    })
      .then((res) => res.json())
      .then((payload) => {
        if (payload.message === "success") {
          setMessage(payload.message);
          setIsEdit(false);
        }
      });
  }

  function deleteUser(user_id) {
    fetch("http://192.168.34.129:8000/delete-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        user_id: user_id,
      }),
    })
      .then((res) => res.json())
      .then((payload) => {
        console.log(payload);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
    if (user_id === props.Admin.username) {
      props.logOut();
    } else {
      props.setIsProfile(false);
      props.setViewProfile(false);
    }
  }

  return (
    <div className="container-fluid p-0">
      <div className="row main-container">
        <div className="col">
          <div
            className="d-flex flex-column flex-shrink-0 p-3 bg-light align-items-center rounded profile-sidebar"
            style={{ width: "40%" }}
          >
            <UserCard
              src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg"
              name={props.User.name}
              department={props.User.department}
              isProfile="true"
            />
          </div>
          <div className="row py-1 mybtn text-center profile-button">
            {props.Admin.usertype === 9 || props.Admin.usertype === 0 ? (
              <button
                className="btn btn-outline-primary"
                name={props.User.username}
                onClick={() => {
                  setIsEdit(true);
                }}
              >
                Edit User
              </button>
            ) : (
              <>
                <button
                  className="btn btn-outline-primary"
                  name={props.User.username}
                  data-bs-toggle="modal"
                  data-bs-target="#userModal"
                >
                  Edit User
                </button>
                <UserModal
                  modalID="userModal"
                  name={props.User.username}
                  description={props.User.password}
                  action={editUser}
                  title="User"
                  fplaceholder="Enter New Password"
                  fname="new_password"
                  lplaceholder="Confirm New Password"
                  lname="re_new_password"
                  id={props.User.username}
                />
              </>
            )}
          </div>
          {props.Admin.usertype === 9 || props.Admin.usertype === 0 ? (
            <div className="row pb-1 mybtn text-center profile-button">
              <button
                className="btn btn-outline-danger"
                name={props.User.username}
                onClick={(e) => {
                  deleteUser(e.target.name);
                  props.setIsProfile(false);
                  props.setViewProfile(false);
                }}
              >
                Delete User
              </button>
            </div>
          ) : (
            <span></span>
          )}
          <div className="row pb-1 mybtn text-center profile-button">
            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                props.setIsProfile(false);
                props.setViewProfile(false);
              }}
            >
              Back
            </button>
          </div>
        </div>
        <div className="col my-col profile-info-container">
          {isEdit ? (
            <div
              className="d-flex flex-column flex-shrink-0 p-3 bg-light rounded profile-info-inner"
              style={{ width: "100%" }}
            >
              <form
                onSubmit={(e) => {
                  editDetails(props.User.username, e);
                }}
                method="POST"
              >
                <div className="text-center mt-3">
                  <h3>Edit Profile</h3>
                </div>
                <div className="profile-info-inner m-5">
                  {" "}
                  <DefaultInput
                    type="text"
                    placeholder="Username"
                    name="username"
                    default={props.User.username}
                  />
                  <DefaultInput
                    type="password"
                    placeholder="Password"
                    name="password"
                    default={props.User.password}
                  />
                  <DefaultInput
                    type="email"
                    placeholder="Email ID"
                    name="emailid"
                    default={props.User.email}
                  />
                  {props.User.usertype === 2 ? (
                    <>
                      <DefaultInput
                        type="text"
                        placeholder="Course"
                        name="course"
                        default={props.User.course}
                      />
                    </>
                  ) : (
                    <>
                      <DefaultInput
                        type="text"
                        placeholder="Courses Taught"
                        name="course"
                        default={props.User.coursesTaught}
                      />
                    </>
                  )}
                  {props.User.usertype === 2 ? (
                    <>
                      <DefaultInput
                        type="text"
                        placeholder="Subjects"
                        name="subjects"
                        default={props.User.subjects}
                      />
                    </>
                  ) : (
                    <>
                      <DefaultInput
                        type="text"
                        placeholder="Subjects Taught"
                        name="subjects"
                        default={props.User.subjectsTaught}
                      />
                    </>
                  )}
                  <FormActions action={setIsEdit} />
                </div>
              </form>
            </div>
          ) : (
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
                  Password: <span>******</span>
                </h5>
                <ColoredLine color="gray" />
                <h5>
                  Email: <span>{props.User.email}</span>
                </h5>
                <ColoredLine color="gray" />
                {props.User.usertype === 2 ? (
                  <>
                    <h5>
                      Course: <span>{props.User.course + ""}</span>
                    </h5>
                  </>
                ) : (
                  <>
                    <h5>
                      Courses Taught:{" "}
                      <span>{props.User.coursesTaught + ""}</span>
                    </h5>
                  </>
                )}
                <ColoredLine color="gray" />
                {props.User.usertype === 2 ? (
                  <>
                    <h5>
                      Subjects: <span>{props.User.subjects + ""}</span>
                    </h5>
                  </>
                ) : (
                  <>
                    <h5>
                      Subjects Taught:{" "}
                      <span>{props.User.subjectsTaught + ""}</span>
                    </h5>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;

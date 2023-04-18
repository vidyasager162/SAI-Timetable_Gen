import React, { useState } from "react";
import ConfirmModal from "./Templates/ConfirmModal";

function Header(props) {
  const now = new Date().toLocaleTimeString();
  const nowRef = new Date().getHours();

  const [time, setTime] = useState(now);
  const [refTime, setRefTime] = useState(nowRef);

  function updateTime() {
    const newRefTime = new Date().getHours();
    const newTime = new Date().toLocaleTimeString();
    setTime(newTime);
    setRefTime(newRefTime);
  }

  setInterval(updateTime, 1000);
  const day = new Date().toDateString();
  let greeting = "";

  props.isLoggedIn
    ? refTime >= 0 && refTime < 12
      ? (greeting = "Good Morning, " + props.User.name)
      : refTime >= 12 && refTime < 16
      ? (greeting = "Good Afternoon, " + props.User.name)
      : refTime >= 16 && refTime < 20
      ? (greeting = "Good Evening, " + props.User.name)
      : refTime >= 20 && refTime < 0
      ? (greeting = "Good Night, " + props.User.name)
      : (greeting = "Good Day, " + props.User.name)
    : (greeting = "Welcome");

  return props.isLoggedIn ? (
    <div className="nav-container">
      <div className="container-fluid">
        <div className="row">
          <div className="col datetime">
            <table>
              <tbody>
                <tr>
                  <td>
                    <h5>{time}</h5>
                  </td>
                  <td>
                    <h5>{day}</h5>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col greeting-part dropdown">
            <button
              className="btn btn-lg btn-transparent drowpdown-toggle mb-8 p-0 greeting"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {greeting}
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => {
                    props.invertIsViewProfile();
                    props.setIsProfile(false);
                    props.setIsLog(false);
                  }}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => {
                    props.invertIsProfile();
                  }}
                >
                  Profile
                </button>
              </li>
              {props.User.usertype === 9 || props.User.usertype === 0 ? (
                <>
                  <li>
                    <>
                      <button
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#confirmModal"
                      >
                        Master Reset
                      </button>
                      <ConfirmModal
                        modalID="confirmModal"
                        placeholder="Enter Password"
                        title="Please enter your password to continue"
                        action={props.appFlush}
                        response={props.response}
                      />
                    </>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => {
                        props.setIsLog(true);
                      }}
                    >
                      Logs
                    </button>
                  </li>
                </>
              ) : null}
              <li>
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={props.logOut}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="nav-container">
      <div className="container-fluid">
        <div className="row">
          <div className="col datetime">
            <table>
              <tbody>
                <tr>
                  <td>
                    <h5>{time}</h5>
                  </td>
                  <td>
                    <h5>{day}</h5>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col greeting-part">
            <h5>{greeting}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

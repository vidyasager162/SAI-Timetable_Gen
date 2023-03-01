import React, { useState } from "react";

function Header(props) {
  const now = new Date().toLocaleTimeString();

  const [time, setTime] = useState(now);

  function updateTime() {
    const newTime = new Date().toLocaleTimeString();
    setTime(newTime);
  }
  setInterval(updateTime, 1000);
  const day = new Date().toDateString();
  let greeting = "";

  props.isLoggedIn
    ? (greeting = "Good Morning, " + props.User.firstname)
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
                <button type="button" className="dropdown-item">
                  Profile
                </button>
              </li>
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
        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button> */}
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
        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button> */}
      </div>
    </div>
  );
}

export default Header;

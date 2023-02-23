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
  let greeting = " ";

  props.isLoggedIn
    ? (greeting = "Good Morning, Stranger")
    : (greeting = "Welcome");
  return (
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

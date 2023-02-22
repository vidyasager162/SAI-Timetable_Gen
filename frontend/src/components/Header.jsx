import React from "react";
import Time from "./Time";
import Day from "./Day";
import Greeting from "./Greeting";

function Header() {
  return (
    <div className="nav-container">
      <div className="container-fluid">
        <div className="row">
          <div className="col datetime">
            <td>
              <Time />
            </td>
            <td>
              <Day />
            </td>
          </div>
          <div className="col greeting-part">
            <Greeting />
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

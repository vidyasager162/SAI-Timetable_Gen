import React, { useState } from "react";
import SideBar from "./SideBar";
import User from "./User";
import Schedule from "./Schedule";
import Schedules from "./Schedules";

function Main(props) {
  const [buttonClicked, setButtonClicked] = useState("");

  function handleButtonClick(event) {
    setButtonClicked(event.target.value);
    console.log(buttonClicked);
  }

  return props.isAdmin ? (
    <div className="container-fluid p-0">
      <div className="row main-container">
        <div className="col">
          <SideBar isAdmin={props.isAdmin} />
        </div>
        <div className="col my-col">
          <div className="row h-100 align-items-center">
            {props.buttonClicked === "tschedules" ? (
              <div className="col schedulebtn">
                <Schedules />
              </div>
            ) : props.buttonClicked === "sschedules" ? (
              <div className="col schedulebtn">
                <Schedules />
              </div>
            ) : (
              <Schedule handleButtonClick={handleButtonClick} />
            )}
          </div>
          {/* <div className="row row-cols-1 row-cols-md-3 g-4 align-items-center">
            <User />
          </div> */}
        </div>
      </div>
    </div>
  ) : props.isTeacher ? (
    <h1>In teacher</h1>
  ) : props.isStudent ? (
    <h1>In Student</h1>
  ) : null;
}

export default Main;

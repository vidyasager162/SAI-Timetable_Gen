import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import User from "./User";
import Schedule from "./Schedule";
import Schedules from "./Schedules";

function Main(props) {
  const [buttonClicked, setButtonClicked] = useState("");
  const [clicked, setClicked] = useState("");

  useEffect(() => {});

  function handleButtonClick(event) {
    setButtonClicked(event.target.value);
  }

  function handleClick(event) {
    setClicked(event.target.value);
  }

  return props.isAdmin ? (
    <div className="container-fluid p-0">
      <div className="row main-container">
        <div className="col">
          <SideBar handleClick={handleClick} />
        </div>
        <div className="col my-col">
          <div className="row h-100 align-items-center">
            {props.clicked === "Schedules" ? (
              <Schedule handleButtonClick={handleButtonClick} />
            ) : props.clicked === "Teachers" ? (
              <User />
            ) : props.clicked === "Students" ? (
              <User />
            ) : props.clicked === "Courses" ? (
              <div className="col">
                <h1>In courses</h1>
              </div>
            ) : (
              <Schedule handleButtonClick={handleButtonClick} />
            )}
            {/* {props.buttonClicked === "tschedules" ? (
              <div className="col schedulebtn">
                <Schedules />
              </div>
            ) : props.buttonClicked === "sschedules" ? (
              <div className="col schedulebtn">
                <Schedules />
              </div> */}
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
    <h1>In student</h1>
  ) : null;
}

export default Main;

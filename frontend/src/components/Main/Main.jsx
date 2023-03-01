import React, { useState } from "react";
import SideBar from "./SideBar";
import User from "../User/User";
import Schedule from "../Schedule/Schedule";
import Course from "../Course/Course";

function Main(props) {
  const [clicked, setClicked] = useState("");

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
          <div className="row row-cols-1 row-cols-md-3 g-4 h-100 align-items-center">
            {clicked === "Schedules" ? (
              <Schedule />
            ) : clicked === "Teachers" ? (
              <User />
            ) : clicked === "Students" ? (
              <User />
            ) : clicked === "Courses" ? (
              <Course />
            ) : clicked === "Back" ? (
              <h3 className="text-muted">SAITimetableGen</h3>
            ) : (
              <h3 className="text-muted">SAITimetableGen</h3>
            )}
          </div>
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

import React from "react";

function SideBar(props) {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light align-items-center rounded sidebar"
      style={{ width: "60%", height: "482px" }}
    >
      <div className="sidebar-buttons">
        <button
          type="button"
          className="btn btn-light"
          value="Schedules"
          onClick={props.handleClick}
        >
          Schedules
        </button>
        <button
          type="button"
          className="btn btn-light"
          value="Teachers"
          onClick={props.handleClick}
        >
          Teachers
        </button>
        <button
          type="button"
          className="btn btn-light"
          value="Students"
          onClick={props.handleClick}
        >
          Students
        </button>
        <button
          type="button"
          className="btn btn-light"
          value="Courses"
          onClick={props.handleClick}
        >
          Courses
        </button>
        <button
          type="button"
          className="btn btn-light"
          value="Back"
          onClick={props.handleClick}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default SideBar;

import React from "react";

function SideBar(props) {
  return props.clicked === "Schedules" ? (
    props.buttonClicked === "tschedules" ||
    props.buttonClicked === "sschedules" ? (
      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-light align-items-center rounded sidebar"
        style={{ width: "60%", height: "482px" }}
      >
        <div className="sidebar-buttons">
          <button
            type="button"
            className="btn btn-light"
            name="Create Schedule"
            onClick={props.handleClick}
          >
            Create Schedule
          </button>
          <button
            type="button"
            className="btn btn-light"
            name="Back"
            onClick={(props.handleClick, props.handleBack)}
          >
            Back
          </button>
        </div>
      </div>
    ) : (
      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-light align-items-center rounded sidebar"
        style={{ width: "60%", height: "482px" }}
      >
        <div className="sidebar-buttons">
          <button
            type="button"
            className="btn btn-light"
            name="Schedules"
            onClick={props.handleClick}
          >
            Schedules
          </button>
          <button
            type="button"
            className="btn btn-light"
            name="Teachers"
            onClick={props.handleClick}
          >
            Teachers
          </button>
          <button
            type="button"
            className="btn btn-light"
            name="Students"
            onClick={props.handleClick}
          >
            Students
          </button>
          <button
            type="button"
            className="btn btn-light"
            name="Courses"
            onClick={props.handleClick}
          >
            Courses
          </button>
          <button
            type="button"
            className="btn btn-light"
            name="Back"
            onClick={(props.handleClick, props.handleBack)}
          >
            Back
          </button>
        </div>
      </div>
    )
  ) : props.clicked === "Students" ? (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light align-items-center rounded sidebar"
      style={{ width: "60%", height: "482px" }}
    >
      <div className="sidebar-buttons">
        <button
          type="button"
          className="btn btn-light"
          name="Add Student"
          onClick={props.handleClick}
        >
          Add Student
        </button>
        <button
          type="button"
          className="btn btn-light"
          name="Back"
          onClick={(props.handleClick, props.handleBack, props.handleUserBack)}
        >
          Back
        </button>
      </div>
    </div>
  ) : props.clicked === "Teachers" ? (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light align-items-center rounded sidebar"
      style={{ width: "60%", height: "482px" }}
    >
      <div className="sidebar-buttons">
        <button
          type="button"
          className="btn btn-light"
          name="Add Teacher"
          onClick={props.handleClick}
        >
          Add Teacher
        </button>
        <button
          type="button"
          className="btn btn-light"
          name="Back"
          onClick={(props.handleClick, props.handleBack, props.handleUserBack)}
        >
          Back
        </button>
      </div>
    </div>
  ) : props.clicked === "Courses" ? (
    props.buttonClicked === "dmc" || props.buttonClicked === "dmacs" ? (
      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-light align-items-center rounded sidebar"
        style={{ width: "60%", height: "482px" }}
      >
        <div className="sidebar-buttons">
          <button
            type="button"
            className="btn btn-light"
            name="Add Course"
            onClick={props.handleAddCourse}
          >
            Add Course
          </button>
          <button
            type="button"
            className="btn btn-light"
            name="Back"
            onClick={(props.handleClick, props.handleBack)}
          >
            Back
          </button>
        </div>
      </div>
    ) : (
      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-light align-items-center rounded sidebar"
        style={{ width: "60%", height: "482px" }}
      >
        <div className="sidebar-buttons">
          <button
            type="button"
            className="btn btn-light"
            name="Schedules"
            onClick={props.handleClick}
          >
            Schedules
          </button>
          <button
            type="button"
            className="btn btn-light"
            name="Teachers"
            onClick={props.handleClick}
          >
            Teachers
          </button>
          <button
            type="button"
            className="btn btn-light"
            name="Students"
            onClick={props.handleClick}
          >
            Students
          </button>
          <button
            type="button"
            className="btn btn-light"
            name="Courses"
            onClick={props.handleClick}
          >
            Courses
          </button>
          <button
            type="button"
            className="btn btn-light"
            name="Back"
            onClick={(props.handleClick, props.handleBack)}
          >
            Back
          </button>
        </div>
      </div>
    )
  ) : (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light align-items-center rounded sidebar"
      style={{ width: "60%", height: "482px" }}
    >
      <div className="sidebar-buttons">
        <button
          type="button"
          className="btn btn-light"
          name="Schedules"
          onClick={props.handleClick}
        >
          Schedules
        </button>
        <button
          type="button"
          className="btn btn-light"
          name="Teachers"
          onClick={props.handleClick}
        >
          Teachers
        </button>
        <button
          type="button"
          className="btn btn-light"
          name="Students"
          onClick={props.handleClick}
        >
          Students
        </button>
        <button
          type="button"
          className="btn btn-light"
          name="Courses"
          onClick={props.handleClick}
        >
          Courses
        </button>
        <button
          type="button"
          className="btn btn-light"
          name="Back"
          onClick={(props.handleClick, props.handleBack)}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default SideBar;

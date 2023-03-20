import React from "react";

function SideBar(props) {
  return props.clicked === "Schedules" ? (
    props.buttonClicked === "tschedules" ? (
      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-light align-items-center rounded sidebar"
        style={{ width: "60%", height: "482px" }}
      >
        <div className="sidebar-buttons">
          <button
            type="button"
            className="btn btn-light"
            name="Create Schedule"
            onClick={() => {
              props.setIsCreateSchedule(true);
            }}
          >
            Create Schedule
          </button>
          <button
            type="button"
            className="btn btn-light"
            name="Back"
            onClick={() => {
              props.setButtonClicked("");
            }}
          >
            Back
          </button>
        </div>
      </div>
    ) : props.buttonClicked === "sschedules" ? (
      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-light align-items-center rounded sidebar"
        style={{ width: "60%", height: "482px" }}
      >
        <div className="sidebar-buttons">
          <button
            type="button"
            className="btn btn-light"
            name="Back"
            onClick={() => {
              props.setButtonClicked("");
            }}
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
            name="Subjects"
            onClick={props.handleClick}
          >
            Subjects
          </button>
          <button
            type="button"
            className="btn btn-light"
            name="Back"
            onClick={() => {
              props.setButtonClicked("");
            }}
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
          onClick={() => {
            props.setIsAddStudent(true);
          }}
        >
          Add Student
        </button>
        <button
          type="button"
          className="btn btn-light"
          name="Back"
          onClick={() => {
            props.setClicked("");
          }}
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
          onClick={() => {
            props.setIsAddTeacher(true);
          }}
        >
          Add Teacher
        </button>
        <button
          type="button"
          className="btn btn-light"
          name="Back"
          onClick={() => {
            props.setClicked("");
          }}
        >
          Back
        </button>
      </div>
    </div>
  ) : props.clicked === "Courses" ? (
    props.buttonClicked !== "" ? (
      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-light align-items-center rounded sidebar"
        style={{ width: "60%", height: "482px" }}
      >
        <div className="sidebar-buttons">
          <button
            type="button"
            className="btn btn-light"
            name="Add Course"
            onClick={() => {
              props.setIsAddCourse(true);
            }}
          >
            Add Course
          </button>
          <button
            type="button"
            className="btn btn-light"
            name="Back"
            onClick={() => {
              props.setButtonClicked("");
            }}
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
            name="Add Department"
            onClick={() => {
              props.setIsAddDepartment(true);
            }}
          >
            Add Department
          </button>
          <button
            type="button"
            className="btn btn-light"
            name="Back"
            onClick={() => {
              props.setClicked("");
            }}
          >
            Back
          </button>
        </div>
      </div>
    )
  ) : props.clicked === "Subjects" ? (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light align-items-center rounded sidebar"
      style={{ width: "60%", height: "482px" }}
    >
      <div className="sidebar-buttons">
        <button
          type="button"
          className="btn btn-light"
          name="Add Subject"
          onClick={() => {
            props.setIsAddSubject(true);
          }}
        >
          Add Subject
        </button>
        <button
          type="button"
          className="btn btn-light"
          name="Back"
          onClick={() => {
            props.setClicked("");
          }}
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
          name="Subjects"
          onClick={props.handleClick}
        >
          Subjects
        </button>
        <button
          type="button"
          className="btn btn-light"
          name="Back"
          onClick={() => {
            props.setButtonClicked("");
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default SideBar;

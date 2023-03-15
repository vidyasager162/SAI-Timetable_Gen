import React, { useState } from "react";

import SideBar from "./SideBar";
import User from "../User/User";
import Schedule from "../Schedule/Schedule";
import Course from "../Course/Course";
import Subject from "../Subject/Subject";
import AddCourse from "../Form/AddCourse";
import AddDepartment from "../Form/AddDepartment";
import AddTeacher from "../Form/AddTeacher";
import AddStudent from "../Form/AddStudent";
import AddSubject from "../Form/AddSubject";
import CreateSchedule from "../Form/CreateSchedule";
import Teacher from "../Teacher";
import Student from "../Student";

function Main(props) {
  const [clicked, setClicked] = useState("");
  const [buttonClicked, setButtonClicked] = useState("");
  const [isAddDepartment, setIsAddDepartment] = useState(false);
  const [isAddSubject, setIsAddSubject] = useState(false);
  const [isAddCourse, setIsAddCourse] = useState(false);
  const [isAddTeacher, setIsAddTeacher] = useState(false);
  const [isAddStudent, setIsAddStudent] = useState(false);
  const [isCreateSchedule, setIsCreateSchedule] = useState(false);

  const [subjects, setSubjects] = useState([]);
  function getSubjects() {
    fetch("http://192.168.34.129:8000/get-subjects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "902") {
          setSubjects(data.subjects);
          console.log(data.subjects);
        }
      });
  }

  function handleAddDepartment() {
    setIsAddDepartment(true);
  }

  function invertIsAddDepartment() {
    setIsAddDepartment(false);
  }

  function handleAddCourse() {
    setIsAddCourse(true);
  }

  function invertIsAddCourse() {
    setIsAddCourse(false);
  }

  function handleAddSubject() {
    setIsAddSubject(true);
  }

  function invertIsAddSubject() {
    setIsAddSubject(false);
  }

  function handleAddTeacher() {
    setIsAddTeacher(true);
  }

  function invertIsAddTeacher() {
    setIsAddTeacher(false);
  }

  function handleAddStudent() {
    setIsAddStudent(true);
  }

  function invertIsAddStudent() {
    setIsAddStudent(false);
  }

  function handleCreateSchedule() {
    setIsCreateSchedule(true);
  }

  function invertIsCreateSchedule() {
    setIsCreateSchedule(false);
  }

  function handleClick(event) {
    setClicked(event.target.name);
  }

  function handleUserBack() {
    setClicked("");
  }

  function handleButtonClick(event) {
    setButtonClicked(event.target.name);
  }

  function handleBack() {
    setButtonClicked("");
  }

  return props.isAdmin ? (
    isAddCourse ? (
      <div className="container-fluid p-0">
        <div className="row main-container">
          <div className="col my-col">
            <AddCourse invertIsAddCourse={invertIsAddCourse} />
          </div>
        </div>
      </div>
    ) : isAddDepartment ? (
      <div className="container-fluid p-0">
        <div className="row main-container">
          <div className="col my-col">
            <AddDepartment invertIsAddDepartment={invertIsAddDepartment} />
          </div>
        </div>
      </div>
    ) : isAddTeacher ? (
      <div className="container-fluid p-0">
        <div className="row main-container">
          <div className="col my-col">
            <AddTeacher invertIsAddTeacher={invertIsAddTeacher} />
          </div>
        </div>
      </div>
    ) : isAddStudent ? (
      <div className="container-fluid p-0">
        <div className="row main-container">
          <div className="col my-col">
            <AddStudent invertIsAddStudent={invertIsAddStudent} />
          </div>
        </div>
      </div>
    ) : isAddSubject ? (
      <div className="container-fluid p-0">
        <div className="row main-container">
          <div className="col my-col">
            <AddSubject invertIsAddSubject={invertIsAddSubject} />
          </div>
        </div>
      </div>
    ) : isCreateSchedule ? (
      <div className="container-fluid p-0">
        <div className="row main-container">
          <div className="col my-col">
            <CreateSchedule
              invertIsCreateSchedule={invertIsCreateSchedule}
              subjects={subjects}
              getSubjects={getSubjects}
            />
          </div>
        </div>
      </div>
    ) : (
      <div className="container-fluid p-0">
        <div className="row main-container">
          <div className="col">
            <SideBar
              handleClick={handleClick}
              handleBack={handleBack}
              clicked={clicked}
              buttonClicked={buttonClicked}
              handleUserBack={handleUserBack}
              handleAddCourse={handleAddCourse}
              handleAddDepartment={handleAddDepartment}
              handleAddTeacher={handleAddTeacher}
              handleAddStudent={handleAddStudent}
              handleAddSubject={handleAddSubject}
              handleCreateSchedule={handleCreateSchedule}
            />
          </div>
          <div className="col my-col">
            <div className="row row-cols-1 row-cols-md-3 g-4 h-100 align-items-center">
              {clicked === "Schedules" ? (
                <Schedule
                  handleButtonClick={handleButtonClick}
                  buttonClicked={buttonClicked}
                />
              ) : clicked === "Teachers" ? (
                <User clicked={clicked} />
              ) : clicked === "Students" ? (
                <User clicked={clicked} />
              ) : clicked === "Courses" ? (
                <Course
                  handleButtonClick={handleButtonClick}
                  buttonClicked={buttonClicked}
                />
              ) : clicked === "Subjects" ? (
                <Subject subjects={subjects} getSubjects={getSubjects} />
              ) : (
                <h3 className="text-muted">SAITimetable_Gen</h3>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  ) : props.isTeacher ? (
    <Teacher User={props.User} />
  ) : props.isStudent ? (
    <Student User={props.User} />
  ) : null;
}

export default Main;

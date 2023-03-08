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

function Main(props) {
  const [clicked, setClicked] = useState("");
  const [buttonClicked, setButtonClicked] = useState("");
  const [isAddSubject, setIsAddSubject] = useState(false);
  const [isAddCourse, setIsAddCourse] = useState(false);
  const [isAddDepartment, setIsAddDepartment] = useState(false);
  const [isAddTeacher, setIsAddTeacher] = useState(false);
  const [isAddStudent, setIsAddStudent] = useState(false);

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

  function handleAddCourse() {
    setIsAddCourse(true);
  }

  function invertIsAddCourse() {
    setIsAddCourse(false);
  }

  function handleAddDepartment() {
    setIsAddDepartment(true);
  }

  function invertIsAddDepartment() {
    setIsAddDepartment(false);
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

  return props.isAdmin ? (
    isAddCourse ? (
      <div className="container-fluid p-0">
        <div className="row main-container">
          <div className="col my-col">
            <AddCourse
              handleCourseSubmit={props.handleCourseSubmit}
              invertIsAddCourse={invertIsAddCourse}
            />
          </div>
        </div>
      </div>
    ) : isAddDepartment ? (
      <div className="container-fluid p-0">
        <div className="row main-container">
          <div className="col my-col">
            <AddDepartment
              handleDepartmentSubmit={props.handleDepartmentSubmit}
              invertIsAddDepartment={invertIsAddDepartment}
            />
          </div>
        </div>
      </div>
    ) : isAddTeacher ? (
      <div className="container-fluid p-0">
        <div className="row main-container">
          <div className="col my-col">
            <AddTeacher
              handleTeacherSubmit={props.handleTeacherSubmit}
              invertIsAddTeacher={invertIsAddTeacher}
            />
          </div>
        </div>
      </div>
    ) : isAddStudent ? (
      <div className="container-fluid p-0">
        <div className="row main-container">
          <div className="col my-col">
            <AddStudent
              handleStudentSubmit={props.handleStudentSubmit}
              invertIsAddStudent={invertIsAddStudent}
            />
          </div>
        </div>
      </div>
    ) : isAddSubject ? (
      <div className="container-fluid p-0">
        <div className="row main-container">
          <div className="col my-col">
            <AddSubject
              handleSubjectSubmit={props.handleSubjectSubmit}
              invertIsAddSubject={invertIsAddSubject}
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
                <User />
              ) : clicked === "Students" ? (
                <User />
              ) : clicked === "Courses" ? (
                <Course
                  handleButtonClick={handleButtonClick}
                  buttonClicked={buttonClicked}
                  departments={props.departments}
                  getDepartments={props.getDepartments}
                  courses={props.courses}
                  getCourses={props.getCourses}
                />
              ) : clicked === "Subjects" ? (
                <Subject
                  subjects={props.subjects}
                  getSubjects={props.getSubjects}
                />
              ) : (
                <h3 className="text-muted">SAITimetable_Gen</h3>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  ) : props.isTeacher ? (
    <div className="container-fluid p-0">
      <div className="row main-container">
        <div className="col">
          <div className="container timetable-container table-responsive">
            <div className="timetable-inner rounded">
              <table className="table-bordered m-auto">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">1</th>
                    <th scope="col">2</th>
                    <th scope="col">3</th>
                    <th scope="col">4</th>
                    <th scope="col">5</th>
                    <th scope="col">6</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Monday</th>
                    <td>UCSH-601</td>
                    <td>Project</td>
                    <td>UCSH-603</td>
                    <td>UCSH-602</td>
                    <td>UCSH-604</td>
                    <td>UCSH-604</td>
                  </tr>
                  <tr>
                    <th scope="row">Tuesday</th>
                    <td>UCSH-601</td>
                    <td>Project</td>
                    <td>Project</td>
                    <td>UCSH-604</td>
                    <td>UCSH-604</td>
                    <td>UAWR-600</td>
                  </tr>
                  <tr>
                    <th scope="row">Wednesday</th>
                    <td>Project</td>
                    <td>UCSH-603</td>
                    <td>Project</td>
                    <td>Project</td>
                    <td>Project</td>
                    <td>Project</td>
                  </tr>
                  <tr>
                    <th scope="row">Thursday</th>
                    <td>Moral Class</td>
                    <td>UAWR-600</td>
                    <td>UCSH-602</td>
                    <td>UCSH-604</td>
                    <td>UCSH-604</td>
                    <td>UCSH-601</td>
                  </tr>
                  <tr>
                    <th scope="row">Friday</th>
                    <td>UCSH-603</td>
                    <td>UCSH-601</td>
                    <td>Project</td>
                    <td>UCSH-602</td>
                    <td>Project</td>
                    <td>Project</td>
                  </tr>
                  <tr>
                    <th scope="row">Saturday</th>
                    <td>Project</td>
                    <td>Project</td>
                    <td>Project</td>
                    <td>Project</td>
                    <td>Project</td>
                    <td>Project</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : props.isStudent ? (
    <div className="container-fluid p-0">
      <div className="row main-container">
        <div className="col">
          <div className="container timetable-container table-responsive">
            <div className="timetable-inner rounded">
              <table className="table-bordered m-auto">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">1</th>
                    <th scope="col">2</th>
                    <th scope="col">3</th>
                    <th scope="col">4</th>
                    <th scope="col">5</th>
                    <th scope="col">6</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Monday</th>
                    <td>UCSH-601</td>
                    <td>Project</td>
                    <td>UCSH-603</td>
                    <td>UCSH-602</td>
                    <td>UCSH-604</td>
                    <td>UCSH-604</td>
                  </tr>
                  <tr>
                    <th scope="row">Tuesday</th>
                    <td>UCSH-601</td>
                    <td>Project</td>
                    <td>Project</td>
                    <td>UCSH-604</td>
                    <td>UCSH-604</td>
                    <td>UAWR-600</td>
                  </tr>
                  <tr>
                    <th scope="row">Wednesday</th>
                    <td>Project</td>
                    <td>UCSH-603</td>
                    <td>Project</td>
                    <td>Project</td>
                    <td>Project</td>
                    <td>Project</td>
                  </tr>
                  <tr>
                    <th scope="row">Thursday</th>
                    <td>Moral Class</td>
                    <td>UAWR-600</td>
                    <td>UCSH-602</td>
                    <td>UCSH-604</td>
                    <td>UCSH-604</td>
                    <td>UCSH-601</td>
                  </tr>
                  <tr>
                    <th scope="row">Friday</th>
                    <td>UCSH-603</td>
                    <td>UCSH-601</td>
                    <td>Project</td>
                    <td>UCSH-602</td>
                    <td>Project</td>
                    <td>Project</td>
                  </tr>
                  <tr>
                    <th scope="row">Saturday</th>
                    <td>Project</td>
                    <td>Project</td>
                    <td>Project</td>
                    <td>Project</td>
                    <td>Project</td>
                    <td>Project</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="row actions-container text-center">
        <div className="col">
          <button type="button" className="btn btn-primary">
            Download
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default Main;

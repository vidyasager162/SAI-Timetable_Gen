import React, { useState } from "react";

import SideBar from "./SideBar";
import User from "../User/User";
import Schedule from "../Schedule/Schedule";
import Course from "../Course/Course";
import AddCourse from "../Form/AddCourse";
import AddDepartment from "../Form/AddDepartment";
import AddTeacher from "../Form/AddTeacher";
import AddStudent from "../Form/AddStudent";
import AddSubject from "../Form/AddSubject";
import CreateSchedule from "../Form/CreateSchedule";
import Teacher from "../Teacher";
import Student from "../Student";
import Profile from "../Profile/Profile";
import StudentSchedule from "../Schedule/StudentSchedule";
import TeacherSchedule from "../Schedule/TeacherSchedule";
import AddCohort from "../Form/AddCohort";

function Main(props) {
  const [clicked, setClicked] = useState("");
  const [buttonClicked, setButtonClicked] = useState("");
  const [isAddDepartment, setIsAddDepartment] = useState(false);
  const [isAddSubject, setIsAddSubject] = useState(false);
  const [isAddCourse, setIsAddCourse] = useState(false);
  const [isAddTeacher, setIsAddTeacher] = useState(false);
  const [isAddStudent, setIsAddStudent] = useState(false);
  const [isAddCohort, setIsAddCohort] = useState(false);
  const [isCreateSchedule, setIsCreateSchedule] = useState(false);
  const [teacherClicked, setTeacherClicked] = useState("");
  const [userProfile, setUserProfile] = useState();
  const [viewStudentSchedule, setViewStudentSchedule] = useState(false);
  const [viewTeacherSchedule, setViewTeacherSchedule] = useState(false);
  const [courseid, setCourseID] = useState("");
  const [teacherid, setTeacherID] = useState("");

  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [courseClicked, setCourseClicked] = useState("");
  const [teacherSchedules, setTeacherSchedules] = useState([]);
  const [studentSchedules, setStudentSchedules] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [cohortID, setCohortID] = useState("");

  function getDepartments() {
    fetch("http://192.168.34.129:8000/get-departments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "902") {
          setDepartments(data.departments);
          console.log(data.departments);
        }
      });
  }

  function getCourses() {
    fetch("http://192.168.34.129:8000/get-courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "902") {
          setCourses(data.courses);
          console.log(data.courses);
        }
      });
  }

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
        }
      });
  }

  function getTeachers() {
    fetch("http://192.168.34.129:8000/get-teachers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "902") {
          setTeachers(data.teachers);
        }
      });
  }

  function getStudents() {
    fetch("http://192.168.34.129:8000/get-students", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "902") {
          setStudents(data.students);
        }
      });
  }

  function getTeacherSchedules() {
    fetch("http://192.168.34.129:8000/get-teacherschedules", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "902") {
          setTeacherSchedules(data.teacherschedules);
        }
      });
  }

  function getStudentSchedules() {
    fetch("http://192.168.34.129:8000/get-student-schedules", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "902") {
          setStudentSchedules(data.studentschedules);
        }
      });
  } //do server stuff

  function handleViewProfile(event) {
    const name = event.target.value;
    const reqPayload = {
      name: name,
    };
    fetch("http://192.168.34.129:8000/get-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(reqPayload),
    })
      .then((res) => res.json())
      .then((payload) => {
        if (payload.message === "802") {
          setUserProfile(payload.user);
          props.setViewProfile(true);
        }
      });
  }

  function handleClick(event) {
    setClicked(event.target.name);
  }

  function handleButtonClick(event) {
    setButtonClicked(event.target.name);
  }

  function handleTeacherID(event) {
    setTeacherID(event.target.name);
  }

  function handleCourseID(event) {
    setCourseID(event.target.name);
  }

  return props.isAdmin ? (
    props.isViewProfile ? (
      <Profile
        Admin={props.User}
        User={userProfile}
        setIsProfile={props.setIsProfile}
        setViewProfile={props.setViewProfile}
      />
    ) : viewStudentSchedule ? (
      <StudentSchedule
        courseid={courseid}
        setViewStudentSchedule={setViewStudentSchedule}
      />
    ) : viewTeacherSchedule ? (
      <TeacherSchedule
        teacherid={teacherid}
        setViewTeacherSchedule={setViewTeacherSchedule}
      />
    ) : isAddCourse ? (
      <div className="container-fluid p-0">
        <div className="row main-container">
          <div className="col my-col">
            <AddCourse
              setIsAddCourse={setIsAddCourse}
              buttonClicked={buttonClicked}
            />
          </div>
        </div>
      </div>
    ) : isAddDepartment ? (
      <div className="container-fluid p-0">
        <div className="row main-container">
          <div className="col my-col">
            <AddDepartment setIsAddDepartment={setIsAddDepartment} />
          </div>
        </div>
      </div>
    ) : isAddTeacher ? (
      <div className="container-fluid p-0">
        <div className="row main-container">
          <div className="col my-col">
            <AddTeacher
              setIsAddTeacher={setIsAddTeacher}
              departments={departments}
              courses={courses}
              getDepartments={getDepartments}
              getCourses={getCourses}
            />
          </div>
        </div>
      </div>
    ) : isAddStudent ? (
      <div className="container-fluid p-0">
        <div className="row main-container">
          <div className="col my-col">
            <AddStudent
              setIsAddStudent={setIsAddStudent}
              departments={departments}
              courses={courses}
              getDepartments={getDepartments}
              getCourses={getCourses}
            />
          </div>
        </div>
      </div>
    ) : isAddSubject ? (
      <div className="container-fluid p-0">
        <div className="row main-container">
          <div className="col my-col">
            <AddSubject
              setIsAddSubject={setIsAddSubject}
              courseClicked={courseClicked}
            />
          </div>
        </div>
      </div>
    ) : isCreateSchedule ? (
      <div className="container-fluid p-0">
        <div className="row main-container">
          <div className="col my-col">
            <CreateSchedule
              teacherClicked={teacherClicked}
              setTeacherClicked={setTeacherClicked}
              subjects={subjects}
              getSubjects={getSubjects}
              teachers={teachers}
              getTeachers={getTeachers}
              teacherSchedules={teacherSchedules}
              getTeacherSchedules={getTeacherSchedules}
              setIsCreateSchedule={setIsCreateSchedule}
            />
          </div>
        </div>
      </div>
    ) : isAddCohort ? (
      <div className="container-fluid p-0">
        <div className="row main-container">
          <div className="col my-col">
            <AddCohort setIsAddCohort={setIsAddCohort} cohortID={cohortID} />
          </div>
        </div>
      </div>
    ) : (
      <div className="container-fluid p-0">
        <div className="row main-container">
          <div className="col">
            <SideBar
              handleClick={handleClick}
              clicked={clicked}
              setButtonClicked={setButtonClicked}
              setClicked={setClicked}
              buttonClicked={buttonClicked}
              setIsAddCourse={setIsAddCourse}
              setIsAddDepartment={setIsAddDepartment}
              setIsAddTeacher={setIsAddTeacher}
              setIsAddStudent={setIsAddStudent}
              setIsAddSubject={setIsAddSubject}
              setIsCreateSchedule={setIsCreateSchedule}
              setIsAddCohort={setIsAddCohort}
              courseClicked={courseClicked}
              setCourseClicked={setCourseClicked}
              setCohortID={setCohortID}
            />
          </div>
          <div className="col my-col">
            <div className="row row-cols-1 row-cols-md-3 g-4 h-100 align-items-center">
              {clicked === "Schedules" ? (
                <Schedule
                  handleButtonClick={handleButtonClick}
                  buttonClicked={buttonClicked}
                  teacherSchedules={teacherSchedules}
                  getTeacherSchedules={getTeacherSchedules}
                  handleCourseID={handleCourseID}
                  handleTeacherID={handleTeacherID}
                  setViewStudentSchedule={setViewStudentSchedule}
                  setViewTeacherSchedule={setViewTeacherSchedule}
                />
              ) : clicked === "Teachers" ? (
                <User
                  clicked={clicked}
                  getTeachers={getTeachers}
                  teachers={teachers}
                  handleViewProfile={handleViewProfile}
                />
              ) : clicked === "Students" ? (
                <User
                  clicked={clicked}
                  getStudents={getStudents}
                  students={students}
                  handleViewProfile={handleViewProfile}
                />
              ) : clicked === "Courses" ? (
                <Course
                  handleButtonClick={handleButtonClick}
                  buttonClicked={buttonClicked}
                  getSubjects={getSubjects}
                  subjects={subjects}
                  courseClicked={courseClicked}
                  setCourseClicked={setCourseClicked}
                  departments={departments}
                  courses={courses}
                  getDepartments={getDepartments}
                  getCourses={getCourses}
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
    <Teacher User={props.User} />
  ) : props.isStudent ? (
    <Student User={props.User} />
  ) : null;
}

export default Main;

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
import EditSchedule from "../Form/EditSchedule";
import Logs from "../Logs";
import EditDetails from "../Form/EditDetails";

function Main(props) {
  const [clicked, setClicked] = useState("");
  const [buttonClicked, setButtonClicked] = useState("");
  const [isAddDepartment, setIsAddDepartment] = useState(false);
  const [isEditDepartment, setIsEditDepartment] = useState(false);
  const [isAddSubject, setIsAddSubject] = useState(false);
  const [isEditSubject, setIsEditSubject] = useState(false);
  const [isAddCourse, setIsAddCourse] = useState(false);
  const [isEditCourse, setIsEditCourse] = useState(false);
  const [isAddTeacher, setIsAddTeacher] = useState(false);
  const [isAddStudent, setIsAddStudent] = useState(false);
  const [isAddCohort, setIsAddCohort] = useState(false);
  const [isCreateSchedule, setIsCreateSchedule] = useState(false);
  const [isEditSchedule, setIsEditSchedule] = useState(false);
  const [teacherClicked, setTeacherClicked] = useState("");
  const [viewStudentSchedule, setViewStudentSchedule] = useState(false);
  const [viewTeacherSchedule, setViewTeacherSchedule] = useState(false);
  const [courseid, setCourseID] = useState("");
  const [teacherid, setTeacherID] = useState("");
  const [detailToEdit, setDetailToEdit] = useState("");

  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [courseClicked, setCourseClicked] = useState("");
  const [teacherSchedules, setTeacherSchedules] = useState([]);
  const [studentSchedules, setStudentSchedules] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [cohortID, setCohortID] = useState("");
  const [message, setMessage] = useState();

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
        if (data.message === "success") {
          setMessage(data.message);
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
        if (data.message === "success") {
          setMessage(data.message);
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
        if (data.message === "success") {
          setMessage(data.message);
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
        if (data.message === "success") {
          setMessage(data.message);
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
        if (data.message === "success") {
          setMessage(data.message);
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
        if (data.message === "success") {
          setMessage(data.message);
          setTeacherSchedules(data.teacherschedules);
        }
      });
  }

  function getStudentSchedules() {
    fetch("http://192.168.34.129:8000/get-studentschedules", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "success") {
          setMessage(data.message);
          setStudentSchedules(data.studentschedules);
        }
      });
  }

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
        if (payload.message === "success") {
          setMessage(payload.message);
          props.setUserProfile(payload.user);
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
        User={props.userProfile}
        setIsProfile={props.setIsProfile}
        setViewProfile={props.setViewProfile}
        reloadProfile={props.reloadProfile}
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
        setIsEditSchedule={setIsEditSchedule}
      />
    ) : isAddCourse ? (
      <div className="container-fluid p-0">
        <div className="row main-container">
          <div className="col my-col">
            <AddCourse
              setIsAddCourse={setIsAddCourse}
              buttonClicked={buttonClicked}
              User={props.User}
            />
          </div>
        </div>
      </div>
    ) : isEditCourse ? (
      <div className="container-fluid p-0">
        <div className="row main-container">
          <div className="col my-col">
            <EditDetails
              detailToEdit={detailToEdit}
              setIsEditCourse={setIsEditCourse}
              title="Course"
              fplaceholder="New Course Name"
              fname="coursename"
              mplaceholder="New Course ID"
              mname="courseid"
              lplaceholder="New Department ID"
              lname="dept_id"
            />
          </div>
        </div>
      </div>
    ) : isAddDepartment ? (
      <div className="container-fluid p-0">
        <div className="row main-container">
          <div className="col my-col">
            <AddDepartment
              setIsAddDepartment={setIsAddDepartment}
              User={props.User}
            />
          </div>
        </div>
      </div>
    ) : isEditDepartment ? (
      <div className="container-fluid p-0">
        <div className="row main-container">
          <div className="col my-col">
            <EditDetails
              detailToEdit={detailToEdit}
              setIsEditDepartment={setIsEditDepartment}
              title="Department"
              fplaceholder="New Department Name"
              fname="deptname"
              lplaceholder="New Department ID"
              lname="dept_id"
            />
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
              User={props.User}
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
              User={props.User}
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
              User={props.User}
            />
          </div>
        </div>
      </div>
    ) : isEditSubject ? (
      <div className="container-fluid p-0">
        <div className="row main-container">
          <div className="col my-col">
            <EditDetails
              detailToEdit={detailToEdit}
              setIsEditSubject={setIsEditSubject}
              title="Subject"
              fplaceholder="New Subject Name"
              fname="subname"
              mplaceholder="New Subject ID"
              mname="subid"
              lplaceholder="New Course ID"
              lname="course_id"
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
              User={props.User}
            />
          </div>
        </div>
      </div>
    ) : isEditSchedule ? (
      <div className="container-fluid p-0">
        <div className="row main-container">
          <div className="col my-col">
            <EditSchedule
              teacherid={teacherid}
              teachers={teachers}
              getTeachers={getTeachers}
              subjects={subjects}
              getSubjects={getSubjects}
              setIsEditSchedule={setIsEditSchedule}
              User={props.User}
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
    ) : props.isLog ? (
      <div className="container-fluid p-0">
        <div className="row main-container">
          <div className="col my-col">
            <Logs />
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
                  studentSchedules={studentSchedules}
                  getTeacherSchedules={getTeacherSchedules}
                  getStudentSchedules={getStudentSchedules}
                  teachers={teachers}
                  getTeachers={getTeachers}
                  handleCourseID={handleCourseID}
                  handleTeacherID={handleTeacherID}
                  setViewStudentSchedule={setViewStudentSchedule}
                  setViewTeacherSchedule={setViewTeacherSchedule}
                  message={message}
                  User={props.User}
                  isCreateSchedule={isCreateSchedule}
                />
              ) : clicked === "Teachers" ? (
                <User
                  clicked={clicked}
                  getTeachers={getTeachers}
                  teachers={teachers}
                  handleViewProfile={handleViewProfile}
                  message={message}
                />
              ) : clicked === "Students" ? (
                <User
                  clicked={clicked}
                  getStudents={getStudents}
                  students={students}
                  handleViewProfile={handleViewProfile}
                  message={message}
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
                  message={message}
                  User={props.User}
                  setIsEditCourse={setIsEditCourse}
                  setIsEditSubject={setIsEditSubject}
                  setIsEditDepartment={setIsEditDepartment}
                  setDetailToEdit={setDetailToEdit}
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

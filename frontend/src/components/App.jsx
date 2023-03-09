import React, { useState } from "react";
import Header from "./Header";
import Main from "./Main/Main";
import Home from "./Home";
import Footer from "./Footer";
import uniqid from "uniqid";
import { useCookies } from "react-cookie";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // All three constants passed to Main component to render inner-components based on their state.
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [User, setUser] = useState();
  const [checkforCookies, setCheckForCookies] = useState(true);
  const [quotation, setQuotation] = useState("");
  //const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(["userSaved", "username", "password"]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isAddDepartment, setIsAddDepartment] = useState(false);
  const [isAddSubject, setIsAddSubject] = useState(false);
  const [isAddCourse, setIsAddCourse] = useState(false);
  const [isAddTeacher, setIsAddTeacher] = useState(false);
  const [isAddStudent, setIsAddStudent] = useState(false);

  if (checkforCookies === true && cookie.userSaved === "true") {
    setCheckForCookies(false);
    const requestPayload = {
      username: cookie.username,
      cookieID: cookie.cookieID,
    };
    fetch("http://192.168.34.129:8000/retain-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(requestPayload),
    })
      .then((res) => res.json())
      .then((payload) => {
        if (payload.message === "802") {
          invertIsLoggedIn();
          handleUser(payload.user.usertype);
          updateUser(payload.user);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
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

  function handleUser(userType) {
    if (userType === 0 || userType === 9) {
      setIsAdmin(true);
    } else if (userType === 1) {
      setIsTeacher(true);
    } else if (userType === 2) {
      setIsStudent(true);
    }
  }

  function updateUser(user) {
    let setResolve = false;
    return new Promise((resolve, reject) => {
      setCookie("userSaved", true);
      setCookie("username", user.username);
      setCookie("cookieID", user.cookieID);
      setUser(() => {
        setResolve = true;
        return { ...user };
      });
      if (setResolve === true) {
        resolve();
      }
    });
  }

  function logOut() {
    invertIsLoggedIn();
    setUser({});
    setCookie("userSaved", false);
    setCookie("username", "");
    setCookie("password", "");
    setCookie("cookieID", "");
    setIsAdmin(false);
    setIsStudent(false);
    setIsTeacher(false);
  }

  function generateQuote() {
    fetch("http://192.168.34.129:8000/gen-quote", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "902") {
          setQuotation(data.quote.quote);
          console.log(data);
        }
      });
  }

  /*function handleUsername(event) {
    setUsername(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
    console.log(password);
  }*/

  //Passed to Home component and Header component to accomodate logout by the user.
  function invertIsLoggedIn() {
    setIsLoggedIn((prev) => {
      return !prev;
    });
  }

  function handleLogin(event) {
    event.preventDefault();
    const payload = new FormData(event.currentTarget);
    const reqPayload = {
      username: payload.get("username"),
      password: payload.get("password"),
      cookieID: uniqid(),
    };
    fetch("http://192.168.34.129:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(reqPayload),
    })
      .then((res) => res.json())
      .then((payload) => {
        if (payload.message === "800") {
          console.log("User not found");
          console.log(payload.message);
        } else if (payload.message === "801") {
          console.log("Wrong Password");
          console.log(payload.message);
        } else if (payload.message === "802") {
          invertIsLoggedIn();
          handleUser(payload.user.usertype);
          updateUser(payload.user);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handleCourseSubmit(event) {
    event.preventDefault();
    const payload = new FormData(event.currentTarget);
    const reqPayload = {
      course_id: payload.get("courseid"),
      course_name: payload.get("coursename"),
      dept_id: payload.get("deptid"),
    };
    fetch("http://192.168.34.129:8000/add-course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(reqPayload),
    })
      .then((res) => res.json())
      .then((payload) => {
        if (payload.message === "702") {
          console.log("Course added successfully.");
        } else {
          console.log("There was a problem adding the Course.");
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    invertIsAddCourse();
  }

  function handleSubjectSubmit(event) {
    event.preventDefault();
    const payload = new FormData(event.currentTarget);
    const reqPayload = {
      sub_id: payload.get("subjectid"),
      sub_name: payload.get("subjectname"),
      course_id: payload.get("courseid"),
    };
    fetch("http://192.168.34.129:8000/add-subject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(reqPayload),
    })
      .then((res) => res.json())
      .then((payload) => {
        if (payload.message === "702") {
          console.log("Subject added successfully.");
        } else {
          console.log("There was a problem adding the Subject.");
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    invertIsAddSubject();
  }

  function handleStudentSubmit(event) {
    event.preventDefault();
  }

  function handleTeacherSubmit(event) {
    event.preventDefault();
  }

  function handleDepartmentSubmit(event) {
    event.preventDefault();
    const payload = new FormData(event.currentTarget);
    const reqPayload = {
      dept_id: payload.get("deptid"),
      dept_name: payload.get("deptname"),
    };
    fetch("http://192.168.34.129:8000/add-department", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(reqPayload),
    })
      .then((res) => res.json())
      .then((payload) => {
        if (payload.message === "702") {
          console.log("Department added successfully.");
        } else {
          console.log("There was a problem adding the Department.");
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    invertIsAddDepartment();
  }

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
          console.log(data.subjects);
        }
      });
  }

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} User={User} logOut={logOut} />
      {isLoggedIn ? (
        <Main
          isAdmin={isAdmin}
          isTeacher={isTeacher}
          isStudent={isStudent}
          isAddDepartment={isAddDepartment}
          isAddCourse={isAddCourse}
          isAddSubject={isAddSubject}
          isAddTeacher={isAddTeacher}
          isAddStudent={isAddStudent}
          handleAddDepartment={handleAddDepartment}
          invertIsAddDepartment={invertIsAddDepartment}
          handleAddCourse={handleAddCourse}
          invertIsAddCourse={invertIsAddCourse}
          handleAddSubject={handleAddSubject}
          invertIsAddSubject={invertIsAddSubject}
          handleAddTeacher={handleAddTeacher}
          invertIsAddTeacher={invertIsAddTeacher}
          handleAddStudent={handleAddStudent}
          invertIsAddStudent={invertIsAddStudent}
          handleCourseSubmit={handleCourseSubmit}
          handleDepartmentSubmit={handleDepartmentSubmit}
          handleTeacherSubmit={handleTeacherSubmit}
          handleStudentSubmit={handleStudentSubmit}
          handleSubjectSubmit={handleSubjectSubmit}
          getDepartments={getDepartments}
          departments={departments}
          getCourses={getCourses}
          courses={courses}
          getSubjects={getSubjects}
          subjects={subjects}
        />
      ) : (
        <Home
          handleLogin={handleLogin}
          handleUser={handleUser}
          generateQuote={generateQuote}
          quotation={quotation}
        />
      )}
      {isLoggedIn ? null : <Footer />}
    </div>
  );
}

export default App;

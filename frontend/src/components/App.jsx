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
  const [cookie, setCookie] = useCookies(["userSaved", "username", "password"]);

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

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} User={User} logOut={logOut} />
      {isLoggedIn ? (
        <Main
          isAdmin={isAdmin}
          isTeacher={isTeacher}
          isStudent={isStudent}
          User={User}
        />
      ) : (
        <Home handleLogin={handleLogin} handleUser={handleUser} />
      )}
      {isLoggedIn ? null : <Footer />}
    </div>
  );
}

export default App;

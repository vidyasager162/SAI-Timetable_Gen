import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main/Main";
import Home from "./Home";
import Footer from "./Footer";
import uniqid from "uniqid";
import { useCookies } from "react-cookie";
import Profile from "./Profile/Profile";

function App() {
  useEffect(() => {
    // eslint-disable-next-line
    checkMaster();
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // All three constants passed to Main component to render inner-components based on their state.
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isViewProfile, setViewProfile] = useState(false);
  const [User, setUser] = useState();
  const [checkforCookies, setCheckForCookies] = useState(true);
  const [cookie, setCookie] = useCookies(["userSaved", "username", "password"]);
  //eslint-disable-next-line
  const [message, setMessage] = useState();

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
        if (payload.message === "success") {
          invertIsLoggedIn();
          setMessage(payload.message);
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
    setIsProfile(false);
  }

  function checkMaster() {
    fetch("http://192.168.34.129:8000/check-master", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
  }

  function appFlush() {
    fetch("http://192.168.34.129:8000/flush-app", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    logOut();
  }

  //Passed to Home component and Header component to accomodate logout by the user.
  function invertIsLoggedIn() {
    setIsLoggedIn((prev) => {
      return !prev;
    });
  }

  function invertIsProfile() {
    setIsProfile((prev) => {
      return !prev;
    });
  }

  function invertIsViewProfile() {
    setViewProfile(false);
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
        } else if (payload.message === "success") {
          invertIsLoggedIn();
          setMessage(payload.message);
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
      <Header
        isLoggedIn={isLoggedIn}
        invertIsProfile={invertIsProfile}
        invertIsViewProfile={invertIsViewProfile}
        setIsProfile={setIsProfile}
        User={User}
        logOut={logOut}
        appFlush={appFlush}
      />
      {isLoggedIn ? (
        isProfile ? (
          <Profile
            Admin={User}
            User={User}
            isProfile={isProfile}
            setIsProfile={setIsProfile}
            logOut={logOut}
          />
        ) : !isProfile ? (
          <Main
            isAdmin={isAdmin}
            isTeacher={isTeacher}
            isStudent={isStudent}
            User={User}
            setViewProfile={setViewProfile}
            isViewProfile={isViewProfile}
            setIsProfile={setIsProfile}
          />
        ) : null
      ) : (
        <Home handleLogin={handleLogin} handleUser={handleUser} />
      )}
      {isLoggedIn ? null : <Footer />}
    </div>
  );
}

export default App;

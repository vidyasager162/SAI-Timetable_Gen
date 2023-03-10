import React, { useEffect, useState } from "react";
import UserList from "./UserList";

function User(props) {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

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

  useEffect(() => {
    getTeachers();
    getStudents();
  }, []);

  return props.clicked === "Teachers" ? (
    <UserList users={teachers} />
  ) : (
    <UserList users={students} />
  );
}

export default User;

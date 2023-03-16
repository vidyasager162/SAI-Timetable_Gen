import React, { useEffect } from "react";
import UserList from "./UserList";

function User(props) {
  useEffect(() => {
    props.clicked === "Teachers" ? props.getTeachers() : props.getStudents();
    // eslint-disable-next-line
  }, []);

  return props.clicked === "Teachers" ? (
    <UserList users={props.teachers} />
  ) : (
    <UserList users={props.students} />
  );
}

export default User;

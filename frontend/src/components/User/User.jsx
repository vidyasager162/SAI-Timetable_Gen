import React, { useEffect } from "react";
import UserCard from "../Templates/UserCard";

function User(props) {
  useEffect(() => {
    props.clicked === "Teachers" ? props.getTeachers() : props.getStudents();
    // eslint-disable-next-line
  }, [props.message]);

  return props.clicked === "Teachers"
    ? props.teachers.map((teacher) => {
        return (
          <div className="col">
            <UserCard
              src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg"
              name={teacher.name}
              department={teacher.department}
              handleViewProfile={props.handleViewProfile}
            />
          </div>
        );
      })
    : props.students.map((student) => {
        return (
          <div className="col">
            <UserCard
              src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg"
              name={student.name}
              department={student.department}
              handleViewProfile={props.handleViewProfile}
            />
          </div>
        );
      });
}

export default User;

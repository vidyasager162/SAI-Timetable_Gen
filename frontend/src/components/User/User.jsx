import React, { useEffect } from "react";

function User(props) {
  useEffect(() => {
    props.clicked === "Teachers" ? props.getTeachers() : props.getStudents();
    // eslint-disable-next-line
  }, []);

  return props.clicked === "Teachers"
    ? props.teachers.map((teacher) => {
        return (
          <div className="col">
            <div className="card h-100">
              <img
                src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg"
                className="card-img-top"
                alt={teacher.name}
              />
              <div className="card-body">
                <h5 className="card-title">{teacher.name}</h5>
                <p className="card-text">{teacher.department}</p>
                <button
                  className="btn btn-primary"
                  value={teacher.name}
                  onClick={props.handleViewProfile}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        );
      })
    : props.students.map((student) => {
        return (
          <div className="col">
            <div className="card h-100">
              <img
                src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg"
                className="card-img-top"
                alt={student.name}
              />
              <div className="card-body">
                <h5 className="card-title">{student.name}</h5>
                <p className="card-text">{student.department}</p>
                <button
                  className="btn btn-primary"
                  value={student.name}
                  onClick={props.handleViewProfile}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        );
      });
}

export default User;

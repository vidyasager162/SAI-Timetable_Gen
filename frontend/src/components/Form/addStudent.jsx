import React from "react";

function AddStudent(props) {
  function handleStudentSubmit(event) {
    event.preventDefault();
    const payload = new FormData(event.currentTarget);
    const reqPayload = {
      name: payload.get("studentname"),
      username: payload.get("regdno"),
      password: "sairam",
      email: payload.get("emailid"),
      department: payload.get("deptid"),
      course: payload.get("courseid"),
      subjects: payload.get("subjects").split(","),
      usertype: 2,
    };
    fetch("http://192.168.34.129:8000/add-student", {
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
          console.log("Student added successfully.");
        } else {
          console.log("There was a problem adding the Student.");
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    props.setIsAddStudent(false);
  }
  return (
    <div className="form-signin w-100 m-auto container">
      <form onSubmit={handleStudentSubmit} method="POST">
        <div className="form-container">
          <div>
            <h1 className="h3 p-4 fw-normal m-auto text-center">Add Student</h1>
          </div>
          <div className="form-floating w-50 m-auto">
            <input
              type="text"
              className="form-control login-input"
              id="floatingInput"
              placeholder="Student Name"
              name="studentname"
            />
            <label htmlFor="floatingInput">Student Name</label>
          </div>
          <div className="form-floating w-50 m-auto">
            <input
              type="text"
              className="form-control login-input"
              id="floatingInput"
              placeholder="Regd No"
              name="regdno"
            />
            <label htmlFor="floatingInput">Regd No</label>
          </div>
          <div className="form-floating w-50 m-auto">
            <input
              type="text"
              className="form-control login-input"
              id="floatingInput"
              placeholder="Email ID"
              name="emailid"
            />
            <label htmlFor="floatingInput">Email ID</label>
          </div>
          <div className="form-floating m-auto w-50">
            <select className="form-select" name="deptid">
              {props.departments.map((department) => {
                return (
                  <option value={department.dept_id}>
                    {department.dept_id}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-floating w-50 m-auto">
            <select className="form-select" name="courseid">
              {props.courses.map((course) => {
                return (
                  <option value={course.course_id}>{course.course_id}</option>
                );
              })}
            </select>
          </div>
          <div className="form-floating w-50 m-auto">
            <input
              type="text"
              className="form-control login-input"
              id="floatingInput"
              placeholder="Subject IDs [separate by commas]"
              name="subjects"
            />
            <label htmlFor="floatingInput">
              Subject IDs [separate by commas]
            </label>
          </div>
          <div className="text-center">
            <button className="btn btn-lg btn-primary login-button">Add</button>
            <button
              type="button"
              className="btn btn-lg btn-primary login-button"
              onClick={() => {
                props.setIsAddStudent(false);
              }}
            >
              Back
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddStudent;

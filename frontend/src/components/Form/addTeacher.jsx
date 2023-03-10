import React from "react";

function AddTeacher(props) {
  function handleTeacherSubmit(event) {
    event.preventDefault();
    const payload = new FormData(event.currentTarget);
    const reqPayload = {
      name: payload.get("teachername"),
      username: payload.get("teacherid"),
      password: "sairam",
      email: payload.get("emailid"),
      department: payload.get("deptid"),
      coursesTaught: payload.get("coursestaught").split(","),
      subjectsTaught: payload.get("subjectstaught").split(","),
      usertype: 1,
    };
    fetch("http://192.168.34.129:8000/add-teacher", {
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
          console.log("Teacher added successfully.");
        } else {
          console.log("There was a problem adding the Teacher.");
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    props.invertIsAddTeacher();
  }
  return (
    <div className="form-signin w-100 m-auto container">
      <form onSubmit={handleTeacherSubmit} method="POST">
        <div className="form-container">
          <div>
            <h1 className="h3 p-4 fw-normal m-auto text-center">Add Teacher</h1>
          </div>
          <div className="form-floating w-50 m-auto">
            <input
              type="text"
              className="form-control login-input"
              id="floatingInput"
              placeholder="Teacher Name"
              name="teachername"
            />
            <label htmlFor="floatingInput">Teacher Name</label>
          </div>
          <div className="form-floating w-50 m-auto">
            <input
              type="text"
              className="form-control login-input"
              id="floatingInput"
              placeholder="Teacher ID"
              name="teacherid"
            />
            <label htmlFor="floatingInput">Teacher ID</label>
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
          <div className="form-floating w-50 m-auto">
            <input
              type="text"
              className="form-control login-input"
              id="floatingInput"
              placeholder="Department ID"
              name="deptid"
            />
            <label htmlFor="floatingInput">Department ID</label>
          </div>
          <div className="form-floating w-50 m-auto">
            <input
              type="text"
              className="form-control login-input"
              id="floatingInput"
              placeholder="Courses Taught [separate by commas]"
              name="coursestaught"
            />
            <label htmlFor="floatingInput">
              Courses Taught [separate by commas]
            </label>
          </div>
          <div className="form-floating w-50 m-auto">
            <input
              type="text"
              className="form-control login-input"
              id="floatingInput"
              placeholder="Subjects Taught [separate by commas]"
              name="subjectstaught"
            />
            <label htmlFor="floatingInput">
              Subjects Taught [separate by commas]
            </label>
          </div>
          <div className="text-align-center">
            <button className="btn btn-lg btn-primary login-button">Add</button>
            <button
              type="button"
              className="btn btn-lg btn-primary login-button"
              onClick={props.invertIsAddTeacher}
            >
              Back
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddTeacher;

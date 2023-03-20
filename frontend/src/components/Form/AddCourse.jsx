import React from "react";

function AddCourse(props) {
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
    props.setIsAddCourse(false);
  }
  return (
    <div className="form-signin w-100 m-auto container">
      <form onSubmit={handleCourseSubmit} method="POST">
        <div className="form-container">
          <div>
            <h1 className="h3 p-4 fw-normal m-auto text-center">Add Course</h1>
          </div>
          <div className="form-floating w-50 m-auto">
            <input
              type="text"
              className="form-control login-input"
              id="floatingInput"
              placeholder="Course Name"
              name="coursename"
            />
            <label htmlFor="floatingInput">Course Name</label>
          </div>
          <div className="form-floating w-50 m-auto">
            <input
              type="text"
              className="form-control login-input"
              id="floatingInput"
              placeholder="Course ID"
              name="courseid"
            />
            <label htmlFor="floatingInput">Course ID</label>
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
          <div className="text-center">
            <button className="btn btn-lg btn-primary login-button">Add</button>
            <button
              type="button"
              className="btn btn-lg btn-primary login-button"
              onClick={() => {
                props.setIsAddCourse(false);
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

export default AddCourse;

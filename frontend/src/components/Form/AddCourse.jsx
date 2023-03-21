import React from "react";
import FormActions from "../Templates/FormActions";
import FormHeader from "../Templates/FormHeader";

function AddCourse(props) {
  function handleCourseSubmit(event) {
    event.preventDefault();
    const payload = new FormData(event.currentTarget);
    const reqPayload = {
      course_id: payload.get("courseid"),
      course_name: payload.get("coursename"),
      dept_id: props.buttonClicked,
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
          <FormHeader title="Add Course" subtitle={props.buttonClicked} />
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
          <FormActions action={props.setIsAddCourse} />
        </div>
      </form>
    </div>
  );
}

export default AddCourse;

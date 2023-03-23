import React, { useEffect } from "react";
import FormActions from "../Templates/FormActions";
import FormHeader from "../Templates/FormHeader";

function AddTeacher(props) {
  useEffect(() => {
    props.getDepartments();
    props.getCourses();
    // eslint-disable-next-line
  }, []);
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
    props.setIsAddTeacher(false);
  }
  return (
    <div className="form-signin w-100 m-auto container">
      <form onSubmit={handleTeacherSubmit} method="POST">
        <div className="form-container">
          <FormHeader title="Add Teacher" />
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
          <div className="form-floating m-auto w-50">
            <select className="form-select bg-light" name="deptid">
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
          <FormActions action={props.setIsAddTeacher} />
        </div>
      </form>
    </div>
  );
}

export default AddTeacher;

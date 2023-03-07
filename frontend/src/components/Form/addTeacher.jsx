import React from "react";

function AddTeacher(props) {
  return (
    <div className="form-signin w-100 m-auto container">
      <form onSubmit={props.handleTeacherSubmit} method="POST">
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
              placeholder="Department ID"
              name="deptid"
            />
            <label htmlFor="floatingInput">Department ID</label>
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

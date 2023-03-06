import React from "react";

function AddDepartment(props) {
  return (
    <div className="form-signin w-100 m-auto container">
      <form onSubmit={props.handleDepartmentSubmit} method="POST">
        <div className="form-container">
          <div>
            <h1 className="h3 p-4 fw-normal m-auto text-center">
              Add Department
            </h1>
          </div>
          <div className="form-floating w-50 m-auto">
            <input
              type="text"
              className="form-control login-input"
              id="floatingInput"
              placeholder="Department Name"
              name="deptname"
            />
            <label htmlFor="floatingInput">Department Name</label>
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
          <button className="btn btn-lg btn-primary login-button">Add</button>
          <button
            type="button"
            className="btn btn-lg btn-primary login-button"
            onClick={props.invertIsAddDepartment}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddDepartment;

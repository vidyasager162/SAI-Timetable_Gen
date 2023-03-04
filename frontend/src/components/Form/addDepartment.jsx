import React from "react";

function addDepartment(props) {
  return (
    <div className="form-dept w-100 m-auto container">
      <form>
        <div className="form-container">
          <div>
            <h1 className="h3 p-4 fw-normal m-0">Add Department</h1>
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
        </div>
      </form>
    </div>
  );
}

export default addDepartment;

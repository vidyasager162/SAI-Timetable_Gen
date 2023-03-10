import React from "react";

function AddDepartment(props) {
  function handleDepartmentSubmit(event) {
    event.preventDefault();
    const payload = new FormData(event.currentTarget);
    const reqPayload = {
      dept_id: payload.get("deptid"),
      dept_name: payload.get("deptname"),
    };
    fetch("http://192.168.34.129:8000/add-department", {
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
          console.log("Department added successfully.");
        } else {
          console.log("There was a problem adding the Department.");
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    props.invertIsAddDepartment();
  }
  return (
    <div className="form-signin w-100 m-auto container">
      <form onSubmit={handleDepartmentSubmit} method="POST">
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

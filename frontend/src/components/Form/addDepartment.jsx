import React from "react";
import FormActions from "../Templates/FormActions";
import FormHeader from "../Templates/FormHeader";
import FormInput from "../Templates/FormInput";

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
    props.setIsAddDepartment(false);
  }
  return (
    <div className="form-signin w-100 m-auto container">
      <form onSubmit={handleDepartmentSubmit} method="POST">
        <div className="form-container">
          <FormHeader title="Add Department" />
          <FormInput
            type="text"
            placeholder="Department Name"
            name="deptname"
          />
          <FormInput type="text" placeholder="Department ID" name="deptid" />
          <FormActions action={props.setIsAddDepartment} />
        </div>
      </form>
    </div>
  );
}

export default AddDepartment;

import React from "react";
import FormHeader from "../Templates/FormHeader";
import FormActions from "../Templates/FormActions";

function AddCohort(props) {
  function handleCohortSubmit(event) {
    event.preventDefault();
    const payload = new FormData(event.currentTarget);
    const reqPayload = {
      file: payload.get("csvFile"),
    };
    fetch("http://192.168.34.129:8000/subject-cohort", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(reqPayload),
    });
    props.setIsAddCohort(false);
  }
  return (
    <div className="form-signin w-100 m-auto container">
      <form onSubmit={handleCohortSubmit} method="POST">
        <div className="form-container">
          <FormHeader title="Add Cohort" />
          <div className="m-auto w-50">
            <input
              type="file"
              className="form-control login-input"
              name="csvFile"
            />
          </div>
          <FormActions action={props.setIsAddCohort} />
        </div>
      </form>
    </div>
  );
}

export default AddCohort;

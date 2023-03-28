import React from "react";
import FormHeader from "../Templates/FormHeader";
import Papa from "papaparse";

function AddCohort(props) {
  let cohort = null;
  async function handleCohortSubmit(flag, event) {
    let myPromise = new Promise(function (resolve) {
      Papa.parse(event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          cohort = results.data;
          resolve(cohort);
        },
      });
    });
    // console.log(event.target.files[0]);
    let payload = await myPromise;
    const reqPayload = {
      payload: payload,
      flag: flag,
    };
    fetch("http://192.168.34.129:8000/add-cohort", {
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
      <form>
        <div className="form-container">
          <FormHeader title="Add Cohort" />
          <div className="m-auto w-50">
            <input
              type="file"
              className="form-control login-input"
              name="file"
              accept=".csv"
              onChange={(e) => {
                handleCohortSubmit(props.cohortID, e);
              }}
            />
          </div>
          <div className="text-center">
            <button
              type="button"
              className="btn btn-lg btn-primary login-button mb-0"
              onClick={() => {
                props.setIsAddCohort(false);
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

export default AddCohort;

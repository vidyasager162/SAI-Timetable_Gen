import React from "react";
import FormHeader from "../Templates/FormHeader";
import Papa from "papaparse";
import emailjs from "emailjs-com";

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
    if (flag === "Teacher" || flag === "Student") {
      //eslint-disable-next-line
      payload.map((deets) => {
        var templateParams = {
          to_name: deets.name,
          to_mail: deets.email,
          from_name: "Admin",
          message:
            "Your have been successfully registered in SAITimetable_Gen. Go get hold of your college schedule as soon as possible. Your credentials: username: " +
            deets.username +
            " " +
            "password: " +
            deets.password +
            ". " +
            "You can access the Web Application on: 192.168.34.129:3000",
        };
        emailjs
          .send("gmail", "acc_create", templateParams, "lfuN55z3EW1BC5gy0")
          .then(
            (response) => {
              console.log("SUCCESS!", response.status, response.text);
            },
            (error) => {
              console.log("FAILED...", error);
            }
          );
      });
    }
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

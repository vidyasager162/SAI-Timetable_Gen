import React from "react";

function CreateSchedule(props) {
  function handleScheduleSubmit(event) {
    event.preventDefault();
    const payload = new FormData(event.currentTarget);
    const reqPayload = {
      schedule_id: payload.get("teacherid"),
      monday: payload.get("monday").split(","),
      tuesday: payload.get("tuesday").split(","),
      wednesday: payload.get("wednesday").split(","),
      thursday: payload.get("thursday").split(","),
      friday: payload.get("friday").split(","),
      saturday: payload.get("saturday").split(","),
    };
    fetch("http://192.168.34.129:8000/create-schedule", {
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
          console.log("Schedule created successfully.");
        } else {
          console.log("There was a problem creating the Schedule.");
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    props.invertIsCreateSchedule();
  }
  return (
    <div className="form-signin w-100 m-auto container">
      <form onSubmit={handleScheduleSubmit} method="POST">
        <div className="form-container">
          <div>
            <h1 className="h3 p-4 fw-normal m-auto text-center">
              Create Schedule
            </h1>
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
          <div>
            <h1 className="h3 p-4 fw-normal m-auto text-center">Monday</h1>
          </div>
          <div className="form-floating w-50 m-auto">
            <input
              type="text"
              className="form-control login-input"
              id="floatingInput"
              placeholder="Enter the subjects to be taken [separate by commas]"
              name="monday"
            />
            <label htmlFor="floatingInput">
              Enter the subjects to be taken [separate by commas]
            </label>
          </div>
          <div>
            <h1 className="h3 p-4 fw-normal m-auto text-center">Tuesday</h1>
          </div>
          <div className="form-floating w-50 m-auto">
            <input
              type="text"
              className="form-control login-input"
              id="floatingInput"
              placeholder="Enter the subjects to be taken [separate by commas]"
              name="tuesday"
            />
            <label htmlFor="floatingInput">
              Enter the subjects to be taken [separate by commas]
            </label>
          </div>
          <div>
            <h1 className="h3 p-4 fw-normal m-auto text-center">Wednesday</h1>
          </div>
          <div className="form-floating w-50 m-auto">
            <input
              type="text"
              className="form-control login-input"
              id="floatingInput"
              placeholder="Enter the subjects to be taken [separate by commas]"
              name="wednesday"
            />
            <label htmlFor="floatingInput">
              Enter the subjects to be taken [separate by commas]
            </label>
          </div>
          <div>
            <h1 className="h3 p-4 fw-normal m-auto text-center">Thursday</h1>
          </div>
          <div className="form-floating w-50 m-auto">
            <input
              type="text"
              className="form-control login-input"
              id="floatingInput"
              placeholder="Enter the subjects to be taken [separate by commas]"
              name="thursday"
            />
            <label htmlFor="floatingInput">
              Enter the subjects to be taken [separate by commas]
            </label>
          </div>
          <div>
            <h1 className="h3 p-4 fw-normal m-auto text-center">Friday</h1>
          </div>
          <div className="form-floating w-50 m-auto">
            <input
              type="text"
              className="form-control login-input"
              id="floatingInput"
              placeholder="Enter the subjects to be taken [separate by commas]"
              name="friday"
            />
            <label htmlFor="floatingInput">
              Enter the subjects to be taken [separate by commas]
            </label>
          </div>
          <div>
            <h1 className="h3 p-4 fw-normal m-auto text-center">Saturday</h1>
          </div>
          <div className="form-floating w-50 m-auto">
            <input
              type="text"
              className="form-control login-input"
              id="floatingInput"
              placeholder="Enter the subjects to be taken [separate by commas]"
              name="saturday"
            />
            <label htmlFor="floatingInput">
              Enter the subjects to be taken [separate by commas]
            </label>
          </div>
          <div className="text-align-center">
            <button className="btn btn-lg btn-primary login-button">Add</button>
            <button
              type="button"
              className="btn btn-lg btn-primary login-button"
              onClick={props.invertIsCreateSchedule}
            >
              Back
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateSchedule;

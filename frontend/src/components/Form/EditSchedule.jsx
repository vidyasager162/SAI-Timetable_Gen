import React, { useEffect, useState } from "react";
import FormHeader from "../Templates/FormHeader";

function EditSchedule(props) {
  useEffect(() => {
    props.getSubjects();
    //eslint-disable-next-line
  }, []);
  //eslint-disable-next-line
  const [message, setMessage] = useState();
  const headings = ["#", "1", "2", "3", "4", "5", "6"];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function handleScheduleSubmit(event) {
    event.preventDefault();
    const payload = new FormData(event.currentTarget);
    const schedule = [
      payload.getAll("Monday"),
      payload.getAll("Tuesday"),
      payload.getAll("Wednesday"),
      payload.getAll("Thursday"),
      payload.getAll("Friday"),
      payload.getAll("Saturday"),
    ];
    const reqPayload = {
      schedule_id: props.teacherid,
      schedule: schedule,
    };

    fetch("http://192.168.34.129:8000/edit-schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(reqPayload),
    })
      .then((res) => res.json())
      .then((payload) => {
        if (payload.message === "success") {
          setMessage(payload.message);
          console.log("Schedule editing successful.");
        } else {
          console.log("There was a problem editing the Schedule.");
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    props.setIsEditSchedule(false);
  }

  return (
    <div className="form-signin w-100 m-auto container">
      <form onSubmit={handleScheduleSubmit} method="POST">
        <div className="schedule-form-container">
          <FormHeader title="Edit Schedule" subtitle={props.teacherid} />
          <div className="container timetable-container table-responsive">
            <div className="timetable-inner">
              <table className="table table-sm table-secondary table-bordered m-auto">
                <thead>
                  <tr>
                    {headings.map((heading) => {
                      return <th scope="col">{heading}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {days.map((outerDay) => {
                    return (
                      <tr>
                        <th scope="row">{outerDay}</th>
                        {days.map((innerDay) => {
                          return (
                            <td>
                              <select
                                className="form-select"
                                style={{ width: "auto" }}
                                name={outerDay}
                              >
                                {props.subjects.map((subject) => {
                                  return (
                                    <option value={subject.sub_id}>
                                      {subject.sub_id}
                                    </option>
                                  );
                                })}
                              </select>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-center">
            <button className="btn btn-lg btn-primary login-button mb-0">
              Save
            </button>
            <button
              className="btn btn-lg btn-primary login-button mb-0"
              onClick={() => {
                props.setIsEditSchedule(false);
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

export default EditSchedule;

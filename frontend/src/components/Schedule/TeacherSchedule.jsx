import React, { useState, useEffect } from "react";
import Table from "../Templates/Table";

function TeacherSchedule(props) {
  //eslint-disable-next-line
  const [teacherSchedule, setTeacherSchedule] = useState([]);
  const [scheduleReady, setReady] = useState(false);
  const headings = ["#", "1", "2", "3", "4", "5", "6"];
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  useEffect(() => {
    getTeacherSchedule();
    // eslint-disable-next-line
  }, []);
  function getTeacherSchedule() {
    const reqPayload = {
      schedule_id: props.teacherid,
    };
    fetch("http://192.168.34.129:8000/request-teacherschedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(reqPayload),
    })
      .then((res) => res.json())
      .then((payload) => {
        if (payload.message === "902") {
          setTeacherSchedule(payload.schedule);
          setReady(true);
        } else {
          console.log("There was a problem in getting the schedule.");
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }

  console.log(teacherSchedule);

  return (
    <div className="container-fluid p-0">
      <div className="row main-container">
        <div className="col">
          <Table
            headings={headings}
            scheduleReady={scheduleReady}
            Schedule={teacherSchedule}
            days={days}
          />
        </div>
      </div>
      <div className="row actions-container text-center">
        <div className="col">
          <button type="button" className="btn btn-primary">
            Download
          </button>
        </div>
        <div className="col">
          <button type="button" className="btn btn-primary">
            Edit Schedule
          </button>
        </div>
        <div className="col">
          <button type="button" className="btn btn-primary">
            Delete Schedule
          </button>
        </div>
        <div className="col">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              props.setViewTeacherSchedule(false);
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherSchedule;

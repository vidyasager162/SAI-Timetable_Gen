import React, { useEffect, useState } from "react";
import Card from "../Templates/Card";

function Schedule(props) {
  const [studentSchedules, setStudentSchedules] = useState([]);

  function getStudentSchedules() {
    fetch("http://192.168.34.129:8000/get-studentschedules", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "902") {
          setStudentSchedules(data.studentschedules);
        }
      });
  }

  function deleteSchedule(schedule_id) {
    fetch("http://192.168.34.129:8000/delete-schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        schedule_id: schedule_id,
      }),
    })
      .then((res) => res.json())
      .then((payload) => {
        console.log(payload);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }

  useEffect(() => {
    props.getTeacherSchedules();
    getStudentSchedules();
    // eslint-disable-next-line
  }, []);

  return props.buttonClicked === "tschedules" ? (
    props.teacherSchedules.map((teacherSchedule) => {
      return (
        <div className="col">
          <Card
            name={teacherSchedule.schedule_id}
            action={props.handleTeacherID}
            anotheraction={props.setViewTeacherSchedule}
            flag="tschedules"
            delete={deleteSchedule}
          />
        </div>
      );
    })
  ) : props.buttonClicked === "sschedules" ? (
    studentSchedules.map((studentSchedule) => {
      return (
        <div className="col">
          <Card
            name={studentSchedule.schedule_id}
            action={props.handleCourseID}
            anotheraction={props.setViewStudentSchedule}
            flag="sschedules"
          />
        </div>
      );
    })
  ) : props.buttonClicked === "" ? (
    <>
      <div className="col mybtn">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={props.handleButtonClick}
          name="tschedules"
        >
          Teacher Schedules
        </button>
      </div>
      <div className="col mybtn">
        <button
          type="button"
          className="btn btn-outline-primary btn-lg"
          onClick={props.handleButtonClick}
          name="sschedules"
        >
          Student Schedules
        </button>
      </div>
    </>
  ) : null;
}

export default Schedule;

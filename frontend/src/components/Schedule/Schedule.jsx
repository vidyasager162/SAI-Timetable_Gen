import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    props.getTeacherSchedules();
    getStudentSchedules();
    // eslint-disable-next-line
  }, []);

  return props.buttonClicked === "tschedules" ? (
    props.teacherSchedules.map((teacherSchedule) => {
      return (
        <div className="col mybtn">
          <button
            key={teacherSchedule.id}
            id={teacherSchedule.id}
            className="btn btn-primary btn-lg"
            name={teacherSchedule.schedule_id}
            onClick={(e) => {
              props.handleTeacherID(e);
              props.setViewTeacherSchedule(true);
            }}
          >
            {teacherSchedule.schedule_id}
          </button>
        </div>
      );
    })
  ) : props.buttonClicked === "sschedules" ? (
    studentSchedules.map((studentSchedule) => {
      return (
        <div className="col mybtn">
          <button
            key={studentSchedule.id}
            id={studentSchedule.id}
            className="btn btn-primary btn-lg"
            name={studentSchedule.schedule_id}
            onClick={(e) => {
              props.handleCourseID(e);
              props.setViewStudentSchedule(true);
            }}
          >
            {studentSchedule.schedule_id}
          </button>
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

import React, { useEffect } from "react";
import Button from "../Templates/Button";
import Card from "../Templates/Card";

function Schedule(props) {
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
    props.getStudentSchedules();
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
    props.studentSchedules.map((studentSchedule) => {
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
        <Button
          type="button"
          className="btn btn-primary btn-lg"
          name="tschedules"
          dname="Teacher Schedules"
          action={props.handleButtonClick}
        />
      </div>
      <div className="col mybtn">
        <Button
          type="button"
          className="btn btn-outline-primary btn-lg"
          name="sschedules"
          dname="Student Schedules"
          action={props.handleButtonClick}
        />
      </div>
    </>
  ) : null;
}

export default Schedule;

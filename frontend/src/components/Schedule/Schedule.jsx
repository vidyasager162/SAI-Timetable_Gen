import React, { useEffect, useState } from "react";
import Button from "../Templates/Button";
import Card from "../Templates/Card";

function Schedule(props) {
  //eslint-disable-next-line
  const [message, setMessage] = useState();

  function deleteSchedule(schedule_id) {
    fetch("http://192.168.34.129:8000/delete-schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        schedule_id: schedule_id,
        teachername: schedule_id,
        username: props.User.name,
      }),
    })
      .then((res) => res.json())
      .then((payload) => {
        if (payload.message === "success") {
          setMessage(payload.message);
          console.log(payload);
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }

  useEffect(() => {
    props.getTeacherSchedules();
    props.getStudentSchedules();
    props.getTeachers();
    // eslint-disable-next-line
  }, [message, props.message, props.teacherSchedules]);

  return props.buttonClicked === "tschedules" ? (
    props.teacherSchedules.length !== 0 ? (
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
    ) : (
      <div className="text-center">
        <h5 className="text-muted">No Schedules present at the moment</h5>
      </div>
    )
  ) : props.buttonClicked === "sschedules" ? (
    props.studentSchedules.length !== 0 ? (
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
    ) : (
      <div className="text-center">
        <h5 className="text-muted">No Schedules present at the moment</h5>
      </div>
    )
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

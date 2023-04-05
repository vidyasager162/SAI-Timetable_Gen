import React, { useState, useEffect, useRef } from "react";
import emailjs from "emailjs-com";
import { useReactToPrint } from "react-to-print";
import RequestChange from "./Form/RequestChange";
import Actions from "./Templates/Actions";
import { Table } from "./Templates/Table";

function Teacher(props) {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: props.User.username,
  });
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
      schedule_id: props.User.username,
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
        if (payload.message === "success") {
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

  function handleRequest(event, name) {
    event.preventDefault();
    var templateParams = {
      to_name: "Admin",
      to_mail: "vidyasager162@gmail.com",
      from_name: name,
      message: event.target.issue.value,
    };
    emailjs
      .send("gmail", "req_change", templateParams, "lfuN55z3EW1BC5gy0")
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );
  }

  console.log(teacherSchedule);

  return teacherSchedule.length !== 0 ? (
    <div className="container-fluid p-0">
      <div className="row main-container" id="printableComponent">
        <div className="col">
          <Table
            ref={componentRef}
            headings={headings}
            scheduleReady={scheduleReady}
            Schedule={teacherSchedule}
            days={days}
          />
        </div>
      </div>
      <Actions flag="Teacher" print={handlePrint} />
      <RequestChange action={handleRequest} user={props.User} />
    </div>
  ) : (
    <div className="container-fluid p-0 text-center">
      <div className="row main-container">
        <div className="col" style={{ margin: "160px" }}>
          <h3 className="text-muted">Oops, No schedules available currently</h3>
        </div>
      </div>
    </div>
  );
}

export default Teacher;

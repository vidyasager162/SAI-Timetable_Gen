import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Table } from "../Templates/Table";
import Actions from "../Templates/Actions";

function StudentSchedule(props) {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  //eslint-disable-next-line
  const [studentSchedule, setStudentSchedule] = useState([]);
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
    getStudentSchedule();
    // eslint-disable-next-line
  }, []);
  function getStudentSchedule() {
    const reqPayload = {
      schedule_id: props.courseid,
    };
    fetch("http://192.168.34.129:8000/request-studentschedule", {
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
          setStudentSchedule(payload.schedule);
          setReady(true);
        } else {
          console.log("There was a problem in getting the schedule.");
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }

  console.log(studentSchedule);

  return (
    <div className="container-fluid p-0">
      <div className="row main-container" id="printableComponent">
        <div className="col">
          <Table
            ref={componentRef}
            headings={headings}
            scheduleReady={scheduleReady}
            Schedule={studentSchedule}
            days={days}
          />
        </div>
      </div>
      <Actions view={props.setViewStudentSchedule} print={handlePrint} />
    </div>
  );
}

export default StudentSchedule;

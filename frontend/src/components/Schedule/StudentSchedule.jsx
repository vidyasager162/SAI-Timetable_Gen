import React, { useEffect, useState } from "react";

function StudentSchedule(props) {
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
      <div className="row main-container">
        <div className="col">
          <div className="container timetable-container table-responsive">
            <div className="timetable-inner rounded">
              <table className="table table-light table-bordered m-auto">
                <thead>
                  <tr>
                    {headings.map((heading) => {
                      return <th scope="col">{heading}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {scheduleReady
                    ? studentSchedule[0].schedule.map((sched, outerIndex) => {
                        return (
                          <tr>
                            <th scope="row">{days[outerIndex]}</th>
                            {sched.map((lesson) => {
                              return <td>{lesson}</td>;
                            })}
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="row actions-container text-center">
        <div className="col">
          <button type="button" className="btn btn-primary">
            Download
          </button>
        </div>
        <div className="col">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              props.setViewStudentSchedule(false);
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentSchedule;

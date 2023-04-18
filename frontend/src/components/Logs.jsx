import React, { useEffect, useState } from "react";

function Logs(props) {
  const [logs, setLogs] = useState([]);
  //eslint-disable-next-line
  useEffect(() => {
    getLogs();
  }, []);

  function getLogs() {
    fetch("http://192.168.34.129:8000/get-logs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((payload) => {
        if (payload.message === "success") {
          setLogs(payload.logs);
          console.log("Logs returned successfully");
        } else {
          console.log("There was a problem getting the logs.");
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }
  return (
    <>
      <div
        className="form-signin w-1 00 m-auto container my-col"
        style={{ height: "360px" }}
      >
        <div className="schedule-form-container">
          <div className="row mb-5">
            <div className="text-center">
              <ul>
                {logs.map((log) => {
                  return <li className="h5 my-4">- {log.log}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center my-2">
        <button className="btn btn-outline-danger" onClick={props.clearLogs}>
          Clear
        </button>
      </div>
    </>
  );
}

export default Logs;

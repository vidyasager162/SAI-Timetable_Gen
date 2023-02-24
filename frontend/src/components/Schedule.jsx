import React from "react";

function Schedule(props) {
  return (
    <>
      <div className="col schedulebtn">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={props.handleButtonClick}
          value="tschedules"
        >
          Teacher Schedules
        </button>
      </div>
      <div className="col schedulebtn">
        <button
          type="button"
          className="btn btn-outline-primary btn-lg"
          onClick={props.handleButtonClick}
          value="sschedules"
        >
          Student Schedules
        </button>
      </div>
    </>
  );
}

export default Schedule;

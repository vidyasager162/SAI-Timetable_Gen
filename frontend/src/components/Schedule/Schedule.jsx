import React from "react";
import Schedules from "./Schedules";

function Schedule(props) {
  return props.buttonClicked === "tschedules" ? (
    <Schedules buttonClicked={props.buttonClicked} />
  ) : props.buttonClicked === "sschedules" ? (
    <Schedules buttonClicked={props.buttonClicked} />
  ) : (
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
  );
}

export default Schedule;

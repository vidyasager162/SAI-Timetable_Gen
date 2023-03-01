import React, { useState } from "react";
import Schedules from "./Schedules";

function Schedule() {
  const [buttonClicked, setButtonClicked] = useState("");

  function handleButtonClick(event) {
    setButtonClicked(event.target.value);
  }

  return buttonClicked === "tschedules" ? (
    <Schedules buttonClicked={buttonClicked} />
  ) : buttonClicked === "sschedules" ? (
    <Schedules buttonClicked={buttonClicked} />
  ) : (
    <>
      <div className="col mybtn">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={handleButtonClick}
          value="tschedules"
        >
          Teacher Schedules
        </button>
      </div>
      <div className="col mybtn">
        <button
          type="button"
          className="btn btn-outline-primary btn-lg"
          onClick={handleButtonClick}
          value="sschedules"
        >
          Student Schedules
        </button>
      </div>
    </>
  );
}

export default Schedule;

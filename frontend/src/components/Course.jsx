import React, { useState } from "react";

function Course() {
  const [buttonClicked, setButtonClicked] = useState("");

  function handleButtonClick(event) {
    setButtonClicked(event.target.value);
  }

  return buttonClicked === "DMACS" ? (
    <Courses buttonClicked={buttonClicked} />
  ) : buttonClicked === "DMC" ? (
    <Courses buttonClicked={buttonClicked} />
  ) : (
    <>
      <div className="col schedulebtn">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={handleButtonClick}
          value="tschedules"
        >
          Teacher Schedules
        </button>
      </div>
      <div className="col schedulebtn">
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

export default Course;

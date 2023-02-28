import React, { useState } from "react";
import Courses from "./Courses";

function Course() {
  const [buttonClicked, setButtonClicked] = useState("");

  function handleButtonClick(event) {
    setButtonClicked(event.target.value);
  }

  return buttonClicked === "dmacs" ? (
    <Courses buttonClicked={buttonClicked} />
  ) : buttonClicked === "dmc" ? (
    <Courses buttonClicked={buttonClicked} />
  ) : (
    <>
      <div className="col mybtn">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={handleButtonClick}
          value="dmc"
        >
          DMC
        </button>
      </div>
      <div className="col mybtn">
        <button
          type="button"
          className="btn btn-outline-primary btn-lg"
          onClick={handleButtonClick}
          value="dmacs"
        >
          DMACS
        </button>
      </div>
    </>
  );
}

export default Course;

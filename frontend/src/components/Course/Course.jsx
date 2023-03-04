import React from "react";
import Courses from "./Courses";

function Course(props) {
  return props.buttonClicked === "dmacs" ? (
    <Courses buttonClicked={props.buttonClicked} />
  ) : props.buttonClicked === "dmc" ? (
    <Courses buttonClicked={props.buttonClicked} />
  ) : (
    <>
      <div className="col mybtn">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={props.handleButtonClick}
          name="dmc"
        >
          DMC
        </button>
      </div>
      <div className="col mybtn">
        <button
          type="button"
          className="btn btn-outline-primary btn-lg"
          onClick={props.handleButtonClick}
          name="dmacs"
        >
          DMACS
        </button>
      </div>
    </>
  );
}

export default Course;

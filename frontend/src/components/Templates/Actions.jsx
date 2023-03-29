import React from "react";

function Actions(props) {
  return props.flag === "Teacher" ? (
    <div className="actions-container text-center">
      <button type="button" className="btn btn-primary" onClick={props.print}>
        Download
      </button>
      <button type="button" className="btn btn-outline-secondary mx-2">
        Request Change
      </button>
    </div>
  ) : props.flag === "Student" ? (
    <div className="actions-container text-center">
      <button type="button" className="btn btn-primary" onClick={props.print}>
        Download
      </button>
    </div>
  ) : (
    <div className="actions-container text-center">
      <button type="button" className="btn btn-primary" onClick={props.print}>
        Download
      </button>
      {props.flag === "teacherschedule" ? (
        <button type="button" className="btn btn-outline-secondary mx-2">
          Edit Schedule
        </button>
      ) : (
        <span className="mx-1"></span>
      )}
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={() => {
          props.view(false);
        }}
      >
        Back
      </button>
    </div>
  );
}

export default Actions;

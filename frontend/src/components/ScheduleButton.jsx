import React from "react";

function ScheduleButton(props) {
  return (
    <div className="schedule">
      <button className="btn btn-primary btn-lg">{props.name}</button>
    </div>
  );
}

export default ScheduleButton;

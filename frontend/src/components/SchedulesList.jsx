import React from "react";
import ScheduleButton from "./ScheduleButton";

function SchedulesList(props) {
  return props.schedules.map((schedule) => {
    return (
      <div className="col schedulebtn">
        <ScheduleButton
          key={schedule.id}
          id={schedule.id}
          name={schedule.name}
        />
      </div>
    );
  });
}

export default SchedulesList;

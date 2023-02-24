import React from "react";
import ScheduleButton from "./ScheduleButton";

function SchedulesList(props) {
  return props.schedules.map((schedule) => {
    return (
      <ScheduleButton key={schedule.id} id={schedule.id} name={schedule.name} />
    );
  });
}

export default SchedulesList;

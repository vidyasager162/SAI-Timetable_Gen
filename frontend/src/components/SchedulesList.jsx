import React from "react";
import ScheduleButton from "./ScheduleButton";

function SchedulesList(props) {
  return props.tschedules.map((schedules) => {
    return (
      <ScheduleButton
        key={schedules.id}
        id={schedules.id}
        name={schedules.name}
      />
    );
  });
}

export default SchedulesList;

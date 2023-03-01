import React from "react";
import Button from "../Button";

function SchedulesList(props) {
  return props.schedules.map((schedule) => {
    return (
      <div className="col mybtn">
        <Button key={schedule.id} id={schedule.id} name={schedule.name} />
      </div>
    );
  });
}

export default SchedulesList;

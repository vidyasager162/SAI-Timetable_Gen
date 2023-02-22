import React from "react";
import SchedulesList from "./SchedulesList";

function Schedule() {
  const TEACHER_SCHEDULES = [
    {
      id: "ts1",
      name: "VB",
    },
    {
      id: "ts2",
      name: "SVS",
    },
    {
      id: "ts3",
      name: "VK",
    },
    {
      id: "ts4",
      name: "PSD",
    },
  ];

  const STUDENT_SCHEDULES = [
    {
      id: "ss1",
      name: "I BSc",
    },
    {
      id: "ss2",
      name: "II BSc",
    },
    {
      id: "ss3",
      name: "III BSc",
    },
    {
      id: "ss4",
      name: "I BBA",
    },
  ];

  return (
    <SchedulesList
      tschedules={TEACHER_SCHEDULES}
      sschedules={STUDENT_SCHEDULES}
    />
  );
}

export default Schedule;

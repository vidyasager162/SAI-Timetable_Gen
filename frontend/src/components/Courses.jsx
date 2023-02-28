import React from "react";
import CoursesList from "./CoursesList";

function Courses(props) {
  const DMC_COURSES = [
    {
      id: "dmc1",
      name: "BBA I",
    },
    {
      id: "dmc2",
      name: "BBA II",
    },
    {
      id: "dmc3",
      name: "BBA III",
    },
  ];

  const DMACS_COURSES = [
    {
      id: "dmacs1",
      name: "I BSc",
    },
    {
      id: "dmacs2",
      name: "II BSc",
    },
    {
      id: "dmacs3",
      name: "III BSc",
    },
    {
      id: "dmacs4",
      name: "I MSc",
    },
    {
      id: "dmacs5",
      name: "II MSc",
    },
  ];

  return props.buttonClicked === "dmc" ? (
    <CoursesList courses={DMC_COURSES} />
  ) : props.buttonClicked === "dmacs" ? (
    <CoursesList courses={DMACS_COURSES} />
  ) : null;
}

export default Courses;

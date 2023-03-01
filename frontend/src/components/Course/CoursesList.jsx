import React from "react";
import Button from "../Button";

function CoursesList(props) {
  return props.courses.map((course) => {
    return (
      <div className="col mybtn">
        <Button key={course.id} id={course.id} name={course.name} />
      </div>
    );
  });
}

export default CoursesList;

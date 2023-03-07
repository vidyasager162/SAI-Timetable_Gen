import React, { useEffect } from "react";
import Courses from "./Courses";

function Course(props) {
  useEffect(() => {
    props.getDepartments();
    // eslint-disable-next-line
  }, []);
  return props.buttonClicked === "DMACS" ? (
    <Courses buttonClicked={props.buttonClicked} />
  ) : (
    props.departments.map((department) => {
      return (
        <div className="col mybtn">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={props.handleButtonClick}
            name={department.dept_id}
          >
            {department.dept_id}
          </button>
        </div>
      );
    })
  );
}
//plis add a useffect to main to clear buttonclicked
export default Course;

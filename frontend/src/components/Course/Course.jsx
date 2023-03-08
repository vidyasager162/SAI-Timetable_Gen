import React, { useEffect } from "react";

function Course(props) {
  useEffect(() => {
    props.getDepartments();
    props.getCourses();
    // eslint-disable-next-line
  }, []);
  return props.buttonClicked === "DMACS"
    ? props.courses
        .filter((course) => course.department === "DMACS")
        .map((filteredCourse) => {
          return (
            <div className="col mybtn">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={props.handleButtonClick}
                name={filteredCourse.course_id}
              >
                {filteredCourse.course_id}
              </button>
            </div>
          );
        })
    : props.buttonClicked === "DMC"
    ? props.courses
        .filter((course) => course.department === "DMC")
        .map((filteredCourse) => {
          return (
            <div className="col mybtn">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={props.handleButtonClick}
                name={filteredCourse.course_id}
              >
                {filteredCourse.course_id}
              </button>
            </div>
          );
        })
    : props.departments.map((department) => {
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
      });
}
//plis add a useffect to main to clear buttonclicked
export default Course;

import React, { useEffect, useState } from "react";

function Course(props) {
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  function getDepartments() {
    fetch("http://192.168.34.129:8000/get-departments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "902") {
          setDepartments(data.departments);
          console.log(data.departments);
        }
      });
  }

  function getCourses() {
    fetch("http://192.168.34.129:8000/get-courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "902") {
          setCourses(data.courses);
          console.log(data.courses);
        }
      });
  }

  useEffect(() => {
    getDepartments();
    getCourses();
    props.getSubjects();
    // eslint-disable-next-line
  }, []);
  return departments.map((department) => {
    return props.buttonClicked === department.dept_id ? (
      courses
        .filter((course) => course.dept_id === department.dept_id)
        .map((filteredCourse) => {
          return props.courseClicked === filteredCourse.course_id ? (
            props.subjects
              .filter(
                (subject) => subject.course_id === filteredCourse.course_id
              )
              .map((filteredSubject) => {
                return (
                  <div className="col mybtn">
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      name={filteredSubject.sub_id}
                    >
                      {filteredSubject.sub_id}
                    </button>
                  </div>
                );
              })
          ) : (
            <div className="col mybtn">
              <button
                key={filteredCourse.id}
                id={filteredCourse.id}
                type="button"
                className="btn btn-primary btn-lg"
                name={filteredCourse.course_id}
                onClick={(e) => {
                  props.setCourseClicked(e.target.name);
                  props.setButtonClicked("");
                }}
              >
                {filteredCourse.course_id}
              </button>
            </div>
          );
        })
    ) : props.buttonClicked === "" ? (
      <div className="col mybtn">
        <button
          key={department.id}
          id={department.id}
          type="button"
          className="btn btn-primary btn-lg"
          onClick={props.handleButtonClick}
          name={department.dept_id}
        >
          {department.dept_id}
        </button>
      </div>
    ) : null;
  });
}
export default Course;

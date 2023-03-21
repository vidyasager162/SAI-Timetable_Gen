import React, { useEffect, useState } from "react";
import Card from "../Templates/Card";

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
                  <div className="col">
                    <Card
                      name={filteredSubject.sub_id}
                      description={filteredSubject.sub_name}
                      flag="subject"
                    />
                  </div>
                );
              })
          ) : props.courseClicked === "" ? (
            <div className="col">
              <Card
                name={filteredCourse.course_id}
                description={filteredCourse.course_name}
                action={props.setCourseClicked}
                anotheraction={props.setButtonClicked}
                flag="course"
              />
            </div>
          ) : null;
        })
    ) : props.buttonClicked === "" ? (
      <div className="col">
        <Card
          name={department.dept_id}
          description={department.dept_name}
          action={props.handleButtonClick}
          flag="department"
        />
      </div>
    ) : null;
  });
}
export default Course;

import React, { useEffect, useState } from "react";
import Card from "../Templates/Card";

function Course(props) {
  const [message, setMessage] = useState();
  function deleteSubject(sub_id) {
    fetch("http://192.168.34.129:8000/delete-subject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        sub_id: sub_id,
        username: props.User.name,
      }),
    })
      .then((res) => res.json())
      .then((payload) => {
        if (payload.message === "success") {
          setMessage(payload.message);
          console.log(payload);
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }

  function deleteCourse(course_id) {
    fetch("http://192.168.34.129:8000/delete-course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        course_id: course_id,
        username: props.User.name,
      }),
    })
      .then((res) => res.json())
      .then((payload) => {
        if (payload.message === "success") {
          setMessage(payload.message);
          console.log(payload);
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }

  function deleteDepartment(dept_id) {
    fetch("http://192.168.34.129:8000/delete-department", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        dept_id: dept_id,
        username: props.User.name,
      }),
    })
      .then((res) => res.json())
      .then((payload) => {
        if (payload.message === "success") {
          setMessage(payload.message);
          console.log(payload);
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }

  useEffect(() => {
    props.getDepartments();
    props.getCourses();
    props.getSubjects();
    // eslint-disable-next-line
  }, [message, props.message]);

  return props.departments.map((department) => {
    return props.buttonClicked === department.dept_id ? (
      props.courses
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
                      key={filteredSubject.sub_id}
                      sub={filteredSubject}
                      name={filteredSubject.sub_id}
                      description={filteredSubject.sub_name}
                      flag="subject"
                      edit={props.setIsEditSubject}
                      delete={deleteSubject}
                      setDetailToEdit={props.setDetailToEdit}
                    />
                  </div>
                );
              })
          ) : props.courseClicked === "" ? (
            <div className="col">
              <Card
                key={filteredCourse.course_id}
                course={filteredCourse}
                name={filteredCourse.course_id}
                description={filteredCourse.course_name}
                action={props.setCourseClicked}
                flag="course"
                edit={props.setIsEditCourse}
                delete={deleteCourse}
                setDetailToEdit={props.setDetailToEdit}
              />
            </div>
          ) : null;
        })
    ) : props.buttonClicked === "" ? (
      <div className="col">
        <Card
          key={department.dept_id}
          dept={department}
          name={department.dept_id}
          description={department.dept_name}
          action={props.handleButtonClick}
          flag="department"
          edit={props.setIsEditDepartment}
          delete={deleteDepartment}
          setDetailToEdit={props.setDetailToEdit}
        />
      </div>
    ) : null;
  });
}
export default Course;

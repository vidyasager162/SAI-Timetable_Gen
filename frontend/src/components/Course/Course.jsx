import React, { useEffect } from "react";
import Card from "../Templates/Card";

function Course(props) {
  function deleteSubject(sub_id) {
    fetch("http://192.168.34.129:8000/delete-subject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        sub_id: sub_id,
      }),
    })
      .then((res) => res.json())
      .then((payload) => {
        console.log(payload);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }

  function editSubject(sub_id, event) {
    const payload = new FormData(event.currentTarget);
    const reqPayload = {
      old_sub_id: sub_id,
      new_sub_id: payload.get("subid"),
      new_sub_name: payload.get("subname"),
      new_course_id: payload.get("course_id"),
    };
    fetch("http://192.168.34.129:8000/edit-subject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(reqPayload),
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
      }),
    })
      .then((res) => res.json())
      .then((payload) => {
        console.log(payload);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }

  function editCourse(course_id, event) {
    const payload = new FormData(event.currentTarget);
    const reqPayload = {
      old_course_id: course_id,
      new_course_id: payload.get("courseid"),
      new_course_name: payload.get("coursename"),
      new_dept_id: payload.get("dept_id"),
    };
    fetch("http://192.168.34.129:8000/edit-course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(reqPayload),
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
      }),
    })
      .then((res) => res.json())
      .then((payload) => {
        console.log(payload);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }

  function editDepartment(dept_id, event) {
    const payload = new FormData(event.currentTarget);
    const reqPayload = {
      old_dept_id: dept_id,
      new_dept_id: payload.get("dept_id"),
      new_dept_name: payload.get("deptname"),
    };
    fetch("http://192.168.34.129:8000/edit-department", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(reqPayload),
    });
  }

  useEffect(() => {
    props.getDepartments();
    props.getCourses();
    props.getSubjects();
    // eslint-disable-next-line
  }, []);

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
                      name={filteredSubject.sub_id}
                      description={filteredSubject.sub_name}
                      flag="subject"
                      delete={deleteSubject}
                      edit={editSubject}
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
                flag="course"
                delete={deleteCourse}
                edit={editCourse}
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
          delete={deleteDepartment}
          edit={editDepartment}
        />
      </div>
    ) : null;
  });
}
export default Course;

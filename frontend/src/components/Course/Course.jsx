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
        username: props.USer.name,
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

  function editSubject(sub_id, event) {
    const payload = new FormData(event.currentTarget);
    console.log("edit called");
    console.log(event);
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
                      identifier={filteredCourse.course_id}
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
                key={filteredCourse.course_id}
                course={filteredCourse}
                name={filteredCourse.course_id}
                description={filteredCourse.course_name}
                identifier={department.dept_id}
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
          key={department.dept_id}
          dept={department}
          name={department.dept_id}
          identifier={department.dept_id}
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

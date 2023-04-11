import React, { useEffect, useState } from "react";
import FormHeader from "../Templates/FormHeader";
import FormActions from "../Templates/FormActions";

function EditDetails(props) {
  const [detailName, setDetailName] = useState();
  const [detailID, setDetailID] = useState();
  const [detailPID, setDetailPID] = useState();

  function getDepartment() {
    fetch("http://192.168.34.129:8000/get-department", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        dept_id: props.detailToEdit,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "success") {
          setDetailName(data.dept.dept_name);
          setDetailPID(data.dept.dept_id);
          console.log(data);
        }
      });
  }
  function getCourse() {
    fetch("http://192.168.34.129:8000/get-course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        course_id: props.detailToEdit,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "success") {
          setDetailName(data.course.course_name);
          setDetailID(data.course.course_id);
          setDetailPID(data.course.dept_id);
          console.log(data);
        }
      });
  }
  function getSubject() {
    fetch("http://192.168.34.129:8000/get-subject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        sub_id: props.detailToEdit,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "success") {
          setDetailName(data.sub.sub_name);
          setDetailID(data.sub.sub_id);
          setDetailPID(data.sub.course_id);
          console.log(data);
        }
      });
  }
  function editSubject(sub_id, event) {
    event.preventDefault();
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
    props.setIsEditSubject(false);
  }

  function editCourse(course_id, event) {
    event.preventDefault();
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
    props.setIsEditCourse(false);
  }

  function editDepartment(dept_id, event) {
    event.preventDefault();
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
    props.setIsEditDepartment(false);
  }

  useEffect(() => {
    if (props.title === "Department") {
      getDepartment();
    } else if (props.title === "Course") {
      getCourse();
    } else {
      getSubject();
    }
  });

  return (
    <div className="form-signin w-100 m-auto container">
      <form
        onSubmit={(e) => {
          if (props.title === "Department") {
            editDepartment(props.detailToEdit, e);
          } else if (props.title === "Course") {
            editCourse(props.detailToEdit, e);
          } else if (props.title === "Subject") {
            editSubject(props.detailToEdit, e);
          }
        }}
        method="POST"
      >
        <div className="form-container">
          <FormHeader
            title={"Edit " + props.title}
            subtitle={props.detailToEdit}
          />
          <div className="form-floating w-50 m-auto">
            <input
              type="text"
              className="form-control login-input"
              id="floatingInput"
              placeholder={props.fplaceholder}
              name={props.fname}
              defaultValue={detailName}
            />
            <label htmlFor="floatingInput">{props.fplaceholder}</label>
          </div>
          {props.title === "Department" ? (
            <span></span>
          ) : (
            <div className="form-floating w-50 m-auto">
              <input
                type="text"
                className="form-control login-input"
                id="floatingInput"
                placeholder={props.mplaceholder}
                name={props.mname}
                defaultValue={detailID}
              />
              <label htmlFor="floatingInput">{props.mplaceholder}</label>
            </div>
          )}
          <div className="form-floating w-50 m-auto">
            <input
              type="text"
              className="form-control login-input"
              id="floatingInput"
              placeholder={props.lplaceholder}
              name={props.lname}
              defaultValue={detailPID}
            />
            <label htmlFor="floatingInput">{props.lplaceholder}</label>
          </div>
          {props.title === "Department" ? (
            <FormActions action={props.setIsEditDepartment} />
          ) : props.title === "Course" ? (
            <FormActions action={props.setIsEditCourse} />
          ) : props.title === "Subject" ? (
            <FormActions action={props.setIsEditSubject} />
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default EditDetails;

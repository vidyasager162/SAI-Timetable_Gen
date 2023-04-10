import React from "react";
import FormHeader from "../Templates/FormHeader";
import FormActions from "../Templates/FormActions";

function EditDetails(props) {
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
  return (
    <div className="form-signin w-100 m-auto container">
    {props.title = "Department" ?       <form
        onSubmit={(e) => {
          props.action(props.id, e);
        }}
        method="POST"
      > : props.title === "Course" ?       <form
        onSubmit={(e) => {
          props.action(props.id, e);
        }}
        method="POST"
      ></form> : props.title === "Subject" ?       <form
        onSubmit={(e) => {
          props.action(props.id, e);
        }}
        method="POST"
      ></form> : <></>}
        <div className="form-container">
          <FormHeader title={"Edit " + props.title} subtitle={props.id} />
          <div className="form-floating w-50 m-auto">
            <input
              type="text"
              className="form-control login-input"
              id="floatingInput"
              placeholder={props.fplaceholder}
              name={props.fname}
              defaultValue={props.description}
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
                defaultValue={props.id}
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
              defaultValue={props.identifier}
            />
            <label htmlFor="floatingInput">{props.lplaceholder}</label>
          </div>
          {props.title === "Department" ? (
            <FormActions />
          ) : props.title === "Course" ? (
            <FormActions />
          ) : props.title === "Subject" ? (
            <FormActions />
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default EditDetails;

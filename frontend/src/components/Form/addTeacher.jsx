import React, { useEffect } from "react";
// import emailjs from "emailjs-com";
import FormActions from "../Templates/FormActions";
import FormHeader from "../Templates/FormHeader";
import FormInput from "../Templates/FormInput";

function AddTeacher(props) {
  useEffect(() => {
    props.getDepartments();
    props.getCourses();
    // eslint-disable-next-line
  }, []);
  function handleTeacherSubmit(event) {
    event.preventDefault();
    const payload = new FormData(event.currentTarget);
    const reqPayload = {
      name: payload.get("teachername"),
      username: payload.get("teacherid"),
      password: "sairam",
      email: payload.get("emailid"),
      department: payload.get("deptid"),
      coursesTaught: payload.get("coursestaught").split(","),
      subjectsTaught: payload.get("subjectstaught").split(","),
      usertype: 1,
      mastername: props.User.name,
    };
    fetch("http://192.168.34.129:8000/add-teacher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(reqPayload),
    })
      .then((res) => res.json())
      .then((payload) => {
        if (payload.message === "702") {
          console.log("Teacher added successfully.");
        } else {
          console.log("There was a problem adding the Teacher.");
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    props.setIsAddTeacher(false);
    // var templateParams = {
    //   to_name: reqPayload.name,
    //   to_mail: reqPayload.email,
    //   from_name: "Admin",
    //   message:
    //     "Your have been successfully registered in SAITimetable_Gen. Go get hold of your college schedule as soon as possible. Your credentials: username: " +
    //     reqPayload.username +
    //     " " +
    //     "password: " +
    //     reqPayload.password +
    //     ". " +
    //     "You can access the Web Application on: 192.168.34.129:3000",
    // };
    // emailjs
    //   .send("gmail", "acc_create", templateParams, "lfuN55z3EW1BC5gy0")
    //   .then(
    //     (response) => {
    //       console.log("SUCCESS!", response.status, response.text);
    //     },
    //     (error) => {
    //       console.log("FAILED...", error);
    //     }
    //   );
  }
  return (
    <div className="form-signin w-100 m-auto container">
      <form onSubmit={handleTeacherSubmit} method="POST">
        <div className="form-container">
          <FormHeader title="Add Teacher" />
          <FormInput
            type="text"
            placeholder="Teacher Name"
            name="teachername"
          />
          <FormInput type="text" placeholder="Teacher ID" name="teacherid" />
          <FormInput type="text" placeholder="Email ID" name="emailid" />
          <div className="form-floating m-auto w-50">
            <select className="form-select bg-light" name="deptid">
              {props.departments.map((department) => {
                return (
                  <option value={department.dept_id}>
                    {department.dept_id}
                  </option>
                );
              })}
            </select>
          </div>
          <FormInput
            type="text"
            placeholder="Courses Taught [separate by commas]"
            name="coursestaught"
          />
          <FormInput
            type="text"
            placeholder="Subjects Taught [separate by commas]"
            name="subjectstaught"
          />
          <FormActions action={props.setIsAddTeacher} />
        </div>
      </form>
    </div>
  );
}

export default AddTeacher;

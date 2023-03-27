import React from "react";
import FormActions from "../Templates/FormActions";
import FormHeader from "../Templates/FormHeader";
import FormInput from "../Templates/FormInput";

function AddSubject(props) {
  function handleSubjectSubmit(event) {
    event.preventDefault();
    const payload = new FormData(event.currentTarget);
    const reqPayload = {
      sub_id: payload.get("subjectid"),
      sub_name: payload.get("subjectname"),
      course_id: props.courseClicked,
    };
    fetch("http://192.168.34.129:8000/add-subject", {
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
          console.log("Subject added successfully.");
        } else {
          console.log("There was a problem adding the Subject.");
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    props.setIsAddSubject(false);
  }
  return (
    <div className="form-signin w-100 m-auto container">
      <form onSubmit={handleSubjectSubmit} method="POST">
        <div className="form-container">
          <FormHeader title="Add Subject" subtitle={props.courseClicked} />
          <FormInput
            type="text"
            placeholder="Subject Name"
            name="subjectname"
          />
          <FormInput type="text" placeholder="Subject ID" name="subjectid" />
          <FormActions action={props.setIsAddSubject} />
        </div>
      </form>
    </div>
  );
}

export default AddSubject;

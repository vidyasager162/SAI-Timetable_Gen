import React from "react";

function AddSubject(props) {
  function handleSubjectSubmit(event) {
    event.preventDefault();
    const payload = new FormData(event.currentTarget);
    const reqPayload = {
      sub_id: payload.get("subjectid"),
      sub_name: payload.get("subjectname"),
      course_id: payload.get("courseid"),
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
          <div>
            <h1 className="h3 p-4 fw-normal m-auto text-center">Add Subject</h1>
          </div>
          <div className="form-floating w-50 m-auto">
            <input
              type="text"
              className="form-control login-input"
              id="floatingInput"
              placeholder="Subject Name"
              name="subjectname"
            />
            <label htmlFor="floatingInput">Subject Name</label>
          </div>
          <div className="form-floating w-50 m-auto">
            <input
              type="text"
              className="form-control login-input"
              id="floatingInput"
              placeholder="Subject ID"
              name="subjectid"
            />
            <label htmlFor="floatingInput">Subject ID</label>
          </div>
          <div className="form-floating w-50 m-auto">
            <input
              type="text"
              className="form-control login-input"
              id="floatingInput"
              placeholder="Course ID"
              name="courseid"
            />
            <label htmlFor="floatingInput">Course ID</label>
          </div>
          <div className="text-align-center">
            <button className="btn btn-lg btn-primary login-button">Add</button>
            <button
              type="button"
              className="btn btn-lg btn-primary login-button"
              onClick={() => {
                props.setIsAddSubject(false);
              }}
            >
              Back
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddSubject;

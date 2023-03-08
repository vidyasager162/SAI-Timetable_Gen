import React from "react";

function AddSubject(props) {
  return (
    <div className="form-signin w-100 m-auto container">
      <form onSubmit={props.handleSubjectSubmit} method="POST">
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
              placeholder="Semester"
              name="semester"
            />
            <label htmlFor="floatingInput">Semester</label>
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
              onClick={props.invertIsAddSubject}
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

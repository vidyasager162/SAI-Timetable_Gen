import React from "react";
import Modal from "./Modal";

function Card(props) {
  return props.flag === "department" ? (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">{props.description}</p>
        <button
          className="btn btn-outline-primary"
          value={props.name}
          name={props.name}
          onClick={(e) => {
            props.action(e);
          }}
        >
          View
        </button>
        <button
          className="btn btn-outline-secondary mx-1"
          data-bs-toggle="modal"
          data-bs-target="#departmentModal"
          value={props.name}
        >
          Edit
        </button>
        <Modal
          modalID="departmentModal"
          name={props.name}
          description={props.description}
          identifier={props.identifier}
          action={props.edit}
          title="Department"
          fplaceholder="New Department Name"
          fname="deptname"
          lplaceholder="New Department ID"
          lname="dept_id"
          id={props.name}
        />
        <button
          className="btn btn-outline-danger my-1"
          value={props.name}
          onClick={() => {
            props.delete(props.name);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  ) : props.flag === "course" ? (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">{props.description}</p>
        <button
          className="btn btn-outline-primary"
          value={props.name}
          name={props.name}
          onClick={(e) => {
            props.action(e.target.name);
          }}
        >
          View
        </button>
        <button
          className="btn btn-outline-secondary mx-1"
          data-bs-toggle="modal"
          data-bs-target="#courseModal"
          value={props.name}
        >
          Edit
        </button>
        <Modal
          modalID="courseModal"
          name={props.name}
          description={props.description}
          identifier={props.identifier}
          action={props.edit}
          title="Course"
          fplaceholder="New Course Name"
          fname="coursename"
          mplaceholder="New Course ID"
          mname="courseid"
          lplaceholder="New Department ID"
          lname="dept_id"
          id={props.name}
        />
        <button
          className="btn btn-outline-danger my-1"
          value={props.name}
          onClick={() => {
            props.delete(props.name);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  ) : props.flag === "subject" ? (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">{props.description}</p>
        <button
          className="btn btn-outline-secondary"
          value={props.name}
          data-bs-toggle="modal"
          data-bs-target="#subjectModal"
          onClick={(e) => {
            props.edit(true);
            props.action(e.target.name);
          }}
        >
          Edit
        </button>
        <Modal
          modalID="subjectModal"
          name={props.name}
          description={props.description}
          identifier={props.identifier}
          action={props.edit}
          title="Subject"
          fplaceholder="New Subject Name"
          fname="subname"
          mplaceholder="New Subject ID"
          mname="subid"
          lplaceholder="New Course ID"
          lname="course_id"
          id={props.name}
        />
        <button
          className="btn btn-outline-danger mx-1"
          value={props.name}
          onClick={() => {
            props.delete(props.name);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  ) : props.flag === "tschedules" ? (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <button
          className="btn btn-outline-primary"
          value={props.name}
          name={props.name}
          onClick={(e) => {
            props.action(e);
            props.anotheraction(true);
          }}
        >
          View
        </button>
        <button
          className="btn btn-outline-danger mx-1"
          value={props.name}
          onClick={(e) => {
            props.delete(e.target.value);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  ) : props.flag === "sschedules" ? (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <button
          className="btn btn-outline-primary"
          value={props.name}
          name={props.name}
          onClick={(e) => {
            props.action(e);
            props.anotheraction(true);
          }}
        >
          View
        </button>
      </div>
    </div>
  ) : null;
}

export default Card;

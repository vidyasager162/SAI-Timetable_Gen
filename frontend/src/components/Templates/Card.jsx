import React from "react";

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
        <button className="btn btn-outline-danger mx-1" value={props.name}>
          Edit
        </button>
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
        <button className="btn btn-outline-danger mx-1" value={props.name}>
          Edit
        </button>
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
  ) : props.flag === "subject" ? (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">{props.description}</p>
        <button
          className="btn btn-outline-danger mx-1"
          value={props.name}
          onClick={() => {
            props.edit(props.name);
          }}
        >
          Edit
        </button>
        <button
          className="btn btn-outline-danger"
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
        <button className="btn btn-outline-danger mx-1" value={props.name}>
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

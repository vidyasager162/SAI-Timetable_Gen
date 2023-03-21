import React from "react";

function UserCard(props) {
  return props.isProfile ? (
    <div className="card text-center">
      <img src={props.src} className="card-img-top" alt={props.name} />
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li>{props.department}</li>
      </ul>
    </div>
  ) : (
    <div className="card h-100">
      <img src={props.src} className="card-img-top" alt={props.name} />
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">{props.department}</p>
        <button
          className="btn btn-primary"
          value={props.name}
          onClick={props.handleViewProfile}
        >
          View
        </button>
      </div>
    </div>
  );
}

export default UserCard;

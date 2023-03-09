import React from "react";
import profileImage from "../../images/profile.jpg";

function UserCard(props) {
  return (
    <div className="card h-100">
      <img src={profileImage} className="card-img-top" alt={props.name} />
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">{props.class}</p>
        <button className="btn btn-primary">View</button>
      </div>
    </div>
  );
}

export default UserCard;

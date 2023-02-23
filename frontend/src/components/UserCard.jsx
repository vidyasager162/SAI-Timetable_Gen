import React from "react";

function UserCard(props) {
  return (
    <div className="card h-100">
      <img src={props.img} className="card-img-top" alt={props.name} />
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">{props.class}</p>
      </div>
    </div>
  );
}

export default UserCard;

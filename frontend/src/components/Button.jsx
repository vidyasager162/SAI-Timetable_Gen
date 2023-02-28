import React from "react";

function Button(props) {
  return (
    <div className="disp">
      <button className="btn btn-primary btn-lg">{props.name}</button>
    </div>
  );
}

export default Button;

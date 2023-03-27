import React from "react";

function Button(props) {
  return (
    <button
      type={props.type}
      className={props.className}
      name={props.name}
      onClick={props.action}
    >
      {props.dname}
    </button>
  );
}

export default Button;

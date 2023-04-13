import React from "react";

function DefaultInput(props) {
  return (
    <div className="form-floating w-100 m-auto">
      <input
        type={props.type}
        className="form-control login-input"
        id={props.id}
        placeholder={props.placeholder}
        name={props.name}
        defaultValue={props.default}
      />
      <label htmlFor="floatingInput">{props.placeholder}</label>
    </div>
  );
}

export default DefaultInput;

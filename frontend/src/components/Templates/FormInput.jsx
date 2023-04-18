import React from "react";

function FormInput(props) {
  return (
    <div className="form-floating w-50 m-auto">
      <input
        type={props.type}
        className="form-control login-input"
        id={props.id}
        placeholder={props.placeholder}
        name={props.name}
        required
      />
      <label htmlFor="floatingInput">{props.placeholder}</label>
    </div>
  );
}

export default FormInput;

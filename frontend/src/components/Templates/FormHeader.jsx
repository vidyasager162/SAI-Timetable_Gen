import React from "react";

function FormHeader(props) {
  return (
    <div>
      <h1 className="h3 p-4 fw-normal m-auto text-center py-0">
        {props.title}
      </h1>
      <h1 className="h4 p-4 fw-normal m-auto text-center">{props.subtitle}</h1>
    </div>
  );
}

export default FormHeader;

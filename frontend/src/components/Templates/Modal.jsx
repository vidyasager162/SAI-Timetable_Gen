import React from "react";
import FormHeader from "./FormHeader";
function Modal(props) {
  console.log(props.name);
  return (
    <div
      className="modal fade"
      id={props.modalID}
      tabIndex="-1"
      aria-labelledby={props.modalID + "label"}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-body">
            <div className="form-signin w-100 m-auto container">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  props.action(props.id, e);
                }}
                method="POST"
              >
                <div className="form-container">
                  <FormHeader
                    title={"Edit " + props.title}
                    subtitle={props.id}
                  />
                  <div className="form-floating w-50 m-auto">
                    <input
                      type="text"
                      className="form-control login-input"
                      id="floatingInput"
                      placeholder={props.fplaceholder}
                      name={props.fname}
                      defaultValue={props.description}
                    />
                    <label htmlFor="floatingInput">{props.fplaceholder}</label>
                  </div>
                  {props.title === "Department" ? (
                    <span></span>
                  ) : (
                    <div className="form-floating w-50 m-auto">
                      <input
                        type="text"
                        className="form-control login-input"
                        id="floatingInput"
                        placeholder={props.mplaceholder}
                        name={props.mname}
                        defaultValue={props.id}
                      />
                      <label htmlFor="floatingInput">
                        {props.mplaceholder}
                      </label>
                    </div>
                  )}
                  <div className="form-floating w-50 m-auto">
                    <input
                      type="text"
                      className="form-control login-input"
                      id="floatingInput"
                      placeholder={props.lplaceholder}
                      name={props.lname}
                      defaultValue={props.identifier}
                    />
                    <label htmlFor="floatingInput">{props.lplaceholder}</label>
                  </div>
                  <div className="text-center">
                    <button
                      className="btn btn-lg btn-primary login-button mb-0"
                      data-bs-dismiss="modal"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

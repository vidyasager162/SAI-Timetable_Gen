import React from "react";
import FormHeader from "./FormHeader";
function ConfirmModal(props) {
  return (
    <div
      className="modal fade"
      id={props.modalID}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
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
                  props.action(e);
                }}
                method="POST"
              >
                <div className="form-container">
                  <FormHeader title={props.title} />
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                  <div className="form-floating w-50 m-auto">
                    <input
                      type="password"
                      className="form-control login-input"
                      id="floatingInput"
                      placeholder={props.placeholder}
                    />
                    <label htmlFor="floatingInput">{props.placeholder}</label>
                  </div>
                  {props.response !== null ? (
                    <span>Wrong Password</span>
                  ) : (
                    <span></span>
                  )}
                  <div className="text-center">
                    <button
                      className="btn btn-lg btn-primary login-button mb-0"
                      data-bs-dismiss="modal"
                    >
                      Continue
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

export default ConfirmModal;

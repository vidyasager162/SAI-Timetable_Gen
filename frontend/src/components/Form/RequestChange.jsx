import React from "react";
import FormHeader from "../Templates/FormHeader";

function RequestChange(props) {
  return (
    <div
      className="modal fade"
      id="rcModal"
      tabIndex="-1"
      aria-labelledby="rcModallabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-body">
            <div className="form-signin w-100 m-auto container">
              <form
                onSubmit={(e) => {
                  props.action(e, props.user.name);
                }}
                method="POST"
              >
                <div className="form-container">
                  <FormHeader title="Request Change" />
                  <div className="mb-3">
                    <label for="textarea" className="form-label">
                      State the Required change
                    </label>
                    <textarea
                      className="form-control"
                      id="textarea"
                      rows="3"
                      name="issue"
                    ></textarea>
                    <div className="text-center">
                      <button
                        className="btn btn-lg btn-primary login-button mb-0"
                        data-bs-dismiss="modal"
                      >
                        Submit
                      </button>
                    </div>
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

export default RequestChange;

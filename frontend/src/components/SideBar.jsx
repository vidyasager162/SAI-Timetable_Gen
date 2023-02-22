import React from "react";

function SideBar() {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light align-items-center rounded sidebar"
      style={{ width: "60%", height: "482px" }}
    >
      <div className="sidebar-buttons">
        <button type="button" className="btn btn-light">
          Schedules
        </button>
        <button type="button" className="btn btn-light">
          Teachers
        </button>
        <button type="button" className="btn btn-light">
          Students
        </button>
        <button type="button" className="btn btn-light">
          Courses
        </button>
        <button type="button" className="btn btn-light">
          Back
        </button>
      </div>
    </div>
  );
}

export default SideBar;

import React from "react";
import SideBar from "./SideBar";

function Main() {
  return (
    <div className="container-fluid p-0">
      <div className="row main-container">
        <div className="col">
          <SideBar />
        </div>
        <div className="col">
          <div className="row h-100 align-items-center">
            <div className="col schedulebtn">
              <button className="btn btn-primary btn-lg">
                Teacher Schedules
              </button>
            </div>
            <div className="col schedulebtn">
              <button className="btn btn-outline-primary btn-lg">
                Student Schedules
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;

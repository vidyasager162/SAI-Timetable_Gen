import React from "react";
import SideBar from "./SideBar";
import User from "./User";

function Main() {
  return (
    <div className="container-fluid p-0">
      <div className="row main-container">
        <div className="col">
          <SideBar />
        </div>
        <div className="col my-col">
          {/* <div className="row h-100 align-items-center">
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
          </div> */}
          <div className="row row-cols-1 row-cols-md-3 g-4 align-items-center">
            <User />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;

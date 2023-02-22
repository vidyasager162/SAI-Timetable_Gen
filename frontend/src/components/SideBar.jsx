import React from "react";
import List from "./List";

function SideBar() {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light align-items-center rounded sidebar"
      style={{ width: "60%", height: "482px" }}
    >
      <List />
    </div>
  );
}

export default SideBar;

import React from "react";
import Header from "../../shared/components/Header";
import SideBar from "../components/SideBar";
import Hero from "../components/Hero";
// import SchedulesList from "../components/SchedulesList";

function Main() {
    return(
        <>
            <Header />
            <div className="container-fluid p-0">
                <div className="row main-container">
                    <div className="col">
                        <SideBar />
                    </div>
                    <div className="col">
                        <Hero />
                        {/* <SchedulesList /> */}
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default Main;
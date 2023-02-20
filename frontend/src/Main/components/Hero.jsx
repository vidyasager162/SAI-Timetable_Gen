import React from "react";

function Hero() {
    return(
            <div className="row h-100 align-items-center">
                <div className="col schedulebtn">
                    <button className="btn btn-primary btn-lg">Teacher Schedules</button>
                </div>
                <div className="col schedulebtn">
                    <button className="btn btn-outline-primary btn-lg">Student Schedules</button>
                </div>
            </div>
    )
}

export default Hero;
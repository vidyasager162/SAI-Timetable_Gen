import React from "react";

function Day() {

    const day = new Date().toDateString();

    return(
        <h5>{day}</h5>
    );
}

export default Day;
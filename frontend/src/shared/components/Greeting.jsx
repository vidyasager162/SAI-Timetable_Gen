import React from "react";

function Greeting() {

    let greeting = " ";
    const isLoggedIn = false;

    isLoggedIn?greeting = "Good Morning, Stranger": greeting= "Welcome";

    return (
        <h5>{greeting}</h5>
    );
}

export default Greeting;
import React from "react";
import { Link } from "react-router-dom";

function Hero() {
    return(
        <div className="container col-xxl-8 px-4 py-5">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5 hero-landing">
                <div className="col-10 col-sm-8 col-lg-6 toggle-container">
                    <div className="account-buttons">
                        <Link className="link" to="login"><button type="button" className="btn btn-primary btn-lg px-4 me-md-2 top">Teacher</button></Link>
                        <Link className="link" to="login"><button type="button" className="btn btn-outline-secondary btn-lg px-4 mid">Student</button></Link>
                        <Link className="link" to="login"><button type="button" className="btn btn-dark btn-lg px-4 me-md-2 last">Admin</button></Link>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="Hero-text container">
                        <h1 className="display-1">SSSIHL</h1>
                        <h1 className="display-1">MDH</h1>    
                {/* <div className="d-grid gap-2 d-md-flex justify-content-md-start"> */}
                        <button type="button" className="btn btn-primary btn-lg px-4 me-md-2 quote-container">
                            <p className="quote">"Love All, Serve All"</p>
                        </button>
                    </div>
                {/*</div>*/}
                </div>
            </div>
        </div> 
    );
}

export default Hero;
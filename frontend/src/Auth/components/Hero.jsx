import React from "react";

function Hero() {
    return(
        <div className="container col-xxl-8 px-4 py-5">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div className="col-10 col-sm-8 col-lg-6">
                    <div className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="../../images/cycle.jpg" className="d-block w-100" alt="cycle.jpg" />
                            </div>
                            {/* <div class="carousel-item">
                                <img src="..." class="d-block w-100" alt="..." />
                            </div>
                            <div class="carousel-item">
                                <img src="..." class="d-block w-100" alt="..." />
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 text-center">
                    <div className="form-signin w-100 m-auto">
                        <form>
                            <h1 className="h3 mb-3 fw-normal">Welcome</h1>
                            <div className="form-floating">
                                <input type="text" className="form-control" placeholder="Username" />
                            </div>
                            <div className="form-floating">
                                <input type="password" className="form-control" placeholder="Password" /> 
                            </div>
                            <button className="btn btn-lg btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div> 
    );
}

export default Hero;
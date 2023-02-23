import React, { useState } from "react";

function Home(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUsername(event) {
    setUsername(event.target.value);
    console.log(username);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
    console.log(password);
  }

  return (
    <div className="container col-xxl-8 px-4 py-3">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5 hero-landing">
        <div className="col-10 col-sm-8 col-lg-6 text-center">
          <div className="form-signin w-100 m-auto container">
            <form>
              <div className="form-container">
                <div>
                  <h1 className="h3 p-4 fw-normal m-0">Login</h1>
                </div>
                <div className="form-floating w-50 m-auto">
                  <input
                    type="text"
                    className="form-control login-input"
                    id="floatingInput"
                    placeholder="Username"
                    onChange={handleUsername}
                  />
                  <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating w-50 m-auto">
                  <input
                    type="password"
                    className="form-control login-input"
                    id="floatingInput"
                    placeholder="Password"
                    onChange={handlePassword}
                  />
                  <label htmlFor="floatingInput">Password</label>
                </div>
                <button
                  className="btn btn-lg btn-primary login-button"
                  onClick={props.invertIsLoggedIn}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="Hero-text container">
            <h1 className="display-1">SSSIHL</h1>
            <h1 className="display-1">MDH</h1>
            {/* <div className="d-grid gap-2 d-md-flex justify-content-md-start"> */}
            <button
              type="button"
              className="btn btn-primary btn-lg px-4 me-md-2 quote-container"
            >
              <p className="quote">"Love All, Serve All"</p>
            </button>
          </div>
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
}

export default Home;

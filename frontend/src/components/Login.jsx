import React from "react";

function Login(props) {
  return (
    <div className="form-signin w-100 m-auto container">
      <form onSubmit={props.handleLogin} method="POST">
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
              name="username"
            />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating w-50 m-auto">
            <input
              type="password"
              className="form-control login-input"
              id="floatingPassword"
              placeholder="Password"
              name="password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="btn btn-lg btn-primary login-button">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;

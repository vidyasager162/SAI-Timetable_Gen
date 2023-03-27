import React from "react";
import FormHeader from "./Templates/FormHeader";
import FormInput from "./Templates/FormInput";

function Login(props) {
  return (
    <div className="form-signin w-100 m-auto container">
      <form onSubmit={props.handleLogin} method="POST">
        <div className="form-container">
          <FormHeader title="Login" />
          <FormInput type="text" placeholder="Username" name="username" />
          <FormInput
            type="password"
            id="floatingPassword"
            placeholder="Password"
            name="password"
          />
          <button className="btn btn-lg btn-primary login-button">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;

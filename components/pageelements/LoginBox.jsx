import React from 'react'
import SigninComponent from '../auth/SigninComponent';
import SignupComponent from '../auth/SignupComponent';

const LoginBox = ({ formShown, setFormShown}) => {
  return (
    <div className="loginbox">
      <div className="contentbox">
        <div className="logo">
          <img src="/images/ui/logo-full-word-white-txt.png" alt="" />
        </div>

        <div className="signinForm" style={formShown === "signIn" ? { display: "block" } : { display: "none" }}>
          <SigninComponent originFrom="modal" />

          <span className="warning" onClick={() => setFormShown("signUp")}>
            Don't have an account? Click here to create one.
          </span>
        </div>

        <div className="signupForm" style={formShown === "signUp" ? { display: "block" } : { display: "none" }}>
          <SignupComponent originFrom="modal" />

          <span className="warning" onClick={() => setFormShown("signIn")}>
            Already have an account? Click here to log in.
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginBox
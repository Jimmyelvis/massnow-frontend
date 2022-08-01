import React from "react";
import { useState, useEffect } from "react";
import { signin, authenticate, isAuth } from "../../actions/auth";
import { useGlobalContext } from "../../context/context";
import { useAuthContext } from "../../context/auth_context";
import Router from "next/router";
import {
  Inputfield,
  Inputfield_With_Icon,
} from "../pageelements/forms/Inputfields";

const SigninComponent = ({ originFrom }) => {
  const { isModalOpen, closeModal } = useGlobalContext();
  const { isSignedIn, updateAuthStatus } = useAuthContext();
  const [orign, setorign] = useState(originFrom);

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { email, password, error, loading, message, showForm } = values;

  // useEffect(() => {
  //   isAuth() && Router.push(`/`);
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table({ name, email, password, error, loading, message, showForm });

    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        // save user token to cookie
        // save user info to localstorage
        // authenticate user
        authenticate(data, () => {

          if (orign === "signin page") {
            
            if (isAuth() && isAuth().role >= 1) {
              // Router.push(`/admin`);
              Router.push(`/profile/${isAuth().username}`);
            } else {
              Router.push(`/profile/${isAuth().username}`);
            }
          }
          updateAuthStatus();
        });

        setTimeout(() => {
          setValues({ ...values, loading: false });
          closeModal();
        }, 1300);
      }
    });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";

  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";

  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const signinForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <Inputfield_With_Icon
          type="email"
          placeHolder="Email Address"
          value={email}
          onChangeFunction={handleChange("email")}
          icon="/images/ui/Icon material-email.svg"
          iconClassname="inputIcon"
        />

        <Inputfield_With_Icon
          type="password"
          placeHolder="Password"
          value={password}
          onChangeFunction={handleChange("password")}
          icon="/images/ui/Icon awesome-key.svg"
          iconClassname="inputIcon"
        />

        <button className="btn btn-primary-grad">Sign In</button>
      </form>
    );
  };

  return (
    <React.Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signinForm()}
    </React.Fragment>
  );
};

export default SigninComponent;

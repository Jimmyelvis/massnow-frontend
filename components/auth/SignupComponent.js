import React from "react";
import { useState, useEffect } from "react";
import { signup, isAuth } from "../../actions/auth";
import { useGlobalContext } from "../../context/context";
import Router from "next/router";
import {
  Inputfield,
  Inputfield_With_Icon,
} from "../pageelements/forms/Inputfields";

const SignupComponent = () => {
  const { isModalOpen, closeModal } = useGlobalContext();

  const [values, setValues] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { name, username, email, password, error, loading, message, showForm } =
    values;

  // useEffect(() => {
  //   isAuth() && Router.push(`/`);
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table({ name, email, password, error, loading, message, showForm });

    setValues({ ...values, loading: true, error: false });
    const user = { name, username, email, password };

    signup(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: "",
          username: "",
          email: "",
          password: "",
          error: "",
          loading: false,
          message: data.message,
          showForm: false,
        });
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

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <Inputfield_With_Icon
          type="text"
          placeHolder="Full Name"
          value={name}
          onChangeFunction={handleChange("name")}
          icon="/images/ui/Icon ionic-md-person.svg"
          iconClassname="inputIcon"
        />

        <Inputfield_With_Icon
          type="text"
          placeHolder="Create an username"
          value={username}
          onChangeFunction={handleChange("username")}
          icon="/images/ui/Icon ionic-md-person.svg"
          iconClassname="inputIcon"
        />

        <Inputfield_With_Icon
          type="email"
          placeHolder="Type your email"
          value={email}
          onChangeFunction={handleChange("email")}
          icon="/images/ui/Icon material-email.svg"
          iconClassname="inputIcon"
        />

        <Inputfield_With_Icon
          type="password"
          placeHolder="Type your password"
          value={password}
          onChangeFunction={handleChange("password")}
          icon="/images/ui/Icon awesome-key.svg"
          iconClassname="inputIcon"
        />

        <button className="btn btn-primary-grad">Signup</button>
      </form>
    );
  };

  return (
    <React.Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signupForm()}
    </React.Fragment>
  );
};

export default SignupComponent;

import React from "react";
import { useState, useEffect } from "react";
import { signup, isAuth } from "../../actions/auth";
import { useGlobalContext } from "../../context";
import Router from "next/router";

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
        <div className="inputField">
          <img
            src="/images/ui/Icon ionic-md-person.svg"
            alt=""
            className="inputIcon"
          />

          <input
            value={name}
            onChange={handleChange("name")}
            type="text"
            className="inputCtrl"
            placeholder="Type your name"
          />
        </div>

        <div className="inputField">
          <img
            src="/images/ui/Icon ionic-md-person.svg"
            alt=""
            className="inputIcon"
          />

          <input
            value={username}
            onChange={handleChange("username")}
            type="text"
            className="inputCtrl"
            placeholder="Enter a username"
          />
        </div>

        <div className="inputField">
          <img
            src="/images/ui/Icon material-email.svg"
            alt=""
            className="inputIcon"
          />

          <input
            value={email}
            onChange={handleChange("email")}
            type="email"
            className="inputCtrl"
            placeholder="Type your email"
          />
        </div>

        <div className="inputField">
          <img
            src="/images/ui/Icon awesome-key.svg"
            alt=""
            className="inputIcon"
          />

          <input
            value={password}
            onChange={handleChange("password")}
            type="password"
            className="inputCtrl"
            placeholder="Type your password"
          />
        </div>

        <button className="btn btn-thirdcolor-grad">Signup</button>
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

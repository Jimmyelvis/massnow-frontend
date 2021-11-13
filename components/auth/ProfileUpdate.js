import Link from "next/link";
import React, { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { getCookie, isAuth, updateUser } from "../../actions/auth";
import { getProfile, update } from "../../actions/user";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";
import Widgetsetting from "../pageelements/Cloudinary";
import Sectionhero from "../../components/hero/Sectionhero";
import { QuillModules, QuillFormats } from "../../helpers/quill";
import { API } from "../../config";

const ProfileUpdate = () => {
  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    about: "",
    error: false,
    success: false,
    loading: false,
    photo: "",
    userData: process.browser && new FormData(),
  });

  const token = getCookie("token");
  const {
    username,
    name,
    email,
    about,
    password,
    error,
    success,
    loading,
    photo,
    userData,
  } = values;

  const init = () => {
    getProfile(token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          username: data.username,
          name: data.name,
          email: data.email,
          about: data.about,
          photo: data.photo,
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (e) => {
    // console.log(e.target.value);
    const value = e.target.value;
    //  let userFormData = new FormData();
    userData.set(name, value);

    console.log(...userData);

    setValues({
      ...values,
      [name]: value,
      userData,
      error: false,
      success: false,
    });
  };

  //  const handleAbout = (e) => {
  //   const value = e.target.value;
  //    userData.set("about",value);
  //  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, loading: true });

    update(token, userData).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
          loading: false,
        });
      } else {
        updateUser(data, () => {
          setValues({
            ...values,
            username: data.username,
            name: data.name,
            email: data.email,
            about: data.about,
            photo: data.photo,
            password: "",
            success: true,
            loading: false,
          });
        });
      }
    });
  };

  const avatarSubmit = (name) => (e) => {
    e.preventDefault();
    const value = e.target.value;

    window.cloudinary.openUploadWidget(Widgetsetting(), (error, result) => {
      if (result && result.event === "success") {
        // let userFormData = new FormData();
        userData.set(name, result.info.url);
        setValues({
          ...values,
          [name]: value,
          photo: result.info.url,
          userData: userData,
          error: "",
        });
      }
    });
  };

  const profileUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        {/* <label className="btn btn-secondary">
              Profile photo
              <input
                onChange={handleChange("photo")}
                type="file"
                accept="image/*"
                hidden
              />
            </label> */}

        <h3 className="heading-3">Upload a main header image</h3>

        {/* <div className="uploadpreview form-control">
              {!mainphoto ? null : <img src={mainphoto} />}
            </div> */}

        <div className="upload-btn">
          <button
            id="upload_widget"
            className="btn btn-secondary"
            onClick={avatarSubmit("photo")}
          >
            Upload Photo
          </button>
        </div>
      </div>

      <div className="inputField">
        <img
          src="/images/ui/Icon ionic-md-person.svg"
          alt=""
          className="inputIcon"
        />
        <input
          onChange={handleChange("username")}
          type="text"
          value={username}
          className="inputCtrl"
          placeholder="Username"
        />
      </div>
      <div className="inputField">
        <img
          src="/images/ui/Icon ionic-md-person.svg"
          alt=""
          className="inputIcon"
        />
        <input
          onChange={handleChange("name")}
          type="text"
          value={name}
          className="inputCtrl"
          placeholder="Name"
        />
      </div>
      <div className="inputField">
        <img
          src="/images/ui/Icon material-email.svg"
          alt=""
          className="inputIcon"
        />
        <input
          onChange={handleChange("email")}
          type="text"
          value={email}
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
          onChange={handleChange("password")}
          type="password"
          value={password}
          className="inputCtrl"
          placeholder="Type your password"
        />
      </div>

      <div className="inputField">
        <textarea
          onChange={handleChange("about")}
          type="text"
          value={about}
          className="inputCtrl inputCtrl-textarea"
          placeholder="Tell us about yourself"
          rows="15"
        />
        {/* 
            <ReactQuill
              modules={QuillModules}
              formats={QuillFormats}
              value={about}
              placeholder="Tell us about yourself."
              onChange={handleAbout}
              className="form-control"
            /> */}
      </div>

      <div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      Profile updated
    </div>
  );

  const showLoading = () => (
    <div
      className="alert alert-info"
      style={{ display: loading ? "" : "none" }}
    >
      Loading...
    </div>
  );

  return (
    <React.Fragment>
      <Sectionhero
        /**
         *  contentColCount -- determines how many columns the content section
         *  will have. Additional options can be set such as  "narrow-wide" which
         *  means the first coloum will be smaller than the second, "wide-narrow"
         *  which will be the reverse, or even in both will have equal width. Default
         * is even
         */
        headline={name}
        image={"/images/pexels-freestocksorg-58639.jpg"}
        heroclasses={"hero section-hero profile-hero"}
        readmoreSection={false}
      >
      </Sectionhero>

      <div className="profile-update">

        <div className="avatar">
          <img
            src={photo}
            alt="user profile"
          />
        </div>

        {showSuccess()}
        {showError()}
        {showLoading()}

        <br />
        <br />
        <br />

        {profileUpdateForm()}
      </div>

    </React.Fragment>
  );
};

export default ProfileUpdate;

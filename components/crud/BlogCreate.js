import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { createBlog } from "../../actions/blog";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// const Widgetsetting = dynamic(() => import('../pageelements/Cloudinary'),
// { ssr: false })
import Widgetsetting from "../pageelements/Cloudinary";
import "../../node_modules/react-quill/dist/quill.snow.css";
import { QuillModules, QuillFormats } from "../../helpers/quill";
import { Inputfield, CheckBox } from "../pageelements/forms/Inputfields";


const CreateBlog = ({ router }) => {
  const blogFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("blog")) {
      return JSON.parse(localStorage.getItem("blog"));
    } else {
      return false;
    }
  };

  const [categories, setCategories] = useState([]);

  const [checked, setChecked] = useState([]); // categories

  const [imgFile, setimgFile] = useState(null);

  const [body, setBody] = useState(blogFromLS());
  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: "",
    formData: "",
    title: "",
    subtitle: "",
    tags: "",
    mainphoto:
      "",
    hidePublishButton: false,
  });

  const {
    error,
    sizeError,
    success,
    formData,
    title,
    subtitle,
    tags,
    mainphoto,
    hidePublishButton,
  } = values;
  const token = getCookie("token");

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
  }, [router]);

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const publishBlog = (e) => {
    e.preventDefault();
    // console.log('ready to publishBlog');
    createBlog(formData, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          subtitle: "",
          tags: "",
          error: "",
          mainphoto:
            "",
          success: `A new blog titled "${data.title}" is created`,
        });
        setChecked([])
        setBody("");
      }
    });
  };

  const handleChange = (name) => (e) => {
    // console.log(e.target.value);
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "" });
  };

  const handleBody = (e) => {
    // console.log(e);
    setBody(e);
    formData.set("body", e);
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  const handleToggle = (c) => () => {
    setValues({ ...values, error: "" });
    // return the first index or -1
    const clickedCategory = checked.indexOf(c);
    const all = [...checked];

    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    // console.log(all);
    setChecked(all);
    formData.set("categories", all);
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
      <CheckBox
          key={i}
          onChange={handleToggle(c._id)}
          type="checkbox"
          className="checkmark"
          label={c.name}
        />
      ))
    );
  };

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
      {success}
    </div>
  );

  const fullArticleHeaderSubmit = (name) => (e) => {
    e.preventDefault();
    const value = e.target.value;

    

    window.cloudinary.openUploadWidget(Widgetsetting(), (error, result) => {

      

      if (result && result.event === "success") {
        formData.set(name, result.info.url);
        setValues({
          ...values,
          [name]: value,
          mainphoto: result.info.url,
          formData,
          error: "",
        });

        setimgFile(result.info.path)

      }
    });
  };

  const clearImages = () => {
    setValues({
      ...values,
      mainphoto: "",
    })

    setimgFile(null)
  }

  return (
    <React.Fragment>
      <div
        className={`${
          mainphoto
            ? "uploadpreview"
            : "uploadpreview form-control"
        }`}
      >
        {!mainphoto ? (
          <div className="heading">
            <h4 className="admin_heading-4">Upload a main header image</h4>

            <div className="upload-btn">
              <button
                id="upload_widget"
                className="btn btn-primary-grad"
                onClick={fullArticleHeaderSubmit("mainphoto")}
              >
                Upload Photo
              </button>
            </div>
          </div>
        ) : (
          <div className="uploaded_photo">
            <div className="img_info">
              <h4 className="admin_heading-4 filename">{imgFile}</h4>

              <div className="btns">
                <img
                  src="/images/ui/change-photo.svg"
                  alt=""
                  className="change_photo"
                  onClick={fullArticleHeaderSubmit("mainphoto")}
                />
                <img
                  src="/images/ui/delete-photo.svg"
                  alt=""
                  className="delete_photo"
                  onClick={() => {
                    clearImages();
                  }}
                />
              </div>
            </div>
            <img src={mainphoto} className="main-photo" />
            <div className="overlay"></div>
          </div>
        )}
      </div>

      <form onSubmit={publishBlog} className="formCreation">
        <div className="inputFields">
          <Inputfield
            value={title}
            onChangeFunction={handleChange("title")}
            placeHolder="Title"
          />

          <Inputfield
            value={subtitle}
            onChangeFunction={handleChange("subtitle")}
            placeHolder="Sub Title"
          />

          <Inputfield
            value={tags}
            onChangeFunction={handleChange("tags")}
            placeHolder="Tags:  Please use comma separated values (eg. Local, Politics, etc)"
          />
        </div>

        <div className="cat-list">
          <h4 className="heading-5">Categories</h4>

          <ul>{showCategories()}</ul>
        </div>

        <div className="inputTextbox">
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={body}
            placeholder="Write something amazing..."
            onChange={handleBody}
          />
        </div>

        <button type="submit" className="btn btn-publish btn-primary-grad">
          Publish
        </button>
      </form>

      <div className="status-msg">
        {showError()}
        {showSuccess()}
      </div>
    </React.Fragment>
  );
};

export default withRouter(CreateBlog);

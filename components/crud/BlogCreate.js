import Link from "next/link";
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
import tag from "../../../backend/models/tag";

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

  const [body, setBody] = useState(blogFromLS());
  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: "",
    formData: "",
    title: "",
    subtitle: "",
    tags: "",
    mainphoto: "",
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
          success: `A new blog titled "${data.title}" is created`,
        });
        setBody("");
        setCategories([]);
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
    console.log(all);
    setChecked(all);
    formData.set("categories", all);
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className="list">
          <label className="form-check-label">
            {c.name}
            <input
              onChange={handleToggle(c._id)}
              type="checkbox"
              className="mr-2"
            />
            <span class="checkmark"></span>
          </label>
        </li>
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
      }
    });
  };

  return (
    <React.Fragment>
      <form onSubmit={publishBlog} className="formCreation">
        <div className="inputFields">
          <div className="field inputTitle">
            <label className="fieldLable heading-3">Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={handleChange("title")}
            />
          </div>

          <div className="field inputSubtitle">
            <label className="fieldLable heading-3">Sub Title</label>
            <input
              type="text"
              className="form-control"
              value={subtitle}
              onChange={handleChange("subtitle")}
            />
          </div>

          <div className="field inputTags">
            <label className="fieldLable heading-3">Tags</label>
            <input
              type="text"
              className="form-control"
              value={tags}
              onChange={handleChange("tags")}
              placeholder="*  Please use comma separated values (eg. Nike, New Balance, Jordans"
            />
          </div>
        </div>

        <div className="cat-list">
          <h4 className="heading-5">Categories</h4>

          <ul>{showCategories()}</ul>
        </div>

        <h4 className="heading-4">Upload a main header image</h4>

        <div className="uploadpreview form-control">
          {!mainphoto ? null : <img src={mainphoto} />}
        </div>

        <div className="upload-btn">
          <button
            id="upload_widget"
            className="btn btn-secondary"
            onClick={fullArticleHeaderSubmit("mainphoto")}
          >
            Upload Photo
          </button>
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

        <button type="submit" className="btn btn-publish btn-secondary ">
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

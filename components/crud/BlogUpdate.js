import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { singleBlog, updateBlog } from "../../actions/blog";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";
import Widgetsetting from "../pageelements/Cloudinary";
import { QuillModules, QuillFormats } from "../../helpers/quill";
import { Inputfield, CheckBox } from "../pageelements/forms/Inputfields";

const BlogUpdate = ({ router }) => {
  const [body, setBody] = useState("");

  const [categories, setCategories] = useState([]);
  //   const [tags, setTags] = useState([]);

  const [checked, setChecked] = useState([]); // categories

  const [values, setValues] = useState({
    title: "",
    error: "",
    success: "",
    formData: process.browser && new FormData(),
    title: "",
    subtitle: "",
    tags: "",
    mainphoto: "",
    body: "",
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
  } = values;

  const [imgFile, setimgFile] = useState(null);


  const token = getCookie("token");

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initBlog();
    initCategories();
    // initTags();
  }, [router]);

  const initBlog = () => {
    if (router.query.slug) {
      singleBlog(router.query.slug).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({
            ...values,
            title: data.title,
            subtitle: data.subtitle,
            mainphoto: data.mainphoto,
            tags: data.tags,
          });
          setBody(data.body);
          setCategoriesArray(data.categories);
        }
      });
    }
  };

  const setCategoriesArray = (blogCategories) => {
    let ca = [];
    blogCategories.map((c, i) => {
      ca.push(c._id);
    });
    setChecked(ca);
  };

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
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

  const findOutCategory = (c) => {
    const result = checked.indexOf(c);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
  
        <CheckBox
          key={i}
          onChange={handleToggle(c._id)}
          checked={findOutCategory(c._id)}
          type="checkbox"
          className="checkmark"
          label={c.name}
        />
      ))
    );
  };

  const handleChange = (name) => (e) => {
    // console.log(e.target.value);
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    let formData = new FormData();
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "" });
  };

  const handleBody = (e) => {
    setBody(e);
    if (body) {
      formData.set("body", e);
    }

    formData.set("body", e);
  };

  const editBlog = (e) => {
    e.preventDefault();
    updateBlog(formData, token, router.query.slug).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          success: `Blog titled "${data.title}" is successfully updated`,
        });
        if (isAuth() && isAuth().role === 1) {
          // Router.replace(`/admin/crud/${router.query.slug}`);
          // Router.replace(`/admin`);
        } else if (isAuth() && isAuth().role === 0) {
          // Router.replace(`/user/crud/${router.query.slug}`);
          Router.replace(`/user`);
        }
      }
    });
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

        setimgFile(result.info.path);

      }
    });
  };

  return (
    <React.Fragment>
      <div className={`${mainphoto ? "uploadpreview" : "uploadpreview form-control"}`}>
        {!mainphoto ? (
          <div className="heading">
            <h4 className="admin_heading-4">Upload a main header image</h4>

            <div className="upload-btn">
              <button id="upload_widget" className="btn btn-primary-grad" onClick={fullArticleHeaderSubmit("mainphoto")}>
                Upload Photo
              </button>
            </div>
          </div>
        ) : (
          <div className="uploaded_photo">
            <div className="img_info">
              <h4 className="admin_heading-4 filename">{imgFile}</h4>

              <div className="btns">
                <img src="/images/ui/change-photo.svg" alt="" className="change_photo" onClick={fullArticleHeaderSubmit("mainphoto")} />
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

        <form onSubmit={editBlog} className="formCreation">

          <div className="inputFields">
            <Inputfield label="Title" value={title} onChangeFunction={handleChange("title")} />

            <Inputfield label="Sub Title" value={subtitle} onChangeFunction={handleChange("subtitle")} />

            <Inputfield label="Tags" value={tags} onChangeFunction={handleChange("tags")} placeholder="*  Please use comma separated values (eg. Local, Politics, etc)" />
          </div>

          <div className="cat-list">
            <h4 className="heading-5">Categories</h4>

            <ul>{showCategories()}</ul>
          </div>

     

          <div className="upload-btn">
            <button id="upload_widget" className="btn btn-primary-grad" onClick={fullArticleHeaderSubmit("mainphoto")}>
              Upload Photo
            </button>
          </div>

          <div className="inputTextbox">
            <ReactQuill modules={QuillModules} formats={QuillFormats} value={body} placeholder="Write something amazing..." onChange={handleBody} />
          </div>

          <button type="submit" className="btn btn-publish btn-primary-grad ">
            Update
          </button>
        </form>

        <div className="status-msg">
          {showSuccess()}
          {showError()}
        </div>
      
    </React.Fragment>
  );
};

export default withRouter(BlogUpdate);

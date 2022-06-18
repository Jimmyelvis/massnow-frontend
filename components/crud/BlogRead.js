import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { list, removeBlog } from "../../actions/blog";
import moment from "moment";
import { useFilterContext } from "../../filter_context";
import Sort from "../pageelements/Sort";
import Filter from "../pageelements/Filters";


const BlogRead = () => {
  const { filtered_blogs: blogs } = useFilterContext();
  // const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const token = getCookie("token");


  const deleteBlog = (slug) => {
    removeBlog(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage(data.message);
        loadBlogs();
      }
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Are you sure you want to delete your blog?");
    if (answer) {
      deleteBlog(slug);
    }
  };

  const showUpdateButton = (blog) => {
    if (isAuth() && isAuth().role === 2) {
      return (
        <Link href={`/admin/crud/${blog.slug}`}>
          <a className="btn btn-primary-grad">Update</a>
        </Link>
      );
    } else if (blog.postedBy._id === isAuth()._id) {
      return (
        <Link href={`/admin/crud/${blog.slug}`}>
          <a className="btn btn-primary-grad">Update</a>
        </Link>
      );
    }
  };

  const showDeleteButton = (blog) => {
    if (isAuth() && isAuth().role === 2) {
      return (
        <button
          className="btn btn-thirdcolor-grad"
          onClick={() => deleteConfirm(blog.slug)}
        >
          Delete
        </button>
      );
    } else if (blog.postedBy._id === isAuth()._id) {
      return (
        <button
          className="btn btn-thirdcolor-grad"
          onClick={() => deleteConfirm(blog.slug)}
        >
          Delete
        </button>
      );
    }
  };

  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <div key={i} className="story">
          <img src={blog.mainphoto} alt="" className="mainphoto" />
          <h3 className="heading-3">
            <Link href={`/blogs/${blog.slug}`}>
              <a>{blog.title}</a>
            </Link>
          </h3>
          <p className="author">
            {blog.postedBy.name} | Published {" "}
            {moment(blog.updatedAt).fromNow()}
          </p>

          {/* <p className="excerpt">{blog.mdesc}</p> */}

          <div className="buttons">
            {showDeleteButton(blog)}
            {showUpdateButton(blog)}
          </div>
        </div>
      );
    });
  };

  

  return (
    <React.Fragment>
      {message && <div className="alert alert-warning">{message}</div>}
      <div className="sorting">
        <h2 className="heading-2 blogs-total">{blogs.length} Blogs Total</h2>
        <hr className="divider"/>
        <Sort />
      </div>
      <Filter />
      <div className="blogs-list">{showAllBlogs()}</div>
    </React.Fragment>
  );
};

export default BlogRead;

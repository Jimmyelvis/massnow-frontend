import Link from "next/link";
import React, { useState, useEffect } from "react";
import { getCookie, isAuth } from "../../../actions/auth";
import {
  list,
  listNotTopnews,
  listNotTopSportsnews,
  listNotTopLocalnews,
  singleBlog,
  updateBlogSection,
  updateSportsBlogSection,
  updateLocalBlogSection
} from "../../../actions/blog";
import moment from "moment";
import { useGlobalContext } from "../../../context/context";

const ListedBlogs = ({ blogentry, positionNumber, listFrom }) => {
  const { closeModal } = useGlobalContext();

  /**
   * This is the blog item sent in from (Topnewslist)
   * that is to be replaced (replacedBlog)
   */
  const [replacedBlog, setreplacedBlog] = useState(blogentry);
  const [blogs, setBlogs] = useState([]);
  const [values, setValues] = useState({
    prevPostId: "",
    nextPostId: "",
    nextPostPosNumber: "",
  });
  const [activeItem, setActiveItem] = useState("");
  const [getBlogsFrom, setgetBlogsFrom] = useState(listFrom);

  const { prevPostId, nextPostId, nextPostPosNumber } = values;

  const token = getCookie("token");

  useEffect(() => {
    loadBlogs();
    getReplacedBlog();
  }, []);

  const loadBlogs = () => {
    /**
     *
     * Get all blogs that are NOT currently in the top
     * news section. They will be assigned to the (blogs)
     * state varible
     */

    if (listFrom == "Top Sports") {
      listNotTopSportsnews().then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setBlogs(data);
        }
      });
    } else if (listFrom == "Top Local") {
      listNotTopLocalnews().then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setBlogs(data);
        }
      });
    } else {
      listNotTopnews().then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setBlogs(data);
        }
      });
    }
  };

  const getReplacedBlog = () => {
    singleBlog(replacedBlog).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setreplacedBlog(data);
        setValues({
          ...values,
          prevPostId: data._id,
          nextPostPosNumber: positionNumber,
        });
      }
    });
  };

  const showReplacedBlog = () => {
    return (
      <div className="story">
        <img src={replacedBlog.mainphoto} alt="" />

        <h3 className="heading-3">
          <Link href={`/blogs/${replacedBlog.slug}`}>
            <a>{replacedBlog.title}</a>
          </Link>
        </h3>

        <p className="subtitle">{replacedBlog.subtitle}</p>

        <p className="author">
          {/* by {replacedBlog.postedBy.name } |{" "} */}
          {moment(replacedBlog.createdAt).fromNow()}
        </p>
      </div>
    );
  };

  const showAllBlogs = () => {
    let checked;

    return blogs.map((blog, i) => {
      return (
        <div
          key={blog._id}
          className={activeItem === blog._id ? "story active" : "story"}
        >
          <div className="mainphoto">
            <div
              className={
                activeItem === blog._id
                  ? "activeInfo activeInfoactive"
                  : "activeInfo"
              }
            >
              <img
                src="/images/ui/checkmark.png"
                alt=""
                className="checkmark"
              />
              <h3 className="heading-3">SELECTED</h3>
              <h4 className="heading-4">Click submit to save your changes</h4>
            </div>
            <img src={blog.mainphoto} alt="" className="photo" />
          </div>

          <h3 className="heading-3">
            <Link href={`/blogs/${blog.slug}`}>
              <a>{blog.title}</a>
            </Link>
          </h3>

          <p className="subtitle">{blog.subtitle}</p>

          <p className="author">
            by {blog.postedBy.name} | {moment(blog.createdAt).fromNow()}
          </p>

          <div className="buttons">
            <button
              className="btn btn-primary-grad"
              onClick={() => {
                setValues({ ...values, nextPostId: blog._id });
                setActiveItem(blog._id);
              }}
            >
              Change
            </button>

            <button
              className={
                activeItem === blog._id
                  ? "btn btn-secondary-grad btn-secondary-grad-enabled"
                  : "btn-secondary-grad"
              }
              onClick={() => {
                submitReplacementBlog();
              }}
              disabled={activeItem === blog._id ? false : true}
            >
              Submit
            </button>
          </div>
        </div>
      );
    });
  };

  const submitReplacementBlog = () => {
    if (listFrom == "Top Sports") {
      updateSportsBlogSection(
        prevPostId,
        nextPostId,
        nextPostPosNumber,
        token
      ).then((data) => {
        if (data.error) {
        } else {
          console.log(data);
          closeModal();
        }
      });
    } else if (listFrom == "Top Local") {
      updateLocalBlogSection(
        prevPostId,
        nextPostId,
        nextPostPosNumber,
        token
      ).then((data) => {
        if (data.error) {
        } else {
          console.log(data);
          closeModal();
        }
      });
    } else {
      updateBlogSection(prevPostId, nextPostId, nextPostPosNumber, token).then(
        (data) => {
          if (data.error) {
          } else {
            console.log(data);
            closeModal();
          }
        }
      );
    }
  };

  return (
    <React.Fragment>
      {/* {showReplacedBlog()} */}
      {showAllBlogs()}
    </React.Fragment>
  );
};

export default ListedBlogs;

import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { getCookie, isAuth } from "../../../actions/auth";
import { list } from "../../../actions/blog";
import renderHTML from "react-render-html";
import moment from "moment";
import { useGlobalContext } from "../../../context";

const Choosefromlist = () => {
  const [blogs, setBlogs] = useState([]);

  const { topnews } = useGlobalContext();
  const [topnewsblogs, setTopnewsblogs] = useState([]);

  useEffect(() => {
    loadBlogs();
    loadTopNewsBlogs();
  }, []);

  const loadBlogs = () => {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
  };

  const loadTopNewsBlogs = () => {
    setTopnewsblogs(topnews);
  };

  const showAllTopBlogs = () => {
    console.log("============topnewsblogs========================");
    console.log(topnewsblogs);
    console.log("====================================");

    return topnewsblogs.map((topnewsblog, i) => {
      let label;

      switch (i) {
        case 0:
          label = "Main Story";
          break;
        case 1:
          label = "Second Story";
          break;
        case 2:
          label = "Third Story";
          break;
        case 3:
          label = "Fourth Story";
          break;
        case 4:
          label = "Fifth Story";
          break;
        default:
          break;
      }

      return (
        <div key={i} className="story">
          <h3 className="heading-3">{label}</h3>
          <img src={topnewsblog.blog.mainphoto} alt="" className="mainphoto" />

          <h3 className="heading-3">
            <Link href={`/blogs/${topnewsblog.blog.slug}`}>
              <a>{topnewsblog.blog.title}</a>
            </Link>
          </h3>

          <p className="author">
            Written by {topnewsblog.blog.postedBy.name} | Published on{" "}
            {moment(topnewsblog.blog.updatedAt).fromNow()}
          </p>

          <p className="excerpt">{topnewsblog.blog.mdesc}</p>

          <div className="buttons">
            <button className="btn btn-teal">Edit</button>

            <button
              className="btn btn-danger"
              onClick={() => deleteConfirm(topnewsblog.blog.slug)}
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
  };

  const choosen = (checked, id) => {
    console.log('====================================');
    console.log('id  ' + id + ' checked ' + checked );
    console.log('====================================');

    /**
     * This may be where I'm supposed to send the info to the backend
     */
  }



  const showAllBlogs = () => {
    let checked

    return blogs.map((blog, i) => {
      return (


        <div key={blog._id} className="story">
          <img src={blog.mainphoto} alt="" className="mainphoto" />

          <h3 className="heading-3">
            <Link href={`/blogs/${blog.slug}`}>
              <a>{blog.title}</a>
            </Link>
          </h3>

          <p className="subtitle">{blog.subtitle}</p>

          <p className="author">
            by {blog.postedBy.name} | {moment(blog.updatedAt).fromNow()}
          </p>

          <div className="options">
            <label className="form-check-label">
              1
              <input
                onClick={() => checked = 0 }
                type="radio"
                name="entry"
                className="mr-2"
              />
              <span class="checkmark"></span>
            </label>

            <label className="form-check-label">
              2
              <input
                onClick={() => checked = 1 }
                // onChange={handleToggle(c._id)}
                type="radio"
                name="entry"
                className="mr-2"
              />
              <span class="checkmark"></span>
            </label>

            <label className="form-check-label">
              3
              <input
                onClick={() => checked = 2 }
                type="radio"
                name="entry"
                className="mr-2"
              />
              <span class="checkmark"></span>
            </label>

            <label className="form-check-label">
              4
              <input
                onClick={() => checked = 3 }
                type="radio"
                name="entry"
                className="mr-2"
              />
              <span class="checkmark"></span>
            </label>

            <label className="form-check-label">
              5
              <input
                onClick={() => checked = 4 }
                type="radio"
                name="entry"
                className="mr-2"
              />
              <span class="checkmark"></span>
            </label>
          </div>

          <div className="buttons">
            <button className="btn btn-teal" 
                onClick={() => 
                    choosen(checked, blog._id)
                
                }>
                Add
            </button>
          </div>
        </div>
      );
    });
  };

  return <React.Fragment>
  {showAllBlogs()}
  {/* {showAllTopBlogs()} */}
  </React.Fragment>;
};

export default Choosefromlist;

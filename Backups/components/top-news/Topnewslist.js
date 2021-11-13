import Link from "next/link";
import React, { useState, useEffect } from "react";
import { getCookie, isAuth } from "../../../actions/auth";
import { list, removeBlog } from "../../../actions/blog";
import renderHTML from "react-render-html";
import ListedBlogs from "./ListedBlogs";
import moment from "moment";
import { useGlobalContext } from '../../../context'
import Modal from "../../../components/pageelements/Modal";



const Topnewslist = () => {
  const {  openModal, isModalOpen } = useGlobalContext();
  const [topnewsblogs, setTopnewsblogs] = useState([]);
  const [choosenBlog, setchoosenBlog] = useState("");


  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setTopnewsblogs(data);
      }
    });
  };

  // const loadBlogs = () => {
  //   setTopnewsblogs(topnews)
  // };

  const showAllBlogs = () => {

    return topnewsblogs.map((topnewsblog, i) => {
      let label;

      switch (i) {
        case 0:
          label = "Main Story"
          break;
        case 1:
          label = "Second Story"
          break;
        case 2:
          label = "Third Story"
          break;
        case 3:
          label = "Fourth Story"
          break;
        case 4:
          label = "Fifth Story"
          break;
        default:
          break;
      }

      return (
        <div key={topnewsblog.blog._id} className="entry">
          <h3 className="heading-3 label">{label}</h3>

          <div className="story">
            <img
              src={topnewsblog.blog.mainphoto}
              alt=""
              className="mainphoto"
            />

            <h3 className="heading-3">
              <Link href={`/blogs/${topnewsblog.blog.slug}`}>
                <a>{topnewsblog.blog.title}</a>
              </Link>
            </h3>

            <p className="author">
              By {topnewsblog.blog.postedBy.name} -{" "}
              {moment(topnewsblog.blog.updatedAt).fromNow()}
            </p>

            <p className="excerpt">{topnewsblog.blog.mdesc}</p>

            <div className="buttons">
              <button
                onClick={() => {
                  openModal()
                  setchoosenBlog(topnewsblog.blog.slug);
                }}
                className="btn btn-teal"
              >
                Edit
              </button>

              <button
                className="btn btn-danger"
                onClick={() => deleteConfirm(topnewsblog.blog.slug)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      );
    });
 
 
  };


  return (
    <React.Fragment>
      {isModalOpen ? (
        <Modal
          contentBgcolor={null}
          overlayColor={`rgba(242, 246, 252, 0.95)`}
          gridType={`Choosefromlist`}
          transition={`all 0.7s linear`}
        >
          {/* <ListedBlogs blogentry={choosenBlog} /> */}
        </Modal>
      ) : (
        ""
      )}

      <div className="topnewslistings">{showAllBlogs()}</div>
    </React.Fragment>
  );
}

export default Topnewslist;
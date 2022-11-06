import React, { useEffect, useState } from "react";
import { Avatar } from "../pageelements/Avatar";
import Pageheading from "../admin/Pageheading";
import Link from "next/link";
import { singleCategory } from "../../actions/category";
import moment from "moment";

const BlogsOverlay = ({ articlelist, title, target }) => {
  const [blogs, setBlogs] = useState([]);

  const loadBlogs = () => {
    singleCategory(target).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data.blogs);
      }
    });
  };

  useEffect(() => {
    loadBlogs();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = null;
    };
  }, []);

  const getArticles = () => {
    return blogs.map((entry) => {
      let { title, slug, subtitle, postedBy, createdAt, mainphoto } = entry;
      let { name } = postedBy;

      return (
        <div className="entry">
          <div className="date">
            <p>{moment(createdAt).fromNow()}</p>
          </div>

          <div className="info">
            <Link href={`/blogs/${slug}`}>
              <a>
                <h3 className="title">{title}</h3>
                <h4 className="subtitle">{subtitle}</h4>
              </a>
            </Link>
            <h4 className="name">{name}</h4>
          </div>

          <div className="overlay"></div>
          <img src={mainphoto} alt="" className="mainphoto" />
        </div>
      );
    });
  };

  return (
    <div className="card blogs_overlay_List">
      <Pageheading title={title} />

      <div className="entries blogs">{getArticles()}</div>
    </div>
  );
};

export default BlogsOverlay;

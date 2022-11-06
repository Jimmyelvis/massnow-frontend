import React, { useState, useEffect } from "react";
import { list } from "../../actions/blog";
import { CardOverlayVersion } from "../pageelements/Cards";

const RecentStories = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        let recentArticles = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);

        setBlogs(recentArticles);
      }
    });
  };

  return (
    <div className="recent-stories">
      <h3 className="heading-3">Recent Stories</h3>

      <div className="articles">
        {blogs.map((blog, i) => {
          return (
            <CardOverlayVersion
              mainphoto={blog.mainphoto}
              title={blog.title}
              subtitle={blog.subtitle}
              author={blog.author}
              slug={blog.slug}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecentStories;

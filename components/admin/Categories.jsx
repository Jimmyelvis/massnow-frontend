import React, { useState, useEffect } from "react";
import Link from "next/link";
import { list } from "../../actions/blog";
import AdminModal from "../pageelements/AdminModal";
import { useGlobalContext } from "../../context/context";
import BlogsOverlay from "../blog/BlogsOverlay";

const Categories = () => {
  const [blogs, setBlogs] = useState([]);
  const { isModalOpen, openModal, openOverlay, isOverlayOpen } = useGlobalContext();
  const [categoryTarget, setCategoryTarget] = useState("");
  const [categoryName, setCategoryName] = useState("");


  const loadBlogs = () => {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const getCategories = () => {

    const newData = blogs.reduce((total, current) => {

      /** 
       * If the current blog has a category, add it to the total object
       * If the category already exists, increment the count
       * If the category doesn't exist, set the count to 1
       */
      if (current.categories) {
        current.categories.map((category) => {
          if (!total[category.name]) {
            total[category.name] = { ...category, count: 1 };
          } else {
            total[category.name].count++;
          }
        });
      }
      return total;
    }, []);


    const mostCategories = Object.values(newData)
      .sort((a, b) => b.count - a.count)



    return mostCategories.map((entry, index) => (
      <div key={index} className="article_entry category" onClick={() => { openModal(), setCategoryTarget(entry.slug), setCategoryName(entry.name)}}>

        <div className="article_info">
          <h4 className="admin_heading-4 title">{entry.name}</h4>
        </div>

        <div className="date">
          <span className="count">{entry.count}</span>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="card categories">
        <h3 className="admin_heading-3 index_card_heading">Categories</h3>

        <div className="article_entries">{getCategories()}</div>
      </div>

      <AdminModal selector="#root_modal">
        <BlogsOverlay
          title={categoryName}
          target={categoryTarget}
        />
      </AdminModal>
    </>
  );
};

export default Categories;

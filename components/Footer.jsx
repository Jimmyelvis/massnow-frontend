import React, { useState, useEffect } from "react";
import Link from "next/link";
import { list } from "../actions/comments";
import { getCategoriesWithBlogs } from "../actions/category";
import Social from "./footer/Social";

const Footer = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);

  const getBlogs = () => {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
  };

  const getCategoriesList = () => {
    getCategoriesWithBlogs().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const getMostPopular = () => {
    /**
     * Reduce the comments array to an object with the comment id as the key and the number of comments as the value
     */

    const newData = blogs.reduce((total, current) => {
      if (current.post) {
        const { _id } = current.post;

        if (!total[_id]) {
          total[_id] = { ...current.post, count: 1 };
        } else {
          total[_id].count++;
        }
      }

      return total;
    }, []);

    /**
     * Convert the object to an array then sort it by the count
     */
    const mostPopular = Object.values(newData)
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);


    return mostPopular.map((entry, index) => (
      <li key={index} className="article_entry">
        <Link href={`/blogs/${entry.slug}`}>
          <a>
            <img src={entry.mainphoto} alt="" className="thumbnail" />

            <div className="info">
              <h3 className="heading-3 title">{entry.title}</h3>
              <h4 className="heading-4 subtitle">{entry.subtitle}</h4>
              <p>{entry.body}</p>
            </div>
          </a>
        </Link>
      </li>
    ));
  };

  const displayCategories = () => {
    return categories.map((category, index) => (
      <li key={index}>
        <Link href={`/categories/${category.slug}`}>
          <a>{category.name}</a>
        </Link>
      </li>
    ));
  };

  useEffect(() => {
    getBlogs();
    getCategoriesList();
  }, []);

  return (
    <footer>
      <div className="container">
        <div className="footer_col footer_col_one">
          <img src="/images/logo-wht-text-orange-singnal.png" alt="" className="footer_logo" />

          <p className="desc">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis laboriosam architecto hic repellendus earum expedita aspernatur illum sed deleniti est!</p>

          <div className="connect">
            <h3 className="heading-3 col_heading">Connect With Us</h3>

            <Social />
          </div>
        </div>

        <div className="footer_col footer_col_two">
          <h3 className="heading-3 col_heading">Popular Articles</h3>

          <ul className="popular_articles">{getMostPopular()}</ul>
        </div>

        <div className="footer_col footer_col_three">
          <h3 className="heading-3 col_heading">Categories</h3>

          <ul className="category_list">{displayCategories()}</ul>
        </div>
      </div>

      <div className="copyright">
        <p>CopyRight 2022 MassNow News</p>
      </div>
    </footer>
  );
};

export default Footer;

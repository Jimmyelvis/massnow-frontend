import React from 'react'
import Link from "next/link";

const CategoriesTags = ({ blog }) => {

    const showBlogCategories = (blog) =>
      blog.categories.map((c, i) => (
        <Link key={i} href={`/categories/${c.slug}`}>
          <a>{c.name}</a>
        </Link>
      ));

    const showBlogTags = (blog) =>
      blog.tags.map((t, i) => (
        <Link key={i} href={`/tags/${t}`}>
          <a>{t}</a>
        </Link>
      ));


  return (
    <>
      <div class="categories">
        <h3 class="heading-3">Categories</h3>

        <ul>{showBlogCategories(blog)}</ul>
      </div>

      <div class="categories tags">
        <h3 class="heading-3">Tags</h3>

        <ul>{showBlogTags(blog)}</ul>
      </div>
    </>
  );
}

export default CategoriesTags
import React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { singleCategory } from "../../actions/category";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import renderHTML from "react-render-html";
import moment from "moment";
import { CardOverlayVersion } from "../../components/pageelements/Cards";

const Category = ({ category, blogs, query }) => {
  const [featuredBlog, setFeaturedBlog] = useState("");

  useEffect(() => {
    setFeaturedBlog(blogs[0]);
  });

  let theBlogs = blogs[0];

  const head = () => (
    <Head>
      <title>
        {category.name} | {APP_NAME}
      </title>
      <meta
        name="description"
        content={`Best programming tutorials on ${category.name}`}
      />
      <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />
      <meta property="og:title" content={`${category.name}| ${APP_NAME}`} />
      <meta
        property="og:description"
        content={`Best programming tutorials on ${category.name}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${DOMAIN}/static/images/seoblog.jpg`}
      />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/static/images/seoblog.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
      {/* <meta property="fb:app_id" content={`${FB_APP_ID}`} /> */}
    </Head>
  );

  return (
    <React.Fragment>
      {head()}

      <Layout>
        <div class="hero category-detail">
          <div className="info">
            <h2 className="heading-2">{featuredBlog.title}</h2>
            <h3 className="heading-3">{featuredBlog.subtitle}</h3>

            <h4 className="heading-4">By: {theBlogs.postedBy && theBlogs.postedBy.name}</h4>
            {renderHTML(theBlogs.excerpt)}

            <Link href={`/blogs/${theBlogs.slug}`}>
              <a className="readmore">Read More</a>
            </Link>
          </div>
          <div class="overlay"></div>

          <img src={featuredBlog.mainphoto} class="herobg" alt="" />
        </div>

        <div className="category-single">
          <h2 className="heading-2">
            Category:<span className="tag"> {category.name}</span>
          </h2>

          <div className="blogs">
            {blogs.map((blog, i) => (

              <CardOverlayVersion 
                key={i}
                title={blog.title}
                subtitle={blog.subtitle}
                author={blog.postedBy && blog.postedBy.name}
                mainphoto={blog.mainphoto}
                slug={blog.slug}

              />
            ))}
          </div>
        </div>
      </Layout>

      
    </React.Fragment>
  );
};

Category.getInitialProps = ({ query }) => {
  return singleCategory(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { category: data.category, blogs: data.blogs, query };
    }
  });
};

export default Category;

import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import { singleBlog, listRelated } from "../../actions/blog";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import renderHTML from "react-render-html";
import moment from "moment";
import SmallCard from "../../components/blog/SmallCard";

const SingleBlog = ({ blog, query }) => {
  const [related, setRelated] = useState([]);

  const loadRelated = () => {
    listRelated({ blog }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  };

  useEffect(() => {
    loadRelated();
  }, [blog]);

  const head = () => (
    <Head>
      <title>
        {blog.title} | {APP_NAME}
      </title>
      <meta name="description" content={blog.mdesc} />
      <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:title" content={`${blog.title}| ${APP_NAME}`} />
      <meta property="og:description" content={blog.mdesc} />
      <meta property="og:type" content="webiste" />
      <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
      <meta
        property="og:image:secure_url"
        ccontent={`${API}/blog/photo/${blog.slug}`}
      />
      <meta property="og:image:type" content="image/jpg" />
      {/* <meta property="fb:app_id" content={`${FB_APP_ID}`} /> */}
    </Head>
  );

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

  const showRelatedBlog = () => {
    return related.map((blog, i) => (
      <div className="card-OverlayType" key={i}>
        <div className="card-info">
          <Link href={`/blogs/${blog.slug}`}>
            <a>
              <div className="heading-3">{blog.title}</div>

            </a>
          </Link>
        </div>

        <div className="overlay"></div>
        <img src={blog.mainphoto} alt="" className="card-bg" />
      </div>
    ));
  };

  return (
    <React.Fragment>
      <Layout>
      
        <div class="hero art-detail">
          <div class="overlay"></div>
          <img src={blog.mainphoto} class="herobg" alt="" />
        </div>

        <div className="content-detail">
          <div class="heading-2">{blog.title}</div>

          <p class="subheading">
            {blog.subtitle}
          </p>

          <div class="author">

            <div className="avatar">
              <img
                src={blog.postedBy.photo}
                alt="user profile"
              />
            </div>

            <div className="written-by">

              by <Link href={`/profile/${blog.postedBy.username}`}><a>{blog.postedBy.name}</a></Link>  | <span className="published">Published {moment(blog.updatedAt).fromNow()}</span> 
            </div>


            <ul class="social">

              <li>
                <svg
                  id="facebook_icon"
                  data-name="facebook icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                >
                  <g
                    id="Ellipse_8"
                    data-name="Ellipse 8"
                    fill="#fffcf8"
                    stroke="rgba(212,222,239,0.35)"
                    stroke-width="1"
                  >
                    <circle cx="20" cy="20" r="20" stroke="none" />
                    <circle cx="20" cy="20" r="19.5" fill="none" />
                  </g>
                  <path
                    id="Icon_awesome-facebook-f"
                    data-name="Icon awesome-facebook-f"
                    d="M12.15,11.847l.585-3.812H9.078V5.562A1.906,1.906,0,0,1,11.227,3.5h1.663V.258A20.276,20.276,0,0,0,9.938,0C6.926,0,4.957,1.826,4.957,5.13v2.9H1.609v3.812H4.957v9.214h4.12V11.847Z"
                    transform="translate(12.391 9)"
                    fill="#0550c1"
                  />
                </svg>
              </li>

              <li>
                <svg
                  id="twiiter_icon"
                  data-name="twiiter icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                >
                  <g
                    id="Ellipse_7"
                    data-name="Ellipse 7"
                    fill="#fffcf8"
                    stroke="rgba(212,222,239,0.35)"
                    stroke-width="1"
                  >
                    <circle cx="20" cy="20" r="20" stroke="none" />
                    <circle cx="20" cy="20" r="19.5" fill="none" />
                  </g>
                  <path
                    id="Icon_awesome-twitter"
                    data-name="Icon awesome-twitter"
                    d="M22.845,8.535c.016.226.016.452.016.679A14.746,14.746,0,0,1,8.014,24.061,14.747,14.747,0,0,1,0,21.718a10.8,10.8,0,0,0,1.26.065,10.451,10.451,0,0,0,6.479-2.23A5.228,5.228,0,0,1,2.86,15.934a6.581,6.581,0,0,0,.986.081,5.519,5.519,0,0,0,1.373-.178,5.219,5.219,0,0,1-4.185-5.122v-.065a5.256,5.256,0,0,0,2.359.662,5.226,5.226,0,0,1-1.616-6.98,14.833,14.833,0,0,0,10.76,5.461,5.891,5.891,0,0,1-.129-1.2A5.224,5.224,0,0,1,21.44,5.029a10.274,10.274,0,0,0,3.312-1.26,5.2,5.2,0,0,1-2.294,2.876,10.462,10.462,0,0,0,3.005-.808,11.218,11.218,0,0,1-2.617,2.7Z"
                    transform="translate(7 6.619)"
                    fill="#2699fb"
                  />
                </svg>
              </li>

              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                >
                  <g id="Pintrist" transform="translate(-616 -823)">
                    <g
                      id="Ellipse_9"
                      data-name="Ellipse 9"
                      transform="translate(616 823)"
                      fill="#fffcf8"
                      stroke="rgba(212,222,239,0.35)"
                      stroke-width="1"
                    >
                      <circle cx="20" cy="20" r="20" stroke="none" />
                      <circle cx="20" cy="20" r="19.5" fill="none" />
                    </g>
                    <path
                      id="Icon_awesome-pinterest-p"
                      data-name="Icon awesome-pinterest-p"
                      d="M10.058.457C5,.457,0,3.829,0,9.287c0,3.471,1.952,5.443,3.136,5.443.488,0,.769-1.361.769-1.745,0-.459-1.168-1.435-1.168-3.343A6.663,6.663,0,0,1,9.659,2.868c3.358,0,5.842,1.908,5.842,5.414,0,2.618-1.05,7.529-4.452,7.529a2.189,2.189,0,0,1-2.278-2.159c0-1.864,1.3-3.668,1.3-5.591,0-3.264-4.63-2.672-4.63,1.272a5.792,5.792,0,0,0,.473,2.5c-.68,2.929-2.071,7.292-2.071,10.309,0,.932.133,1.849.222,2.781.168.187.084.168.34.074,2.485-3.4,2.4-4.068,3.52-8.52a4,4,0,0,0,3.417,1.775c5.236,0,7.588-5.1,7.588-9.7C18.933,3.652,14.7.457,10.058.457Z"
                      transform="translate(627 830.543)"
                      fill="#c10b0b"
                    />
                  </g>
                </svg>
              </li>
              
            </ul>

          </div>

          
          <div className="content">
            {renderHTML(blog.body)}

            <div class="categories">
              <h3 class="heading-3">Categories</h3>

              <ul>{showBlogCategories(blog)}</ul>
            </div>

            <div class="categories">
              <h3 class="heading-3">Tags</h3>

              <ul>{showBlogTags(blog)}</ul>
            </div>

            <div className="related">

              <h3 className="heading-3">Related blogs</h3>

              <div className="related-blogs">
                {showRelatedBlog()}
              </div>
            </div>

          </div>
      
        </div>
     
      </Layout>
    </React.Fragment>
  );
};

SingleBlog.getInitialProps = ({ query }) => {
  return singleBlog(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { blog: data };
    }
  });
};

export default SingleBlog;

import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import Sectionhero from "../../components/hero/Sectionhero";
import { userPublicProfile } from "../../actions/user";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import { isAuth } from "../../actions/auth";
import moment from "moment";
import renderHTML from "react-render-html";
import { FaEdit } from "react-icons/fa";
import { Tab, Tabs } from "../../components/pageelements/Tabs";

const UserProfile = ({ user, blogs, query }) => {
  const head = () => (
    <Head>
      <title>
        {user.name} | {APP_NAME}
      </title>
      <meta name="description" content={`Blogs by ${user.name}`} />
      <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
      <meta property="og:title" content={`${user.name}| ${APP_NAME}`} />
      <meta property="og:description" content={`Blogs by ${user.username}`} />
      <meta property="og:type" content="webiste" />
      <meta property="og:url" content={`${DOMAIN}/profile/${query.username}`} />
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
    </Head>
  );

  const showUserBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <div className="card-OverlayType" key={i}>
          <div className="card-info">
            <Link href={`/blogs/${blog.slug}`}>
              <a>
                <div className="heading-3">{blog.title}</div>

                <div className="heading-4">{blog.subtitle}</div>
              </a>
            </Link>
          </div>

          <div className="overlay"></div>
          <img src={blog.mainphoto} alt="" className="card-bg" />
        </div>
      );
    });
  };

  const showFavArticles = () => {
    return user.favorite_articles.map((blog, i) => {
      return (
        <div className="card-OverlayType" key={i}>
          <div className="card-info">
            <Link href={`/blogs/${blog.slug}`}>
              <a>
                <div className="heading-3">{blog.post_title}</div>

                <div className="heading-4">{blog.postAuthor}</div>
              </a>
            </Link>
          </div>

          <div className="overlay"></div>
          <img src={blog.mainPhoto} alt="" className="card-bg" />
        </div>
      );
    });
  };

  return (
    <React.Fragment>
      {head()}

      <Layout>
        <Sectionhero
          /**
           *  contentColCount -- determines how many columns the content section
           *  will have. Additional options can be set such as  "narrow-wide" which
           *  means the first coloum will be smaller than the second, "wide-narrow"
           *  which will be the reverse, or even in both will have equal width. Default
           * is even
           */

          image={`${
            !user.profileBanner
              ? "/images/pexels-freestocksorg-58639.jpg"
              : user.profileBanner
          }`}
          heroclasses={"hero profile-hero"}
          readmoreSection={false}
        >
          <div className="profileAvatar">
            <div className="avatar">
              {!user.photo ? (
                <img src="/images/ui/avatar.jpg" alt="" />
              ) : (
                <img src={user.photo} alt="" />
              )}
            </div>

            <h3 className="heading-3">{user.name}</h3>

            {isAuth().username === user.username ? (
              <Link href="/user/update">
                <a>
                  <div className="edit-profile">
                    <h4 className="heading-4">Edit Profile</h4>

                    <div className="icon-holder">
                      <FaEdit className="edit-icon" />
                    </div>
                  </div>
                </a>
              </Link>
            ) : (
              ""
            )}
          </div>
        </Sectionhero>

        <div className="profilePg">
          <Tabs>
            <Tab label={"bio"} tabName={"Bio"}>
              <div className="bio">
                {user.about ? (
                  renderHTML(user.about)
                ) : (
                  <h3 className="heading-3 no-bio">
                    User does not have a bio yet.
                  </h3>
                )}
              </div>
            </Tab>

            {user.role >= 1 && blogs.length > 0 ? (
              <Tab label={"user blogs"} tabName={"User Blogs"}>
                <div className="blogsection">
                  <div className="blogs">{showUserBlogs()}</div>
                </div>
              </Tab>
            ) : (
              <></>
            )}

            <Tab label={"favorite posts"} tabName={"Favorite Posts"}>
              <div className="blogsection">
                <div className="blogs">{showFavArticles()}</div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </Layout>
    </React.Fragment>
  );
};

UserProfile.getInitialProps = ({ query }) => {
  // console.log(query);
  return userPublicProfile(query.username).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { user: data.user, blogs: data.blogs, query };
    }
  });
};

export default UserProfile;

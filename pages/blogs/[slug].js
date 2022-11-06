import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import React, { useState, useEffect } from "react";
import { singleBlog, listRelated, addFavorite, removeFavorite } from "../../actions/blog";
import { API, DOMAIN, APP_NAME } from "../../config";
import renderHTML from "react-render-html";
import moment from "moment";
import { isAuth, getCookie } from "../../actions/auth";
import { userPublicProfile } from "../../actions/user";
import { useGlobalContext } from "../../context/context";
import CommentsOverlay from "../../components/slug/commentsOverlay";
import Comments from "../../components/slug/comments";
import Title from "../../components/blog/Title";
import RecentStories from "../../components/blog/RecentStories";
import CategoriesTags from "../../components/blog/CategoriesTags";
import Related from "../../components/blog/Related";
import Author from "../../components/blog/Author";

const SingleBlog = ({ blog, query }) => {
  const [related, setRelated] = useState([]);
  const [isFavored, setIsFavored] = useState(false);
  const [userFavs, setUserFavs] = useState([]);
  const [overlayOpen, setoverlayOpen] = useState(false);

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
    checkFavored();
  }, [blog]);

  const token = getCookie("token");

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
      <meta property="og:image:secure_url" ccontent={`${API}/blog/photo/${blog.slug}`} />
      <meta property="og:image:type" content="image/jpg" />
      {/* <meta property="fb:app_id" content={`${FB_APP_ID}`} /> */}
    </Head>
  );

  const addToFavorite = () => {
    const user_id = isAuth()._id;
    const post_id = blog._id;
    const post_title = blog.title;
    const mainPhoto = blog.mainphoto;
    const postAuthor = blog.postedBy.name;
    const slug = blog.slug;

    addFavorite(user_id, post_id, post_title, mainPhoto, postAuthor, slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setIsFavored(true);
      }
    });
  };

  const removeFromFavorites = () => {
    const user_id = isAuth()._id;
    const post_id = blog._id;

    removeFavorite(user_id, post_id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setIsFavored(false);
      }
    });
  };

  const checkFavored = () => {
    if (isAuth()) {
      let userFavoriteArticles;

      userPublicProfile(isAuth().username).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setUserFavs(data.user.favorite_articles);

          let userFavoriteArticles = data.user.favorite_articles.find((elem) => {
            return elem.post_id === blog._id;
          });

          if (userFavoriteArticles) {
            setIsFavored(true);
          } else {
            setIsFavored(false);
          }
        }
      });
    }
  };

  const openModal = () => {
    setoverlayOpen(true);
  };

  return (
    <React.Fragment>
      <Layout>
        <div class="hero art-detail">
          <div class="overlay"></div>
          <img src={blog.mainphoto} class="herobg" alt="" />
        </div>

        <div className="content-detail">
          <Title blog={blog} openModal={openModal} addFavorite={addFavorite} removeFavorite={removeFromFavorites} isFavored={isFavored} />

          <div className="content">
            {renderHTML(blog.body)}

          </div>

          <RecentStories />

          <CategoriesTags blog={blog} />

          <Author
            author={blog.postedBy}
          />
          <Related related={related} />
        </div>


      </Layout>

      <CommentsOverlay contentBgcolor={null} overlayColor={`rgba(30, 40, 55, 0.76)`} transition={`all 0.7s linear`} overlayOpen={overlayOpen}>
        <Comments overlayOpen={overlayOpen} setoverlayOpen={setoverlayOpen} postId={blog._id} />
      </CommentsOverlay>
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

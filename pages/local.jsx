import Layout from "../components/Layout";
import Hero from "../components/hero/LatestHero";
import Majorsection from "../components/pageelements/Majorsection";
import Otherstories from "../components/hero/Otherstories";
import Secheading from "../components/pageelements/Secheading";
import Head from "next/head";
import "../scss/style.scss";
import Link from "next/link";
import { sortElems } from "../helpers/sorting";
import { API, DOMAIN, APP_NAME } from "../config";
import renderHTML from "react-render-html";

const local = ({ articles }) => {
  let sortedByUpdated = articles.sort((art1, art2) => {
    return sortElems(art2, art1, "updatedAt");
  });

  let featuredLocal = articles.filter((article) => {
    return article.featuredLocal > 0 && article.featuredLocal < 4;
  });

  let alllocalnews = articles.filter((article) => {
    return (
      (article.categories[0].name === "Local News" &&
        article.featuredLocal < 1) ||
      article.featuredLocal > 3
    );
  });

  let alllocalnewsFeatured = alllocalnews.slice(0, 3);
  let therestof = alllocalnews.slice(4);

  const showMajorSectionBlogs = () => {
    return alllocalnewsFeatured.map((blog) => {
      return (
        <div className="entry">
          <div className="thumb">
            <img src={blog.mainphoto} alt="" />
          </div>

          <Link href={`blogs/${blog.slug}`} key={blog.slug}>
            <a>
              <h4 className="heading-4">{blog.title} </h4>
            </a>
          </Link>
          <span className="author">{blog.postedBy.name}</span>
        </div>
      );
    });
  };

  const showBlogs = () => {
    return therestof.map((blog) => {
      return (
        <div className="entry">
          <div className="thumb">
            <img src={blog.mainphoto} alt="" />
          </div>

          <Link href={`blogs/${blog.slug}`} key={blog.slug}>
            <a>
              <h4 className="heading-4">{blog.title} </h4>
            </a>
          </Link>
        </div>
      );
    });
  };

  return (
    <Layout>
      <Head>
        <title>Welcome To MassNow News Site</title>
      </Head>

      <Hero blogs={featuredLocal} />

      <div className="topnewssection">
        <div className="secheading">
          <h2 className="heading-2 u-margin-bottom-big">Local News</h2>
        </div>

        <div className="content">
          <div className="majorsection">{showMajorSectionBlogs()}</div>

          <div className="therest-of-items">{showBlogs()}</div>
        </div>
      </div>
    </Layout>
  );
};

export default local;

export const getStaticProps = async () => {
  const res = await fetch(`${API}/api/blogs`);

  const articles = await res.json();

  return {
    props: {
      articles,
    },
  };
};

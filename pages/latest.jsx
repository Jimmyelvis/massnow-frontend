
import Layout from "../components/Layout";
import Hero from "../components/hero/LatestHero";
import Latest from "../components/index/latest";
import Sports from "../components/index/sports";
import Local from "../components/index/local";
import Head from "next/head";
import Link from "next/link";
import { sortElems } from "../helpers/sorting";
import { API, DOMAIN, APP_NAME } from "../config";
import renderHTML from "react-render-html";

const LatestNews = ({ articles }) => {

   
   let sortedByUpdated = articles.sort((art1, art2) => {
     return sortElems(art2, art1, "updatedAt");
   });
 
   let latestFeatured = sortedByUpdated.slice(0, 3);
   sortedByUpdated = sortedByUpdated.slice(4, 7);
 
   const showMajorSectionBlogs = () => {
     return sortedByUpdated.map((blog) => {
       return (
         <div className="entry" key={blog.slug}>
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
 
   let therestof = articles.filter((article) => {
     return !article.featuredTopstory > 0 && !article.featuredSports > 0;
   });
 
   therestof = therestof.slice(8, 14);
 
   let col_1 = therestof.slice(0, 2);
   let col_2 = therestof.slice(2, 4);
   let col_3 = therestof.slice(4, 6);
 
   const showCol = (col) => {
     return col.map((blog) => {
       return (
         <div className="entry">
           <Link href={`blogs/${blog.slug}`} key={blog.slug}>
             <a>
               <h4 className="heading-4">{blog.title} </h4>
             </a>
           </Link>
 
           <span className="author">{blog.postedBy.name}</span>
 
           {renderHTML(blog.excerpt)}
 
           <div className="thumb">
             <img src={blog.mainphoto} alt="" />
           </div>
         </div>
       );
     });
   };


  return (
    <Layout>
      <Head>
        <title>Welcome To MassNow News Site</title>
      </Head>

      <Hero blogs={latestFeatured} />

      <div className="topnewssection">
        <div className="secheading">
          <h2 className="heading-2 u-margin-bottom-big">Latest News</h2>
        </div>

        <div className="content">
          <div className="majorsection">{showMajorSectionBlogs()}</div>

          <div className="minorsection">
            <div className="column">{showCol(col_1)}</div>

            <div className="column">{showCol(col_2)}</div>

            <div className="column">{showCol(col_3)}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LatestNews;

export const getStaticProps = async () => {
  const res = await fetch(`${API}/api/blogs`);

  const articles = await res.json();

  return {
    props: {
      articles,
    },
  };
};

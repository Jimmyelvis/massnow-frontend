import Link from "next/link";
import { sortElems } from "../../helpers/sorting";
import { Smallblogcard } from "../pageelements/Cards";

 /**
     *  This section (News) is for the rest of the articles
     *  First filter for every
     *  article that is NOT a top story, or featured sports article.
     *  Then slice out the first 7 articles, the remaining articles
     *  after that will be passed to here.
     */

const local = ({ articles }) => {
  /**
   * Initialize the variable blogs
   * this will contain the blogs that will be fed
   * into this component
   */
  let blogs;
  let therestof;

  if (articles.length > 0) {

    blogs = articles;

    therestof = blogs.filter((blog) => {
      return !blog.featuredTopstory > 0 && !blog.featuredSports > 0;
    });
    therestof = therestof.slice(7);

  }

   

  const showBlogs = () => {

    if (therestof.length > 0) {

     return  therestof.map((blog) => {
        return (
           <Smallblogcard
            mainphoto={blog.mainphoto}
            title={blog.title}
            slug={blog.slug}
          />
        );
      });
      
    }

  };

  return (
    <div className="local">
      <div className="secheading">
        <h2 className="heading-2 u-margin-bottom-big">News</h2>
      </div>
      <div className="content">{showBlogs()}</div>
    </div>
  );
};

export default local;

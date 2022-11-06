import { useState, useEffect } from "react";
import Link from "next/link";
import sampleblogs from "../../FrontPageTestData";


/**
 * This component is the hero section used by Latest News,
 * Sports and Local News Sections, to display any articles
 * they may have a feature tag. If none have this then it
 * will use some sample blogs from the link above
 */
const PageHeroSection = ({ articles, linkFrom }) => {
  const [sample, setSample] = useState(false);

  /**
   * Initialize the variable blogs
   * this will contain the blogs that will be fed
   * into this component
   */
  let blogs;
  let topStory;
  let theRest;

  useEffect(() => {
    /**
     * Check to see if we're using sample data or not
     */

    if (articles.length === 0) {
      setSample(true);
    }
  }, []);

  /**
   * Here we will check the results of articles passed in,
   * if no results were found or articles.length === 0
   * then we will display some sample data for now from sampleblogs
   * and assign that to the blogs variable.
   *
   * NOTE that if you don't assign a feature tag to any of the articles passed in
   * then articles.length will equal 0
   */
  if (articles.length === 0) {
    blogs = sampleblogs;
  } else {
    blogs = articles;
  }


  /**
   * Filter through blogs and find the article
   * where the key featuredTopstory === 1. This will
   * be the main story.
   */

   if (linkFrom === "sports") {
       topStory = blogs.filter((article) => {
         return article.featuredSports === 1;
      });
   } 
   
   else if (linkFrom === "local") {
      topStory = blogs.filter((article) => {
        return article.featuredLocal === 1;
      });
   }
   else {
    topStory = blogs;
   }


  /**
   * The other stories that will be displayed
   */

  if (linkFrom === "sports") {
    theRest = blogs.filter((article) => {
      return article.featuredSports > 1 && article.featuredSports < 4;
    })
  } else if (linkFrom === "local") {
     theRest = blogs.filter((article) => {
       return article.featuredLocal > 1 && article.featuredLocal < 4;
     });
  } else {
    theRest = blogs.slice(1,3);
  }

 

  const otherStoriesStyles = {
    height: "fit-content",
  };

  const rows = {
    gridTemplateRows: "repeat(2, 8rem)",
  };

  const showBlogs = () => {
    return theRest.map((blog) => {
      return (
        <Link href={`blogs/${blog.slug}`} key={blog.slug}>
          <a className="story">
            <img src={blog.mainphoto} alt="" />
            <p>{blog.title}</p>
          </a>
        </Link>
      );
    });
  };

  return (
    <div className="hero page-hero">
      <div className="content col-2 narrow-wide">
        <div className="currentslideinfo">
          <h2 className="heading-2 u-margin-bottom-small">
            {topStory[0].title}
          </h2>
          <p className="u-margin-bottom-medium">{topStory[0].subtitle}</p>
          <div className="readmore">
            <span className="readstory">
              {/**
               * Only show a read-more link if we are getting live data from the
               * database, not test sample data
               */}
              {sample ? (
                " "
              ) : (
                <Link href={`blogs/${topStory[0].slug}`}>
                  <a>Read More</a>
                </Link>
              )}
            </span>
          </div>
        </div>

        <div className="otherstories">
          <ul>{showBlogs()}</ul>
        </div>
      </div>

      <div className="overlay"></div>
      <img src={topStory[0].mainphoto} className="herobg" alt="" />
    </div>

  );
};

export default PageHeroSection;

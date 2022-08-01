import { useState, useEffect } from "react";
import Link from "next/link";
import sampleblogs from "../../FrontPageTestData";


/**
 * This component is the hero section used by Latest News,
 * Sports and Local News Sections, to display any articles
 * they may have a feature tag. If none have this then it
 * will use some sample blogs from the link above
 */
const PageHeroSection = ({ articles }) => {
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
   * The main story that will be displayed
   * in the hero section
   */
  topStory = blogs[0];

  console.log("==============topStory======================");
  console.log(topStory);
  console.log('====================================');

  /**
   * The other stories that will be displayed
   */
  theRest = blogs.slice(1, 3);

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
          <h2 className="heading-2 u-margin-bottom-small">{topStory.title}</h2>
          <p className="u-margin-bottom-medium">{topStory.subtitle}</p>
          <div className="readmore">
            <span className="readstory">
              {/**
               * Only show a read-more link if we are getting live data from the
               * database, not test sample data
               */}
              {sample ? (
                " "
              ) : (
                <Link href={`blogs/${topStory.slug}`}>
                  <a>Read More</a>
                </Link>
              )}
            </span>
          </div>
        </div>

        <div className="otherstories" style={otherStoriesStyles}>
          <ul style={rows}>{showBlogs()}</ul>
        </div>
      </div>

      <div className="overlay"></div>
      <img src={topStory.mainphoto} className="herobg" alt="" />
    </div>
  );
};

export default PageHeroSection;

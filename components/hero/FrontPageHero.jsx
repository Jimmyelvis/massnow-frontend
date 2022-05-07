import Link from "next/link";
import sampleblogs from "../../FrontPageTestData";


const FrontPageHero = ({ articles }) => {
  /**
   * Initialize the variable blogs
   * this will contain the blogs that will be fed
   * into this component
   */
  let blogs;

  /**
   * This will filter out any blogs from the
   * articles props passed in from index for a featuredTopstory > 0
   * value. If any exists it means that it is a featured story
   * and will be displayed in this component
   */
  let featuredStores = articles.filter((article) => {
    return article.featuredTopstory > 0;
  });

  /**
   * Here we will check the results of featuredStores,
   * if no results were found or featuredStores.length === 0
   * then we will display some sample data for now from sampleblogs
   * and assign that to the blogs variable. 
   */
  if (featuredStores.length === 0) {
    blogs = sampleblogs;
  } else {
    blogs = articles;
  }

  let topStory = blogs.filter((blog) => {
    /**
     * This is the main story
     */
    return blog.featuredTopstory === 1;
  });

  let theRest = blogs.filter((blog) => {
    /**
     * This will be the rest of the  stories
     * for this component
     */
    return blog.featuredTopstory > 1;
  });

  const showOtherBlogs = () => {
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
    <div className="hero">
      <div className="content col-2 narrow-wide">
        <div className="currentslideinfo">
          <h2 className="heading-2 u-margin-bottom-small">
            {topStory[0].title}
          </h2>
          <p className="u-margin-bottom-medium">{topStory[0].subtitle}</p>
          <div className="readmore">
            <span className="readstory">
              <Link href={`blogs/${topStory[0].slug}`}>
                <a>Read More</a>
              </Link>
            </span>
          </div>
        </div>

        <div className="otherstories">
          <ul>{showOtherBlogs()}</ul>
        </div>
      </div>

      <div className="overlay"></div>
      <img src={topStory[0].mainphoto} className="herobg" alt="" />
    </div>
  );
};

export default FrontPageHero;

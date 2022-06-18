import Link from "next/link";
import sampleArticles from "../../FrontPageTestData";

const FrontPageHero = ({ incomingArticles }) => {

  const getFeaturedArticles = (posts) => {

    /**
     * Filter out any blogs from the
     * incomingArticles props passed in from index for a featuredTopstory > 0
     * value. If any exists it means that it is a featured story
     * and will be displayed in this component
     */
    let featuredStories = posts.filter((article) => {
      return article.featuredTopstory > 0;
    });

    /**
     * Check the results of featuredStories,
     * if no results were found or featuredStories.length === 0
     * then we will display some sample data for now from sampleArticles
     * and assign that to the posts variable.
     */
    if (featuredStories.length === 0) {
      posts = sampleArticles;
      return posts;
    } else {
      posts = featuredStories;
      return posts;
    }
  };

  const showBlogs = () => {
    let posts = incomingArticles;

    /**
     * Call getFeaturedArticles(posts) passing in the posts varibles
     * as a parameter assign the results to filteredPosts
     */
    let filteredPosts = getFeaturedArticles(posts);


    /**
     * Get the first array element this will be the main story
     * to be displayed
     */
    let topStory = filteredPosts[0];


    /**
     * Get the rest in the array and assign to theRest
     */
    let theRest = filteredPosts.filter((blog) => {
      return blog.featuredTopstory > 1;
    });

    return (
      <div className="hero">
        <div className="content col-2 narrow-wide">
          <div className="currentslideinfo">
            <h2 className="heading-2 u-margin-bottom-small">
              {topStory.title}
            </h2>
            <p className="u-margin-bottom-medium">{topStory.subtitle}</p>
            <div className="readmore">
              <span className="readstory">
                <Link href={`blogs/${topStory.slug}`}>
                  <a>Read More</a>
                </Link>
              </span>
            </div>
          </div>

          <div className="otherstories">
            <ul>
              {
                /**
                 * Map through theRest and display in jsx below
                 */
                theRest.map((blog) => {
                  return (
                    <Link href={`blogs/${blog.slug}`} key={blog.slug}>
                      <a className="story">
                        <img src={blog.mainphoto} alt="" />
                        <p>{blog.title}</p>
                      </a>
                    </Link>
                  );
                })
              }
            </ul>
          </div>
        </div>

        <div className="overlay"></div>
        <img src={topStory.mainphoto} className="herobg" alt="" />
      </div>
    );
  };

  return <>{showBlogs()}</>;
};

export default FrontPageHero;

import Link from "next/link";
import renderHTML from "react-render-html";
import { sortElems } from "../../helpers/sorting";

const Sports = ({ articles }) => {
  /**
   * Initialize the variable blogs
   * this will contain the blogs that will be fed
   * into this component
   */
  let blogs;

  /**
   * Initalize the variable for featured story
   * for this section. If one exists it will
   * be assigned here
   */
  let topStory;

  /**
   * The rest of the sports related stories that has
   * a featured tag if any exist
   */
  let theRest;

  /**
   * Filter out any incoming sports related articles
   * that has a featured tag
   */
  let featuredSports = articles.filter((article) => {
    return article.featuredSports > 0;
  });

  if (articles.length > 0) {
    blogs = articles;

    if (featuredSports.length > 0) {
      topStory = blogs.filter((blog) => {
        return blog.featuredSports === 1;
      });
  
      theRest = blogs.filter((blog) => {
        return blog.featuredSports > 1;
      });
    }
    
  }


  const showBlogs = () => {
    if (featuredSports.length > 0) {
      return (
        <div className="sports">
          <div className="secheading">
            <h2 className="heading-2 u-margin-bottom-big">Sports</h2>
          </div>

          <div className="content">
            <div className="featured-story">
              <div className="overlay"></div>
              <img src={topStory[0].mainphoto} alt="" />

              <div className="featured-info">
                <Link href={`blogs/${topStory[0].slug}`}>
                  <a>
                    <h3 className="heading-3">{topStory[0].title}</h3>
                    <p>{topStory[0].subtitle}</p>
                  </a>
                </Link>
              </div>
            </div>

            <div className="additional-stories">
              {theRest.map((blog) => {
                return (
                  <Link href={`blogs/${blog.slug}`} key={blog.slug}>
                    <a className="entry">
                      <img src={blog.mainphoto} alt="" />
                      <h4 className="heading-4">{blog.title}</h4>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return "";
    }
  };

  return (showBlogs());
};

export default Sports;

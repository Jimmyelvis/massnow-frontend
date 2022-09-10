import Link from "next/link";
import renderHTML from "react-render-html";
import { sortElems } from "../../helpers/sorting";



const Latest = ({ articles }) => {
  /**
   * Initialize the variable blogs
   * this will contain the blogs that will be fed
   * into this component
   */
  let blogs;
  let sortedByUpdated;

  
/**
 * Check to see if any articles exist in the database
 */
  if ( articles.length > 0) {

    /**
     * Get the latest published articles. So we first
     * need to sort them DESC using the SortElems helper function
     * then slice the first 7. This will then be passed to
     * the latest articles component
     */

    sortedByUpdated = articles.sort((art1, art2) => {
      return sortElems(art2, art1, "createdAt");
    });

    sortedByUpdated = sortedByUpdated.slice(0, 7);

    blogs = articles;

    var topStory = blogs[0];
    var secondStory = blogs[1];
    var thirdStory = blogs[2];
    var theRest = blogs.slice(3, 7);
  }
  



  const showBlogs = () => {

    /**
     * Render the html if any articles exist
     */
    if (articles.length > 0) {
      return (
        <div className="latest">
          <div className="secheading">
            <h2 className="heading-2 u-margin-bottom-big">Latest</h2>
          </div>

          <div className="content">
            <div className="featured-story">
              <div className="overlay"></div>
              <img src={topStory.mainphoto} alt="" />

              <div className="featured-info">
                <Link href={`blogs/${topStory.slug}`}>
                  <a className="heading-3">{topStory.title}</a>
                </Link>
                <p>{topStory.subtitle}</p>
                <span className="author">{topStory.postedBy.name} </span>
              </div>
            </div>

            <div className="secondary">
              <div className="entry">
                <Link href={`blogs/${secondStory.slug}`}>
                  <a className="heading-3">{secondStory.title}</a>
                </Link>

                <span className="author">{secondStory.postedBy.name} </span>

                <div className="excerpt">{renderHTML(secondStory.excerpt)}</div>

                <div className="thumb">
                  <img src={secondStory.mainphoto} alt="" />
                </div>
              </div>

              <div className="entry">
                <Link href={`blogs/${thirdStory.slug}`}>
                  <a className="heading-3">{thirdStory.title}</a>
                </Link>

                <span className="author">{thirdStory.postedBy.name} </span>

                <div className="excerpt">{renderHTML(thirdStory.excerpt)}</div>

                <div className="thumb">
                  <img src={thirdStory.mainphoto} alt="" />
                </div>
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
      return("")
    }
    
    
  };

  return (showBlogs());
};

export default Latest;

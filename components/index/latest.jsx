import Link from "next/link";
import renderHTML from "react-render-html";


const Latest = ({ blogs }) => {


  let topStory = blogs[0]

  let secondStory = blogs[1]

  let thirdStory = blogs[2]

  let theRest = blogs.slice(3,7)

  

  const showBlogs = () => {
    return theRest.map((blog) => {
      return (
        <Link href={`blogs/${blog.slug}`} key={blog.slug}>
          <a className="entry">
            <img src={blog.mainphoto} alt="" />
            <h4 className="heading-4">{blog.title}</h4>
          </a>
        </Link>
      );
    });
  };

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
            <h3 className="heading-3">{topStory.title}</h3>
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

            
            <div className="excerpt">
              {renderHTML(secondStory.excerpt)}
            </div>
            

            <div className="thumb">
              <img src={secondStory.mainphoto} alt="" />
            </div>
          </div>

          <div className="entry">
            <Link href={`blogs/${thirdStory.slug}`}>
              <a className="heading-3">{thirdStory.title}</a>
            </Link>

            <span className="author">{thirdStory.postedBy.name} </span>

            <div className="excerpt">
              {renderHTML(thirdStory.excerpt)}
            </div>
            
            <div className="thumb">
              <img src={thirdStory.mainphoto} alt="" />
            </div>
          </div>
        </div>

        <div className="additional-stories">
          {showBlogs()}
        </div>
      </div>
    </div>
  );
};

export default Latest;

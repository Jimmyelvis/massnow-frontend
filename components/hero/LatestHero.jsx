import Link from "next/link";

const FrontPageHero = ({ blogs }) => {
  
  let topStory = blogs[0];
 
  let theRest = blogs.slice(1);


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

        <div className="otherstories" style={otherStoriesStyles}>
          <ul style={rows}>{showBlogs()}</ul>
        </div>
      </div>

      <div className="overlay"></div>
      <img src={topStory.mainphoto} className="herobg" alt="" />
    </div>
  );
};

export default FrontPageHero;

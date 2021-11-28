import Link from "next/link";

const FrontPageHero = ({ blogs }) => {
  let topStory = blogs.filter((blog) => {
    return blog.featuredTopstory === 1;
  });

  let theRest = blogs.filter((blog) => {
    return blog.featuredTopstory > 1;
  });

  const showBlogs = () => {

    if (theRest.length > 0) {
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
    }
  };

  return (
    <div className="hero">
      <div className="content col-2 narrow-wide">
        <div className="currentslideinfo">
          <h2 className="heading-2 u-margin-bottom-small">
            {topStory.length > 0 ? topStory[0].title : "Sample Top Story Title"}
          </h2>
          <p className="u-margin-bottom-medium">
            {topStory.length > 0 ? topStory[0].subtitle : "Sample Subtitle"}
          </p>
          <div className="readmore">
            <span className="readstory">
              {topStory.length > 0 ? (
                <Link href={`blogs/${topStory[0].slug}`}>
                  <a>Read More</a>
                </Link>
              ) : ""}
            </span>
          </div>
        </div>

        <div className="otherstories">
          <ul>{showBlogs()}</ul>
        </div>
      </div>

      <div className="overlay"></div>
      {
        topStory.length > 0 ? 
        (<img src={topStory[0].mainphoto} className="herobg" alt="" />) : 
        (<img src="/images/buildings.jpg" className="herobg" alt="" />)
      }
    </div>
  );
};

export default FrontPageHero;

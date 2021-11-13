import Link from "next/link";
import renderHTML from "react-render-html";
import { sortElems } from "../../helpers/sorting";


const Sports = ({ blogs }) => {
  let topStory = blogs.filter((blog) => {
    return blog.featuredSports === 1;
  });

  let theRest = blogs.filter((blog) => {
    return blog.featuredSports > 1;
  });

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


        <div className="additional-stories">{showBlogs()}</div>
      </div>
    </div>
  );
};

export default Sports;

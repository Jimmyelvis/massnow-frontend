import Link from "next/link";

const local = ({ blogs }) => {

   const showBlogs = () => {
     return blogs.map((blog) => {
       return (
        <div className="entry">
          <div className="thumb">
            <img src={blog.mainphoto} alt="" />
          </div>

      
          <Link href={`blogs/${blog.slug}`} key={blog.slug}>
           <a>
             <h4 className="heading-4">{blog.title}</h4>
           </a>
         </Link>
        </div>
       );
     });
   };


  return (
    <div className="local">
      <div className="secheading">
        <h2 className="heading-2 u-margin-bottom-big">News</h2>
      </div>

      <div className="content">

        {showBlogs()}
 
      </div>
    </div>
  );
};

export default local;

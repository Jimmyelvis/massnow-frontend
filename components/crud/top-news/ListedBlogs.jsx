import Link from "next/link";
import { useState, useEffect } from "react";
import { list, singleBlog } from "../../../actions/blog";
import moment from "moment";



const ListedBlogs = ({ blogentry }) => {

  const [replacedBlog, setreplacedBlog] = useState(blogentry);
  const [blogs, setBlogs] = useState([]);

    useEffect(() => {
      loadBlogs();
      getReplacedBlog()
    }, []);

 

    const loadBlogs = () => {
      list().then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setBlogs(data);
          console.log("================loadBlogs====================");
          console.log(data);
          console.log("====================================");
        }
      });
    };

    const getReplacedBlog = () => {
      singleBlog(replacedBlog).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setreplacedBlog(data);
          console.log("================getReplacedBlog====================");
          console.log(data);
          console.log('====================================');
        }
      });

    }

    const showSingleBlog = () => {

      return (
        <div className="story">
          <img src={replacedBlog.mainphoto} alt="" srcset="" />

          <h3 className="heading-3">
            <Link href={`/blogs/${replacedBlog.slug}`}>
              <a>{replacedBlog.title}</a>
            </Link>
          </h3>

          <p className="subtitle">{replacedBlog.subtitle}</p>

          <p className="author">
            {/* by {replacedBlog.postedBy.name } |{" "} */}
            {moment(replacedBlog.updatedAt).fromNow()}
          </p>
        </div>
      );
      
    }

     const showAllBlogs = () => {
       let checked;

       return blogs.map((blog, i) => {
         return (
           <div key={blog._id} className="story">
             <img src={blog.mainphoto} alt="" className="mainphoto" />

             <h3 className="heading-3">
               <Link href={`/blogs/${blog.slug}`}>
                 <a>{blog.title}</a>
               </Link>
             </h3>

             <p className="subtitle">{blog.subtitle}</p>

             <p className="author">
               by {blog.postedBy.name} | {moment(blog.updatedAt).fromNow()}
             </p>

             <div className="buttons">
               <button
                 className="btn btn-teal"
                 onClick={() => choosen(checked, blog._id)}
               >
                 Add
               </button>
             </div>
           </div>
         );
       });
     };

    return (
      <React.Fragment>
        {showSingleBlog()}
        {showAllBlogs()}
      </React.Fragment>
    );

};

export default ListedBlogs;

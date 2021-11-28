import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { list, removeBlog } from "../../actions/blog";
import renderHTML from "react-render-html";
import moment from "moment";

const BlogRead = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");
  const [filterInput, setFilterInput] = useState('')
  const token = getCookie("token");

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
  };

  const deleteBlog = (slug) => {
        removeBlog(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                loadBlogs();
            }
        });
    };

  const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete your blog?');
        if (answer) {
            deleteBlog(slug);
        }
    };

  const showUpdateButton = blog => {
    if (isAuth() && isAuth().role === 2) {
        return (
            <Link href={`/admin/crud/${blog.slug}`}>
                <a className="btn btn-secondary btn-edit">Update</a>
            </Link>
        );
    } else if ( blog.postedBy._id === isAuth()._id) {
        return (
          <Link href={`/admin/crud/${blog.slug}`}>
            <a className="btn btn-secondary btn-edit">Update</a>
          </Link>
        );
    }
  };

  const showDeleteButton = (blog) => {
       if (isAuth() && isAuth().role === 2) {
         return (
           <button
             className="btn btn-danger"
             onClick={() => deleteConfirm(blog.slug)}
           >
             Delete
           </button>
         );
       } else if (blog.postedBy._id === isAuth()._id) {
         return (
           <button
             className="btn btn-danger"
             onClick={() => deleteConfirm(blog.slug)}
           >
             Delete
           </button>
         );
       }
  }

  const showAllBlogs = (filterValue) => {

    console.log('====================================');
    console.log('called');
    console.log('====================================');

    console.log("==================filterValue==================");
    console.log(filterValue);
    console.log('====================================');

    let theFilteredBlogs;

    if (filterValue) {

      console.log("================== if (filterValue) {==================");
      console.log(" if (filterValue) {");
      console.log('====================================');

      theFilteredBlogs = blogs.filter((blog) => {
        return blog.title.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1;
      });
    } else {
      console.log('=======================else=============');
      console.log('else');
      console.log('====================================');
      theFilteredBlogs = blogs
    }

    console.log("============theFilteredBlogs========================");
    console.log(theFilteredBlogs);
    console.log('====================================');


    return theFilteredBlogs.map((blog) => {

      console.log("==============inside return======================");
      console.log('inside return');
      console.log('====================================');

      return (
        <div key={blog._id} className="story">
          <img src={blog.mainphoto} alt="" className="mainphoto" />
          <h3 className="heading-3">
            <Link href={`/blogs/${blog.slug}`}>
              <a>{blog.title}</a>
            </Link>
          </h3>
          <p className="author">
            Written by {blog.postedBy.name} | Published on{" "}
            {moment(blog.updatedAt).fromNow()}
          </p>

          <p className="excerpt">{blog.mdesc}</p>

          <div className="buttons">
            {showDeleteButton(blog)}
            {showUpdateButton(blog)}
          </div>
        </div>
      );
    });
  };
  

  // const showAllBlogs = () => {


  //   return blogs.map((blog, i) => {
  //     return (
  //       <div key={i} className="story">
  //         <img src={blog.mainphoto} alt="" className="mainphoto" />
  //         <h3 className="heading-3">
  //           <Link href={`/blogs/${blog.slug}`}>
  //             <a>
  //               {blog.title}
  //             </a>
  //           </Link>
  //         </h3>
  //         <p className="author">
  //           Written by {blog.postedBy.name} | Published on{" "}
  //           {moment(blog.updatedAt).fromNow()}
  //         </p>

  //         <p className="excerpt">
  //           {blog.mdesc}
  //         </p>

  //         <div className="buttons">
  //           {showDeleteButton(blog)}
  //           {showUpdateButton(blog)}
  //         </div>


          

  //       </div>
  //     );
  //   });
  // };

  // const filterBlogs = (filterValue) => {
  //   setFilterInput(filterValue)



  //   if (filterValue !== "") {
  //     let theFilteredBlogs = blogs.filter((blog) => {
  //        return blog.title.toLowerCase().indexOf(filterInput.toLowerCase()) !== -1
  //      })
   
  //      setBlogs(theFilteredBlogs)
  //   } else {
  //     setBlogs(blogs)
  //   }


  //   showAllBlogs()
   
  // };

  return (
    <React.Fragment>
      {message && <div className="alert alert-warning">{message}</div>}
      <h2 className="heading-2 blogs-total">{blogs.length} Blogs Total</h2>
      <input
        placeholder="Filter Blogs..."
        onChange={(e) => showAllBlogs(e.target.value)}
        className="filter-blogs-input"
      />

      <div className="blogs-list">{showAllBlogs()}</div>
    </React.Fragment>
  );
};

export default BlogRead;

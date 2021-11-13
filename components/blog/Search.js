import Link from "next/link";
import renderHTML from "react-render-html";
import React, { useState, useEffect, useRef } from "react";
import { listSearch } from "../../actions/blog";
import { BsSearch } from "react-icons/bs";


const Search = () => {
  const [values, setValues] = useState({
    search: undefined,
    results: [],
    message: "",
  });

  const { search, results, searched, message } = values;

  const handleChange = (e) => {

    setValues({
      ...values,
      search: e.target.value,
    });

  };

  useEffect(() => {

    if (search === "" || search === undefined) {
      setValues({
        ...values,
        results: [],
        message: ""
      })
    }
  
    else if (search && !results.length) {

       listSearch({ search }).then((data) => {
         setValues({
           ...values,
           results: data,
           message: `${data.length} blogs found`,
         });
       });
      
    } else {
      const timeoutId = setTimeout(() => {
        if (search) {
            listSearch({ search }).then((data) => {
              setValues({
                ...values,
                results: data,
                message: `${data.length} blogs found`,
              });
            });
        }
      }, 500);

      return () => {
        clearTimeout(timeoutId);
      };
    }

  }, [search]);


  const searchedBlogs = (results = []) => {
    return (
      <div className="blogs">

        {results.map((blog, i) => {
          return (
            <div className="card-OverlayType" key={i}>
              <div className="card-info">
                <Link href={`/blogs/${blog.slug}`}>
                  <a>
                    {/* add an overflow hidden here */}
                    <h2 className="heading-2">{blog.title}</h2>
                    <h3 className="heading-3">{blog.subtitle}</h3>
                    <h4 className="heading-4">By: {blog.postedBy.name}</h4>
                  </a>
                </Link>
              </div>

              <div className="overlay"></div>
              <img src={blog.mainphoto} alt="" className="card-bg" />
            </div>
          );
        })}
      </div>
    );
  };

  const searchSubmit = (e) => {
    e.preventDefault();

    listSearch({ search }).then((data) => {
      setValues({
        ...values,
        results: data,
        searched: true,
        message: `${data.length} blogs found`,
      });
    });
  };

  const searchForm = () => (
    <form>
      <div className="search-icon">
        <BsSearch color="#BAC3E6" />
      </div>

      <input
        className="form-control"
        placeholder="Search blogs"
        onChange={handleChange}
      />
    </form>
  );


  return (
    <div className="searchResults" >
      {searchForm()}
      {message && <h2 className="heading-2">{message}</h2>}

      { (   searchedBlogs(results) )}
    </div>
  );
};

export default Search;

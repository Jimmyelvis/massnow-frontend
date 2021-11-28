import Link from "next/link";
import renderHTML from "react-render-html";
import React, { useState, useEffect, useRef } from "react";
import { listSearch } from "../../actions/blog";
import { BsSearch } from "react-icons/bs";
import { useGlobalContext } from "../../context";



const Search = () => {

  const refContainer = useRef(null);
 

  const [values, setValues] = useState({
    search: undefined,
    results: [],
    message: "",
  });

  const { search, results, searched, message } = values;
   const {
     isModalOpen,
     openModal,
     openOverlay,
     closeOverlay,
     isOverlayOpen,
     mobileMenuActive,
     mobileMenu_Active,
     mobileMenu_InActive,
   } = useGlobalContext();

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

  const closeAndClear = () => {
    closeOverlay()
    mobileMenu_InActive()
      setValues({
        ...values,
        results: [],
        message: ``,
      });

      refContainer.current.value = '';
 
  }
  


  const searchedBlogs = (results = []) => {
    return (
      <div className="blogs">

        {results.map((blog, i) => {
          return (
            <div className="card-OverlayType" key={i}>
              <div className="card-info">
                <Link href={`/blogs/${blog.slug}`}>
                  <a onClick={closeAndClear}>
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
        ref={refContainer}
      />
    </form>
  );


  return (
    <div className="searchResults" >

        
      {searchForm()}
      {message && <h2 className="heading-2">{message}</h2>}

      {searchedBlogs(results)}

      
    </div>
  );
};

export default Search;

import Link from "next/link";
import renderHTML from "react-render-html";
import React, { useState, useEffect, useRef } from "react";
import { listSearch } from "../../actions/blog";
import { BsSearch } from "react-icons/bs";
import { useGlobalContext } from "../../context/context";
import { CardOverlayVersion } from "../pageelements/Cards";

const Search = () => {
  const refContainer = useRef(null);

  const [values, setValues] = useState({
    search: undefined,
    results: [],
    message: "",
  });

  const { search, results, searched, message } = values;
  const { isModalOpen, openModal, openOverlay, closeOverlay, isOverlayOpen, mobileMenuActive, mobileMenu_Active, mobileMenu_InActive, closeModal } = useGlobalContext();

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
        message: "",
      });
    } else if (search && !results.length) {
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
            if (data.length === 0) {
              setValues({
                ...values,
                results: data,
                message: `No blogs found`,
              });
            } else if (data.length < 2) {
              setValues({
                ...values,
                results: data,
                message: `${data.length} blog found`,
              });
            } else {
              setValues({
                ...values,
                results: data,
                message: `${data.length} blogs found`,
              });
            }
          });
        }
      }, 500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [search]);

  const closeAndClear = () => {
    closeModal();
    mobileMenu_InActive();
    setValues({
      ...values,
      results: [],
      message: ``,
    });

    refContainer.current.value = "";
  };

  const searchedBlogs = (results = []) => {
    return (
      <div className="blogs">
        {results.map((blog, i) => {
          return (

            <CardOverlayVersion 
              key={i}
              title={blog.title}
              mainphoto={blog.mainphoto}
              subtitle={blog.subtitle}
              author={blog.postedBy.name}
              slug={blog.slug}
              clickFunction={closeAndClear}
              />
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
        // message: `${data.length} blogs found`,
      });
    });
  };

  const searchForm = () => (
    <form>
      <div className="search-icon">
        <BsSearch color="#BAC3E6" />
      </div>

      <input className="form-control" placeholder="Search blogs" onChange={handleChange} ref={refContainer} />
    </form>
  );

  return (
    <div className="search-overlay">
      {searchForm()}

      <div className="searchResults">
        {message && <h2 className="heading-2">{message}</h2>}

        {searchedBlogs(results)}
      </div>
    </div>
  );
};

export default Search;

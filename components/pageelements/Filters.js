import { getCategories } from "../../actions/category";
import React from "react";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../../filter_context";
import { getCookie, isAuth } from "../../actions/auth";


const Filters = () => {
  const [values, setValues] = useState({
    categories: [],
  });

  const {
    filters: { 
      category,
      text,
      current_user,
      yourblogs 
    },
    updateFilters,
    clearFilters,
    getCurrentUser
  } = useGlobalContext();

  const { categories } = values;


  useEffect(() => {
    loadCategories();
    // setCurrentUser()
  }, []);

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, categories: data });
      }
    });
  };

  const setCurrentUser = () => {
    getCurrentUser(isAuth()._id);
  }

  const showcheckbox = () => {

    return (
     <div className="form-control shipping">
       {/* <label htmlFor="shipping"> Your Blogs</label>
       <input
         type="checkbox"
         name="yourblogs"
         id="shipping"
         onChange={setCurrentUser}
         checked={false}
       /> */}

     <button
        className="btn btn-third"
        onClick={setCurrentUser}
        type="button"
        name="category"
        id="your blogs"
     >
         Your Blogs
     </button>
     </div>
    )

  }

  const filterText = () => {
    return (
      <input
        type="text"
        name="text"
        placeholder="search"
        className="search-input"
        value={text}
        onChange={updateFilters}
      />
    );
  }

  const showCategories = () => {
    return categories.map((c, i) => {
      return (
        <button
          key={i}
          className={`${
            category === c.name
              ? "btn btn-secondary"
              : "btn btn-third"
          }`}
          onClick={updateFilters}
          type="button"
          name="category"
        >
          {c.name}
        </button>
      );
    });
  };

  const clear = () => {

    return (
      <button
        onClick={clearFilters}
        type="button"
        className="btn btn-third"
      >
        Clear
      </button>
    )
  }

  return (
    <>
      { showCategories()}
      { filterText()}
      { clear()}
      { showcheckbox()}
    </>
  )
};

export default Filters;

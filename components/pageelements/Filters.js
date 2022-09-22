import { getCategories } from "../../actions/category";
import React from "react";
import { useState, useEffect } from "react";
import { useFilterContext } from "../../context/filter_context";
import { useGlobalContext } from "../../context/context";
import { getCookie, isAuth } from "../../actions/auth";
import { IoFilter } from "react-icons/io5";
import SearchOverLay from "./SearchOverlay";
import MobileFilters from "./filtersComponents/MobileFilters";


const Filters = () => {
  const [values, setValues] = useState({
    categories: [],
  });

  const {
    filters: { category, text, current_user, yourblogs },
    updateFilters,
    clearFilters,
    getCurrentUser,
  } = useFilterContext();

  const { categories } = values;

 const { isModalOpen, openModal, openOverlay, isOverlayOpen } =
   useGlobalContext();

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
  };

  const showcheckbox = () => {
    return (
      <button
        className="link"
        onClick={setCurrentUser}
        type="button"
        name="category"
        id="your blogs"
      >
        Your Blogs
      </button>
    );
  };

  const filterText = () => {
    return (
      <input
        type="text"
        name="text"
        placeholder="search"
        className="form-control"
        value={text}
        onChange={updateFilters}
      />
    );
  };

  const showCategories = () => {
    return categories.map((c, i) => {
      return (
        <button
          key={i}
          className={`${category === c.name ? "link link_active" : "link"}`}
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
        className="btn btn-thirdcolor-grad btn-clear"
      >
        Clear Filters
      </button>
    );
  };

  return (
    <>
      <button
        className={` ${isOverlayOpen ? "displayNone" : "mobile_filters_btn"}`}
        onClick={openOverlay}
      >
        <IoFilter className="close" />
      </button>
      <div className="filters">
        <div className="contain">
          {filterText()}

          <h3 className="admin_heading-3">Catagories</h3>

          <div className="links">
            {showCategories()}
            {showcheckbox()}
            {clear()}
          </div>
        </div>
      </div>

      <SearchOverLay
        contentBgcolor={null}
        overlayColor={`rgba(255, 255, 255, 0.95)`}
        transition={`all 0.7s linear`}
      >
        <MobileFilters
          filterText={filterText()}
          showCategories={showCategories()}
          showcheckbox={showcheckbox()}
          clear={clear()}
        />
      </SearchOverLay>
    </>
  );
};

export default Filters;

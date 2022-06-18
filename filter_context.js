import React, { useState, useEffect, useContext, useReducer } from "react";
// import { list } from "./actions/blog";
import reducer from "./reducers/filter_reducer";
import { useBlogsContext } from "./blogs_context";

const FilterContext = React.createContext();

const initialState = {
  filtered_blogs: [],
  all_blogs: [],
  sort: "latest",
  filters: {
    category: "all",
    text: '',
    current_user: '',
    // yourblogs
  }
};

const FilterProvider = ({ children }) => {
  // const [blogs, setBlogs] = useState([]);
  const { blogs } = useBlogsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "list", payload: blogs });
  }, [blogs]);

  useEffect(() => {
    dispatch({ type: "filter_blogs" });
    dispatch({ type: "sort" });
  }, [blogs, state.sort, state.filters]);

  const updateSort = (e) => {
    const value = e.target.value;

    dispatch({ type: "update_sort", payload: value });
  };

  const updateFilters = (e) => {
      let name = e.target.name;
      let value = e.target.value;

      if (name === "category") {
        value = e.target.textContent;
      }

    dispatch({ type: "update_filters", payload: { name, value } });

  }

  const getCurrentUser = (user) => {
    let  userID = user

    dispatch({ type: "your_blogs", payload: { userID }})
  }

  const clearFilters = () => {
    dispatch({ type: "clear_filters" });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        updateSort,
        updateFilters,
        clearFilters,
        getCurrentUser
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

// custom hook
export const useFilterContext = () => {
  return useContext(FilterContext);
};

export { FilterContext, FilterProvider };

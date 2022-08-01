import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/blogs_reducer";
import { list } from "../actions/blog";


const initialState = {
  blogs: [],
};

const BlogsContext = React.createContext();

const BlogsProvider = ({ children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
      
     list().then((data) => {
       if (data.error) {
         console.log(data.error);
       } else {
        dispatch({ type: "list", payload: data });
       }
     });

    }, []);

    return (
      <BlogsContext.Provider
        value={{
          ...state,
        }}
      >
        {children}
      </BlogsContext.Provider>
    );


}

// make sure use
export const useBlogsContext = () => {
  return useContext(BlogsContext);
}

export { BlogsContext, BlogsProvider };

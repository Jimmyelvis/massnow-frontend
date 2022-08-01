// import { list } from "../actions/blog";

const blogs_reducer = (state, action) => {
  if (action.type === "list") {

    return {
      ...state,
      blogs: action.payload
    };
  }
};

export default blogs_reducer;

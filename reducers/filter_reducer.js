// import { list } from "../actions/blog";

const filter_reducer = (state, action) => {
  if (action.type === "list") {
 
    return {
      ...state,
      all_blogs: [...action.payload],
      filtered_blogs: [...action.payload],
    };
  }

  if (action.type === "sort") {
    const { sort, filtered_blogs } = state;
    let tempBlogs = [...filtered_blogs];

    if (sort === "latest") {
      tempBlogs = tempBlogs.sort((a, b) => {
        return b.createdAt.localeCompare(a.createdAt);
      });
    }

    if (sort === "earliest") {
      tempBlogs = tempBlogs.sort((a, b) => {
        return a.createdAt.localeCompare(b.createdAt);
      });
    }

    if (sort === "a-z") {
      tempBlogs = tempBlogs.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    }

    if (sort === "z-a") {
      tempBlogs = tempBlogs.sort((a, b) => {
        return b.title.localeCompare(a.title);
      });
    }

    return { ...state, filtered_blogs: tempBlogs };
  }

  if (action.type === "update_sort") {
    return { ...state, sort: action.payload };
  }

  if (action.type === "update_filters") {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === "filter_blogs") {
    const { all_blogs } = state;
    const { category, text } = state.filters;

    let tempBlogs = [...all_blogs];

    if (text) {
      tempBlogs = tempBlogs.filter((blog) => {
        return blog.title.toLowerCase().includes(text);
      });
    }

    // category
    if (category !== "all") {

      tempBlogs = tempBlogs.filter((blog) => {
          return blog.categories.find((n) => n.name === category);
        }
      );

    }

     return { ...state, filtered_blogs: tempBlogs };
  }

  if (action.type === "your_blogs") {
    const { all_blogs } = state;
    const { userID } = action.payload;


    let tempBlogs = [...all_blogs];

    tempBlogs = tempBlogs.filter((blog) => {
      return blog.postedBy._id === userID;
    })

     return { ...state, filtered_blogs: tempBlogs };

    
  }

  if (action.type === "clear_filters") {

    return {
      ...state,
      filters: {
        ...state.filters,
        category: "all",
        text: ""
      },
    };
    
  }
};

export default filter_reducer;

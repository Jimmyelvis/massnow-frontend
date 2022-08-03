import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';


export const createBlog = (blog, token) => {
    return fetch(`${API}/api/blog`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: blog
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const addFavorite = (
  user_id,
  post_id,
  post_title,
  mainPhoto,
  postAuthor,
  slug,
  token
) => {

  const data = {
    user_id,
    post_id,
    post_title,
    mainPhoto,
    postAuthor,
    slug,
  };

  return fetch(`${API}/api/blogs/addtofavorites`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const removeFavorite = (user_id, post_id, token) => {
    const data = {
      user_id,
      post_id,
    };

     return fetch(`${API}/api/blogs/removefromfavorites`, {
       method: "POST",
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
       },
       body: JSON.stringify(data),
     })
       .then((response) => {
         return response.json();
       })
       .catch((err) => console.log(err));
};


export const listBlogsWithCategoriesAndTags = (skip, limit) => {

    const data = {
        limit,
        skip
    };

    return fetch(`${API}/api/blogs-categories-tags`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singleBlog = slug => {
    return fetch(`${API}/api/blog/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listRelated = blog => {
    return fetch(`${API}/api/blogs/related`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(blog)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = () => {
  return fetch(`${API}/api/blogs`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listTopnews = () => {
  return fetch(`${API}/api/blogs/topnews`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listNotTopnews = () => {
  return fetch(`${API}/api/blogs/not-topnews`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listTopSportsnews = () => {
  return fetch(`${API}/api/blogs/topsportsnews`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listNotTopSportsnews = () => {
  return fetch(`${API}/api/blogs/nottopsportsnews`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listTopLocalnews = () => {
  return fetch(`${API}/api/blogs/toplocalnews`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listNotTopLocalnews = () => {
  return fetch(`${API}/api/blogs/nottoplocalnews`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const removeBlog = (slug, token) => {
    return fetch(`${API}/api/blog/${slug}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateBlog = (blog, token, slug) => {
    return fetch(`${API}/api/blog/${slug}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: blog
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateBlogSection = (prevPostId, nextPostId, nextPostPosNumber, token) => {

    const data = {
      prevPostId,
      nextPostId,
      nextPostPosNumber
    };

  return fetch(`${API}/api/blogs/edit-topnews/`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateSportsBlogSection = (prevPostId, nextPostId, nextPostPosNumber, token) => {

    const data = {
      prevPostId,
      nextPostId,
      nextPostPosNumber
    };

  return fetch(`${API}/api/blogs/edit-topsportsnews/`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateLocalBlogSection = (prevPostId, nextPostId, nextPostPosNumber, token) => {

    const data = {
      prevPostId,
      nextPostId,
      nextPostPosNumber
    };

  return fetch(`${API}/api/blogs/edit-toplocalnews/`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const listSearch = (params) => {
    // console.log('search params', params);

    let query = queryString.stringify(params);

    // console.log('query params', query);

    return fetch(`${API}/api/blogs/search?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
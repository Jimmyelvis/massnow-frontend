import fetch from "isomorphic-fetch";
import { API } from "../config";
import queryString from "query-string";

export const listFromArticle = (post_id) => {

   const data = {
     post_id,
   };

  return fetch(`${API}/api/comments`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createComment = (user_id,post_id , body, token) => {

  const data = {
    user_id,
    post_id,
    body,
    token
  };

  return fetch(`${API}/api/comment`, {
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

export const createReply = (user_id, post_id, body, comment_id, token) => {
  const data = {
    user_id,
    post_id,
    body,
    comment_id,
    token,
  };

  return fetch(`${API}/api/comments/createreply`, {
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

export const createRecommended = (user_id, comment_id, post_id, token) => {
  const data = {
    user_id,
    comment_id,
    post_id,
    token,
  };

  return fetch(`${API}/api/comments/createrecomended`, {
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

export const commentsFromUser = (user_id) => {

   const data = {
     user_id,
   };

  return fetch(`${API}/api/commentsFromUser`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const repliesFromUser = (username, user_id) => {

   const data = {
      username,
     user_id,
   };

   console.log("================data====================");
   console.log(data);
   console.log('====================================');

  return fetch(`${API}/api/comments/repliesFromUser`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
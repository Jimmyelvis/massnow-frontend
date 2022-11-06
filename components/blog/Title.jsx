import React from 'react'
import Link from "next/link";
import moment from "moment";
import { isAuth } from '../../actions/auth';


const Title = ({ blog, openModal, addToFavorite, removeFavorite, isFavored }) => {
  return (
    <div className="article_header">
      <div class="heading-2">{blog.title}</div>

      <p class="subheading">{blog.subtitle}</p>

      <div className="written-by">
        by{" "}
        <Link href={`/profile/${blog.postedBy.username}`}>
          <a>{blog.postedBy.name}</a>
        </Link>{" "}
        | <span className="published">Published {moment(blog.createdAt).fromNow()}</span>
      </div>

      <div className="article_actions">
        {!isAuth() ? (
          ""
        ) : isFavored ? (
          <button className="favorite" onClick={removeFavorite}>
            <img src="/images/ui/favorite.svg" alt="" />
          </button>
        ) : (
          <button className="favorite" onClick={addToFavorite}>
            <img src="/images/ui/not_favorite.svg" alt="" />
          </button>
        )}

        <li className="commentsIcon" onClick={openModal}>
          <img src="/images/ui/Icon awesome-comment.svg" alt="" />
        </li>
      </div>
    </div>
  );
};

export default Title

 
import React, { useEffect, useState } from "react";
import { Avatar } from "../pageelements/Avatar";
import { getuserRoles } from "../../helpers/getuserroles";
import Pageheading from "../admin/Pageheading";

const CommentListOverlay = ({ list, subTitle, source, title }) => {
  const [dataSource, setDataSource] = useState("");

  /**
   * Todo: Make Pageheading dynamic. Combine with RecListOverlay, send a prop to determine what data to display. Depending on that we will have a differnt map function. Chane commentList to just list.
   */

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setDataSource(source);

    return () => {
      document.body.style.overflow = null;
    };
  }, [source]);

  const getPostLikes = () => {
    return list.map((entry) => {
      let { name, email, role } = entry;

      return (
        <div className="entry">
          <Avatar user={entry} />
          <h3 className="name">{name}</h3>
          <h3 className="email">{email}</h3>
          <h3 className="role">{getuserRoles(role)}</h3>
        </div>
      );
    });
  };

  const getCommentsToArticle = () => {
    return list.map((entry) => {
      let { body } = entry;
      let { name, username, photo } = entry.postedBy;

      return (
        <div className="entry comment">
          <div className="author">
            <Avatar user={entry.postedBy} />
            <h3 className="name">{name}</h3>
            <h3 className="username">@{username}</h3>
          </div>
          <div className="body">
            <p>{body}</p>
          </div>
        </div>
      );
    });
  };

  const getRecsToComment = () => {
    return list.map((entry) => {
      let { recommendedBy } = entry;

      return (
        <div className="entry">
          <Avatar user={recommendedBy} />
          <h3 className="name">{recommendedBy.name}</h3>
          <h3 className="email">{recommendedBy.email}</h3>
          <h3 className="role">{getuserRoles(recommendedBy.role)}</h3>
        </div>
        
      );
    });
  };

  const getRepliesToComment = () => {
    return list.map((entry) => {
      let { body } = entry;
      let { name, photo, username } = entry.postedBy;

      return (
        <div className="entry comment">
          <div className="author">
            <Avatar user={entry.postedBy} />
            <h3 className="name">{name}</h3>
            <h3 className="username">@{username}</h3>
          </div>
          <div className="body">
            <p>{body}</p>
          </div>
        </div>
      );
    });
  };

  const determineSource = () => {
    switch (dataSource) {
      case "post likes":
        return getPostLikes();
        break;
      case "post comments":
        return getCommentsToArticle();
        break;
      case "comment recs":
        return getRecsToComment();
        break;
      case "comment replies":
        return getRepliesToComment();
      default:
        break;
    }
  };

  return (
    <div className="card comment_overlay_List">
      <Pageheading title={title} subtitle={subTitle} />

      <div className="entries comments">{determineSource()}</div>
    </div>
  );
};

export default CommentListOverlay;

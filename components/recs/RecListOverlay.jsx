import React, { useEffect, useState } from "react";
import { Avatar } from "../pageelements/Avatar";
import { getuserRoles } from "../../helpers/getuserroles";
import Pageheading from "../admin/Pageheading";

const CommentListOverlay = ({ recList, post }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = null;
    };
  }, []);

  const getListOfpeople = () => {
    return recList.map((entry) => {
      let { name, email, role } = entry;

      return (
        <div className="person">
          <Avatar user={entry} />
          <h3 className="name">{name}</h3>
          <h3 className="email">{email}</h3>
          <h3 className="role">{getuserRoles(role)}</h3>
        </div>
      );
    });
  };

  return (
    <div className="card comment_overlay_List">
      <Pageheading title="People who favored this article" subtitle={post.title} />

      <div className="people">{getListOfpeople()}</div>
    </div>
  );
};

export default CommentListOverlay;

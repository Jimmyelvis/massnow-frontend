import React from "react";
import moment from "moment";

export const ShowCommentList = ({ items }) => {
  const getItems = () => {
    return items.map((item, i) => (
      <div className="comment" key={item._id}>
        {item.createdAt ? (
          <h3 className="time">{moment(item.createdAt).fromNow()}</h3>
        ) : (
          <h3 className="time">{moment(item.date).fromNow()}</h3>
        )}

        <p className="body">{item.body}</p>

        <div className="bottom">
          {item.repliesLength ? (
            <p className="replies">
              <span className="number">{item.repliesLength} </span>
              Replies
            </p>
          ) : (
            " "
          )}
          <p className="recommended">
            <span className="number">{item.recommended.length} </span>
            Recommended
          </p>
        </div>
      </div>
    ));
  };

  return <div className="comments">{getItems()}</div>;
};

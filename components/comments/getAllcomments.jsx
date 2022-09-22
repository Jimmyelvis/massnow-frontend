import React, { useState, useEffect } from "react";
import { list } from "../../actions/comments";
import moment from "moment";
import { Select } from "../pageelements/Select";
import { comment } from "postcss";
import Link from "next/link";

const GetAllcomments = () => {
  const [comments, setComments] = useState([]);
  const [action, setaction] = useState("");

  useEffect(() => {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setComments(data);
        setaction("all");
      }
    });
  }, []);

  const filterDropdown = (e) => {
    const options = [
      {
        value: "all",
        text: "All Comments",
      },
      {
        value: "flagged",
        text: "Flagged Only",
      },
      // {
      //   value: "1",
      //   text: "Authors",
      // },
      // {
      //   value: "2",
      //   text: " Admins",
      // },
    ];

    return (
      <Select
        options={options}
        onChange={(e) => {
          setaction(e.target.value);
          console.log("====================================");
          console.log(e.target.value);
          console.log("====================================");
        }}
      />
    );
  };

  const showAllComments = () => {
    let tempComments;

    if (action === "all") {
      tempComments = comments;
    } else {
      tempComments = comments.filter((comment) => {
        return comment.flagged === true;
      });
    }

    return tempComments.map((comment) => {
      return (
        <Link href={`/admin/crud/comments/${comment._id}`}>
          <a>
            <div className="card comment_card" key={comment.id}>
              {comment.flagged ? (
                <img
                  src="/images/ui/flagged_icon.svg"
                  className="flagged_icon"
                  alt=""
                />
              ) : (
                " "
              )}

              <div className="comment_date_posted">
                <img src="/images/ui/calander_icon.svg" alt="" />
                <h4>{moment(comment.createdAt).fromNow()}</h4>
              </div>

              <div className="comment_author">
                <div className="avatar">
                  {!comment.postedBy.photo ? (
                    <img src="/images/ui/avatar.jpg" alt="" />
                  ) : (
                    <img src={comment.postedBy.photo} alt="" />
                  )}
                </div>

                <div className="posted_by_info">
                  <h3 className="posted_by">Posted By:</h3>
                  <h3 className="name">{comment.postedBy.name}</h3>
                </div>
              </div>

              <div className="comment_body">{comment.body}</div>

              <div className="recs_replies">
                <div className="recs">
                  <h4 className="label">Recs</h4>
                  <h4>{comment.recommended.length}</h4>
                </div>

                <div className="replies">
                  <h4 className="label">Replies</h4>
                  <h4>{comment.replies.length}</h4>
                </div>
              </div>
            </div>
          </a>
        </Link>
      );
    });

    // return "hey man";
  };

  return (
    <>
      <div className="filter_comments">{filterDropdown()}</div>
      <div className="all_comments">{showAllComments()}</div>
    </>
  );
};

export default GetAllcomments;

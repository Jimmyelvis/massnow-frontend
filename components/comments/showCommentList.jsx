import React from "react";
import { CSSTransition } from "react-transition-group";
import { ShowForm } from "./commentForm"
import { isAuth, getCookie } from "../../actions/auth"



export const ShowCommentList = ({
  commentList,
  comments,
  moment,
  indexedComment,
  findUserRec,
  recComment,
  revelReplies,
  dropdownRef,
  showReplies,
  calcHeight,
  newReply,
  replyBody,
  handleReplyBody,
  response,
  error
}) => {




  return (commentList = comments.map((comment, i) => (
    <div className="comment" key={comment._id}>
      <div className="avatar">
        <img src={comment.postedBy.photo} alt="" />
      </div>

      <div className="info">
        <div className="name_time">
          <h3 className="name">{comment.postedBy.name}</h3>
          <h3 className="time">{moment(comment.createdAt).fromNow()}</h3>
          {i === indexedComment && error ? <h3 className="error">{error}</h3> : " "}
        </div>

        <p className="body">{comment.body}</p>

        <div className="bottom">
          <div className="recommended">
            <p
              className="reply_btn"
              onClick={() => {
                revelReplies(i);
              }}
            >
              Reply
            </p>
            {findUserRec(comment.recommended) ? (
              <p>Recommended</p>
            ) : (
              <p
                className="reply_btn"
                onClick={() => {
                  /**
                   * In addition to the comment id we also need the index
                   * so if any errors arises we know which comment to
                   * attach the error response to
                   */
                  recComment(comment._id, i, "comment");
                }}
              >
                Recommend
              </p>
            )}

            <p>
              <span className="number">{comment.replies.length} </span>
              Replies
            </p>
            <p>
              <span className="number">{comment.recommended.length} </span>
              Recommended
            </p>
          </div>

          {comment.replies.length > 0 ? (
            <div
              className={`${
                showReplies === true && i === indexedComment
                  ? "arrows arrows_down"
                  : "arrows"
              }`}
              onClick={() => {
                revelReplies(i);
              }}
            >
              <img src="/images/ui/up-arrow.svg" alt="" />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      {showReplies && i === indexedComment ? (
        <div
          className="replies"
          style={{
            display: `${
              showReplies && i === indexedComment ? "block" : "none"
            }`,
          }}
          ref={dropdownRef}
        >
          <h3 className={`${response !== "" ? "response_active" : "response"}`}>
            {response}
          </h3>
          {
           isAuth() ? ( <ShowForm
              submitForm={(e) => {
                newReply(e, comment._id);
              }}
              body={replyBody}
              handleBody={handleReplyBody}
              rows={5}
            />) : ("")
          }
          {comment.replies.map((reply, i) => (
            <div className="reply">
              <div className="avatar">
                <img src={reply.postedBy.photo} alt="" />
              </div>

              <div className="info">
                <div className="name_time">
                  <h3 className="name">{reply.postedBy.name}</h3>
                  <h3 className="time">{moment(reply.date).fromNow()}</h3>
                </div>

                <p className="body">{reply.body}</p>

                {/* <div className="bottom">
                  <div className="recommended">
                    <p className="reply_btn">Recommend</p>

                    <p>
                      <span className="number">{reply.recommended.length}</span>
                      Recommended
                    </p>
                  </div>
                </div> */}
              </div>
            </div>

          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  )));
};

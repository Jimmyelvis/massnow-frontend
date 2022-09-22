import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import Link from "next/dist/client/link";
import { getSingleComment } from "../../actions/comments";
import { getuserRoles } from "../../helpers/getuserroles";
import { useGlobalContext } from "../../context/context";
import AdminModal from "../pageelements/AdminModal";


const SingleComment = ({ router }) => {
  const [comment, setComment] = useState({});
    const { isModalOpen, openModal, openOverlay, isOverlayOpen } = useGlobalContext();

  useEffect(() => {
    getComment();
  }, [router]);

  const getComment = () => {
    if (router.query.comment) {
      let commentId = router.query.comment;

      getSingleComment(commentId, "").then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setComment(data);

          console.log("====================================");
          console.log(data);
          console.log("====================================");
        }
      });
      // }
    }
  };

  /**
   * TODO: When rendering a key that has an object for it's value we need to
   * TODO: make sure that it is read through first ie. {comment.postedBy ? comment.postedBy.name : " "}
   */

  return (
    <>
      <div className="comment_info_cards">
        {/**Author Details */}
        <div className="card comment_info_card author_details">
          <h3 className="admin_heading-3 card_title">Author Details</h3>

          <div className="comment_author">
            <div className="avatar">{comment.postedBy && comment.postedBy.photo ? <img src={comment.postedBy.photo} alt="" /> : <img src="/images/ui/avatar.jpg" alt="" />}</div>

            <div className="posted_by_info">
              <h3 className="name">{comment.postedBy ? comment.postedBy.name : ""}</h3>

              <Link href={`/profile/${comment.postedBy && comment.postedBy.username}`}>
                <a>
                  <h3 className="username">@{comment.postedBy ? comment.postedBy.username : ""}</h3>
                </a>
              </Link>

              <h3 className="email">{comment.postedBy && comment.postedBy.email}</h3>
            </div>
          </div>

          <div className="role">{comment.postedBy && getuserRoles(comment.postedBy.role)}</div>
        </div>

        {/**Comment Body */}
        <div className="card comment_info_card comment_body">
          <h3 className="admin_heading-3 card_title">Comment Body</h3>

          <div className="body">{comment.body}</div>
        </div>

        {/**Article Details */}
        <div className="card comment_info_card article_details">
          <h3 className="admin_heading-3 card_title">Article Details</h3>

          <div className="headline">
            <div className="block"></div>
            <Link href={`/blogs/${comment.post && comment.post.slug}`}>
              <a>
                <h2 className="admin_heading-2 title">{comment.post && comment.post.title}</h2>
              </a>
            </Link>
            <h3 className="admin_heading-3 subtitle">{comment.post && comment.post.subtitle}</h3>
          </div>

          <div className="comments_likes">
            <div className="likes_container">
              <img src="/images/ui/favorite_icon.svg" alt="" className="icon number heart_icon" />
              <span className="number likes_number">{comment.likes_length}</span>
            </div>

            <div className="comments_container">
              <img src="/images/ui/comments_icon.svg" alt="" className="icon number comment_icon" />
              <span className="number comments_number">{comment.comments_length}</span>
            </div>
          </div>

          <div className="overlay"></div>
          <img src={comment.post && comment.post.mainphoto} alt="" className="img_bg" />
        </div>

        {/** Comment Details */}
        <div className="card comment_info_card comment_details ">
          <h3 className="admin_heading-3 card_title">Comment Details</h3>

          <ul className="details">
            <li>
              <img src="/images/ui/comments_icon.svg" alt="" className="icon" />
              <h3 className="admin_heading-3 label">Replies</h3>
              <div className="value">{comment.replies && comment.replies.length}</div>
            </li>

            <li>
              <img src="/images/ui/favorite_icon.svg" alt="" className="icon" />
              <h3 className="admin_heading-3 label">Recs</h3>
              <div className="value">{comment.recommended && comment.recommended.length}</div>
            </li>

            <li>
              <img src="/images/ui/flagged_icon.svg" alt="" className="icon" />
              <h3 className="admin_heading-3 label">Flagged</h3>
              <div className="value">{String(comment.flagged)}</div>
            </li>
          </ul>
        </div>
      </div>

      <AdminModal />
    </>
  );
};

export default withRouter(SingleComment);

import { set } from "nprogress";
import React, { useState, useEffect, useRef } from "react";
import {
  listFromArticle,
  createComment,
  createRecommended,
  createReply
} from "../../actions/comments";
import moment from "moment";
import { CSSTransition } from "react-transition-group";
import { IoIosCloseCircle } from "react-icons/io";
import { isAuth, getCookie } from "../../actions/auth";
import { ShowForm } from "../comments/commentForm";
import { Sortingoptions } from "../comments/sortingoptions";
import { ShowCommentList } from "../comments/showCommentList";

const Comments = ({ overlayOpen, setoverlayOpen, postId }) => {
  const token = getCookie("token");

  /**
   * Check to see if there is a comment in local
   * storage. The results will set the comment body state
   */
  const commentFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("comment")) {
      return JSON.parse(localStorage.getItem("comment"));
    } else {
      return false;
    }
  };

  // If true the comments area will be visible
  const [showContainer, setshowContainer] = useState(false);

  // If true the comments if any will be shown
  const [showBody, setShowBody] = useState(false);

  // Set the array of comments if any exist
  const [comments, setcomments] = useState([]);
  const [showReplies, setshowReplies] = useState(false);
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  // Set the comment form to the results of commentFromLS()
  const [commentBody, setcommentBody] = useState(commentFromLS());
  const [replyBody, setReplyBody] = useState("");
  const [values, setValues] = useState({ formData: "" });

  // Set the sort value for sorting the comments
  const [sortValue, setsortValue] = useState("earliest");

  const { formData } = values;

  const [currentComment, setCurrentComment] = useState({});

  // Error state for displaying  any errors
  const [error, setError] = useState("");
  
  const [response, setResponse] = useState("");

  /**
   * We need to know which comment is the active comment
   * such as reveling replies, or replying to a comment
   */
  const [indexedComment, setindexedComment] = useState("");

  const handleCommentBody = (e) => {
    setcommentBody(e.target.value);
    formData.set("commentBody", e.target.value);
    if (typeof window !== "undefined") {
      localStorage.setItem("comment", JSON.stringify(e.target.value));
    }
  };

   const handleReplyBody = (e) => {
     setReplyBody(e.target.value);
     formData.set("replyBody", e.target.value);
   };

  const getComments = () => {
    listFromArticle(postId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setcomments(data);
      }
    });
  };

  useEffect(() => {
    if (overlayOpen === true) {
      setTimeout(() => {
        setshowContainer(true);
      }, 1500);

      setTimeout(() => {
        setShowBody(true);
      }, 2000);

      getComments();
    }
  }, [overlayOpen]);

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
  }, []);

  const closeComments = () => {
    setTimeout(() => {
      setShowBody(false);
    }, 500);

    setTimeout(() => {
      setshowContainer(false);
    }, 1500);

    setTimeout(() => {
      setoverlayOpen(false);
    }, 2500);
  };

  const showHeading = () => {
    return (
      <h2 className="heading-2">
        Comments: <span className="comments-total">{comments.length}</span>
      </h2>
    );
  };

  const showForm = () => {
    return (
      <ShowForm
        submitForm={newComment}
        body={commentBody}
        handleBody={handleCommentBody}
      />
    );
  };


  const showCommentList = () => {
    /**
     * Check to see if there are any comments
     * to display
     */
    if (comments.length > 0) {
      let commentList = comments;

      /**
       * Check to see what the sortValue is
       * and depending on that sort accordingly
       */
      if (sortValue === "replies") {
        commentList.sort((a, b) => {
          return b.replies.length - a.replies.length;
        });
      } else if (sortValue === "recommended") {
        commentList.sort((a, b) => {
          return b.recommended.length - a.recommended.length;
        });
      } else if (sortValue === "latest") {
        commentList.sort((a, b) => {
          return b.createdAt.localeCompare(a.createdAt);
        });
      } else {
        commentList.sort((a, b) => {
          return a.createdAt.localeCompare(b.createdAt);
        });
      }

      
      return (
        /**
         * After the list a been sorted map through them
         * and display the jsx
         */

        <ShowCommentList
          commentList={commentList}
          comments={comments}
          moment={moment}
          indexedComment={indexedComment}
          findUserRec={findUserRec}
          recComment={recComment}
          revelReplies={revelReplies}
          dropdownRef={dropdownRef}
          showReplies={showReplies}
          calcHeight={calcHeight}
          newReply={newReply}
          replyBody={replyBody}
          handleReplyBody={handleReplyBody}
          response={response}
        />
      );
    }
  };

  /**
   * This function recieves a passed in index number
   * we use this to know which comment to revel the replies
   */
  const revelReplies = (index) => {

    /**
     * If the showReplies state is false set it to true
     * set the indexedcomment state variable to the passed
     * in index
     */
    if (showReplies === false) {
      setindexedComment(index)
      setshowReplies(true);
    } 
    
    /**
     * If the index variable is not empty, and is not 
     * equal to the indexedcomment state variable, just simply
     *  set the indexedcomment state variable to the passed index
     */
    else if ( index !== "" && (index !== indexedComment) ) {
      setindexedComment(index);
    } 
    
     /**
     * If both are equal it means the users is trying to close
     * the list of replies for the current comment
     */
    else if ( index === indexedComment) {
      
      setshowReplies(false)
    }

    else {
      setshowReplies(false)
    }
  };

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  const newComment = (e) => {
    e.preventDefault();

    postId
    createComment(isAuth()._id, postId, commentBody, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setcomments([data.comment, ...comments]);

        if (typeof window !== "undefined") {
          localStorage.setItem("comment", JSON.stringify(""));
        }

        setcommentBody(commentFromLS());
      }
    });
  };

    const newReply = (e, commentId) => {
      e.preventDefault();


      createReply(isAuth()._id, postId, replyBody, commentId, token).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
     

          /**
           * Make a new copy of the current comments state array and put it into
           * a temp array
           */
          let tempArrayComments = [...comments];

          /**
           * Find the index of the temp array where it's comment._id matches
           * the comment._id that's returned from the server response. If one is
           * found this will be the comment the will be updated
           */
          let item = tempArrayComments.findIndex((comment) => {
            return comment._id === data.comment._id;
          });

          tempArrayComments[item] = data.comment;

          /**
           * Update the state with the updated info
           */
          setcomments(tempArrayComments);
          renderResponse(data.msg)
          setReplyBody("")
        }
      })
    };

  const showSortingOptions = () => {
    return (
      <Sortingoptions
        setsortValue={setsortValue}
      />
    );
  };

  /**
   * Function for recommending a comment
   */
  const recComment = (commentId, index, type) => {
    /**
     * Get the required parameters to send to the backend
     */
    commentId;
    let userId = isAuth()._id;
    postId;

    console.log('===============type=====================');
    console.log(type);
    console.log('====================================');

    createRecommended(userId, commentId, postId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        /**
         * Check to see if the response contains a json key called
         * "comment". If it doesen't then it means that the user already
         * rec the comment, and set the error state to the returned response
         * and return from here
         */
        if (!data.comment) {
          setError(data.alreadyrecommened);
          setindexedComment(index);
          return;
        }

        /**
         * Make a new copy of the current comments state array and put it into
         * a temp array
         */
        let tempArrayComments = [...comments];

        /**
         * Find the index of the temp array where it's comment._id matches
         * the comment._id that's returned from the server response. If one is
         * found this will be the comment the will be updated
         */
        let item = tempArrayComments.findIndex((comment) => {
          return comment._id === data.comment._id;
        });

        tempArrayComments[item] = data.comment;

        /**
         * Update the state with the updated info
         */
        setcomments(tempArrayComments);
      }
    });
  };

  /**
   * Check the array of recommends for each comment
   * to see if the current logged in user is in there
   * if so return true
   */
  const findUserRec = (recs) => {
    const userId = isAuth()._id;

    if (recs.filter((rec) => rec.recommendedBy._id === userId).length > 0) {
      return true;
    } else {
      return false;
    }
  };


  const renderResponse = (msg) => {

    setResponse(msg);

    setTimeout(() => {
      setResponse("")
    }, 3000);
    
  }

  return (
    <>
      <div className="commentsOverlay">
        <div
          className={` ${
            showContainer === true
              ? "commentsContainer slideIn"
              : "commentsContainer"
          }  `}
        >
          <div className="close" onClick={closeComments}>
            <IoIosCloseCircle />
          </div>

          <div
            className={` ${
              showBody === true ? "commentsBody  showComments" : "commentsBody"
            }  `}
          >
            {showHeading()}
            {isAuth() ? showForm() : ""}
            {showSortingOptions()}

            <div className="commentList">{showCommentList()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;

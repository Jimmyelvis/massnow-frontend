import Link from "next/link";
import React, { useState, useEffect } from "react";
import { getCookie, isAuth } from "../../../actions/auth";
import { listTopnews, listTopSportsnews, listTopLocalnews, removeBlog } from "../../../actions/blog";
import renderHTML from "react-render-html";
import ListedBlogs from "./ListedBlogs";
import moment from "moment";
import { useGlobalContext } from '../../../context/context'
import Modal from "../../pageelements/Modal";



const NewsList = ({ listFrom }) => {
  const {openModal, isModalOpen } = useGlobalContext();
  const [topnewsblogs, setTopnewsblogs] = useState([]);
  const [choosenBlog, setchoosenBlog] = useState("");
  const [choosenPosNumber, setChoosenPosNumber] = useState("")
  const [getBlogsFrom, setgetBlogsFrom] = useState(listFrom);


  useEffect(() => {
    loadBlogs();
  }, [isModalOpen]);

  const loadBlogs = () => {

    if (listFrom == "Top Sports") {
        listTopSportsnews().then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          /**
           *  (topnewsblogs) holds the array of 5 blogs
           */
          setTopnewsblogs(data);
        }
      });
      
    } 
    
    else if ( listFrom == "Top Local" ) {
      listTopLocalnews().then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          /**
           *  (topnewsblogs) holds the array of 5 blogs
           */
          setTopnewsblogs(data);
        }
      });
    }

    else {
      
      listTopnews().then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          /**
           *  (topnewsblogs) holds the array of 5 blogs
           */
          setTopnewsblogs(data);
        }
      });
    }

  };



  const showAllBlogs = () => {

 
    return topnewsblogs.map((topnewsblog, i) => {

      /**
       * This will be the label that describes the position a post
       * holds in this section. Main Story, second story, third etc..
       */
      let label;

      

      switch (i) {
        case 0:
          label = "Main Story"
          break;
        case 1:
          label = "Second Story"
          break;
        case 2:
          label = "Third Story"
          break;
        case 3:
          label = "Fourth Story"
          break;
        case 4:
          label = "Fifth Story"
          break;
        default:
          break;
      }

      return (
        <div key={topnewsblog._id} className="entry">
          <h3 className="heading-3 label">{label}</h3>

          <div className="story">
            <img src={topnewsblog.mainphoto} alt="" className="mainphoto" />

            <h3 className="heading-3">
              <Link href={`/blogs/${topnewsblog.slug}`}>
                <a>{topnewsblog.title}</a>
              </Link>
            </h3>

            <p className="author">
              By {topnewsblog.postedBy.name} -{" "}
              {moment(topnewsblog.createdAt).fromNow()}
            </p>

            <p className="excerpt">{topnewsblog.mdesc}</p>

            <div className="buttons">
              <button
                onClick={() => {
                  openModal();
                  setchoosenBlog(topnewsblog.slug);
                  setChoosenPosNumber(i + 1);
                }}
                className="btn btn-primary"
              >
                Edit
              </button>

            
            </div>
          </div>
        </div>
      );
    });
 
 
  };


  return (
    <React.Fragment>
      {isModalOpen ? (
        <Modal
          contentBgcolor={null}
          overlayColor={`rgba(242, 246, 252, 0.95)`}
          gridType={`Choosefromlist`} // This will need to be turned off
          transition={`all 0.7s linear`}
        >
          <ListedBlogs
            blogentry={choosenBlog}
            positionNumber={choosenPosNumber}
            listFrom={listFrom}
          />
        </Modal>
      ) : (
        ""
      )}

      <div className="topnewslistings">{showAllBlogs()}</div>
    </React.Fragment>
  );
}

export default NewsList;
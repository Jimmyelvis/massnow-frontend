import { IoIosCloseCircle } from "react-icons/io";
import { useGlobalContext } from "../../context/context";
import React, { useState, useEffect, useRef } from "react";

const CommentsOverlay = ({
  children,
  contentBgcolor,
  overlayColor,
  gridType,
  transition,
  blogentry,
  overlayOpen,
}) => {

  const [isVisible, setIsVisible] = useState(false);

  CommentsOverlay.defaultProps = {
    transition: "",
  };

  useEffect(() => {
    if (overlayOpen == true) {
      document.body.classList.add("overflow");
    }

    return () => {
      document.body.classList.remove("overflow");
    };
  });

  return (
    <div
      className={` ${
        overlayOpen
          ? "modal-overlay show-modal "
          : "modal-overlay "
      }`}
      style={{
        backgroundColor: `${overlayColor}`,
        transition: `${transition}`,
      }}
    >
      <div
        className={`${
          overlayOpen
            ? "modal-container show-modal-container " + `${gridType}`
            : "modal-container " + `${gridType}`
        }`}
        style={{ backgroundColor: `${contentBgcolor}` }}
      >
        {children}
      </div>

      {/* <button
        className="close-modal-btn "
        onClick={closeOverlay}
        style={{
          color: "#939CC7",
        }}
      >
        <IoIosCloseCircle />
      </button> */}
    </div>
  );
};

export default CommentsOverlay;

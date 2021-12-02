import { IoIosCloseCircle } from "react-icons/io";
import { useGlobalContext } from "../../context";
import React, { useState, useEffect, useRef } from "react";



const SearchOverlay = ({
  children,
  contentBgcolor,
  overlayColor,
  gridType,
  transition,
  blogentry,
}) => {
  const { isOverlayOpen, closeOverlay } = useGlobalContext();

   const [isVisible, setIsVisible] = useState(false);

   
  SearchOverlay.defaultProps = {
    transition: "",
  };

    useEffect(() => {

      if (isOverlayOpen == true) {
         document.body.classList.add("overflow");
      }

      return () => {
         document.body.classList.remove("overflow");
      }
      
    });

  return (
    <div
      className={` ${
        isOverlayOpen
          ? "modal-overlay search-overlay show-modal "
          : "modal-overlay search-overlay "
      }`}
      style={{
        backgroundColor: `${overlayColor}`,
        transition: `${transition}`,
      }}
    >
      <div
        className={`${
          isOverlayOpen
            ? "modal-container show-modal-container " + `${gridType}`
            : "modal-container " + `${gridType}`
        }`}
        style={{ backgroundColor: `${contentBgcolor}` }}
      >
        {children}
      </div>

      <button
        className="close-modal-btn "
        onClick={closeOverlay}
        style={{
          color: "#939CC7",
        }}
      >
        <IoIosCloseCircle />
      </button>
  
    </div>
  );
};

export default SearchOverlay;

import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useGlobalContext } from "../../context/context";

const Modal = ({
  children,
  contentBgcolor,
  overlayColor,
  gridType,
  transition,
  blogentry,
}) => {
  const { isModalOpen, closeModal } = useGlobalContext();

  Modal.defaultProps = {
    transition: "",
  };

  return (
    <div
      className={` ${
        isModalOpen ? "modal-overlay show-modal " : "modal-overlay "
      }`}
      style={{
        backgroundColor: `${overlayColor}`,
        transition: `${transition}`,
      }}
    >
      <div
        className={`${
          isModalOpen
            ? "modal-container show-modal-container " + `${gridType}`
            : "modal-container " + `${gridType}`
        }`}
        style={{ backgroundColor: `${contentBgcolor}` }}
      >
        {children}
      </div>

      <button className="close-modal-btn " onClick={closeModal}>
        <IoIosCloseCircle />
      </button>
    </div>
  );
};

export default Modal;
